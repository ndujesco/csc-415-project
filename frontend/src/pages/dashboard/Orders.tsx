import React from "react";
import BriefCard from "../../components/dashboard/BriefCard";
import OrderTable, { Order } from "@/components/orders/OrderTable";
import { InventoryItem } from "@/components/inventory/InventoryTable";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiPost } from "../../lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const Orders: React.FC = () => {
	const queryClient = useQueryClient();
    const { data: orders, isLoading } = useQuery({
        queryKey: ["orders"],
        queryFn: () => apiGet<Order[]>("/order"),
	});
	

    const { data: products } = useQuery({
        queryKey: ["products"],
        queryFn: () => apiGet<InventoryItem[]>("/product"),
    });

    // Calculate stats dynamically
    const totalOrders = orders?.length || 0;
    const pendingOrders = orders?.filter((order) => order.status === "pending").length || 0;
    const fulfilledOrders = orders?.filter((order) => order.status === "fulfilled").length || 0;

    const data = [
        { title: "Total Orders", content: totalOrders },
        { title: "Pending Orders", content: pendingOrders },
        { title: "Fulfilled Orders", content: fulfilledOrders },
    ];

	const formSchema = z.object({
		address: z.string(),
		amount: z.coerce.number(),
		status: z.string(),
		productIds: z.array(z.number()),
		email: z.string(),
	});

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            address: "",
            amount: 0,
            status: "pending",
            productIds: [],
            email: "",
        },
	});
	
	const { mutate, isPending } = useMutation({
        mutationFn: (newOrder: z.infer<typeof formSchema>) => apiPost("/order", newOrder),
        onSuccess: () => {
            toast.success("Order added successfully!");
			queryClient.refetchQueries({ queryKey: ["orders"] });
            form.reset();
        },
        onError: () => {
            toast.error("Failed to add order.");
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
		mutate(values);
    }

    return (
        <div>
            <p className="mb-5">You have new orders!</p>
            <div className="flex flex-wrap gap-y-3 -mx-1 mb-3">
                {data.map((item, index) => (
                    <div key={index} className="w-full px-3 lg:w-1/3">
                        <BriefCard title={item.title} content={item.content} />
                    </div>
                ))}
            </div>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="mt-3">
                        <Plus /> Create Order
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
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Amount"
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
                                                <option value="pending">pending</option>
                                                <option value="fulfilled">fulfilled</option>
                                            </select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="email@gmail.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="productIds"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Products</FormLabel>
										<FormControl>
											<div className="space-y-2">
												{products?.map((product) => (
													<div key={product.id} className="flex items-center space-x-2">
														<input
															type="checkbox"
															value={product.id}
															onChange={(e) => {
																const value = Number(product.id);
																if (e.target.checked) {
																	if (!field.value.includes(value)) {
																		field.onChange([...field.value, value]);
																	}
																} else {
																	field.onChange(field.value.filter((id) => id !== value));
																}
															}}
															checked={field.value.includes(Number(product.id))}
														/>
														<label>{product.name}</label>
													</div>
												))}
											</div>
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

            {isLoading ? <Skeleton className="w-full h-100" /> : <OrderTable data={orders ?? []} />}
        </div>
    );
};

export default Orders;
