import { useEffect, useState } from 'react'
import { ShoppingCart, Wallet, ReceiptText } from 'lucide-react'
import StatisticsCard from '@/components/ui/statisticsCard'
import { getToken, getUserIdFromToken } from '@/lib/auth'

const [totalAmount, setTotalAmount] = useState<number | null>(null)
const [totalTrend, setTotalTrend] = useState<number | null>(null)
const [totalTrendDirection, setTotalTrendDirection] = useState<'up' | 'down'>('up')

useEffect(() => {
  async function fetchData() {
    const token = getToken()

    if (!token) {
      console.error('No token available')
      return
    }

    const userId = await getUserIdFromToken(token)

    if (!userId) {
      console.error('Failed to get user id')
      return
    }

    try {
      const response = await fetch(`/total_with_percent/30`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        console.error(`Failed to fetch total_with_percent: ${response.status}`)
        return
      }

      const data = await response.json()

      if (data) {
        setTotalAmount(data.total)
        setTotalTrend(Math.abs(data.percent))
        setTotalTrendDirection(data.percent >= 0 ? 'up' : 'down')
      }
    } catch (error) {
      console.error('Error fetching total_with_percent:', error)
    }
  }

  fetchData()
}, [])

const stats = [
  {
    icon: Wallet,
    title: 'Заказали на сумму',
    bottomLeftValue: totalAmount !== null ? totalAmount : 0,
    trend: totalTrendDirection,
    trendValue: totalTrend !== null ? totalTrend : 0
  },
  {
    icon: ReceiptText,
    title: 'Средний чек',
    bottomLeftValue: 842,
    trend: 'down' as const,
    trendValue: 3.2
  },
  {
    icon: ShoppingCart,
    title: 'Количество заказанных товаров',
    bottomLeftValue: 3500,
    trend: 'up' as const,
    trendValue: 8.1
  }
]

export default function Dashboard() {
  return (
    <main className="flex justify-center gap-6">
      {stats.map(({ icon, title, bottomLeftValue, trend, trendValue }, idx) => (
        <div key={idx} className="flex-grow basis-0">
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
