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
    { id: 'bank_name', label: 'Название банка', placeholder: 'Введите название банка' }
  ]
}
