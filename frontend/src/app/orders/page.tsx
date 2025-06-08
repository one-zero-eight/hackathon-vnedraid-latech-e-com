'use client'
import { getOrders } from '@/lib/hooks/useOrders'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

type OrderStatus = 'Новый заказ' | 'В обработке' | 'В пути' | 'Доставлен' | 'Отменен'

interface Order {
  // Basic order info
  id: string
  ordererName: string
  customerId: string
  email: string
  phoneNumber: string

  // Product details
  productId: string
  productName: string
  productCategory: string
  brand: string
  size: string
  color: string
  material: string
  quantity: number
  originalPrice: number
  discountApplied?: number
  finalPrice: number
  season: string

  // Dates
  orderDate: string
  estimatedDeliveryDate: string
  actualDeliveryDate?: string

  // Delivery info
  deliveryPlace: string
  shippingMethod: string
  shippingCost: number
  trackingNumber: string
  carrier: string

  // Payment info
  paymentMethod: string
  paymentStatus: 'Paid' | 'Pending' | 'Refunded' | 'Failed'

  // Order status
  status: OrderStatus
  returnPolicy: string
  careInstructions: string

  // Additional info
  customerNotes?: string
  customerReview?: string
  reviewComment?: string
  salesChannel: string
  isGift: boolean
  giftMessage?: string
}

