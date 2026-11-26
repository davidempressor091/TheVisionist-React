import { ClipLoader } from 'react-spinners'

export default function Spinner() {
  return (
    <div role="status" className="flex items-center justify-center gap-3 py-14 text-muted">
      <ClipLoader size={24} color="#203d32" /> Cargando relojes…
    </div>
  )
}
