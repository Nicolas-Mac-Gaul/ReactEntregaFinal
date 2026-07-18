import { useState } from 'react'
import { collection, getDocs } from "firebase/firestore"
import { useCart } from '../../context/CartContext'
import { db } from "../../firebase/config"
import { FaTicketAlt } from 'react-icons/fa'

import {
  CartContainer,
  CartItem,
  ImagenCarrito,
  BotonCarrito,
  CuponContainer
} from "../../styles/CartStyles"

const Cart = () => {

  const {
    cart,
    clearCart,
    removeFromCart,
    getCartTotal,
    cuponAplicado,
    descuento,
    aplicarCupon,
    quitarCupon,
    getTotalFinal
  } = useCart()

  const [codigoCupon, setCodigoCupon] = useState("")

  // Busca el cupón ingresado en Firestore y lo aplica.
  const buscarCupon = async () => {

    if (codigoCupon.trim() === "") {
      alert("Ingresá un código de cupón.")
      return
    }

    try {
      const cuponesDB = collection(db, "cupones")
      const respuesta = await getDocs(cuponesDB)

      const cuponEncontrado = respuesta.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .find(cupon =>
          cupon.codigo.toLowerCase() === codigoCupon.toLowerCase()
        )

      if (!cuponEncontrado) {
        alert("Cupón inválido.")
        return
      }

      aplicarCupon(cuponEncontrado)

      alert(
        `Cupón aplicado correctamente: ${cuponEncontrado.descuento}% de descuento`
      )

    } catch(error) {
      console.error(error)
      alert("Error al buscar el cupón.")
    }

  }


  // Si el carrito está vacío.
  if (cart.length === 0) {

    return (
      <CartContainer>
        <h1>Carrito de Compras</h1>
        <p>El carrito está vacío.</p>
      </CartContainer>
    )

  }


  return (

    <CartContainer>

      <h1>🛒 Carrito de Compras</h1>

      {cart.map(item => (

        <CartItem key={item.id}>

          <ImagenCarrito
            src={item.imagen}
            alt={item.nombre}
          />

          <h3>{item.nombre}</h3>

          <p>
            Cantidad: {item.quantity}
          </p>

          <p>
            Precio unitario:
            ${item.precio.toLocaleString("es-AR")}
          </p>

          <p>
            Subtotal:
            ${(item.precio * item.quantity).toLocaleString("es-AR")}
          </p>

          {/* Quita una unidad del producto.
              Si solo queda una, lo elimina del carrito. */}

          <BotonCarrito
            onClick={() => removeFromCart(item.id)}
          >
            Quitar una unidad
          </BotonCarrito>

        </CartItem>

      ))}


      <h2>
        Total:
        ${getCartTotal().toLocaleString("es-AR")}
      </h2>



      {/* SECCIÓN DE CUPONES */}

      <CuponContainer>

        <h3>
          <FaTicketAlt /> Aplicar cupón
        </h3>


        <input
          type="text"
          placeholder="Ej: INVIERNO25"
          value={codigoCupon}
          onChange={(e) => setCodigoCupon(e.target.value)}
        />


        <BotonCarrito
          onClick={buscarCupon}
        >
          Aplicar
        </BotonCarrito>


      </CuponContainer>



      {cuponAplicado && (

        <CuponContainer>

          <p>
            Cupón aplicado:
            <strong> {cuponAplicado}</strong>
          </p>

          <p>
            Descuento:
            <strong> {descuento}%</strong>
          </p>


          <BotonCarrito
            onClick={quitarCupon}
          >
            Quitar cupón
          </BotonCarrito>


        </CuponContainer>

      )}



      <h2>
        Total final:
        ${getTotalFinal().toLocaleString("es-AR")}
      </h2>



      <BotonCarrito
        onClick={clearCart}
      >
        Vaciar carrito
      </BotonCarrito>


    </CartContainer>

  )

}

export default Cart