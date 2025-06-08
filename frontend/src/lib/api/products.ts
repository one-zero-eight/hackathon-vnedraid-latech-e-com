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
  updateProduct: async (productId: number, data: ProductUpdate): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      throw new Error('Failed to update product')
    }
    return response.json()
  },

  // Update multiple products in batch
  updateProductsBatch: async (
    updates: Array<{ id: number; data: ProductUpdate }>
  ): Promise<Product[]> => {
    const promises = updates.map(({ id, data }) =>
      fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((res) => {
        if (!res.ok) throw new Error(`Failed to update product ${id}`)
        return res.json()
      })
    )

    return Promise.all(promises)
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
