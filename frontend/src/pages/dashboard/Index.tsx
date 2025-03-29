import React from "react";
import BriefCard from "../../components/dashboard/BriefCard";
import ShadLineChart from "@/components/dashboard/ShadLineChart";
import ShadAreaChart from "@/components/dashboard/ShadAreaChart";
import OrderTable, { Order } from "@/components/orders/OrderTable";
import ShadDonutChart from "@/components/dashboard/ShadDonutChart";
import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../../lib/api";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard: React.FC = () => {
    const data = [
        { title: "Sales", content: 10 },
        { title: "Revenue", content: "$5000" },
        { title: "Customers", content: 25 },
        { title: "Dispatch Riders", content: 5 },
        // { title: "Pending Orders", content: 25 },
        // { title: "Total Orders", content: 25 },
        // { title: "Products", content: 205 },
    ];

    const lineChartData = [
        { month: "January", Stationery: 186, ClothingItems: 80, Homeware: 90 },
        {
            month: "February",
            Stationery: 305,
            ClothingItems: 200,
            Homeware: 100,
        },
        { month: "March", Stationery: 237, ClothingItems: 120, Homeware: 100 },
        { month: "April", Stationery: 73, ClothingItems: 190, Homeware: 100 },
        { month: "May", Stationery: 209, ClothingItems: 130, Homeware: 100 },
        { month: "June", Stationery: 214, ClothingItems: 140, Homeware: 100 },
    ];

    const lineChartColors = {
        Stationery: "#252A39",
        ClothingItems: "#40B869",
        Homeware: "#F5B546",
    };

    const areaChartData = [
        { month: "Monday", currentWeek: 186, previousWeek: 80 },
        { month: "Tuesday", currentWeek: 305, previousWeek: 200 },
        { month: "Wednesday", currentWeek: 237, previousWeek: 120 },
        { month: "Thursday", currentWeek: 73, previousWeek: 190 },
        { month: "Friday", currentWeek: 209, previousWeek: 130 },
        { month: "Saturday", currentWeek: 214, previousWeek: 140 },
    ];

    const areaChartColors = {
        currentWeek: "#F5B546",
        previousWeek: "#F8DFC3",
    };

    const donutChartData = [
        { name: "CurrentWeek", value: 908, fill: "#252A39" },
        { name: "PreviousWeek", value: 92, fill: "#B9BCC8" },
    ];

    const donutChartColors = {
        CurrentWeek: "#252A39",
        PreviousWeek: "#B9BCC8",
    };

    const { data: orders, isLoading } = useQuery({
        queryKey: ["orders"],
        queryFn: () => apiGet<Order[]>("/order"),
    });

    return (
        <div>
            <p className="mb-5">Welcome back, Osemu</p>
            <div className="flex flex-wrap gap-y-3 -mx-1">
                {data.map((item, index) => (
                    <div key={index} className="w-full px-3 md:w-1/2">
                        <BriefCard title={item.title} content={item.content} />
                    </div>
                ))}

                <div className="w-full lg:w-1/2 h-auto px-3 mt-2">
                    <ShadLineChart data={lineChartData} colors={lineChartColors} />
                </div>

                <div className="w-full lg:w-1/2 h-auto px-3 mt-2">
                    <ShadAreaChart data={areaChartData} colors={areaChartColors} />
                </div>

                <div className="w-full lg:w-8/11 px-3 mt-2">
                    {isLoading ? <Skeleton className="w-full h-100" /> : <OrderTable data={orders ?? []} />}
                </div>

                <div className="w-full lg:w-3/11 px-3 mt-2">
                    <ShadDonutChart data={donutChartData} colors={donutChartColors} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
