import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <section className="container-page py-16">
      <title>Página no encontrada | TheVisionistLuxury</title>
      <h1 className="page-heading">Página no encontrada</h1>
      <p className="mt-3 text-muted">La dirección que abriste no corresponde a una página del catálogo.</p>
      <Link className="button mt-6" to="/">Volver al inicio</Link>
    </section>
  )
}
