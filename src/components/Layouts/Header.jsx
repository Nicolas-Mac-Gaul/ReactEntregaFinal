import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext"; // Importamos nuestro custom Hook del carrito
import { useAuth } from "../../context/AuthContext"; // Importamos nuestro custom Hook de autenticación
import { LogoutButton } from "../../styles/HeaderStyles"; // IMPORTAMOS COMPONENTE STYLED
import { FaHome, FaShoppingBag, FaPlusCircle, FaPhone, FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaTicketAlt } from "react-icons/fa"; // IMPORTAMOS ICONOS DE REACT ICONS
import { Navbar, Nav, Container } from "react-bootstrap"; // MENÚ HAMBURGUESA

function Header() {
  // Usamos el hook para acceder a la información del carrito
  const { getCartQuantity } = useCart();
  // Obtenemos usuario y función para cerrar sesión
  const { user, logout } = useAuth();
  // Guardamos la cantidad total de productos
  const totalItems = getCartQuantity();

  // FUNCIÓN PARA CERRAR SESIÓN
  const cerrarSesion = async () => {
    try {
      await logout();
      alert("Sesión cerrada correctamente.");
    } catch (error) {
      console.error(error);
      alert("Error al cerrar sesión.");
    }
  };

  // CONTACTO
  const irAContacto = () => {
    const footer = document.getElementById("contacto-footer");
    if (!footer) return;
    footer.scrollIntoView({ behavior: "smooth", block: "start" });
    footer.classList.add("destacar-footer");
    setTimeout(() => {
      footer.classList.remove("destacar-footer");
    }, 1800);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className={styles.header}>
      <Container>
        <Navbar.Brand as={Link} to="/">🎮 GameStore</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-lg-center">
            {/* LINK AL INICIO */}
            <Nav.Link as={Link} to="/" className={styles.navLink}>
              <FaHome /> Inicio
            </Nav.Link>

            {/* LINK PRODUCTOS */}
            <Nav.Link as={Link} to="/productos" className={styles.navLink}>
              <FaShoppingBag /> Productos
            </Nav.Link>

            {/* AGREGAR PRODUCTO */}
            {user && (
              <>
                <Nav.Link as={Link} to="/agregarProducto" className={styles.navLink}>
                  <FaPlusCircle /> Agregar Producto
                </Nav.Link>

                <Nav.Link as={Link} to="/gestioncupones" className={styles.navLink}>
                  <FaTicketAlt /> Cupones
                </Nav.Link>
              </>
            )}

            {/* CONTACTO */}
            <button onClick={irAContacto} className={styles.contactoBtn}>
              <FaPhone /> Contacto
            </button>

            {/* CARRITO */}
            <Nav.Link as={Link} to="/carrito" className={styles.navLink}>
              <FaShoppingCart /> Carrito
              {totalItems > 0 && (
                <span className={styles.badge}>{totalItems}</span>
              )}
            </Nav.Link>

            {/* LOGIN / LOGOUT */}
            {!user ? (
              <Nav.Link as={Link} to="/login" className={styles.navLink}>
                <FaSignInAlt /> Iniciar Sesión
              </Nav.Link>
            ) : (
              <LogoutButton onClick={cerrarSesion}>
                <FaSignOutAlt /> {" "}Cerrar Sesión
              </LogoutButton>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;