'use client'

import * as React from 'react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ProductStatus } from '@/lib/types'

interface NumberFilterProps {
  value: { from?: number; to?: number }
  onChange: (value: { from?: number; to?: number }) => void
  placeholder?: string
}

export function NumberFilter({ value = {}, onChange, placeholder }: NumberFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <Input
        type="number"
        placeholder="От"
        value={value.from ?? ''}
        onChange={(e) => {
          const newValue = e.target.value ? Number(e.target.value) : undefined
          onChange({ ...value, from: newValue })
        }}
        className="w-24"
      />
      <Input
        type="number"
        placeholder="До"
        value={value.to ?? ''}
        onChange={(e) => {
          const newValue = e.target.value ? Number(e.target.value) : undefined
          onChange({ ...value, to: newValue })
        }}
        className="w-24"
      />
    </div>
  )
}

interface TextFilterProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function TextFilter({ value, onChange, placeholder }: TextFilterProps) {
  return (
    <Input
      type="text"
      placeholder={placeholder ?? 'Поиск...'}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full"
    />
  )
}

interface StatusFilterProps {
  value: ProductStatus | undefined
  onChange: (value: ProductStatus | undefined) => void
}

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <Select
      value={value ?? 'all'}
      onValueChange={(newValue) =>
        onChange(newValue === 'all' ? undefined : (newValue as ProductStatus))
      }
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Выберите статус" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Все</SelectItem>
        {Object.values(ProductStatus).map((status) => (
          <SelectItem key={status} value={status}>
            {status === ProductStatus.ACTIVE
              ? 'Активный'
              : status === ProductStatus.INACTIVE
                ? 'Неактивный'
                : 'Черновик'}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
