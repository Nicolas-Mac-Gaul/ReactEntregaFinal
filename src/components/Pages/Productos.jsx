import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'

import { db } from '../../firebase/config'
import { Container, Row, Col } from "react-bootstrap"
import { Helmet } from "react-helmet-async"
import { ProductCard } from "../../styles/ProductStyles"
import { AdminButton } from "../../styles/ButtonStyles"

// IMPORTAMOS EL CONTEXTO DE AUTENTICACIÓN
// Lo usamos para saber si hay un usuario logueado.
import { useAuth } from '../../context/AuthContext'

// IMPORTAMOS ICONO
import { FaGamepad } from "react-icons/fa"

function Productos() {

  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [busqueda, setBusqueda] = useState("")

  // Obtenemos el usuario logueado
  const { user } = useAuth()

  // Nos permitirá navegar a la pantalla de edición
  const navigate = useNavigate()

  /*
  useEffect(() => {
    fetch('/data/productos.json')
      .then(response => response.json())
      .then(data => setProductos(data))
  }, [])
  */

  useEffect(() => {
    cargarProductos()
  }, [])

  // FUNCIÓN PARA CARGAR TODOS LOS PRODUCTOS
  // La reutilizamos después de eliminar uno.
  const cargarProductos = async () => {

    setLoading(true)

    try {

      const prodDB = collection(db, "productos")
      const resp = await getDocs(prodDB)

      setProductos(
        resp.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
      )

    } catch (error) {

      console.error(error)
      alert("Error al cargar productos.")

    } finally {

      setLoading(false)

    }

  }

  // FILTRO DE BÚSQUEDA
  const productosFiltrados = productos.filter(producto =>
    producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  )

  // ELIMINAR PRODUCTO
  const eliminarProducto = async (id) => {

    const confirmar = window.confirm(
      "¿Seguro que querés eliminar este producto?"
    )

    if (!confirmar) return

    try {

      await deleteDoc(doc(db, "productos", id))

      alert("Producto eliminado correctamente.")

      // Volvemos a cargar los productos
      cargarProductos()

    } catch (error) {

      console.error(error)
      alert("Ocurrió un error al eliminar el producto.")

    }

  }

  if (loading) {

    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Cargando Productos...</p>
      </div>
    )

  }

  return (

    <Container className="mt-4">

      {/* SEO DE LA PÁGINA */}
      <Helmet>
        <title>GameStore | Productos</title>
        <meta
          name="description"
          content="Explorá todos nuestros productos gamer, accesorios electrónicos y tecnología."
        />
      </Helmet>

      <h2 className="text-center mb-4">
        <FaGamepad /> Productos
      </h2>

      <input
        type="text"
        placeholder="🔎 Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="form-control mb-4"
      />

      <Row>

        {productosFiltrados.map((producto) => (

          <Col
            key={producto.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="mb-4 d-flex"
          >

            <ProductCard>

              <Link
                to={`/productos/${producto.id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit"
                }}
              >

                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                />

                <h3>{producto.nombre}</h3>

                <p>
                  ${producto.precio.toLocaleString("es-AR")}
                </p>

              </Link>

              {/* OPCIONES DE ADMIN */}

              {user && (

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "8px",
                    marginTop: "12px"
                  }}
                >

                  <AdminButton
                    onClick={() =>
                      navigate(`/editarProducto/${producto.id}`)
                    }
                  >
                    ✏️ Editar
                  </AdminButton>

                  <AdminButton
                    onClick={() =>
                      eliminarProducto(producto.id)
                    }
                  >
                    🗑️ Eliminar
                  </AdminButton>

                </div>

              )}

            </ProductCard>

          </Col>

        ))}

      </Row>

    </Container>

  )

}

export default Productos