'use client'

import { DataTable } from '@/components/data-table'
import { BrandRead, CategoryRead, ProductStatus } from '@/lib/types'

const sampleBrands: BrandRead[] = [
  { id: '1', name: 'Nike', seller_id: '1' },
  { id: '2', name: 'Adidas', seller_id: '2' },
  { id: '3', name: 'Puma', seller_id: '3' }
]

const sampleCategories: CategoryRead[] = [
  { id: '1', name: 'Одежда' },
  { id: '2', name: 'Обувь' },
  { id: '3', name: 'Аксессуары' }
]

const sampleData = [
  {
    id: '1',
    img_url: 'https://via.placeholder.com/150',
    name: 'Футболка',
    price: 1999,
    discount_price: 1499,
    count: 100,
    description: 'Хлопковая футболка',
    size_width: 50,
    size_height: 70,
    size_depth: 1,
    lamoda_sku: 'LM123456',
    status: ProductStatus.ACTIVE,
    brand: sampleBrands[0],
    category: sampleCategories[0]
  }
]

export default function Home() {
  const handleEdit = (id: string, field: string, value: any) => {
    console.log('Edit:', id, field, value)
  }

  const handleDelete = (id: string) => {
    console.log('Delete:', id)
  }

  return (
    <main className="p-6">
      <section className="mb-6 w-full">
        <h1 className="text-2xl font-medium">Управление товарами</h1>
      </section>

      <DataTable
        data={sampleData}
        brands={sampleBrands}
        categories={sampleCategories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  )
}
