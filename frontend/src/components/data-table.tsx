'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { BrandRead, CategoryRead, Product, ProductStatus, ProductUpdate } from '@/lib/types'
import { productApi } from '@/lib/api/products'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { NumberFilter, StatusFilter } from './filters'
import { toast } from 'sonner'
import { MoreHorizontal, Settings } from 'lucide-react'

interface DataTableProps {
  onEdit?: (id: string, field: keyof Product, value: any) => void
  onDelete?: (id: string) => void
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

export function DataTable({ onEdit, onDelete }: DataTableProps) {
  const [data, setData] = useState<Product[]>([])
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [editingCell, setEditingCell] = useState<{
    id: string
    field: keyof Product
  } | null>(null)
  const [filters, setFilters] = useState<Filters>({})
  const [globalSearch, setGlobalSearch] = useState('')
  const [activeNumericFilter, setActiveNumericFilter] = useState<keyof Product | null>(null)
  const [modifiedCells, setModifiedCells] = useState<
    Map<string, { field: keyof Product; value: any; originalValue: any }>
  >(new Map())
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const products = await productApi.getProducts()
        setData(products)
      } catch (error) {
        console.error('Error fetching products:', error)
        setError('Failed to fetch products')
        toast.error('Failed to fetch products')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

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
    setIsEditing(true)
  }

  const handleCellSave = (id: string, field: keyof Product, value: any) => {
    const originalValue = data.find((item) => item.lamoda_sku === id)?.[field]
    if (value !== originalValue) {
      setModifiedCells((prev) => {
        const newMap = new Map(prev)
        newMap.set(`${id}-${field}`, { field, value, originalValue })
        return newMap
      })
    }
    setEditingCell(null)
  }

  const handleSaveChanges = async () => {
    try {
      const updates = Array.from(modifiedCells.entries()).map(([key, { field, value }]) => {
        const [lamodaSku] = key.split('-')
        const product = data.find((p) => p.lamoda_sku === lamodaSku)
        if (!product) throw new Error(`Product not found: ${lamodaSku}`)

        const updateData: ProductUpdate = {}
        if (field === 'name') updateData.name = value
        else if (field === 'price') updateData.price = Number(value)
        else if (field === 'discount_price') updateData.discount_price = Number(value)

        return {
          id: product.id,
          data: updateData
        }
      })

      if (updates.length === 1) {
        // Single update
        const { id, data: updateData } = updates[0]
        const updatedProduct = await productApi.updateProduct(id, updateData)
        setData((prev) => prev.map((p) => (p.id === id ? updatedProduct : p)))
      } else {
        // Batch update
        const updatedProducts = await productApi.updateProductsBatch(updates)
        setData((prev) =>
          prev.map((p) => {
            const updated = updatedProducts.find((up) => up.id === p.id)
            return updated || p
          })
        )
      }

      setModifiedCells(new Map())
      setIsEditing(false)
      toast.success('Changes saved successfully')
    } catch (error) {
      console.error('Error saving changes:', error)
      toast.error('Failed to save changes')
    }
  }

  const handleCancelChanges = () => {
    setModifiedCells(new Map())
    setIsEditing(false)
    setEditingCell(null)
  }

  const handleDelete = async (lamodaSku: string) => {
    try {
      const product = data.find((p) => p.lamoda_sku === lamodaSku)
      if (!product) throw new Error(`Product not found: ${lamodaSku}`)

      await productApi.deleteProduct(product.id)
      setData((prev) => prev.filter((p) => p.lamoda_sku !== lamodaSku))
      toast.success('Product deleted successfully')
    } catch (error) {
      console.error('Error deleting product:', error)
      toast.error('Failed to delete product')
    }
  }

  const handleFilterChange = <K extends keyof Product>(field: K, value: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  const filteredData = React.useMemo(() => {
    if (!data) return []

    return data.filter((item) => {
      if (!item) return false

      if (globalSearch) {
        const searchLower = globalSearch.toLowerCase()
        const hasTextMatch = Object.entries(item).some(([key, value]) => {
          if (!value) return false
          if (key === 'img_url') return false
          if (key === 'brand' || key === 'category') {
            return (value as BrandRead | CategoryRead).name.toLowerCase().includes(searchLower)
          }
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchLower)
          }
          return false
        })
        if (!hasTextMatch) return false
      }

      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true

        const field = key as keyof Product
        const itemValue = item[field]
        if (!itemValue) return false

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
  }, [data, filters, globalSearch])

  const editableFields: (keyof Product)[] = ['name', 'price', 'discount_price']
  const redirect = useRouter()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!data || data.length === 0) {
    return <div>No products found</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <Input
          placeholder="Поиск по всем текстовым полям..."
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
          className="max-w-sm"
        />
        <Button
          className="cursor-pointer"
          onClick={() => {
            redirect.push('/create')
          }}
        >
          Создать товар
        </Button>
      </div>
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
                  <TableHead key={key} className="p-4">
                    <div className="flex flex-col gap-2">
                      <span
                        className={typeof data[0]?.[field] === 'number' ? 'cursor-pointer' : ''}
                        onClick={() => {
                          if (typeof data[0]?.[field] === 'number') {
                            setActiveNumericFilter(activeNumericFilter === field ? null : field)
                          }
                        }}
                      >
                        {label}
                      </span>
                      {field === 'img_url' ? null : field === 'status' ? (
                        <StatusFilter
                          value={filters[field] as ProductStatus | undefined}
                          onChange={(value) => handleFilterChange(field, value)}
                        />
                      ) : typeof data[0]?.[field] === 'number' ? (
                        activeNumericFilter === field && (
                          <NumberFilter
                            value={filters[field] as { from?: number; to?: number }}
                            onChange={(value) => handleFilterChange(field, value)}
                          />
                        )
                      ) : null}
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
                  const isEditing =
                    editingCell?.id === row.lamoda_sku && editingCell?.field === field
                  const modifiedCell = modifiedCells.get(`${row.lamoda_sku}-${field}`)
                  const displayValue = modifiedCell ? modifiedCell.value : value

                  return (
                    <TableCell key={key}>
                      {isEditing && editableFields.includes(field) ? (
                        <Input
                          type={field === 'name' ? 'string' : 'number'}
                          defaultValue={displayValue as string | number}
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
                          className={`${editableFields.includes(field) ? 'cursor-pointer' : ''} ${modifiedCell ? 'font-medium text-blue-600' : ''}`}
                          onClick={() =>
                            editableFields.includes(field) && handleCellEdit(row.lamoda_sku, field)
                          }
                        >
                          {field === 'img_url' ? (
                            <img
                              src={displayValue as string}
                              alt={row.name}
                              className="h-10 w-10 object-cover"
                            />
                          ) : field === 'brand' ? (
                            (displayValue as BrandRead).name
                          ) : field === 'category' ? (
                            (displayValue as CategoryRead).name
                          ) : (
                            displayValue
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
                      <DropdownMenuItem onClick={() => handleDelete(row.lamoda_sku)}>
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
      {isEditing && (
        <div
          className="sticky bottom-0 left-0 z-10 flex w-full flex-row items-center justify-center gap-2 border-t bg-white p-4"
          style={{ boxShadow: '0 -2px 8px rgba(0,0,0,0.04)' }}
        >
          <Button variant="outline" onClick={handleCancelChanges} className="w-42">
            Отмена
          </Button>
          <Button onClick={handleSaveChanges} className="w-42">
            Сохранить
          </Button>
        </div>
      )}
    </div>
  )
}
