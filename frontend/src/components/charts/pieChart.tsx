import React, { useEffect, useRef } from 'react'
import { select } from 'd3-selection'
import { scaleOrdinal } from 'd3-scale'
import { pie, arc } from 'd3-shape'
import { schemeCategory10 } from 'd3-scale-chromatic'
import { sum } from 'd3-array'
import type { PieArcDatum } from 'd3-shape'
import { useCategories } from '@/lib/hooks/useCategories'
import { fetchCategories } from '@/lib/api/analytics'
import { cn } from '@/lib/utils' // если у тебя используется utility cn()

// Импорт Card компонента
import { Card } from '../ui/card' // путь поправь если нужно

// Тип пропсов компонента
interface PieChartProps {
  userId: string
}

type CategoriesData = Record<string, number>

export default function PieChart({ userId }: PieChartProps) {
  const { data, error, isLoading } = useCategories(userId)
  const ref = useRef<SVGSVGElement | null>(null)

  // Рендеринг Pie Chart
  useEffect(() => {
    if (!data) return

    const pieData = Object.entries(data).map(([key, value]) => ({ key, value }))

    const width = 300
    const height = 300
    const radius = Math.min(width, height) / 2

    // Очистить предыдущий рендер
    select(ref.current).selectAll('*').remove()

    const svg = select(ref.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`)

    const customColors = [
      '#c8ccbd',
      '#aabbb2',
      '#c49158',
      '#daab78',
      '#87672c',
      '#5d4e39',
      '#473d29'
    ]

    const color = scaleOrdinal<string, string>(customColors)

    const pieGenerator = pie<{ key: string; value: number }>().value((d) => d.value)
    const data_ready = pieGenerator(pieData)

    const arcGenerator = arc<PieArcDatum<{ key: string; value: number }>>()
      .innerRadius(0)
      .outerRadius(radius)

    svg
      .selectAll('path')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arcGenerator)
      .attr('fill', (_d, i) => color(i.toString()))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')

    const total = sum(pieData, (d) => d.value)

    svg
      .selectAll('text')
      .data(data_ready)
      .enter()
      .append('text')
      .text((d) => {
        const percent = ((d.data.value / total) * 100).toFixed(1)
        return `${d.data.key}: ${percent}%`
      })
      .attr('transform', (d) => {
        const [x, y] = arcGenerator.centroid(d)
        return `translate(${x},${y})`
      })
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
  }, [data])

  // UI
  if (error) return <div>Ошибка: {error.message}</div>
  if (isLoading || !data) return <div>Загрузка...</div>

  return (
    <Card className="flex w-full items-center justify-center">
      <svg ref={ref} className="geist-mono h-auto max-h-[300px] w-full max-w-[300px]" />
    </Card>
  )
}
