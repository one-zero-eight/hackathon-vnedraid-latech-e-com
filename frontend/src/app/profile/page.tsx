'use client'
import { removeToken } from '@/lib/auth'
import { getMe } from '@/lib/hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()
  const { data: user, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    staleTime: 60 * 60 * 1000
  })

  const handleLogout = () => {
    removeToken()
    router.push('/login')
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl text-red-500">User not found</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-6 py-8">
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Profile Information</h1>
              <button
                onClick={handleLogout}
                className="rounded-md bg-red-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-700"
              >
                Logout
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h2 className="text-sm font-medium text-gray-500">Username</h2>
                  <p className="mt-1 text-lg text-gray-900">{user.username}</p>
                </div>

                <div>
                  <h2 className="text-sm font-medium text-gray-500">Full Name</h2>
                  <p className="mt-1 text-lg text-gray-900">{user.name}</p>
                </div>

                <div>
                  <h2 className="text-sm font-medium text-gray-500">Email</h2>
                  <p className="mt-1 text-lg text-gray-900">{user.email}</p>
                </div>

                <div>
                  <h2 className="text-sm font-medium text-gray-500">Phone Number</h2>
                  <p className="mt-1 text-lg text-gray-900">{user.phone_number}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h2 className="text-sm font-medium text-gray-500">INN</h2>
                  <p className="mt-1 text-lg text-gray-900">{user.inn}</p>
                </div>

                <div>
                  <h2 className="text-sm font-medium text-gray-500">Bank Name</h2>
                  <p className="mt-1 text-lg text-gray-900">{user.bank_name}</p>
                </div>

                <div>
                  <h2 className="text-sm font-medium text-gray-500">Bank Code</h2>
                  <p className="mt-1 text-lg text-gray-900">{user.bank_code}</p>
                </div>

                <div>
                  <h2 className="text-sm font-medium text-gray-500">Card Number</h2>
                  <p className="mt-1 text-lg text-gray-900">{user.card_number}</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <h2 className="mr-2 text-sm font-medium text-gray-500">Account Status:</h2>
                <span
                  className={`rounded-full px-2 py-1 text-sm ${
                    user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {user.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
