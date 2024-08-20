"use client";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  search_volume: {
    label: "Search Volume: ",
    color: "#4770e8",
  },
};

export function SearchVolumeChart({ monthly_search_volume }) {
  const displayedYears = new Set();
  return (
    <ChartContainer config={chartConfig} className="w-full" padding={0}>
      <AreaChart
        accessibilityLayer
        data={monthly_search_volume}
        margin={
          {
            // left: 12,
            // right: 12,
          }
        }
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="mmyy"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 4)}
          padding="no-gap"
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Area
          dataKey="search_volume"
          type="linear"
          fill="var(--color-search_volume)"
          fillOpacity={0.4}
          stroke="var(--color-search_volume)"
          isAnimationActive={false}
        />
      </AreaChart>
    </ChartContainer>
  );
}
