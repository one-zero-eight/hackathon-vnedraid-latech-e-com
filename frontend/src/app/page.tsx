'use client'

import { DataTable } from '@/components/data-table'
import { BrandRead, CategoryRead, ProductStatus } from '@/lib/types'

const sampleBrands: BrandRead[] = [
  { id: '1', name: 'Nike', seller_id: '1' },
  { id: '2', name: 'Adidas', seller_id: '2' },
  { id: '3', name: 'Puma', seller_id: '3' },
  { id: '4', name: 'Reebok', seller_id: '4' },
  { id: '5', name: 'Fila', seller_id: '5' },
  { id: '6', name: 'New Balance', seller_id: '6' },
  { id: '7', name: 'Under Armour', seller_id: '7' },
  { id: '8', name: 'Columbia', seller_id: '8' },
  { id: '9', name: 'Lacoste', seller_id: '9' }
]

const sampleCategories: CategoryRead[] = [
  { id: '1', name: 'Одежда' },
  { id: '2', name: 'Обувь' },
  { id: '3', name: 'Аксессуары' },
  { id: '4', name: 'Верхняя одежда' },
  { id: '5', name: 'Платья' },
  { id: '6', name: 'Головные уборы' },
  { id: '7', name: 'Носки' },
  { id: '8', name: 'Ремни' },
  { id: '9', name: 'Сумки' },
  { id: '10', name: 'Шарфы' }
]

