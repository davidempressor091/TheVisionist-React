import { NavLink } from 'react-router'
import { FiWatch } from 'react-icons/fi'

const navClass = ({ isActive }) =>
  'border-b-2 py-2 text-sm font-semibold ' + (isActive ? 'border-forest text-ink' : 'border-transparent text-muted hover:text-ink')

export default function Navbar() {
  return (
    <header className="border-b border-line bg-paper">
      <nav aria-label="Principal" className="container-page flex min-h-19 flex-wrap items-center justify-between gap-x-8 gap-y-1 py-2">
        <NavLink to="/" className="flex items-center gap-2.5 font-display text-3xl tracking-tight">
          <FiWatch aria-hidden="true" className="size-6 text-forest" />
          TheVisionistLuxury
        </NavLink>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <NavLink end to="/" className={navClass}>Inicio</NavLink>
          <NavLink to="/relojes" className={navClass}>Colección</NavLink>
          <NavLink to="/favoritos" className={navClass}>Favoritos</NavLink>
          <NavLink to="/agregar-reloj" className="button">Agregar reloj</NavLink>
        </div>
      </nav>
    </header>
  )
}
