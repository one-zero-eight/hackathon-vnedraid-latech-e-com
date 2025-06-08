export interface UserData {
  // User data
  username: string
  email: string
  name: string
  phone_number: string
  password: string
  // Financial data
  inn: string
  card_number: string
  bank_code: string
  bank_name: string
}

export interface AuthFormField {
  id: string
  label: string
  placeholder: string
  type?: string
}

export type ProductStatus = 'active' | 'inactive' | 'under_moderation'

export interface BrandRead {
  id: number
  name: string
  seller_id: number
}

export interface CategoryRead {
  id: number
  name: string
}

export interface Product {
  id: number
  name: string
  price: number
  discount_price: number
  img_url: string
  count: number
  description: string
  size_width: number
  size_height: number
  size_depth: number
  lamoda_sku: string
  status: ProductStatus
  brand: BrandRead
  category: CategoryRead

  // not implemented
  // comments: CommentRead[]
  // items_in: ItemInRead[]
  // items_out: ItemOutRead[]
}

export interface ProductUpdate {
  name?: string
  price?: number
  discount_price?: number
  img_url?: string
  count?: number
  description?: string
  size_width?: number
  size_height?: number
  size_depth?: number
  lamoda_sku?: string
  status?: ProductStatus
  brand_id?: number
  category_id?: number
}
