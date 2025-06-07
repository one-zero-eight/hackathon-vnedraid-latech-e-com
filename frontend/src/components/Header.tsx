import { Menu, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import logo from '../../public/assets/logo.svg'

const actions = [
  {
    label: 'Заказы',
    href: '#'
  },
  {
    label: 'Товары',
    href: '/'
  },
  {
    label: 'Аналитика',
    href: '/analytics'
  }
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="relative flex w-full flex-row items-center justify-between rounded-b-3xl border-b border-gray-100 px-4 py-8 shadow-md md:justify-around">
      <div className="flex flex-row items-center gap-4 md:gap-16">
        <Image src={logo} alt="logo" className="h-auto" />
        <div className="hidden flex-row items-center justify-around gap-1 md:flex md:gap-6">
          {actions.map((a) => (
            <Link
              key={a.label}
              href={a.href}
              className="button-hover rounded-2xl px-2 py-1 text-base transition-colors duration-300 hover:bg-gray-400/50 md:px-4 md:py-2 md:text-lg"
            >
              {a.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-row items-center">
        <Link
          key={'profile'}
          href={'/profile'}
          className="button-hover hidden cursor-pointer rounded-full p-2 md:block"
        >
          <User size={30} className="rounded-full" />
        </Link>
        <button
          className="block rounded-full p-2 transition-colors duration-300 hover:bg-gray-200 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Открыть меню"
        >
          <Menu size={32} />
        </button>
      </div>
      {menuOpen && (
        <div className="animate-fade-in absolute top-full left-0 z-50 flex w-full flex-col items-stretch bg-white shadow-md md:hidden">
          {actions.map((a) => (
            <Link
              key={a.label}
              href={a.href}
              className="border-b border-gray-100 px-6 py-4 text-lg transition-colors duration-200 hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              {a.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
