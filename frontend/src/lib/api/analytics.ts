type CategoriesData = Record<string, number>
export async function fetchCategories(userId: string): Promise<CategoriesData> {
  console.log(userId)
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URLP}/categories_with_count/30`, {
    method: 'GET',
    headers: {
      'X-User-Id': userId
    }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch categories')
  }

  return res.json()
}
