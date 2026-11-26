import { useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import FavoriteButton from '../components/FavoriteButton'
import WatchImage from '../components/WatchImage'
import { deleteWatch } from '../services/watchesApi'

export default function WatchDetailPage() {
  const watch = useLoaderData()
  const [favoriteUpdate, setFavoriteUpdate] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const navigate = useNavigate()
  const favorite = favoriteUpdate?.id === watch.id ? favoriteUpdate.favorite : watch.favorite

  async function remove() {
    if (!window.confirm('¿Eliminar “' + watch.title + '” de la colección?')) return
    setDeleting(true)
    try {
      await deleteWatch(watch.id)
      toast.success('Reloj eliminado.')
      navigate('/relojes', { replace: true })
    } catch {
      toast.error('No se pudo eliminar el reloj.')
      setDeleting(false)
    }
  }

  return (
    <section className="container-page py-10">
      <title>{watch.title + ' | TheVisionistLuxury'}</title>
      <Link to="/relojes" className="text-sm font-semibold text-forest underline underline-offset-4">Volver al listado</Link>
      <div className="mt-6 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <WatchImage src={watch.image} alt={watch.title} eager className="aspect-square w-full rounded-sm object-cover" />
        <div className="min-w-0">
          <p className="eyebrow text-muted">{watch.category} · {watch.movement}</p>
          <div className="mt-2 flex items-start justify-between gap-4">
            <h1 className="page-heading wrap-break-word">{watch.title}</h1>
            <FavoriteButton watch={{ ...watch, favorite }} onChange={setFavoriteUpdate} />
          </div>
          <p className="mt-4 leading-relaxed whitespace-pre-wrap text-muted">{watch.description}</p>
          <dl className="my-6 grid grid-cols-2 gap-4 border-y border-line py-4">
            <div><dt className="text-sm text-muted">Diámetro</dt><dd className="text-xl font-semibold">{watch.diameter} mm</dd></div>
            <div><dt className="text-sm text-muted">Autonomía</dt><dd className="text-xl font-semibold">{watch.reserve} h</dd></div>
          </dl>
          <h2 className="font-display text-3xl">Especificaciones</h2>
          <dl className="mt-2 mb-6 divide-y divide-line">
            {watch.specifications.map((spec) => <div key={spec.id} className="grid grid-cols-2 gap-3 py-2 wrap-break-word"><dt className="text-muted">{spec.name}</dt><dd>{spec.value}</dd></div>)}
          </dl>
          <h2 className="font-display text-3xl">Cuidado de la pieza</h2>
          <ol className="mt-2 mb-6 list-decimal space-y-1 pl-6 text-muted">
            {watch.care.map((step) => <li key={step.id}>{step.text}</li>)}
          </ol>
          <div className="border-y border-line py-4">
            <h2 className="font-display text-3xl">Responsable de la ficha</h2>
            <p className="mt-2 font-semibold">{watch.author.name}</p>
            <a href={'mailto:' + watch.author.email} className="wrap-break-word text-forest underline">{watch.author.email}</a>
            {watch.author.bio && <p className="mt-1 text-muted">{watch.author.bio}</p>}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="button" to={'/editar-reloj/' + watch.id}>Editar reloj</Link>
            <button type="button" className="button button-outline text-red-800" onClick={remove} disabled={deleting}>{deleting ? 'Eliminando…' : 'Eliminar reloj'}</button>
          </div>
        </div>
      </div>
    </section>
  )
}
