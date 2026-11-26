import { useId } from 'react'

export default function FormField({ label, error, as = 'input', options, ...props }) {
  const id = useId()
  const Field = as
  const choices = options && [
    <option key="" value="">Selecciona una opción</option>,
    ...options.map((choice) => <option key={choice}>{choice}</option>),
  ]

  return (
    <div className="min-w-0">
      <label className="mb-1.5 block text-sm font-semibold" htmlFor={id}>{label}</label>
      <Field id={id} className="field" {...props} aria-invalid={Boolean(error)} aria-describedby={error ? id + '-error' : undefined}>
        {choices}
      </Field>
      {error && <p id={id + '-error'} className="mt-1 text-sm text-red-800">{error}</p>}
    </div>
  )
}