// Mock data for demonstration
const mockClothingOrders: Order[] = [
  {
    id: 'CLTH-001',
    ordererName: 'Екатерина Соколова',
    customerId: 'CUST-67890',
    email: 'ekaterina.s@example.com',
    phoneNumber: '+79167778899',

    productId: 'DRE-2023-BL',
    productName: 'Вечернее платье "Элегант"',
    productCategory: 'Платья',
    brand: 'Moda Bella',
    size: '42 (INT) / M',
    color: 'Синий',
    material: 'Шелк с кружевом',
    quantity: 1,
    originalPrice: 15990,
    discountApplied: 2000,
    finalPrice: 13990,
    season: 'Осень-Зима 2023',

    orderDate: '2023-11-05T10:15:00Z',
    estimatedDeliveryDate: '2023-11-12',

    deliveryPlace: 'ул. Пушкина, 15, кв. 7, Москва',
    shippingMethod: 'Стандарт',
    shippingCost: 490,
    trackingNumber: 'RU456789012',
    carrier: 'Почта России',

    paymentMethod: 'СБП',
    paymentStatus: 'Paid',

    status: 'В обработке',
    returnPolicy: '30 дней',
    careInstructions: 'Химчистка',
    customerNotes: 'Позвонить перед доставкой',

    salesChannel: 'Instagram',
    isGift: true,
    giftMessage: 'С Днем Рождения!'
  },
  {
    id: 'CLTH-002',
    ordererName: 'Дмитрий Волков',
    customerId: 'CUST-54321',
    email: 'dmitry.v@example.com',
    phoneNumber: '+79165554433',

    productId: 'JACK-2023-BK',
    productName: 'Кожаная куртка "Рокер"',
    productCategory: 'Верхняя одежда',
    brand: 'Urban Style',
    size: '50 (INT) / XL',
    color: 'Черный',
    material: 'Натуральная кожа',
    quantity: 1,
    originalPrice: 34990,
    finalPrice: 34990,
    season: 'Всесезонная',

    orderDate: '2023-11-10T18:30:00Z',
    estimatedDeliveryDate: '2023-11-15',

    deliveryPlace: 'пр. Победы, 33, кв. 124, Санкт-Петербург',
    shippingMethod: 'Экспресс',
    shippingCost: 890,
    trackingNumber: 'RU987654321',
    carrier: 'CDEK',

    paymentMethod: 'Кредитная карта',
    paymentStatus: 'Paid',

    status: 'В пути',
    returnPolicy: '14 дней',
    careInstructions: 'Протирать влажной тканью',

    salesChannel: 'Мобильное приложение',
    isGift: false
  },
  {
    id: 'CLTH-003',
    ordererName: 'Анна Козлова',
    customerId: 'CUST-98765',
    email: 'anna.k@example.com',
    phoneNumber: '+79162223344',

    productId: 'SET-2023-WH',
    productName: 'Спортивный костюм "Актив"',
    productCategory: 'Спортивная одежда',
    brand: 'SportLife',
    size: '44 (INT) / S',
    color: 'Белый',
    material: 'Хлопок с эластаном',
    quantity: 2,
    originalPrice: 7990,
    discountApplied: 1000,
    finalPrice: 6990,
    season: 'Весна-Лето 2023',

    orderDate: '2023-11-12T09:45:00Z',
    estimatedDeliveryDate: '2023-11-18',
    actualDeliveryDate: '2023-11-17T14:20:00Z',

    deliveryPlace: 'ул. Советская, 5, кв. 9, Казань',
    shippingMethod: 'Стандарт',
    shippingCost: 490,
    trackingNumber: 'RU567890123',
    carrier: 'Boxberry',

    paymentMethod: 'Яндекс.Деньги',
    paymentStatus: 'Paid',

    status: 'Доставлен',
    returnPolicy: '30 дней',
    careInstructions: 'Машинная стирка 30°C',
    customerReview: '5 звезд',
    reviewComment: 'Отличное качество, удобная посадка',

    salesChannel: 'Веб-сайт',
    isGift: false
  }
]

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const { data: orders = mockClothingOrders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      // TODO: Replace with actual API call
      return mockClothingOrders
    }
  })

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Новый заказ':
        return 'bg-blue-100 text-blue-800'
      case 'В пути':
        return 'bg-yellow-100 text-yellow-800'
      case 'Доставлен':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const { data: mock, isFetched } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders
  })

  if (isFetched) {
    console.log(mock, 22)
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
                      {order.finalPrice.toLocaleString('ru-RU')} ₽
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
                    onClick={() => setSelectedOrder(order)}
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

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div
              className="bg-opacity-75 fixed inset-0 bg-gray-500 transition-opacity"
              onClick={() => setSelectedOrder(null)}
            />

            <div className="relative w-full max-w-3xl transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
              <div className="max-h-[90vh] overflow-y-auto">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Детали заказа {selectedOrder.id}
                    </h3>
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      <span className="sr-only">Закрыть</span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-4 space-y-6">
                    {/* Основная информация */}
                    <section>
                      <h4 className="mb-3 text-lg font-medium text-gray-900">
                        Основная информация
                      </h4>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-sm text-gray-500">Статус</p>
                          <p className="font-medium">{selectedOrder.status}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Дата заказа</p>
                          <p className="font-medium">
                            {new Date(selectedOrder.orderDate).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                      </div>
                    </section>

                    {/* Информация о клиенте */}
                    <section>
                      <h4 className="mb-3 text-lg font-medium text-gray-900">
                        Информация о клиенте
                      </h4>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-sm text-gray-500">Имя</p>
                          <p className="font-medium">{selectedOrder.ordererName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{selectedOrder.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Телефон</p>
                          <p className="font-medium">{selectedOrder.phoneNumber}</p>
                        </div>
                      </div>
                    </section>

                    {/* Информация о товаре */}
                    <section>
                      <h4 className="mb-3 text-lg font-medium text-gray-900">
                        Информация о товаре
                      </h4>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-sm text-gray-500">Название</p>
                          <p className="font-medium">{selectedOrder.productName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Бренд</p>
                          <p className="font-medium">{selectedOrder.brand}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Категория</p>
                          <p className="font-medium">{selectedOrder.productCategory}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Размер</p>
                          <p className="font-medium">{selectedOrder.size}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Цвет</p>
                          <p className="font-medium">{selectedOrder.color}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Материал</p>
                          <p className="font-medium">{selectedOrder.material}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Количество</p>
                          <p className="font-medium">{selectedOrder.quantity}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Сезон</p>
                          <p className="font-medium">{selectedOrder.season}</p>
                        </div>
                      </div>
                    </section>

                    {/* Цены */}
                    <section>
                      <h4 className="mb-3 text-lg font-medium text-gray-900">Цены</h4>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-sm text-gray-500">Итоговая цена</p>
                          <p className="font-medium">
                            {selectedOrder.finalPrice.toLocaleString('ru-RU')} ₽
                          </p>
                        </div>
                        {selectedOrder.discountApplied && (
                          <div>
                            <p className="text-sm text-gray-500">Скидка</p>
                            <p className="font-medium">
                              {selectedOrder.discountApplied.toLocaleString('ru-RU')} ₽
                            </p>
                          </div>
                        )}
                      </div>
                    </section>

                    {/* Доставка */}
                    <section>
                      <h4 className="mb-3 text-lg font-medium text-gray-900">
                        Информация о доставке
                      </h4>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-sm text-gray-500">Адрес</p>
                          <p className="font-medium">{selectedOrder.deliveryPlace}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Способ доставки</p>
                          <p className="font-medium">{selectedOrder.shippingMethod}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Стоимость доставки</p>
                          <p className="font-medium">
                            {selectedOrder.shippingCost.toLocaleString('ru-RU')} ₽
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Трек-номер</p>
                          <p className="font-medium">{selectedOrder.trackingNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Перевозчик</p>
                          <p className="font-medium">{selectedOrder.carrier}</p>
                        </div>
                      </div>
                    </section>

                    {/* Дополнительная информация */}
                    <section>
                      <h4 className="mb-3 text-lg font-medium text-gray-900">
                        Дополнительная информация
                      </h4>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-sm text-gray-500">Способ оплаты</p>
                          <p className="font-medium">{selectedOrder.paymentMethod}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Статус оплаты</p>
                          <p className="font-medium">{selectedOrder.paymentStatus}</p>
                        </div>
                        {selectedOrder.customerNotes && (
                          <div>
                            <p className="text-sm text-gray-500">Примечания клиента</p>
                            <p className="font-medium">{selectedOrder.customerNotes}</p>
                          </div>
                        )}
                        {selectedOrder.isGift && selectedOrder.giftMessage && (
                          <div>
                            <p className="text-sm text-gray-500">Подарочное сообщение</p>
                            <p className="font-medium">{selectedOrder.giftMessage}</p>
                          </div>
                        )}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
