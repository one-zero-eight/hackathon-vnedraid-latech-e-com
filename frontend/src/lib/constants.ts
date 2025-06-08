import { AuthFormField, BrandRead, CategoryRead, Order } from './types'

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

export const mockClothingOrders: Order[] = [
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
