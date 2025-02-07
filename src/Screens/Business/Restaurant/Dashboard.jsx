"use client";

import React from "react";
import { TrendingUp, Utensils, ShoppingCart, FileText } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", chefs: 10, foodSold: 320, revenue: 15000 },
  { month: "February", chefs: 12, foodSold: 400, revenue: 18000 },
  { month: "March", chefs: 11, foodSold: 350, revenue: 16500 },
  { month: "April", chefs: 9, foodSold: 300, revenue: 14000 },
  { month: "May", chefs: 13, foodSold: 450, revenue: 20000 },
  { month: "June", chefs: 15, foodSold: 500, revenue: 22000 },
];

const chartConfig = {
  chefs: {
    label: "Chefs",
    color: "hsl(var(--chart-1))",
  },
  foodSold: {
    label: "Food Sold",
    color: "hsl(var(--chart-2))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-3))",
  },
};

const RestaurantDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {/* Summary Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Chefs</CardTitle>
          <CardDescription>Current active chefs</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Utensils className="h-10 w-10 text-blue-500" />
          <span className="text-2xl font-bold">15</span>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Food Sold</CardTitle>
          <CardDescription>Last 6 months</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <ShoppingCart className="h-10 w-10 text-green-500" />
          <span className="text-2xl font-bold">2,320</span>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Revenue</CardTitle>
          <CardDescription>Last 6 months</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <TrendingUp className="h-10 w-10 text-purple-500" />
          <span className="text-2xl font-bold">$120,500</span>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reports</CardTitle>
          <CardDescription>View detailed reports</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <FileText className="h-10 w-10 text-red-500" />
          <span className="text-2xl font-bold">View</span>
        </CardContent>
      </Card>

      {/* Sales Chart */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-4 max-w-xl">
        <CardHeader>
          <CardTitle>Sales Performance</CardTitle>
          <CardDescription>
            Chefs, Food Sold, and Revenue over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{ left: 12, right: 12, top: 12 }}
              stackOffset="expand"
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="chefs"
                type="natural"
                fill="#4F46E5"
                fillOpacity={0.1}
                stroke="#4F46E5"
                stackId="a"
              />
              <Area
                dataKey="foodSold"
                type="natural"
                fill="#22C55E"
                fillOpacity={0.4}
                stroke="#22C55E"
                stackId="a"
              />
              <Area
                dataKey="revenue"
                type="natural"
                fill="#F59E0B"
                fillOpacity={0.4}
                stroke="#F59E0B"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantDashboard;
