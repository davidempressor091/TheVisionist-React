export default function Card({ children, tone = 'light' }) {
  return (
    <article className={'flex flex-col items-start rounded-sm border border-line p-6 sm:p-7 ' +
      (tone === 'green' ? 'bg-forest text-white' : 'bg-white text-ink')}>
      {children}
    </article>
  )
}
