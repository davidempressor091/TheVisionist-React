import Spinner from '../components/Spinner'
import WatchGrid from '../components/WatchGrid'
import useWatches from '../hooks/useWatches'

export default function FavoritesPage() {
  const result = useWatches({ favorite: true })

  return (
    <section className="container-page py-12">
      <title>Favoritos | TheVisionistLuxury</title>
      <h1 className="page-heading mb-7">Relojes favoritos</h1>
      {!result ? <Spinner /> : result.error
        ? <p role="alert" className="text-red-800">No pudimos cargar tus favoritos. Comprueba que la API esté activa.</p>
        : <WatchGrid watches={result.data} onlyFavorites empty="Todavía no hay favoritos. Marca un reloj con el corazón para encontrarlo aquí." />}
    </section>
  )
}
