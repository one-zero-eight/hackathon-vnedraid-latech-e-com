import { AuthFormField, BrandRead, CategoryRead, Product, ProductStatus } from './types'

export const formFields = {
  user: [
    { id: 'username', label: 'Системный логин', placeholder: 'Введите логин' },
    { id: 'name', label: 'Имя', placeholder: 'Введите имя' },
    { id: 'email', label: 'Почта', placeholder: 'Введите email', type: 'email' },
    {
      id: 'phone_number',
      label: 'Номер телефона',
      placeholder: 'Введите номер телефона',
      type: 'tel'
    },
    { id: 'password', label: 'Пароль', placeholder: 'Введите пароль', type: 'password' }
  ],
  financial: [
    { id: 'inn', label: 'ИНН', placeholder: 'Введите ИНН' },
    { id: 'card_number', label: 'Номер карты', placeholder: 'Введите номер карты' },
    { id: 'bank_code', label: 'БИК', placeholder: 'Введите БИК' },
    { id: 'bank_name', label: 'Название банка', placeholder: 'Название банка не найдено' }
  ]
}

export const numericFields = ['inn', 'card_number', 'bank_code']
export const loginFields: AuthFormField[] = [
  { id: 'email', label: 'Почта', placeholder: 'Введите email', type: 'email' },
  { id: 'password', label: 'Пароль', placeholder: 'Введите пароль', type: 'password' }
]

export const sampleBrands: BrandRead[] = [
  {
    id: 1,
    name: 'Brand 1',
    seller_id: 1
  },
  {
    id: 2,
    name: 'Brand 2',
    seller_id: 1
  }
]

export const sampleCategories: CategoryRead[] = [
  {
    id: 1,
    name: 'Category 1'
  },
  {
    id: 2,
    name: 'Category 2'
  }
]

export const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'Product 1',
    price: 100,
    discount_price: 90,
    img_url: 'https://example.com/image1.jpg',
    count: 10,
    description: 'Description 1',
    size_width: 1,
    size_height: 1,
    size_depth: 1,
    lamoda_sku: 'LM123456',
    status: 'active',
    brand: sampleBrands[0],
    category: sampleCategories[0]
  },
  {
    id: 2,
    name: 'Product 2',
    price: 200,
    discount_price: 180,
    img_url: 'https://example.com/image2.jpg',
    count: 20,
    description: 'Description 2',
    size_width: 2,
    size_height: 2,
    size_depth: 2,
    lamoda_sku: 'LM789012',
    status: 'inactive',
    brand: sampleBrands[1],
    category: sampleCategories[1]
  }
]
