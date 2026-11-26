import { useState } from 'react'
import { Link } from 'react-router'
import FavoriteButton from './FavoriteButton'
import WatchImage from './WatchImage'

export default function WatchCard({ watch, onChange }) {
  const [expanded, setExpanded] = useState(false)
  const long = watch.description.length > 112

  return (
    <article className="relative flex flex-col overflow-hidden rounded-sm border border-line bg-white">
      <Link to={'/relojes/' + watch.id} aria-label={'Ver ficha de ' + watch.title}>
        <WatchImage src={watch.image} alt={watch.title} className="aspect-4/3 w-full bg-line object-cover" />
      </Link>
      <div className="absolute top-3 right-3"><FavoriteButton watch={watch} onChange={onChange} /></div>
      <div className="flex grow flex-col p-5">
        <p className="eyebrow text-muted">{watch.category} · {watch.movement}</p>
        <h3 className="mt-2 font-display text-4xl leading-none wrap-break-word"><Link to={'/relojes/' + watch.id}>{watch.title}</Link></h3>
        <div className="mt-3 grow text-sm leading-relaxed text-muted">
          <p>{long && !expanded ? watch.description.slice(0, 112).trimEnd() + '…' : watch.description}</p>
          {long && <button className="mt-1 font-semibold text-forest underline" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? 'Ver menos' : 'Ver más'}</button>}
        </div>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4 text-sm">
          <span>{watch.diameter} mm</span>
          <Link to={'/relojes/' + watch.id} className="font-semibold text-forest underline underline-offset-4">Ver ficha</Link>
        </div>
      </div>
    </article>
  )
}
