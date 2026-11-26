import { useOptimistic, useTransition } from 'react'
import { FiHeart } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { setFavorite } from '../services/watchesApi'

export default function FavoriteButton({ watch, onChange }) {
  const [favorite, showFavorite] = useOptimistic(watch.favorite)
  const [pending, startTransition] = useTransition()
  const label = (favorite ? 'Quitar de favoritos: ' : 'Marcar como favorito: ') + watch.title

  function toggle() {
    startTransition(async () => {
      showFavorite(!favorite)
      try {
        const updated = await setFavorite(watch.id, !favorite)
        onChange(updated)
      } catch {
        toast.error('No se pudo actualizar el favorito.')
      }
    })
  }

  return (
    <button type="button" className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-paper text-forest hover:bg-white disabled:opacity-70"
      aria-label={label} aria-pressed={favorite} title={label} disabled={pending} onClick={toggle}>
      <FiHeart size={19} className={favorite ? 'fill-forest' : ''} aria-hidden="true" />
    </button>
  )
}
