import React from "react";
import BriefCard from "../../components/dashboard/BriefCard";
import InventoryTable, {InventoryItem} from "@/components/inventory/InventoryTable";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiPost } from "../../lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const Inventory: React.FC = () => {
	const queryClient = useQueryClient();
    const { data: inventoryData, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: () => apiGet<InventoryItem[]>("/product"),
    });

    const cardData = [
        { title: "Total Products", content: inventoryData?.length || 0 },
        { title: "Production rate (per day)", content: 25 },
    ];

    const formSchema = z.object({
        name: z.string().min(2, { message: "Name must be at least 2 characters." }),
        price: z.coerce.number(),
        status: z.string(),
        quantity: z.coerce.number(),
        category: z.string().min(2, { message: "Category must be at least 2 characters." }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            price: 0,
            status: "Out of Stock",
            quantity: 0,
            category: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (newProduct: z.infer<typeof formSchema>) => apiPost("/product", newProduct),
        onSuccess: () => {
			toast.success("Product added successfully!");
			queryClient.refetchQueries({ queryKey: ["products"] });
            form.reset();
        },
        onError: () => {
            toast.error("Failed to add product.");
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutate(values);
    }

    return (
        <div>
            <p className="mb-5">Monitor Inventory</p>
            <div className="flex flex-wrap gap-y-3 -mx-1 mb-3">
                {cardData.map((item, index) => (
                    <div key={index} className="w-full px-3 lg:w-1/2">
                        <BriefCard title={item.title} content={item.content} />
                    </div>
                ))}
            </div>

            <div className="flex justify-end my-3">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            <Plus /> Add Product
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>New Product</DialogTitle>
                            <DialogDescription>Create a new product</DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Product Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Price"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <FormControl>
                                                <select {...field} className="form-select">
                                                    <option value="In Stock">In Stock</option>
                                                    <option value="Out of Stock">Out of Stock</option>
                                                </select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="quantity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Quantity</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Quantity"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Category" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className="mt-3 w-full" type="submit" isLoading={isPending}>
                                    Add Product
                                </Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            {isLoading ? <Skeleton className="w-full h-100" /> : <InventoryTable data={inventoryData ?? []} />}
        </div>
    );
};

export default Inventory;
