import BarChartComponent from "./BarChartComponent";
import LineChartComponent from "./LineChartComponent";

export const ChartType = {
  LINE: "line",
  BAR: "bar",
} as const;

export type ChartType = (typeof ChartType)[keyof typeof ChartType];

type Props = {
  chartType: ChartType;
  data: any[];
  title?: string;
  className?: string;
};

export default function GraphCard({ chartType, data, title, className = "" }: Props) {

  


  const renderChart = () => {
    switch (chartType) {
      case ChartType.LINE:
        return <LineChartComponent data={data} />;
      case ChartType.BAR:
        return <BarChartComponent data={data} />;
      default:
        return <p className="text-red-500">Invalid Chart Type</p>;
    }
  };

  return (
    <div className={`bg-white  p-4 rounded-lg shadow-md transition-colors duration-300 ${className}`}>
      {title && (
        <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">{title}</h3>
      )}
      <div className="h-[300px]">
        {renderChart()}
      </div>
    </div>
  );
}