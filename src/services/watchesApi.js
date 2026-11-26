async function request(path = '', options = {}) {
  const response = await fetch('/api/watches' + path, options)
  if (!response.ok) {
    throw new Response('No se pudo completar la solicitud.', { status: response.status })
  }
  return response.status === 204 ? null : response.json()
}

function write(method, watch, path = '') {
  return request(path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(watch),
  })
}

export function listWatches({ page, size, favorite, signal } = {}) {
  const params = new URLSearchParams({ _sort: '-createdAt' })
  if (page) {
    params.set('_page', page)
    params.set('_per_page', size)
  }
  if (favorite) params.set('favorite', 'true')
  return request('?' + params, { signal })
}

const pathFor = (id) => '/' + encodeURIComponent(id)
export const getWatch = (id, signal) => request(pathFor(id), { signal })
export const createWatch = (watch) => write('POST', watch)
export const replaceWatch = (id, watch) => write('PUT', watch, pathFor(id))
export const setFavorite = (id, favorite) => write('PATCH', { favorite }, pathFor(id))
export const deleteWatch = (id) => request(pathFor(id), { method: 'DELETE' })

export function watchLoader({ params, request: routeRequest }) {
  return getWatch(params.id, routeRequest.signal)
}
