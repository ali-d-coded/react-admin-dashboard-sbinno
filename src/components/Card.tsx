import { theme } from "antd";

type Props = {
  label: string;
  value: number;
  icon: React.ElementType;
  className?: string;
};

export default function Card({ label, value, icon: Icon, className = "" }: Props) {
  const { token } = theme.useToken();

  // Format the value if it's a large number
  const formattedValue = value > 999 
    ? `${(value / 1000).toFixed(1)}k` 
    : value.toString();
  
  // Determine icon color based on theme
  const iconColor = token.colorPrimary;

  return (
    <div className={`bg-white p-5 rounded-lg shadow-md flex flex-col transition-colors duration-300 ${className}`}>
      <h2 className="text-lg text-slate-600 dark:text-slate-300 font-medium">{label}</h2>
      <div className="flex items-end justify-between h-full mt-3">
        <div className="rounded-full p-2 bg-blue-100 dark:bg-blue-900/20 transition-colors duration-300">
          <Icon 
            className="text-3xl" 
            style={{ color: iconColor }}
          />
        </div>
        <p className="text-4xl font-bold text-gray-800 ">{formattedValue}</p>
      </div>
    </div>
  );
}