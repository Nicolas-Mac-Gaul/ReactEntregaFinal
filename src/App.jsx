import { Routes, Route } from 'react-router-dom'
import './App.css'

import Layout from './components/Layouts/Layout'
import Home from './components/Pages/Home'
import Productos from './components/Pages/Productos'
import DetalleProducto from './components/Pages/DetalleProducto'
import Contacto from './components/Pages/Contacto'
import Cart from './components/Cart/Cart'
import AgregarProducto from './components/AgregarProducto/AgregarProducto'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import GestionCupones from './components/GestionCupones/GestionCupones'

function App() {
  return (
    <Routes>

      <Route element={<Layout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/productos"
          element={<Productos />}
        />

        <Route
          path="/productos/:id"
          element={<DetalleProducto />}
        />

        <Route
          path="/contacto"
          element={<Contacto />}
        />

        <Route
          path="/carrito"
          element={<Cart />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/agregarProducto"
          element={
            <ProtectedRoute>
              <AgregarProducto />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editarProducto/:id"
          element={
            <ProtectedRoute>
              <AgregarProducto />
            </ProtectedRoute>
          }
        />

        <Route
          path="/gestioncupones"
          element={
            <ProtectedRoute>
              <GestionCupones />
            </ProtectedRoute>
          }
        />

      </Route>

    </Routes>
  )
}

export default App