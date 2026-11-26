import { Link } from 'react-router'

export default function Hero({ title = 'El arte de medir el tiempo.', subtitle = 'Explora relojes por estilo y movimiento, guarda tus favoritos y documenta tus propias piezas.' }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <img src="/relojes/1.jpg" alt="" className="absolute inset-0 -z-20 size-full object-cover object-center lg:object-[center_55%]" />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-[#111c17] via-[#111c17]/85 to-[#111c17]/30" />
      <div className="container-page flex min-h-105 flex-col items-start justify-center py-14 lg:min-h-125">
        <p className="eyebrow text-gold">Catálogo de relojería</p>
        <h1 className="mt-4 max-w-md font-display text-6xl leading-[0.95] sm:text-7xl lg:text-8xl">{title}</h1>
        <p className="mt-5 max-w-sm leading-relaxed text-white/85">{subtitle}</p>
        <Link to="/relojes" className="button button-gold mt-7">Explorar colección</Link>
      </div>
    </section>
  )
}
