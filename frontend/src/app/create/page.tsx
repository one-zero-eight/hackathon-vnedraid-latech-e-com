'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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

;('use client')
export default function CreateProductPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
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
    status: ProductStatus.ACTIVE,
    img_url: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
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
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Ошибка при создании товара')
      }

      router.push('/products')
    } catch (error) {
      console.error('Error creating product:', error)
      setError(error instanceof Error ? error.message : 'Ошибка при создании товара')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImagePreview = () => {
    if (formData.img_url) {
      window.open(formData.img_url, '_blank')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
        <div className="bg-white">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl font-bold text-black sm:text-3xl">
                  Создание нового товара
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                  Заполните детали ниже для создания нового товара
                </p>
              </div>
              <button
                type="button"
                onClick={() => router.back()}
                className="w-full cursor-pointer text-center text-sm text-gray-600 hover:text-gray-900 sm:w-auto"
              >
                ← Назад к товарам
              </button>
            </div>

            {error && (
              <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-8">
                {/* Basic Information */}
                <div className="space-y-4 rounded-lg bg-gray-50 p-4 sm:space-y-6 sm:p-6">
                  <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                    Основная информация
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Название товара
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Введите название товара"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-black focus:ring-black focus:outline-none sm:text-base"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Описание
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        required
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Введите описание товара"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-black focus:ring-black focus:outline-none sm:text-base"
                      />
                    </div>

                    <div>
                      <label htmlFor="img_url" className="block text-sm font-medium text-gray-700">
                        URL изображения
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="url"
                          name="img_url"
                          id="img_url"
                          required
                          value={formData.img_url}
                          onChange={handleChange}
                          placeholder="https://example.com/image.jpg"
                          className="block w-full rounded-l-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-black focus:ring-black focus:outline-none sm:text-base"
                        />
                        <button
                          type="button"
                          onClick={handleImagePreview}
                          disabled={!formData.img_url}
                          className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-black focus:ring-1 focus:ring-black focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:px-4"
                        >
                          Предпросмотр
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing and Inventory */}
                <div className="space-y-4 rounded-lg bg-gray-50 p-4 sm:space-y-6 sm:p-6">
                  <h2 className="text-base font-semibold text-gray-900 sm:text-lg">Цена и склад</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Цена
                      </label>
                      <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="text-gray-500 sm:text-sm">₽</span>
                        </div>
                        <input
                          type="number"
                          name="price"
                          id="price"
                          required
                          min="0"
                          step="0.01"
                          value={formData.price}
                          onChange={handleChange}
                          className="block w-full rounded-md border border-gray-300 bg-white py-2 pr-3 pl-7 text-sm placeholder-gray-400 shadow-sm focus:border-black focus:ring-black focus:outline-none sm:text-base"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="discount_price"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Цена со скидкой
                      </label>
                      <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="text-gray-500 sm:text-sm">₽</span>
                        </div>
                        <input
                          type="number"
                          name="discount_price"
                          id="discount_price"
                          min="0"
                          step="0.01"
                          value={formData.discount_price}
                          onChange={handleChange}
                          className="block w-full rounded-md border border-gray-300 bg-white py-2 pr-3 pl-7 text-sm placeholder-gray-400 shadow-sm focus:border-black focus:ring-black focus:outline-none sm:text-base"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="count" className="block text-sm font-medium text-gray-700">
                        Количество на складе
                      </label>
                      <input
                        type="number"
                        name="count"
                        id="count"
                        required
                        min="0"
                        value={formData.count}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-black focus:ring-black focus:outline-none sm:text-base"
                      />
                    </div>
                  </div>
                </div>

                {/* Dimensions */}
                <div className="space-y-4 rounded-lg bg-gray-50 p-4 sm:space-y-6 sm:p-6">
                  <h2 className="text-base font-semibold text-gray-900 sm:text-lg">Размеры</h2>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="size_width"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Ширина (см)
                      </label>
                      <input
                        type="number"
                        name="size_width"
                        id="size_width"
                        required
                        min="0"
                        step="0.1"
                        value={formData.size_width}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-black focus:ring-black focus:outline-none sm:text-base"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="size_height"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Высота (см)
                      </label>
                      <input
                        type="number"
                        name="size_height"
                        id="size_height"
                        required
                        min="0"
                        step="0.1"
                        value={formData.size_height}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-black focus:ring-black focus:outline-none sm:text-base"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="size_depth"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Глубина (см)
                      </label>
                      <input
                        type="number"
                        name="size_depth"
                        id="size_depth"
                        required
                        min="0"
                        step="0.1"
                        value={formData.size_depth}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-black focus:ring-black focus:outline-none sm:text-base"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4 rounded-lg bg-gray-50 p-4 sm:space-y-6 sm:p-6">
                  <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                    Дополнительная информация
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="lamoda_sku"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Lamoda SKU
                      </label>
                      <input
                        type="text"
                        name="lamoda_sku"
                        id="lamoda_sku"
                        required
                        value={formData.lamoda_sku}
                        onChange={handleChange}
                        placeholder="Введите Lamoda SKU"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-black focus:ring-black focus:outline-none sm:text-base"
                      />
                    </div>

                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Статус
                      </label>
                      <select
                        name="status"
                        id="status"
                        required
                        value={formData.status}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-black focus:ring-black focus:outline-none sm:text-base"
                      >
                        <option value={ProductStatus.ACTIVE}>Активный</option>
                        <option value={ProductStatus.INACTIVE}>Неактивный</option>
                        <option value={ProductStatus.DRAFT}>Черновик</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-end space-y-3 border-t border-gray-200 pt-6 sm:flex-row sm:space-y-0 sm:space-x-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="w-full cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none sm:w-auto"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full cursor-pointer rounded-md border border-transparent bg-black px-4 py-2 text-white shadow-sm hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {isSubmitting ? 'Создание...' : 'Создать товар'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
