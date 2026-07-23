import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

import { Helmet } from "react-helmet-async";

import {
  Container,
  Row,
  Col,
  Card
} from "react-bootstrap";


import {
  ImagenProducto,
  Precio,
  SelectorCantidad,
  Cantidad,
  BotonCantidad,
  BotonCarrito
} from "../../styles/DetalleStyles";


function DetalleProducto() {


  const { id } = useParams();

  const { addToCart } = useCart();


  const [producto, setProducto] = useState(null);

  const [cantidad, setCantidad] = useState(1);



  useEffect(() => {

    const prodDB = collection(db, "productos");


    getDocs(prodDB).then((resp) => {


      const productos = resp.docs.map(doc => ({

        id: doc.id,

        ...doc.data()

      }));


      const productoEncontrado = productos.find(
        p => p.id === id
      );


      setProducto(productoEncontrado);


    });


  }, [id]);



  const aumentar = () => {

    if (cantidad < producto.stock) {

      setCantidad(cantidad + 1);

    }

  };



  const disminuir = () => {

    if (cantidad > 1) {

      setCantidad(cantidad - 1);

    }

  };



  if (!producto) {

    return (
      <h2 className="text-center mt-5">
        Cargando producto...
      </h2>
    );

  }



  return (

    <>


      <Helmet>

        <title>
          GameStore | {producto.nombre}
        </title>


        <meta
          name="description"
          content={`Comprá ${producto.nombre}. ${producto.descripcion}`}
        />

      </Helmet>



      <Container className="mt-3">


        <Row className="justify-content-center">


          <Col xs={12} md={7} lg={5}>


            <Card
              className="shadow text-center"
              style={{
                borderRadius:"15px",
                padding:"18px"
              }}
            >



              <h2 className="mb-2 fs-4">

                {producto.nombre}

              </h2>



              <ImagenProducto

                src={producto.imagen}

                alt={producto.nombre}

              />



              <Precio>

                ${producto.precio.toLocaleString("es-AR")}

              </Precio>



              <p className="mb-2">

                <strong>Stock:</strong> {producto.stock}

              </p>




              <SelectorCantidad>


                <BotonCantidad onClick={disminuir}>

                  -

                </BotonCantidad>



                <Cantidad>

                  {cantidad}

                </Cantidad>



                <BotonCantidad onClick={aumentar}>

                  +

                </BotonCantidad>


              </SelectorCantidad>




              <p className="text-muted small">

                {producto.descripcion}

              </p>



              <BotonCarrito

                onClick={() => addToCart(producto, cantidad)}

              >

                 Agregar al carrito

              </BotonCarrito>



            </Card>


          </Col>


        </Row>


      </Container>


    </>

  );

}


export default DetalleProducto;