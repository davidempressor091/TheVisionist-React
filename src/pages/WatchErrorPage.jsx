import { Link, isRouteErrorResponse, useRouteError } from 'react-router'

export default function WatchErrorPage() {
  const error = useRouteError()
  const missing = isRouteErrorResponse(error) && error.status === 404

  return (
    <section className="container-page py-16">
      <title>Error de ficha | TheVisionistLuxury</title>
      <h1 className="page-heading">{missing ? 'Reloj no encontrado' : 'No pudimos cargar el reloj'}</h1>
      <p className="mt-3 text-muted">{missing ? 'El reloj pudo haber sido eliminado.' : 'Comprueba que la API esté activa y vuelve a intentarlo.'}</p>
      <Link className="button mt-6" to="/relojes">Volver al listado</Link>
    </section>
  )
}
