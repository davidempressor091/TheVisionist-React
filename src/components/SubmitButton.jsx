import { useFormStatus } from 'react-dom'

export default function SubmitButton({ editing, disabled }) {
  const { pending } = useFormStatus()
  return <button type="submit" className="button" disabled={pending || disabled}>{pending ? 'Guardando…' : editing ? 'Guardar cambios' : 'Publicar reloj'}</button>
}
