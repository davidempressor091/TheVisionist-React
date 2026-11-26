import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'
import Navbar from '../components/Navbar'

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a className="sr-only focus:not-sr-only focus:p-3" href="#contenido">Saltar al contenido</a>
      <Navbar />
      <main id="contenido" className="grow"><Outlet /></main>
      <footer className="mt-14 border-t border-line">
        <div className="container-page py-6 font-display text-2xl">TheVisionistLuxury</div>
      </footer>
      <ToastContainer position="bottom-right" autoClose={3400} />
    </div>
  )
}
