import { useLoaderData } from 'react-router'
import WatchForm from '../components/WatchForm'

export default function EditWatchPage() {
  const watch = useLoaderData()

  return (
    <section className="container-page py-12">
      <title>{'Editar ' + watch.title + ' | TheVisionistLuxury'}</title>
      <h1 className="page-heading mb-7">Editar reloj</h1>
      <WatchForm key={watch.id} watch={watch} />
    </section>
  )
}
