import DrugFilter from "./DrugFilter";
import DrugsBarChart from "./DrugsBarChart";
import DrugsGwothChart from "./DrugsGwothChart";

const DrugsComparaison = () => {
  return (
    <div className="w-full flex gap-2 flex-col sm:flex-row">
      <div className="w-[280px] flex flex-col justify-start items-start rounded-md border border-gray-200 p-4">
        <div className="w-full h-full">
          <DrugFilter />
        </div>
      </div>
      <div className="flex-1 z-10 h-full">
        <DrugsBarChart />
      </div>
      <div className="flex-1 mb-[200px] z-10 h-full">
        <DrugsGwothChart />
      </div>
    </div>
  );
};

export default DrugsComparaison;
