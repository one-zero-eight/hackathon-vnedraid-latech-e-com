'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setToken } from '@/lib/auth'
import { formFields, loginFields, numericFields } from '@/lib/constants'
import { useLogin, useRegister } from '@/lib/hooks/useAuth'
import { AuthFormField, UserData } from '@/lib/types'
import { cn } from '@/lib/utils'
import { validateField } from '@/lib/validate'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function AuthPage() {
  const [step, setStep] = useState(1)
  const [isLogin, setIsLogin] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})
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

  const router = useRouter()
  const { mutate: loginMutate } = useLogin()
  const { mutate: registerMutate } = useRegister()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNumericInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      'Backspace',
      'Tab',
      'Enter',
      'ArrowLeft',
      'ArrowRight',
      'Delete',
      'Home',
      'End'
    ]

    const isShortcut =
      (e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x', 'r'].includes(e.key.toLowerCase())

    const isDigit = /^[0-9]$/.test(e.key)

    if (allowedKeys.includes(e.key) || isShortcut || isDigit) return

    e.preventDefault()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const currentFields = isLogin
      ? loginFields
      : step === 1
        ? formFields.user
        : formFields.financial

    const newErrors: Record<string, string> = {}
    currentFields.forEach(({ id }) => {
      const error = validateField(id, formData[id as keyof UserData])
      if (error) newErrors[id] = error
    })

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    if (!isLogin && step === 1) {
      setStep(2)
      return
    }

    const onSuccess = (data: any) => {
      const { access_token, refresh_token } = data
      setToken(access_token, refresh_token)
      router.push('/')
    }

    const onError = (error: any) => {
      toast.error(error.message)
    }

    if (isLogin) {
      loginMutate({ login: formData.email, password: formData.password }, { onSuccess, onError })
    } else {
      registerMutate(formData, {
        onSuccess(data) {
          toast.success('Регистрация прошла успешно, ждите подтверждения')
        },
        onError
      })
    }
  }

  const renderFields = (fields: AuthFormField[]) =>
    fields.map(({ id, label, placeholder, type = 'text' }) => (
      <div key={id} className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Input
          id={id}
          name={id}
          type={numericFields.includes(id) ? 'text' : type}
          value={formData[id as keyof UserData]}
          onChange={handleChange}
          placeholder={placeholder}
          required
          pattern={numericFields.includes(id) ? '[0-9]*' : undefined}
          onKeyDown={numericFields.includes(id) ? handleNumericInput : undefined}
        />
        {errors[id] && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors[id]}
          </p>
        )}
      </div>
    ))

  const title = isLogin ? 'Вход' : step === 1 ? 'Регистрация' : 'Финансовые данные'

  const description = isLogin
    ? 'Войдите в свой аккаунт'
    : step === 1
      ? 'Пожалуйста, заполните данные пользователя'
      : 'Пожалуйста, заполните финансовые данные'

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50/50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">{title}</CardTitle>
          <CardDescription className="text-center">{description}</CardDescription>
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
                <span className="cursor-pointer text-blue-400">
                  {isLogin ? 'Создать' : 'Войти'}
                </span>
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
