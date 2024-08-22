import { Bar, BarChart, XAxis, YAxis, LabelList } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useContext, useState, useEffect } from "react";
import { AnalysisContext } from "@/pages/Analysis";

const chartConfig = {
  search_volume: {
    label: "Search Volume",
    color: "#4770e8",
  },
  growth: {
    label: "Growth",
    color: "#4770e8",
  },
};

const DrugsBarChart = () => {
  const { selectedDrugs, chartData } = useContext(AnalysisContext);

  return (
    <div className="border border-gray-200 p-6 rounded-md w-full flex flex-col space-y-4 h-full">
      <div className="text-xl font-semibold">Drugs Search Volume</div>
      <div className="w-full h-full">
        {chartData.length === 0 || selectedDrugs.length > 10 ? (
          <div className="text-sm">
            please enter the drugs you want to compare (make sure to select less
            than 10 drugs)
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="-ml-[35px]">
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                left: -20,
              }}
            >
              <XAxis type="number" dataKey="search_volume" hide />
              <YAxis
                dataKey="drug_name"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 0)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel indicator="line" />}
              />
              <Bar
                dataKey="search_volume"
                fill="var(--color-search_volume)"
                radius={5}
                layout="vertical"
              >
                <LabelList
                  dataKey="drug_name"
                  position="insideLeft"
                  offset={20}
                  className="fill-[--color-label]"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </div>
    </div>
  );
};

export default DrugsBarChart;