const sampleData = [
  {
    id: '1',
    img_url: 'https://via.placeholder.com/150',
    name: 'Футболка классическая',
    price: 1999,
    discount_price: 1499,
    count: 100,
    description: 'Хлопковая футболка белого цвета',
    size_width: 50,
    size_height: 70,
    size_depth: 1,
    lamoda_sku: 'LM123456',
    status: ProductStatus.ACTIVE,
    brand: sampleBrands[0],
    category: sampleCategories[0]
  },
  {
    id: '2',
    img_url: 'https://via.placeholder.com/150',
    name: 'Джинсы slim fit',
    price: 3999,
    discount_price: 3499,
    count: 75,
    description: 'Синие джинсы облегающего кроя',
    size_width: 30,
    size_height: 100,
    size_depth: 15,
    lamoda_sku: 'LM654321',
    status: ProductStatus.ACTIVE,
    brand: sampleBrands[1],
    category: sampleCategories[1]
  },
  {
    id: '3',
    img_url: 'https://via.placeholder.com/150',
    name: 'Кроссовки спортивные',
    price: 5999,
    discount_price: 5999,
    count: 50,
    description: 'Удобные кроссовки для бега',
    size_width: 25,
    size_height: 15,
    size_depth: 35,
    lamoda_sku: 'LM789012',
    status: ProductStatus.ACTIVE,
    brand: sampleBrands[2],
    category: sampleCategories[2]
  },
  {
    id: '4',
    img_url: 'https://via.placeholder.com/150',
    name: 'Рубашка офисная',
    price: 2999,
    discount_price: 2499,
    count: 60,
    description: 'Голубая рубашка с длинным рукавом',
    size_width: 40,
    size_height: 80,
    size_depth: 2,
    lamoda_sku: 'LM345678',
    status: ProductStatus.ACTIVE,
    brand: sampleBrands[0],
    category: sampleCategories[0]
  },
  {
    id: '5',
    img_url: 'https://via.placeholder.com/150',
    name: 'Куртка зимняя',
    price: 8999,
    discount_price: 7999,
    count: 30,
    description: 'Теплая куртка на синтепоне',
    size_width: 55,
    size_height: 65,
    size_depth: 25,
    lamoda_sku: 'LM901234',
    status: ProductStatus.ACTIVE,
    brand: sampleBrands[3],
    category: sampleCategories[3]
  },
  {
    id: '6',
    img_url: 'https://via.placeholder.com/150',
    name: 'Шорты летние',
    price: 1499,
    discount_price: 1299,
    count: 120,
    description: 'Хлопковые шорты для пляжа',
    size_width: 35,
    size_height: 25,
    size_depth: 10,
    lamoda_sku: 'LM567890',
    status: ProductStatus.ACTIVE,
    brand: sampleBrands[1],
    category: sampleCategories[0]
  },
  {
    id: '7',
    img_url: 'https://via.placeholder.com/150',
    name: 'Платье вечернее',
    price: 4999,
    discount_price: 4999,
    count: 25,
    description: 'Элегантное черное платье',
    size_width: 45,
    size_height: 90,
    size_depth: 5,
    lamoda_sku: 'LM234567',
    status: ProductStatus.ACTIVE,
    brand: sampleBrands[4],
    category: sampleCategories[4]
  },
  {
    id: '8',
    img_url: 'https://via.placeholder.com/150',
    name: 'Свитшот oversize',
    price: 3499,
    discount_price: 2999,
    count: 45,
    description: 'Свитшот свободного кроя',
    size_width: 60,
    size_height: 65,
    size_depth: 8,
    lamoda_sku: 'LM890123',
    status: ProductStatus.ACTIVE,
    brand: sampleBrands[0],
    category: sampleCategories[0]
  },
  {
    id: '9',
    img_url: 'https://via.placeholder.com/150',
    name: 'Брюки классические',
    price: 3799,
    discount_price: 3299,
    count: 40,
    description: 'Черные брюки для офиса',
    size_width: 35,
    size_height: 95,
    size_depth: 20,
    lamoda_sku: 'LM456789',
    status: ProductStatus.ACTIVE,
    brand: sampleBrands[1],
    category: sampleCategories[1]
  },
  {
    id: '10',
    img_url: 'https://via.placeholder.com/150',
    name: 'Кепка бейсболка',
    price: 999,
    discount_price: 799,
    count: 150,
    description: 'Кепка с регулируемой застежкой',
    size_width: 25,
    size_height: 15,
    size_depth: 25,
    lamoda_sku: 'LM012345',
    status: ProductStatus.ACTIVE,
    brand: sampleBrands[5],
    category: sampleCategories[5]
  },
  {
    id: '11',
    img_url: 'https://via.placeholder.com/150',
    name: 'Носки спортивные',
    price: 499,
    discount_price: 399,
    count: 200,
    description: 'Набор из 3 пар носков',
    size_width: 10,
    size_height: 5,
    size_depth: 5,
    lamoda_sku: 'LM678901',
    status: ProductStatus.ACTIVE,
    brand: sampleBrands[2],
    category: sampleCategories[6]
  },
  {
    id: '12',
    img_url: 'https://via.placeholder.com/150',
    name: 'Ремень кожаный',
    price: 1299,
    discount_price: 1099,
    count: 80,
    description: 'Коричневый кожаный ремень',
    size_width: 100,
    size_height: 3,
    size_depth: 3,
    lamoda_sku: 'LM345012',
    status: ProductStatus.ACTIVE,
    brand: sampleBrands[6],
    category: sampleCategories[7]
  },
  {
    id: '13',
    img_url: 'https://via.placeholder.com/150',
    name: 'Пальто демисезонное',
    price: 6999,
    discount_price: 6499,
    count: 20,
    description: 'Бежевое пальто с поясом',
    size_width: 50,
    size_height: 110,
    size_depth: 30,
    lamoda_sku: 'LM901567',
    status: ProductStatus.ACTIVE,
    brand: sampleBrands[3],
    category: sampleCategories[3]
  },
  {
    id: '14',
    img_url: 'https://via.placeholder.com/150',
    name: 'Футболка поло',
    price: 2499,
    discount_price: 1999,
    count: 90,
    description: 'Футболка с воротником',
    size_width: 45,
    size_height: 65,
    size_depth: 2,
    lamoda_sku: 'LM234890',
    status: ProductStatus.ACTIVE,
    brand: sampleBrands[0],
    category: sampleCategories[0]
  },
  {
    id: '15',
    img_url: 'https://via.placeholder.com/150',
    name: 'Сумка городская',
    price: 4599,
    discount_price: 4599,
    count: 35,
    description: 'Кожаная сумка через плечо',
    size_width: 30,
    size_height: 40,
    size_depth: 15,
    lamoda_sku: 'LM567123',
    status: ProductStatus.ACTIVE,
    brand: sampleBrands[7],
    category: sampleCategories[8]
  },
  {
    id: '16',
    img_url: 'https://via.placeholder.com/150',
    name: 'Шарф шерстяной',
    price: 1299,
    discount_price: 999,
    count: 110,
    description: 'Теплый шарф в клетку',
    size_width: 180,
    size_height: 30,
    size_depth: 1,
    lamoda_sku: 'LM890456',
    status: ProductStatus.ACTIVE,
    brand: sampleBrands[8],
    category: sampleCategories[9]
  },
  {
    id: '17',
    img_url: 'https://via.placeholder.com/150',
    name: 'Леггинсы спортивные',
    price: 1799,
    discount_price: 1499,
    count: 65,
    description: 'Черные леггинсы для фитнеса',
    size_width: 25,
    size_height: 90,
    size_depth: 5,
    lamoda_sku: 'LM123789',
    status: ProductStatus.ACTIVE,
    brand: sampleBrands[4],
    category: sampleCategories[1]
  },
  {
    id: '18',
    img_url: 'https://via.placeholder.com/150',
    name: 'Толстовка с капюшоном',
    price: 4299,
    discount_price: 3799,
    count: 55,
    description: 'Толстовка на флисе',
    size_width: 55,
    size_height: 65,
    size_depth: 10,
    lamoda_sku: 'LM456012',
    status: ProductStatus.ACTIVE,
    brand: sampleBrands[0],
    category: sampleCategories[0]
  },
  {
    id: '19',
    img_url: 'https://via.placeholder.com/150',
    name: 'Костюм спортивный',
    price: 5999,
    discount_price: 5499,
    count: 30,
    description: 'Костюм для тренировок',
    size_width: 50,
    size_height: 100,
    size_depth: 15,
    lamoda_sku: 'LM789345',
    status: ProductStatus.ACTIVE,
    brand: sampleBrands[2],
    category: sampleCategories[2]
  },
  {
    id: '20',
    img_url: 'https://via.placeholder.com/150',
    name: 'Юбка карандаш',
    price: 3299,
    discount_price: 2899,
    count: 40,
    description: 'Юбка до колена серого цвета',
    size_width: 35,
    size_height: 60,
    size_depth: 10,
    lamoda_sku: 'LM012678',
    status: ProductStatus.ACTIVE,
    brand: sampleBrands[4],
    category: sampleCategories[4]
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

      <DataTable data={sampleData} onEdit={handleEdit} onDelete={handleDelete} />
    </main>
  )
}
