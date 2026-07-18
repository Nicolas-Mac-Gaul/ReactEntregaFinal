import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { FaFire } from "react-icons/fa"; //icono

// Componentes de React-Bootstrap
import { Container, Row, Col } from "react-bootstrap";

// React Helmet para SEO
import { Helmet } from "react-helmet-async";

// Styled-components
import { HomeCard } from "../../styles/HomeStyles";


function Home() {


  const [productos, setProductos] = useState([]);

  const [loading, setLoading] = useState(true);



  // Cargamos los productos desde Firestore
  useEffect(() => {


    const prodDB = collection(db, "productos");


    getDocs(prodDB)

      .then((resp) => {


        setProductos(

          resp.docs.map((doc) => ({

            id: doc.id,

            ...doc.data()

          }))

        );


      })

      .finally(() => {


        setLoading(false);


      });


  }, []);




  // Filtramos solamente los productos destacados
  const destacados = productos.filter(

    (producto) => producto.destacado

  );




  // Spinner mientras cargan los datos
  if (loading) {


    return (

      <div className="spinner-container">

        <div className="spinner"></div>

        <p>Cargando Inicio...</p>


      </div>

    );


  }





  return (


    <>


      {/* SEO DE LA PÁGINA */}

      <Helmet>

        <title>

          GameStore | Inicio

        </title>


        <meta

          name="description"

          content="GameStore, tienda online de productos gamer, tecnología y accesorios electrónicos."

        />

      </Helmet>





      <Container className="mt-4">


        <h1 className="text-center mb-4">

          <FaFire />  Hot Sale

        </h1>





        <Row>


          {destacados.map((producto) => (



            <Col

              key={producto.id}

              xs={12}

              sm={6}

              md={4}

              lg={3}

              className="mb-4 d-flex justify-content-center"

            >



              <Link

                to={`/productos/${producto.id}`}

              >



                <HomeCard>



                  <img

                    src={producto.imagen}

                    alt={producto.nombre}

                  />



                  <h3>

                    {producto.nombre}

                  </h3>



                  <p>

                    ${producto.precio.toLocaleString("es-AR")}

                  </p>



                </HomeCard>



              </Link>



            </Col>



          ))}



        </Row>


      </Container>


    </>

  );

}

export default Home;