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

export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DRAFT = 'DRAFT'
}

export interface BrandRead {
  id: string
  name: string
  seller_id: string
}

export interface CategoryRead {
  id: string
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
