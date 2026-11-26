import { createBrowserRouter, RouterProvider } from 'react-router'
import MainLayout from './layouts/MainLayout'
import AddWatchPage from './pages/AddWatchPage'
import CollectionPage from './pages/CollectionPage'
import EditWatchPage from './pages/EditWatchPage'
import FavoritesPage from './pages/FavoritesPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import WatchDetailPage from './pages/WatchDetailPage'
import WatchErrorPage from './pages/WatchErrorPage'
import Spinner from './components/Spinner'
import { watchLoader } from './services/watchesApi'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    hydrateFallbackElement: <Spinner />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'relojes', element: <CollectionPage /> },
      { path: 'relojes/:id', element: <WatchDetailPage />, loader: watchLoader, errorElement: <WatchErrorPage /> },
      { path: 'agregar-reloj', element: <AddWatchPage /> },
      { path: 'editar-reloj/:id', element: <EditWatchPage />, loader: watchLoader, errorElement: <WatchErrorPage /> },
      { path: 'favoritos', element: <FavoritesPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
