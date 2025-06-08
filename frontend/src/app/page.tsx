'use client'

import { DataTable } from '@/components/data-table'
import { sampleProducts } from '@/lib/constants'

export default function Home() {
  const handleEdit = (id: string, field: string, value: any) => {
    console.log('Edit:', id, field, value)
  }

  const handleDelete = (id: string) => {
    console.log('Delete:', id)
  }

  return (
    <main className="container mx-auto py-10">
      <DataTable onEdit={handleEdit} onDelete={handleDelete} />
    </main>
  )
}
