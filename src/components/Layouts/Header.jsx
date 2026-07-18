import styles from './Header.module.css'
import { Link } from 'react-router-dom'
// Importamos nuestro custom Hook del carrito
import { useCart } from '../../context/CartContext'
// Importamos nuestro custom Hook de autenticación
import { useAuth } from '../../context/AuthContext'
// IMPORTAMOS ICONOS DE REACT ICONS
import {
  FaHome,
  FaShoppingBag,
  FaPlusCircle,
  FaPhone,
  FaShoppingCart,
  FaSignInAlt,
  FaSignOutAlt,
  FaTicketAlt
} from 'react-icons/fa'
// IMPORTAMOS COMPONENTE STYLED
import { LogoutButton } from '../../styles/HeaderStyles'

function Header() {
  // Usamos el hook para acceder a la información del carrito
  const { getCartQuantity } = useCart()
  // Obtenemos usuario y función para cerrar sesión
  const { user, logout } = useAuth()
  // Guardamos la cantidad total de productos
  const totalItems = getCartQuantity()

  // FUNCIÓN PARA CERRAR SESIÓN
  const cerrarSesion = async () => {
    try {
      await logout()
      alert("Sesión cerrada correctamente.")
    } catch (error) {
      console.error(error)
      alert("Error al cerrar sesión.")
    }
  }

  const irAContacto = () => {
    const footer = document.getElementById("contacto-footer");
    if (!footer) return;
    footer.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
    footer.classList.add("destacar-footer");
    setTimeout(() => {
      footer.classList.remove("destacar-footer");
    }, 1800);
  };

  return (
    <header className={styles.header}>
      <nav>
        <ul>
          {/* LINK AL INICIO */}
          <li>
            <Link to="/">
              <FaHome />
              {" "}Inicio
            </Link>
          </li>

          {/* LINK PRODUCTOS */}
          <li>
            <Link to="/productos">
              <FaShoppingBag />
              {" "}Productos
            </Link>
          </li>

          {/* AGREGAR PRODUCTO */}
          {user && (
            <>
              <li>
                <Link to="/agregarProducto">
                  <FaPlusCircle />
                  {" "}Agregar Producto
                </Link>
              </li>
              <li>
                <Link to="/gestioncupones">
                  <FaTicketAlt />
                  {" "}Cupones
                </Link>
              </li>
            </>
          )}

          {/* CONTACTO */}
          <li>
            <button onClick={irAContacto} className={styles.contactoBtn}>
              <FaPhone />
              {" "}Contacto
            </button>
          </li>

          {/* CARRITO */}
          <li>
            <Link to="/carrito">
              <FaShoppingCart />
              {" "}Carrito
              {totalItems > 0 && (
                <span className={styles.badge}>
                  {totalItems}
                </span>
              )}
            </Link>
          </li>

          {/* LOGIN / LOGOUT */}
          {!user ? (
            <li>
              <Link to="/login">
                <FaSignInAlt />
                {" "}Iniciar Sesión
              </Link>
            </li>
          ) : (
            <li>
              <LogoutButton onClick={cerrarSesion}>
                <FaSignOutAlt />
                Cerrar Sesión
              </LogoutButton>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header