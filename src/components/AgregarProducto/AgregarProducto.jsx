import { useEffect, useState } from 'react'
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useParams, useNavigate } from 'react-router-dom'
import { db } from '../../firebase/config'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'

function AgregarProducto() {
    // NUEVO: Captura el id de la URL para saber si editamos o agregamos.
    const { id } = useParams()
    // NUEVO: Sirve para volver a la lista de productos.
    const navigate = useNavigate()

    const [producto, setProducto] = useState({
        nombre: '',
        precio: '',
        descripcion: '',
        stock: ''
    })
    const [imagenFile, setImagenFile] = useState(null)
    // NUEVO: Guarda la imagen actual cuando editamos.
    const [imagenActual, setImagenActual] = useState('')
    const [subiendo, setSubiendo] = useState(false)

    // NUEVO: Si hay id, buscamos el producto en Firestore y cargamos los datos.
    useEffect(() => {
        if (id) {
            const cargarProducto = async () => {
                try {
                    const productoRef = doc(db, "productos", id)
                    const respuesta = await getDoc(productoRef)

                    if (respuesta.exists()) {
                        const datos = respuesta.data()
                        setProducto({
                            nombre: datos.nombre,
                            precio: datos.precio,
                            descripcion: datos.descripcion,
                            stock: datos.stock
                        })
                        setImagenActual(datos.imagen)
                    }
                } catch (error) {
                    console.error(error)
                    alert("Error al cargar producto.")
                }
            }
            cargarProducto()
        }
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setProducto({
            ...producto,
            [name]: value
        })
    }

    const manejarImagen = (e) => {
        if (e.target.files.length > 0) {
            setImagenFile(e.target.files[0])
        }
    }

    const guardarProducto = async (e) => {
        e.preventDefault()

        if (producto.nombre.trim() === '') {
            alert('El nombre es obligatorio.')
            return
        }
        if (Number(producto.precio) <= 0) {
            alert('El precio debe ser mayor a 0.')
            return
        }
        if (Number(producto.stock) < 0) {
            alert('El stock no puede ser negativo.')
            return
        }
        // SOLO PEDIMOS IMAGEN SI ES UN PRODUCTO NUEVO
        if (!imagenFile && !id) {
            alert('Seleccioná una imagen.')
            return
        }

        setSubiendo(true)

        try {
            let imagenURL = imagenActual

            // SI HAY UNA IMAGEN NUEVA LA SUBIMOS A IMGBB
            if (imagenFile) {
                const formData = new FormData()
                formData.append('image', imagenFile)

                const respuesta = await fetch(
                    'https://api.imgbb.com/1/upload?key=39f1bb239c5af860fbef882042aaa618',
                    {
                        method: 'POST',
                        body: formData
                    }
                )

                const data = await respuesta.json()
                if (!data.success) {
                    throw new Error('No se pudo subir la imagen.')
                }
                imagenURL = data.data.url
            }

            const datosProducto = {
                nombre: producto.nombre,
                precio: Number(producto.precio),
                descripcion: producto.descripcion,
                imagen: imagenURL,
                stock: Number(producto.stock),
                destacado: false
            }

            if (id) {
                const productoRef = doc(db, "productos", id)
                await updateDoc(productoRef, datosProducto)
                alert("Producto actualizado correctamente.")
            } else {
                const productosRef = collection(db, "productos")
                await addDoc(productosRef, datosProducto)
                alert("Producto agregado correctamente.")
            }

            setProducto({ nombre: '', precio: '', descripcion: '', stock: '' })
            setImagenFile(null)
            navigate("/productos")
        } catch (error) {
            console.error(error)
            alert("Error al guardar el producto.")
        } finally {
            setSubiendo(false)
        }
    }

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <Card className="shadow">
                        <Card.Body>
                            <h2 className="text-center mb-4">
                                {id ? "✏️ Editar Producto" : "➕ Agregar Producto"}
                            </h2>
                            <Form onSubmit={guardarProducto}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nombre"
                                        value={producto.nombre}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Precio</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="precio"
                                        value={producto.precio}
                                        min="1"
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="stock"
                                        value={producto.stock}
                                        min="0"
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Imagen</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={manejarImagen}
                                        required={!id}
                                    />
                                </Form.Group>
                                {imagenFile && (
                                    <p>📷 Imagen seleccionada: <strong>{imagenFile.name}</strong></p>
                                )}
                                {id && imagenActual && (
                                    <p>✅ El producto ya tiene una imagen guardada.</p>
                                )}
                                <Form.Group className="mb-3">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        name="descripcion"
                                        value={producto.descripcion}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <div className="d-grid">
                                    <Button type="submit" variant="success" disabled={subiendo}>
                                        {subiendo ? "Guardando..." : id ? "Actualizar Producto" : "Guardar Producto"}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default AgregarProducto