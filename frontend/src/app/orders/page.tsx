'use client'
import { useQuery } from '@tanstack/react-query'

type OrderStatus = 'Новый заказ' | 'В доставке' | 'Доставлен'

interface Order {
  id: string
  ordererName: string
  productName: string
  price: number
  deliveryPlace: string
  status: OrderStatus
}

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    ordererName: 'Иван Петров',
    productName: 'Смартфон iPhone 15 Pro',
    price: 129990,
    deliveryPlace: 'ул. Ленина, 10, кв. 5, Москва',
    status: 'Новый заказ'
  },
  {
    id: 'ORD-002',
    ordererName: 'Мария Иванова',
    productName: 'Ноутбук MacBook Air',
    price: 149990,
    deliveryPlace: 'пр. Мира, 25, кв. 12, Санкт-Петербург',
    status: 'В доставке'
  },
  {
    id: 'ORD-003',
    ordererName: 'Алексей Смирнов',
    productName: 'Наушники AirPods Pro',
    price: 24990,
    deliveryPlace: 'ул. Гагарина, 7, кв. 3, Казань',
    status: 'Доставлен'
  }
]

export default function OrdersPage() {
  const { data: orders = mockOrders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      // TODO: Replace with actual API call
      return mockOrders
    }
  })

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Новый заказ':
        return 'bg-blue-100 text-blue-800'
      case 'В доставке':
        return 'bg-yellow-100 text-yellow-800'
      case 'Доставлен':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-black"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Список заказов</h1>
          <p className="mt-2 text-sm text-gray-600">Управление всеми заказами</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="overflow-hidden rounded-lg bg-white shadow transition-all hover:shadow-lg"
            >
              <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Заказчик</dt>
                    <dd className="mt-1 text-sm text-gray-900">{order.ordererName}</dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Товар</dt>
                    <dd className="mt-1 text-sm text-gray-900">{order.productName}</dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Цена</dt>
                    <dd className="mt-1 text-sm font-semibold text-gray-900">
                      {order.price.toLocaleString('ru-RU')} ₽
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Адрес доставки</dt>
                    <dd className="mt-1 text-sm text-gray-900">{order.deliveryPlace}</dd>
                  </div>
                </dl>

                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none"
                  >
                    Подробнее
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
