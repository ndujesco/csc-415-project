import React from "react";
import BriefCard from "../../components/dashboard/BriefCard";
import InventoryTable, {
	InventoryItem,
} from "@/components/inventory/InventoryTable";
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
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const Inventory: React.FC = () => {
	const data = [
		{ title: "Total Categories", content: 3 },
		{ title: "Total Products", content: 50 },
		{ title: "Production rate (per day)", content: 25 },
	];

	const inventoryData: InventoryItem[] = [
		{
			id: "1",
			price: 30,
			status: "In Stock",
			quantity: 50,
			name: "Bag",
			category: "Clothing Items",
		},
		{
			id: "2",
			price: 10,
			status: "Out of Stock",
			quantity: 0,
			name: "Shirt",
			category: "Clothing Items",
		},
		{
			id: "3",
			price: 13,
			status: "In Stock",
			quantity: 50,
			name: "Plate",
			category: "Homeware",
		},
		{
			id: "4",
			price: 3,
			status: "In Stock",
			quantity: 5,
			name: "Pen",
			category: "Stationery",
		},
		{
			id: "5",
			price: 30,
			status: "In Stock",
			quantity: 50,
			name: "Shoe",
			category: "Clothing Items",
		},
		{
			id: "6",
			price: 30,
			status: "In Stock",
			quantity: 50,
			name: "Socks",
			category: "Clothing Items",
		},
	];

	const formSchema = z.object({
		name: z.string().min(2, {
			message: "Username must be at least 2 characters.",
		}),
		price: z.number(),
		status: z.string().min(2, {
			message: "Username must be at least 2 characters.",
		}),
		quantity: z.number(),
		category: z.string().min(2, {
			message: "Username must be at least 2 characters.",
		}),
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

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<div>
			<p className="mb-5">Monitor Inventory</p>
			<div className="flex flex-wrap gap-y-3 -mx-1 mb-3">
				{data.map((item, index) => (
					<div key={index} className="w-full px-3 lg:w-1/3">
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
							<DialogDescription>
								Create a new product
							</DialogDescription>
						</DialogHeader>

						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-3"
							>
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input
													placeholder="Product Name"
													{...field}
												/>
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
													onChange={(e) =>
														field.onChange(
															Number(
																e.target.value
															)
														)
													}
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
												<select
													{...field}
													className="form-select"
												>
													<option value="In Stock">
														In Stock
													</option>
													<option value="Out of Stock">
														Out of Stock
													</option>
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
													onChange={(e) =>
														field.onChange(
															Number(
																e.target.value
															)
														)
													}
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
												<Input
													placeholder="Category"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button className="mt-3 w-full" type="submit">
									Submit
								</Button>
							</form>
						</Form>
					</DialogContent>
				</Dialog>
			</div>

			<InventoryTable data={inventoryData} />
		</div>
	);
};

export default Inventory;
