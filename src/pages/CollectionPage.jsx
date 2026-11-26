import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import Spinner from '../components/Spinner'
import WatchGrid from '../components/WatchGrid'
import useWatches from '../hooks/useWatches'
import { categories, movements } from '../services/watchModel'

const pageSize = 6
const normalize = (text) => text.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '')

export default function CollectionPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [movement, setMovement] = useState('')
  const [page, setPage] = useState(1)
  const text = normalize(search.trim())
  const filtered = Boolean(text || category || movement)
  const result = useWatches({ page: filtered ? undefined : page, size: pageSize })
  const matches = filtered ? (result?.data ?? []).filter((watch) =>
    normalize(watch.title).includes(text) && (!category || watch.category === category) && (!movement || watch.movement === movement)) : []
  const entries = filtered ? matches.slice((page - 1) * pageSize, page * pageSize) : result?.data?.data ?? []
  const total = filtered ? matches.length : result?.data?.items ?? 0
  const pages = filtered ? Math.ceil(total / pageSize) : result?.data?.pages ?? 0

  function changeFilter(setValue, value) {
    setValue(value)
    setPage(1)
  }

  return (
    <section className="container-page py-12">
      <title>Colección | TheVisionistLuxury</title>
      <h1 className="page-heading">La colección</h1>
      <div aria-label="Filtros del catálogo" className="my-7 grid items-end gap-4 rounded-sm border border-line bg-white p-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_auto]">
        <label className="grid gap-1.5 text-sm font-semibold">
          Buscar por nombre
          <span className="relative">
            <FiSearch aria-hidden="true" className="absolute top-3.5 left-3 text-muted" />
            <input type="search" className="field pl-9" placeholder="Ej. Meridiano" value={search} onChange={(event) => changeFilter(setSearch, event.target.value)} />
          </span>
        </label>
        <div className="grid gap-1.5 text-sm font-semibold">
          <label htmlFor="filter-category">Categoría</label>
          <select id="filter-category" className="field" value={category} onChange={(event) => changeFilter(setCategory, event.target.value)}>
            <option value="">Todas</option>
            {categories.map((value) => <option key={value}>{value}</option>)}
          </select>
        </div>
        <div className="grid gap-1.5 text-sm font-semibold">
          <label htmlFor="filter-movement">Movimiento</label>
          <select id="filter-movement" className="field" value={movement} onChange={(event) => changeFilter(setMovement, event.target.value)}>
            <option value="">Todos</option>
            {movements.map((value) => <option key={value}>{value}</option>)}
          </select>
        </div>
        <button className="button button-outline" onClick={() => { setSearch(''); setCategory(''); setMovement(''); setPage(1) }}>Limpiar filtros</button>
      </div>
      {!result ? <Spinner /> : result.error ? (
        <p role="alert" className="border border-red-200 bg-red-50 p-4 text-red-800">No pudimos cargar la colección. Comprueba que la API esté activa y recarga la página.</p>
      ) : (
        <>
          <p className="mb-4 text-sm text-muted" aria-live="polite">{total} {total === 1 ? 'reloj' : 'relojes'}</p>
          <WatchGrid watches={entries} empty={filtered ? 'Ningún reloj coincide con los filtros.' : 'Aún no hay relojes en la colección.'} />
          {pages > 1 && (
            <nav aria-label="Páginas de la colección" className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button className="button button-outline" onClick={() => setPage(page - 1)} disabled={page === 1}>Anterior</button>
              <span className="text-sm">Página {page} de {pages}</span>
              <button className="button button-outline" onClick={() => setPage(page + 1)} disabled={page >= pages}>Siguiente</button>
            </nav>
          )}
        </>
      )}
    </section>
  )
}
