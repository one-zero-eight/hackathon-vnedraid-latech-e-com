'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formFields } from '@/lib/constants'
import { AuthFormField, UserData } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function AuthPage() {
  const [step, setStep] = useState(1)
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState<UserData>({
    username: '',
    email: '',
    name: '',
    phone_number: '',
    password: '',
    inn: '',
    card_number: '',
    bank_code: '',
    bank_name: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLogin && step === 1) {
      setStep(2)
    } else {
      // TODO: Submit formData to backend
      console.log('Final form data:', formData)
    }
  }

  const loginFields: AuthFormField[] = [
    { id: 'email', label: 'Почта', placeholder: 'Введите email', type: 'email' },
    { id: 'password', label: 'Пароль', placeholder: 'Введите пароль', type: 'password' }
  ]

  const renderFields = (fields: AuthFormField[]) =>
    fields.map(({ id, label, placeholder, type = 'text' }) => (
      <div key={id} className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Input
          id={id}
          name={id}
          type={type}
          value={(formData as any)[id]}
          onChange={handleChange}
          placeholder={placeholder}
          required
        />
      </div>
    ))

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50/50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            {isLogin ? 'Вход' : step === 1 ? 'Регистрация' : 'Финансовые данные'}
          </CardTitle>
          <CardDescription className="text-center">
            {isLogin
              ? 'Войдите в свой аккаунт'
              : step === 1
                ? 'Пожалуйста, заполните данные пользователя'
                : 'Пожалуйста, заполните финансовые данные'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {isLogin
                ? renderFields(loginFields)
                : step === 1
                  ? renderFields(formFields.user)
                  : renderFields(formFields.financial)}
            </div>

            <div className="flex items-center justify-between">
              {!isLogin && step === 2 && (
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  Назад
                </Button>
              )}
              <Button type="submit" className={cn(step === 1 ? 'w-full' : '', 'cursor-pointer')}>
                {isLogin ? 'Войти' : step === 1 ? 'Продолжить' : 'Зарегистрироваться'}
              </Button>
            </div>

            <div className="text-center text-sm">
              {isLogin ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin)
                  setStep(1)
                }}
                className="text-primary hover:text-primary/90 font-medium"
              >
                {isLogin ? 'Создать' : 'Войти'}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
