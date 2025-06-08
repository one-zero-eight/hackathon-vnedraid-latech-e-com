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
}

export function NumberFilter({ value, onChange }: NumberFilterProps) {
  return (
    <div className="flex gap-2">
      <input
        type="number"
        value={value.from || ''}
        onChange={(e) =>
          onChange({
            ...value,
            from: e.target.value ? Number(e.target.value) : undefined
          })
        }
        placeholder="От"
        className="border-input bg-background w-20 rounded-md border px-2 py-1 text-sm"
      />
      <input
        type="number"
        value={value.to || ''}
        onChange={(e) =>
          onChange({
            ...value,
            to: e.target.value ? Number(e.target.value) : undefined
          })
        }
        placeholder="До"
        className="border-input bg-background w-20 rounded-md border px-2 py-1 text-sm"
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
    <Select value={value} onValueChange={(value) => onChange(value as ProductStatus)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Выберите статус" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="active">Активный</SelectItem>
        <SelectItem value="inactive">Неактивный</SelectItem>
        <SelectItem value="under_moderation">На модерации</SelectItem>
      </SelectContent>
    </Select>
  )
}
