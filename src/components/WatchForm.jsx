import { useActionState, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { FiPlus, FiTrash2 } from 'react-icons/fi'
import { categories, movements } from '../services/watchModel'
import { createWatch, replaceWatch } from '../services/watchesApi'
import { initialForm, newCareStep, newSpecification, readWatchPhoto, validateWatch, watchPayload } from '../services/watchForm'
import FormField from './FormField'
import SubmitButton from './SubmitButton'
import WatchImage from './WatchImage'

export default function WatchForm({ watch }) {
  const [form, setForm] = useState(() => initialForm(watch))
  const [photoError, setPhotoError] = useState('')
  const [processingPhoto, setProcessingPhoto] = useState(false)
  const navigate = useNavigate()
  const cancel = watch ? '/relojes/' + watch.id : '/relojes'
  const uploaded = form.image.startsWith('data:image/')

  function change(field, value) {
    setForm((previous) => ({ ...previous, [field]: value }))
  }

  function changeAuthor(field, value) {
    setForm((previous) => ({ ...previous, author: { ...previous.author, [field]: value } }))
  }

  function changeRows(group, update) {
    setForm((previous) => ({ ...previous, [group]: update(previous[group]) }))
  }

  function editRow(group, id, field, value) {
    changeRows(group, (rows) => rows.map((row) => row.id === id ? { ...row, [field]: value } : row))
  }

  async function choosePhoto(event) {
    const file = event.target.files[0]
    event.target.value = ''
    if (!file) return
    setPhotoError('')
    setProcessingPhoto(true)
    try {
      change('image', await readWatchPhoto(file))
    } catch (error) {
      setPhotoError(error.message)
    } finally {
      setProcessingPhoto(false)
    }
  }

  async function save() {
    if (processingPhoto) return { general: 'Espera a que termine de procesarse la imagen.' }
    const errors = validateWatch(form, categories, movements)
    if (Object.keys(errors).length) return errors

    try {
      const payload = watchPayload(form)
      const saved = watch
        ? await replaceWatch(watch.id, { ...watch, ...payload })
        : await createWatch({ ...payload, favorite: false, createdAt: new Date().toISOString() })
      toast.success(watch ? 'Cambios guardados.' : 'Reloj agregado a la colección.')
      navigate('/relojes/' + saved.id)
      return {}
    } catch {
      return { general: 'No pudimos guardar el reloj. Comprueba que la API esté activa e inténtalo de nuevo.' }
    }
  }

  const [errors, action, pending] = useActionState(save, {})
  const fieldProps = (name) => ({ value: form[name], error: errors[name], onChange: (event) => change(name, event.target.value) })

  return (
    <form action={action} noValidate className="max-w-4xl space-y-5">
      {(errors.general || Object.keys(errors).length > 0) && <p role="alert" className="rounded-sm border border-red-200 bg-red-50 p-4 text-red-800">{errors.general || 'Revisa los campos indicados antes de guardar.'}</p>}
      <fieldset disabled={pending} className="grid gap-7 rounded-sm border border-line bg-white p-5 sm:p-7">
        <div>
          <h2 className="font-display text-3xl">Datos del reloj</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2"><FormField label="Nombre del reloj" maxLength={100} {...fieldProps('title')} /></div>
            <FormField label="Categoría" as="select" options={categories} {...fieldProps('category')} />
            <FormField label="Movimiento" as="select" options={movements} {...fieldProps('movement')} />
            <FormField label="Diámetro (mm)" type="number" min="1" max="100" {...fieldProps('diameter')} />
            <FormField label="Autonomía (horas)" type="number" min="1" max="99999" {...fieldProps('reserve')} />
            <div className="sm:col-span-2"><FormField label="Descripción" as="textarea" rows={4} maxLength={2500} {...fieldProps('description')} /></div>
          </div>
        </div>
        <div className="border-t border-line pt-5">
          <h2 className="font-display text-3xl">Fotografía</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <label className="grid gap-1.5 text-sm font-semibold">
                Subir foto (JPG, PNG o WebP)
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={choosePhoto} disabled={processingPhoto} className="field file:mr-2 file:font-semibold file:text-forest" />
              </label>
              {processingPhoto && <p role="status">Procesando fotografía…</p>}
              {photoError && <p role="alert" className="text-sm text-red-800">{photoError}</p>}
              <FormField label="O pega la URL de la foto" placeholder="https://…" value={uploaded ? '' : form.image} error={errors.image} disabled={processingPhoto}
                onChange={(event) => { setPhotoError(''); change('image', event.target.value) }} />
              {form.image && <button type="button" className="button button-outline" disabled={processingPhoto} onClick={() => { setPhotoError(''); change('image', '') }}>Quitar foto</button>}
            </div>
            {form.image && <WatchImage src={form.image.trim()} alt="Vista previa de la foto del reloj" className="aspect-4/3 max-h-52 w-full rounded-sm object-cover" />}
          </div>
        </div>
        <div className="border-t border-line pt-5">
          <h2 className="font-display text-3xl">Especificaciones</h2>
          {errors.specifications && <p className="text-sm text-red-800">{errors.specifications}</p>}
          {form.specifications.map(({ id, name, value }, index) => (
            <div key={id} className="mt-3 grid grid-cols-[1fr_auto] items-end gap-2 sm:grid-cols-[1fr_1fr_auto]">
              <div className="col-span-2 sm:col-span-1"><FormField label={'Especificación ' + (index + 1)} value={name} maxLength={100} error={errors['name-' + id]} onChange={(event) => editRow('specifications', id, 'name', event.target.value)} /></div>
              <FormField label={'Valor ' + (index + 1)} value={value} maxLength={150} error={errors['value-' + id]} onChange={(event) => editRow('specifications', id, 'value', event.target.value)} />
              <button type="button" className="button button-outline px-3.5" aria-label={'Quitar especificación ' + (index + 1)} onClick={() => changeRows('specifications', (rows) => rows.filter((row) => row.id !== id))}><FiTrash2 aria-hidden="true" /></button>
            </div>
          ))}
          <button type="button" className="button button-outline mt-4 gap-2" onClick={() => changeRows('specifications', (rows) => [...rows, newSpecification()])}><FiPlus aria-hidden="true" /> Agregar especificación</button>
        </div>
        <div className="border-t border-line pt-5">
          <h2 className="font-display text-3xl">Cuidado de la pieza</h2>
          {errors.care && <p className="text-sm text-red-800">{errors.care}</p>}
          {form.care.map(({ id, text }, index) => (
            <div key={id} className="mt-3 grid grid-cols-[1fr_auto] items-end gap-2">
              <FormField label={'Paso ' + (index + 1)} value={text} maxLength={350} error={errors['care-' + id]} onChange={(event) => editRow('care', id, 'text', event.target.value)} />
              <button type="button" className="button button-outline px-3.5" aria-label={'Quitar paso ' + (index + 1)} onClick={() => changeRows('care', (rows) => rows.filter((row) => row.id !== id))}><FiTrash2 aria-hidden="true" /></button>
            </div>
          ))}
          <button type="button" className="button button-outline mt-4 gap-2" onClick={() => changeRows('care', (rows) => [...rows, newCareStep()])}><FiPlus aria-hidden="true" /> Agregar paso</button>
        </div>
        <div className="border-t border-line pt-5">
          <h2 className="font-display text-3xl">Responsable de la ficha</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <FormField label="Nombre del responsable" value={form.author.name} maxLength={100} error={errors.authorName} onChange={(event) => changeAuthor('name', event.target.value)} />
            <FormField label="Correo electrónico" type="email" value={form.author.email} maxLength={254} error={errors.email} onChange={(event) => changeAuthor('email', event.target.value)} />
            <div className="sm:col-span-2"><FormField label="Biografía (opcional)" as="textarea" rows={2} value={form.author.bio} maxLength={500} onChange={(event) => changeAuthor('bio', event.target.value)} /></div>
          </div>
        </div>
      </fieldset>
      <div className="flex flex-wrap gap-3">
        <SubmitButton editing={Boolean(watch)} disabled={processingPhoto} />
        <Link className="button button-outline" to={cancel}>Cancelar</Link>
      </div>
    </form>
  )
}
