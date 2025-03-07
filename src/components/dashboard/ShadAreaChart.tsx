import { Area, AreaChart, CartesianGrid, Legend, XAxis } from "recharts";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type ChartData = {
    month: string;
    [key: string]: number | string;
};

type Props = {
    data: ChartData[];
    colors: Record<string, string>;
};

export default function ShadAreaChart({ data, colors }: Props) {
    const chartConfig = Object.keys(colors).reduce((acc, key) => {
        acc[key] = { label: key.charAt(0).toUpperCase() + key.slice(1), color: colors[key] };
        return acc;
    }, {} as ChartConfig);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Production</CardTitle>
                <CardDescription>Showing total products manufactured last week and the current week</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart accessibilityLayer data={data} margin={{ left: 12, right: 12 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />

                        <Legend
                            verticalAlign="bottom"
                            align="center"
                            iconType="plainline"
                            wrapperStyle={{ paddingTop: 16 }}
                        />
                        <defs>
                            {Object.keys(colors).map((key) => (
                                <linearGradient key={key} id={`fill${key}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={colors[key]} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={colors[key]} stopOpacity={0.1} />
                                </linearGradient>
                            ))}
                        </defs>
                        {Object.keys(colors).map((key) => (
                            <Area
                                key={key}
                                dataKey={key}
                                type="natural"
                                fill={`url(#fill${key})`}
                                fillOpacity={0.4}
                                stroke={colors[key]}
                                stackId="a"
                            />
                        ))}
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Trending up by 5.2% this week <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            Previous week - Current week
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
