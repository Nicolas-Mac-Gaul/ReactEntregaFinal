import 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from './context/CartContext.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'

// IMPORTAMOS LOS ESTILOS GLOBALES DE STYLED-COMPONENTS
import GlobalStyles from "./styles/GlobalStyles";


ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>

    {/* 
      GlobalStyles aplica estilos generales a toda la aplicación.
      Reemplaza parte de lo que antes estaba en App.css
      como márgenes, fuente, box-sizing, estilos generales, etc.
    */}
    <GlobalStyles />

    {/* 
      AuthProvider mantiene disponible la información
      del usuario logueado en toda la app.
    */}
    <AuthProvider>

      {/* 
        CartProvider mantiene el carrito global
        para poder agregar, eliminar y vaciar productos
        desde cualquier componente.
      */}
      <CartProvider>

        <App />

      </CartProvider>

    </AuthProvider>

  </BrowserRouter>

)