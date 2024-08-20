import { Bar, BarChart, Cell, LabelList, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AnalysisContext } from "@/pages/Analysis";
import { useContext } from "react";

const chartConfig = {
  search_volume: {
    label: "Search Volume",
  },
};

const DrugsGwothChart = () => {
  const { chartData, selectedDrugs } = useContext(AnalysisContext);

  return (
    <div className="border border-gray-200 p-6 rounded-md w-full flex flex-col min-h-[322px] space-y-4 h-full">
      <div className="text-xl font-semibold">Drugs Growth</div>
      <div className="w-full">
        {chartData.length === 0 || selectedDrugs.length > 10 ? (
          <div className="text-sm">
            please enter the drugs you want to compare (make sure to select less
            than 10 drugs)
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="-ml-[15px] z-10 h-fit">
            <BarChart accessibilityLayer data={chartData}>
              <XAxis dataKey="drug_name" hide />
              <YAxis scale="pow" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideIndicator />}
              />
              <Bar dataKey="growth" radius={5}>
                <LabelList
                  position="insideBottom"
                  dataKey="drug_name"
                  fontSize={11}
                  offset={5}
                  className="fill-[--color-label]"
                />
                {chartData.map((item) => (
                  <Cell
                    key={item.drug_name}
                    fill={item.growth > 0 ? "#84cc16" : "#ef4444"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </div>
    </div>
  );
};

export default DrugsGwothChart;
