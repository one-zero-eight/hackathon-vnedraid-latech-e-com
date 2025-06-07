import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
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
  trendValue
}: StatisticsCardProps) {
  return (
    <Card className="flex h-40 w-full flex-col">
      <CardHeader className="flex items-center gap-3 px-6">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
          <Icon className="h-6 w-6" />
        </div>
        <CardTitle className="truncate">{title}</CardTitle>
      </CardHeader>

      <CardContent className="mt-auto flex items-start justify-between px-6">
        <div className="text-2xl font-bold">{bottomLeftValue}</div>
        <div
          className={`flex items-start text-base font-bold ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {trend === 'up' ? (
            <ArrowUpRight className="mt-[3px] mr-1 h-5 w-5" />
          ) : (
            <ArrowDownRight className="mt-[3px] mr-1 h-5 w-5" />
          )}
          {trendValue}%
        </div>
      </CardContent>
    </Card>
  )
}
