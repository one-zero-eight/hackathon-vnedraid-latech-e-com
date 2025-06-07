'use client'

import * as React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Settings } from 'lucide-react'
import { BrandRead, CategoryRead, ProductStatus, Product } from '@/lib/types'
import { NumberFilter, TextFilter, StatusFilter } from './filters'

// interface Product {
//   img_url: string
//   name: string
//   price: number
//   discount_price: number
//   count: number
//   description: string
//   size_width: number
//   size_height: number
//   size_depth: number
//   lamoda_sku: string
//   status: ProductStatus
//   brand: BrandRead
//   category: CategoryRead
// }

interface DataTableProps {
  data: Product[]
  brands: BrandRead[]
  categories: CategoryRead[]
  onEdit: (id: string, field: keyof Product, value: any) => void
  onDelete: (id: string) => void
}

const columnLabels: Record<keyof Product, string> = {
  id: 'ID',
  img_url: 'Изображение',
  name: 'Наименование',
  price: 'Цена',
  discount_price: 'Цена со скидкой',
  count: 'Количество',
  description: 'Описание',
  size_width: 'Ширина',
  size_height: 'Высота',
  size_depth: 'Глубина',
  lamoda_sku: 'SKU Lamoda',
  status: 'Статус',
  brand: 'Бренд',
  category: 'Категория'
}

type Filters = {
  [K in keyof Product]?: K extends
    | 'price'
    | 'discount_price'
    | 'count'
    | 'size_width'
    | 'size_height'
    | 'size_depth'
    ? { from?: number; to?: number }
    : K extends 'status'
      ? ProductStatus | undefined
      : K extends 'img_url'
        ? never
        : string
}

export function DataTable({ data, brands, categories, onEdit, onDelete }: DataTableProps) {
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set())
  const [editingCell, setEditingCell] = React.useState<{
    id: string
    field: keyof Product
  } | null>(null)
  const [filters, setFilters] = React.useState<Filters>({})

  const handleRowSelect = (id: string) => {
    const newSelected = new Set(selectedRows)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedRows(newSelected)
  }

  const handleCellEdit = (id: string, field: keyof Product) => {
    setEditingCell({ id, field })
  }

  const handleCellSave = (id: string, field: keyof Product, value: any) => {
    onEdit(id, field, value)
    setEditingCell(null)
  }

  const handleFilterChange = <K extends keyof Product>(field: K, value: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        const field = key as keyof Product
        const itemValue = item[field]

        if (value === undefined || value === '') return true

        if (typeof value === 'object' && 'from' in value) {
          const { from, to } = value
          if (from !== undefined && to !== undefined) {
            return itemValue >= from && itemValue <= to
          }
          if (from !== undefined) {
            return itemValue === from
          }
          if (to !== undefined) {
            return itemValue <= to
          }
          return true
        }

        if (field === 'brand' || field === 'category') {
          return (itemValue as BrandRead | CategoryRead).name
            .toLowerCase()
            .includes((value as string).toLowerCase())
        }

        if (typeof itemValue === 'string') {
          return itemValue.toLowerCase().includes((value as string).toLowerCase())
        }

        return itemValue === value
      })
    })
  }, [data, filters])

  const editableFields: (keyof Product)[] = ['name', 'price', 'discount_price']

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedRows.size === filteredData.length}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedRows(new Set(filteredData.map((item) => item.lamoda_sku)))
                  } else {
                    setSelectedRows(new Set())
                  }
                }}
              />
            </TableHead>
            {Object.entries(columnLabels).map(([key, label]) => {
              const field = key as keyof Product
              return (
                <TableHead key={key}>
                  <div className="flex flex-col gap-2">
                    <span>{label}</span>
                    {field === 'img_url' ? null : field === 'status' ? (
                      <StatusFilter
                        value={filters[field] as ProductStatus | undefined}
                        onChange={(value) => handleFilterChange(field, value)}
                      />
                    ) : typeof data[0]?.[field] === 'number' ? (
                      <NumberFilter
                        value={filters[field] as { from?: number; to?: number }}
                        onChange={(value) => handleFilterChange(field, value)}
                      />
                    ) : (
                      <TextFilter
                        value={filters[field] as string}
                        onChange={(value) => handleFilterChange(field, value)}
                        placeholder={`Поиск по ${label.toLowerCase()}`}
                      />
                    )}
                  </div>
                </TableHead>
              )
            })}
            <TableHead className="w-[50px]">
              <Settings className="h-4 w-4" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((row) => (
            <TableRow key={row.lamoda_sku}>
              <TableCell>
                <Checkbox
                  checked={selectedRows.has(row.lamoda_sku)}
                  onCheckedChange={() => handleRowSelect(row.lamoda_sku)}
                />
              </TableCell>
              {Object.entries(row).map(([key, value]) => {
                const field = key as keyof Product
                const isEditing = editingCell?.id === row.lamoda_sku && editingCell?.field === field

                return (
                  <TableCell key={key}>
                    {isEditing && editableFields.includes(field) ? (
                      <Input
                        type={field === 'name' ? 'text' : 'number'}
                        defaultValue={value as string | number}
                        onBlur={(e) => handleCellSave(row.lamoda_sku, field, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleCellSave(row.lamoda_sku, field, e.currentTarget.value)
                          }
                        }}
                        autoFocus
                      />
                    ) : (
                      <div
                        className={editableFields.includes(field) ? 'cursor-pointer' : ''}
                        onClick={() =>
                          editableFields.includes(field) && handleCellEdit(row.lamoda_sku, field)
                        }
                      >
                        {field === 'img_url' ? (
                          <img
                            src={value as string}
                            alt={row.name}
                            className="h-10 w-10 object-cover"
                          />
                        ) : field === 'brand' ? (
                          (value as BrandRead).name
                        ) : field === 'category' ? (
                          (value as CategoryRead).name
                        ) : (
                          value
                        )}
                      </div>
                    )}
                  </TableCell>
                )
              })}
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onDelete(row.lamoda_sku)}>
                      Удалить
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
