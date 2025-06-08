'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ProductStatus } from '@/lib/types'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function CreateProduct() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    discount_price: '',
    count: '',
    description: '',
    size_width: '',
    size_height: '',
    size_depth: '',
    lamoda_sku: '',
    status: 'active' as ProductStatus,
    img_url: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/v1/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          discount_price: Number(formData.discount_price),
          count: Number(formData.count),
          size_width: Number(formData.size_width),
          size_height: Number(formData.size_height),
          size_depth: Number(formData.size_depth)
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create product')
      }

      toast.success('Product created successfully')
      router.push('/')
    } catch (error) {
      console.error('Error creating product:', error)
      toast.error('Failed to create product')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value as ProductStatus }))
  }

  return (
    <main className="container mx-auto py-10">
      <h1 className="mb-8 text-2xl font-bold">Create New Product</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="discount_price">Discount Price</Label>
          <Input
            id="discount_price"
            name="discount_price"
            type="number"
            value={formData.discount_price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="count">Count</Label>
          <Input
            id="count"
            name="count"
            type="number"
            value={formData.count}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="size_width">Width</Label>
            <Input
              id="size_width"
              name="size_width"
              type="number"
              value={formData.size_width}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="size_height">Height</Label>
            <Input
              id="size_height"
              name="size_height"
              type="number"
              value={formData.size_height}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="size_depth">Depth</Label>
            <Input
              id="size_depth"
              name="size_depth"
              type="number"
              value={formData.size_depth}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="lamoda_sku">Lamoda SKU</Label>
          <Input
            id="lamoda_sku"
            name="lamoda_sku"
            value={formData.lamoda_sku}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="under_moderation">Under Moderation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="img_url">Image URL</Label>
          <Input
            id="img_url"
            name="img_url"
            value={formData.img_url}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Create Product
        </Button>
      </form>
    </main>
  )
}
