'use client'

import { DataTable } from '@/components/data-table'
import { sampleData } from '@/lib/constants'

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

      <DataTable data={sampleData} onEdit={handleEdit} onDelete={handleDelete} />
    </main>
  )
}
