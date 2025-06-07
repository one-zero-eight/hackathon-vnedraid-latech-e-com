import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { ArrowUpRight, ArrowDownRight, LucideIcon } from 'lucide-react'

type Trend = 'up' | 'down'

interface StatisticsCardProps {
  icon: LucideIcon
  title: string
  bottomLeftValue: number
  trend: Trend
  trendValue: number
}

export default function StatisticsCard({
  icon: Icon,
  title,
  bottomLeftValue,
  trend,
  trendValue,
}: StatisticsCardProps) {
  return (
    <Card className="w-full h-40 flex flex-col">
      <CardHeader className="flex items-center gap-3 px-6">
        <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg text-gray-600 flex-shrink-0">
          <Icon className="w-6 h-6" />
        </div>
        <CardTitle className="truncate">{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex justify-between items-start px-6 mt-auto">
        <div className="text-2xl font-bold">{bottomLeftValue}</div>
        <div
          className={`flex items-start text-base font-bold ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {trend === 'up' ? (
            <ArrowUpRight className="w-5 h-5 mr-1 mt-[3px]" />
          ) : (
            <ArrowDownRight className="w-5 h-5 mr-1 mt-[3px]" />
          )}
          {trendValue}%
        </div>
      </CardContent>
    </Card>
  )
}

