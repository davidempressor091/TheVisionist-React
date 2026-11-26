import { Link } from 'react-router'
import Card from '../components/Card'
import Hero from '../components/Hero'
import Spinner from '../components/Spinner'
import WatchGrid from '../components/WatchGrid'
import useWatches from '../hooks/useWatches'

export default function HomePage() {
  const recent = useWatches({ page: 1, size: 3 })

  return (
    <>
      <title>TheVisionistLuxury | Catálogo de relojería</title>
      <Hero />
      <div className="container-page space-y-12 pt-10">
        <section aria-label="Explora o aporta a la colección" className="grid gap-5 sm:grid-cols-2">
          <Card>
            <h2 className="font-display text-4xl">Explora por estilo</h2>
            <p className="mt-2 mb-5 grow text-muted">Encuentra una pieza por su categoría o tipo de movimiento.</p>
            <Link to="/relojes" className="button button-outline">Ver catálogo</Link>
          </Card>
          <Card tone="green">
            <h2 className="font-display text-4xl">Registra una pieza</h2>
            <p className="mt-2 mb-5 grow text-white/80">Agrega fotografías, medidas y detalles de cuidado a la colección.</p>
            <Link to="/agregar-reloj" className="button button-gold">Agregar reloj</Link>
          </Card>
        </section>
        <section aria-labelledby="recientes">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <h2 id="recientes" className="font-display text-5xl">Últimas incorporaciones</h2>
            <Link to="/relojes" className="button button-outline">Ver todos</Link>
          </div>
          {!recent ? <Spinner /> : recent.error
            ? <p role="alert" className="text-red-800">No pudimos cargar los relojes recientes. Comprueba que la API esté activa.</p>
            : <WatchGrid watches={recent.data.data} empty="El catálogo aún está vacío." />}
        </section>
      </div>
    </>
  )
}
