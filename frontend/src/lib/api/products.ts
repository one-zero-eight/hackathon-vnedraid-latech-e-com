import { Product, ProductUpdate } from '@/lib/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URLP

export const productApi = {
  // Get all products
  getProducts: async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/products/`)
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    return response.json()
  },

  // Update a single product
  updateProduct: async (data: ProductUpdate): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error('Failed to update product')
    return response.json()
  },

  // Update multiple products in batch (use /products/batch)
  updateProductsBatch: async (updates: Array<ProductUpdate>): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/products/batch`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    })
    if (!response.ok) throw new Error('Failed to update products batch')
    return response.json()
  },

  // Delete a product
  deleteProduct: async (productId: number): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw new Error('Failed to delete product')
    }
    return response.json()
  }
}
