const makeId = () => crypto.randomUUID()

export const newSpecification = () => ({ id: makeId(), name: '', value: '' })
export const newCareStep = () => ({ id: makeId(), text: '' })

export function initialForm(watch) {
  return watch ?? {
    title: '', category: '', movement: '', diameter: '', reserve: '', description: '', image: '',
    specifications: [newSpecification()],
    care: [newCareStep()],
    author: { name: '', email: '', bio: '' },
  }
}

export function validateWatch(form, categories, movements) {
  const errors = {}
  const integerInRange = (value, min, max) =>
    Number.isInteger(Number(value)) && Number(value) >= min && Number(value) <= max

  if (!form.title.trim()) errors.title = 'Escribe el nombre del reloj.'
  if (!categories.includes(form.category)) errors.category = 'Selecciona una categoría.'
  if (!movements.includes(form.movement)) errors.movement = 'Selecciona un movimiento.'
  if (!integerInRange(form.diameter, 1, 100)) errors.diameter = 'Ingresa un entero entre 1 y 100 mm.'
  if (!integerInRange(form.reserve, 1, 99999)) errors.reserve = 'Ingresa un entero entre 1 y 99 999 horas.'
  if (!form.description.trim()) errors.description = 'Escribe una descripción.'
  const image = form.image.trim()
  if (image && !/^https?:\/\/[^\s/]+[^\s]*$|^\/relojes\/\d+\.jpg$|^data:image\/webp;base64,[a-z0-9+/=]+$/i.test(image)) {
    errors.image = 'Sube una imagen o pega una URL que empiece por https://.'
  }
  if (!form.author.name.trim()) errors.authorName = 'Escribe el nombre del responsable.'
  if (!/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(form.author.email.trim())) errors.email = 'Escribe un correo válido.'
  if (!form.specifications.length) errors.specifications = 'Agrega al menos una especificación.'
  if (!form.care.length) errors.care = 'Agrega al menos un paso de cuidado.'
  form.specifications.forEach(({ id, name, value }) => {
    if (!name.trim()) errors['name-' + id] = 'Escribe el nombre.'
    if (!value.trim()) errors['value-' + id] = 'Escribe el valor.'
  })
  form.care.forEach(({ id, text }) => {
    if (!text.trim()) errors['care-' + id] = 'Escribe la indicación de cuidado.'
  })
  return errors
}

export function watchPayload(form) {
  return {
    title: form.title.trim(),
    category: form.category,
    movement: form.movement,
    diameter: Number(form.diameter),
    reserve: Number(form.reserve),
    description: form.description.trim(),
    image: form.image.trim(),
    specifications: form.specifications.map(({ id, name, value }) => ({ id, name: name.trim(), value: value.trim() })),
    care: form.care.map(({ id, text }) => ({ id, text: text.trim() })),
    author: { name: form.author.name.trim(), email: form.author.email.trim(), bio: form.author.bio.trim() },
  }
}

export async function readWatchPhoto(file) {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 12 * 1024 * 1024) {
    throw new Error('Elige un archivo JPG, PNG o WebP de hasta 12 MB.')
  }
  let bitmap
  try {
    bitmap = await createImageBitmap(file)
  } catch {
    throw new Error('No pudimos abrir esa imagen.')
  }
  try {
    const canvas = document.createElement('canvas')
    const scale = Math.min(1, 900 / Math.max(bitmap.width, bitmap.height))
    canvas.width = Math.max(1, Math.round(bitmap.width * scale))
    canvas.height = Math.max(1, Math.round(bitmap.height * scale))
    canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    const image = canvas.toDataURL('image/webp', 0.78)
    if (!image.startsWith('data:image/webp;base64,') || image.length > 900000) {
      throw new Error('La imagen resultante es demasiado grande o su formato no es compatible.')
    }
    return image
  } finally {
    bitmap.close()
  }
}
