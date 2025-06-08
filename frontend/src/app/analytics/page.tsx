'use client'

import { useEffect, useState } from 'react'
import { ShoppingCart, Wallet, ReceiptText } from 'lucide-react'
import StatisticsCard from '@/components/ui/statisticsCard'
import { getToken } from '@/lib/auth'
import { useQuery } from '@tanstack/react-query'
import { getMe } from '@/lib/hooks/useAuth'

export default function Dashboard() {
  const [totalAmount, setTotalAmount] = useState<number | null>(null)
  const [totalTrend, setTotalTrend] = useState<number | null>(null)
  const [averageAmount, setAverageAmount] = useState<number | null>(null)
  const [averageTrend, setAverageTrend] = useState<number | null>(null)
  const [count, setCount] = useState<number | null>(null)
  const [countTrend, setCountTrend] = useState<number | null>(null)
  const [totalTrendDirection, setTotalTrendDirection] = useState<'up' | 'down'>('up')
  const [averageTrendDirection, setAverageTrendDirection] = useState<'up' | 'down'>('up')
  const [countTrendDirection, setCountTrendDirection] = useState<'up' | 'down'>('up')

  const { data: user, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    staleTime: 60 * 60 * 1000
  })

  useEffect(() => {
    async function fetchData() {
      const token = getToken()

      if (!token || !user?.id) {
        console.error('No token or user ID available')
        return
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URLP}/total_with_percent/30`, {
          method: 'GET',
          headers: {
            "X-User-Id": user.id
          },
        })

        if (!response.ok) {
          console.error(`Failed to fetch total_with_percent: ${response.status}`)
          return
        }

        const data = await response.json()

        if (data) {
          const total = data.current - data.previous;
          setTotalAmount(total)
          setTotalTrend(Math.abs(data.ratio))
          setTotalTrendDirection(data.ratio >= 0 ? 'up' : 'down')
        }
      } catch (error) {
        console.error('Error fetching total_with_percent:', error)
      }


      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URLP}/average_with_percent/30`, {
          method: 'GET',
          headers: {
            "X-User-Id": user.id
          },
        })

        if (!response.ok) {
          console.error(`Failed to fetch average_with_percent: ${response.status}`)
          return
        }

        const data = await response.json()

        if (data) {
          const total = data.current - data.previous;
          setAverageAmount(total)
          setAverageTrend(Math.abs(data.ratio))
          setAverageTrendDirection(data.ratio >= 0 ? 'up' : 'down')
        }
      } catch (error) {
        console.error('Error fetching average_with_percent:', error)
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URLP}/count_with_percent/30`, {
          method: 'GET',
          headers: {
            "X-User-Id": user.id
          },
        })

        if (!response.ok) {
          console.error(`Failed to fetch count_with_percent: ${response.status}`)
          return
        }

        const data = await response.json()

        if (data) {
          const total = data.current - data.previous;
          setCount(total)
          setCountTrend(Math.abs(data.ratio))
          setCountTrendDirection(data.ratio >= 0 ? 'up' : 'down')
        }
      } catch (error) {
        console.error('Error fetching average_with_percent:', error)
      }
    }

    fetchData()
  }, [user?.id])

  const stats = [
    {
      icon: Wallet,
      title: 'Заказали на сумму',
      bottomLeftValue: totalAmount !== null ? totalAmount : 0,
      trend: totalTrendDirection,
      trendValue: totalTrend !== null ? totalTrend : 0,
    },
    {
      icon: ReceiptText,
      title: 'Средний чек',
      bottomLeftValue: averageAmount !== null ? averageAmount : 0,
      trend: averageTrendDirection,
      trendValue: averageTrend !== null ? averageTrend : 0
    },
    {
      icon: ShoppingCart,
      title: 'Количество заказанных товаров',
      bottomLeftValue: count !== null ? count : 0,
      trend: countTrendDirection,
      trendValue: countTrend !== null ? countTrend : 0
    }
  ]

  return (
    <main className="flex justify-center gap-6">
      {stats.map(({ icon, title, bottomLeftValue, trend, trendValue }, idx) => (
        <div
          key={idx}
          className="flex-grow basis-0"
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
  )
}