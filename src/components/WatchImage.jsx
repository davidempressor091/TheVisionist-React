import { useState } from 'react'
import { FiWatch } from 'react-icons/fi'

export default function WatchImage({ src, alt, className = '', eager = false }) {
  const [failedSource, setFailedSource] = useState(null)
  return src && src !== failedSource ? (
    <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} className={className} onError={() => setFailedSource(src)} />
  ) : (
    <div role="img" aria-label={'Imagen no disponible: ' + alt} className={className + ' grid place-items-center bg-line text-muted'}>
      <FiWatch aria-hidden="true" size={42} />
    </div>
  )
}
