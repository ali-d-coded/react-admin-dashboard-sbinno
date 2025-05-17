import Card from "../../components/Card";
import GraphCard, { ChartType } from "../../components/GraphCard";
import { activeUsers, stats, userFlow } from "../../data";
import { useUser, useGlobalStoreDarkMode } from "../../stores/globalStore";
import { theme } from "antd";
import { useEffect } from "react";

export default function Dashboard() {
  const user = useUser();
  const darkMode = useGlobalStoreDarkMode();
  const { token } = theme.useToken();

  // Update chart colors based on theme
  useEffect(() => {
    // This could be used to pass theme colors to chart components
    // if they need programmatic updates
 
    
    // You could use this to update global chart settings if needed
  }, [darkMode, token]);

  // Create consistent theme styles to match App component
  const themeStyles = {
    text: darkMode ? 'text-white' : 'text-black',
    subtext: darkMode ? 'text-gray-300' : 'text-gray-600',
    border: darkMode ? 'border border-zinc-700 ' : 'border border-gray-200',
    highlight: darkMode ? 'bg-zinc-700' : 'bg-gray-100',
    bg: darkMode ? "bg-zinc-800" : ""
  };

  return (
    <div className={`grid h-full overflow-x-auto transition-colors ${themeStyles.text}`}>
      <h1 className="text-2xl font-bold mb-4">
        Welcome{user?.name ? `, ${user.name}` : ''}
      </h1>

      <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 mb-6">
        {stats.map((stat) => (
          <Card
            key={stat.key}
            label={stat.title}
            value={stat.value}
            icon={stat.icon}
            className={`transition-colors duration-300 ${themeStyles.border}`}
          />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <GraphCard 
          chartType={ChartType.LINE} 
          data={userFlow} 
          title="User Flow" 
          className={`transition-colors duration-300 ${themeStyles.border} ${themeStyles.bg}`}
        />
        <GraphCard 
          chartType={ChartType.BAR} 
          data={activeUsers} 
          title="Active Users" 
          className={`transition-colors duration-300 ${themeStyles.border} ${themeStyles.bg}`}
        />
      </section>
    </div>
  );
}