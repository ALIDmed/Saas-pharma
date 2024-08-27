import React from "react";
import { SearchVolumeChart } from "./SearchVolumeChart";
import { formatNumber } from "../../utils/index";
import { AudioWaveform, TrendingDown, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CardComponent = ({
  drug_name,
  search_volume,
  growth,
  monthly_search_volume,
  trend,
}) => {
  return (
    <div className="flex flex-col h-full border-gray-200 border lg:px-4 lg:py-6 rounded-lg w-full p-3 min-w-[240px]">
      <div className="flex flex-col h-full justify-between text-base lg:text-xl">
        {/* upper part */}
        <div className="flex flex-row justify-between mb-[26px]">
          <div className="font-bold text-base lg:text-lg">{drug_name}</div>
          <div className="flex flex-row items-center justify-end ml-2">
            <div>
              <div className="font-bold text-[#4770e8]">
                {formatNumber(search_volume)}
              </div>
              <div className="text-xs lg:text-[12px] text-gray-500">Volume</div>
            </div>
            <div className="ml-5">
              <div
                className={`flex flex-row items-center justify-start ${
                  growth == 1
                    ? "text-gray-600"
                    : growth < 0
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                <div className="font-bold">
                  {growth}
                  {growth != 1 ? "%" : "X"}
                </div>
                {growth == 1 ? (
                  <AudioWaveform />
                ) : growth < 1 ? (
                  <TrendingDown />
                ) : (
                  <TrendingUp />
                )}
              </div>
              <div className="text-xs lg:text-[12px] text-gray-500">Growth</div>
            </div>
          </div>
        </div>
        <SearchVolumeChart monthly_search_volume={monthly_search_volume} />
        <div className="mt-2 w-fit bg-gray-200 px-2 py-1 text-xs border border-gray-600/20 rounded-md text-gray-600">
          {trend}
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
