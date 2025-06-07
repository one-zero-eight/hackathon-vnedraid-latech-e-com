import { ShoppingCart } from "lucide-react";
import StatisticsCard from '@/components/ui/statisticsCard';

const stats = [
  {
    icon: ShoppingCart,
    title: 'Продажи',
    bottomLeftValue: 12500,
    trend: 'up' as const,
    trendValue: 12.5,
  },
  {
    icon: ShoppingCart,
    title: 'Заказы',
    bottomLeftValue: 842,
    trend: 'down' as const,
    trendValue: 3.2,
  },
  {
    icon: ShoppingCart,
    title: 'Клиенты',
    bottomLeftValue: 3500,
    trend: 'up' as const,
    trendValue: 8.1,
  },
];

export default function Dashboard() {
  return (
    <main className="flex gap-6 justify-center">
      {stats.map(({ icon, title, bottomLeftValue, trend, trendValue }, idx) => (
        <div
          key={idx}
          className="flex-grow basis-0" // ровно по 1/3 ширины (flex-grow=1, basis=0)
        >
          <StatisticsCard
            icon={icon}
            title={title}
            bottomLeftValue={bottomLeftValue}
            trend={trend}
            trendValue={trendValue}
          />
        </div>
      ))}
    </main>
  );
}

