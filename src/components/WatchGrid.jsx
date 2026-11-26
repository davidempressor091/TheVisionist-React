import { useState } from 'react'
import WatchCard from './WatchCard'

export default function WatchGrid({ watches, onlyFavorites = false, empty = 'No hay relojes que coincidan.' }) {
  const [updates, setUpdates] = useState({})
  const entries = watches.map((watch) => updates[watch.id] ?? watch)
    .filter((watch) => !onlyFavorites || watch.favorite)

  if (!entries.length) return <p role="status" className="rounded-sm border border-line bg-white px-5 py-9 text-muted">{empty}</p>

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map((watch) => (
        <WatchCard key={watch.id} watch={watch} onChange={(updated) => setUpdates((previous) => ({ ...previous, [updated.id]: updated }))} />
      ))}
    </div>
  )
}
