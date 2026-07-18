import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// IMPORTAMOS NUESTRO CONTEXTO
import { useAuth } from "../context/AuthContext";

// COMPONENTES DE REACT-BOOTSTRAP
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Card
} from "react-bootstrap";

// React Helmet para SEO
import { Helmet } from "react-helmet-async";


const Login = () => {


    const { login, register } = useAuth();


    const navigate = useNavigate();



    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");



    // TRUE = LOGIN
    // FALSE = REGISTRO
    const [esLogin, setEsLogin] = useState(true);





    const handleLogin = async (e) => {


        e.preventDefault();


        try {


            await login(email, password);


            alert("¡Inicio de sesión exitoso!");


            navigate("/");



        } catch (error) {


            console.error(error);


            alert("Error: " + error.message);



        }


    };






    const handleRegister = async (e) => {


        e.preventDefault();



        if (password !== confirmPassword) {


            alert("Las contraseñas no coinciden.");


            return;


        }




        try {


            await register(email, password);


            alert("¡Cuenta creada correctamente!");


            navigate("/");



        } catch (error) {


            console.error(error);


            alert("Error: " + error.message);



        }


    };






    return (


        <Container className="mt-5">


            {/* SEO DE LOGIN / REGISTRO */}

            <Helmet>


                <title>

                    GameStore | Iniciar Sesión

                </title>



                <meta

                    name="description"

                    content="Ingresá a GameStore o creá una cuenta para disfrutar productos gamer y electrónicos."

                />


            </Helmet>





            <Row className="justify-content-center">


                <Col xs={12} sm={10} md={8} lg={5}>


                    <Card className="shadow p-4">


                        <Card.Body>



                            <h2 className="text-center mb-4">


                                {esLogin

                                    ? "🔐 Iniciar Sesión"

                                    : "📝 Crear Cuenta"}



                            </h2>





                            <Form onSubmit={esLogin ? handleLogin : handleRegister}>




                                <Form.Group className="mb-3">


                                    <Form.Label>

                                        Correo electrónico

                                    </Form.Label>



                                    <Form.Control

                                        type="email"

                                        placeholder="Ingresá tu correo"

                                        value={email}

                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }

                                        required

                                    />


                                </Form.Group>






                                <Form.Group className="mb-3">


                                    <Form.Label>

                                        Contraseña

                                    </Form.Label>



                                    <Form.Control

                                        type="password"

                                        placeholder="Ingresá tu contraseña"

                                        value={password}

                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }

                                        required

                                    />


                                </Form.Group>






                                {!esLogin && (


                                    <Form.Group className="mb-3">


                                        <Form.Label>

                                            Confirmar contraseña

                                        </Form.Label>



                                        <Form.Control

                                            type="password"

                                            placeholder="Repetí la contraseña"

                                            value={confirmPassword}

                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value
                                                )
                                            }

                                            required

                                        />


                                    </Form.Group>


                                )}






                                <div className="d-grid">


                                    <Button

                                        variant="primary"

                                        type="submit"

                                    >


                                        {esLogin

                                            ? "Ingresar"

                                            : "Registrarme"}



                                    </Button>


                                </div>




                            </Form>





                            <hr />





                            {esLogin ? (


                                <p className="text-center">


                                    ¿No tenés una cuenta?



                                    <Button

                                        variant="link"

                                        onClick={() =>
                                            setEsLogin(false)
                                        }

                                    >

                                        Crear cuenta

                                    </Button>


                                </p>



                            ) : (



                                <p className="text-center">


                                    ¿Ya tenés una cuenta?



                                    <Button

                                        variant="link"

                                        onClick={() =>
                                            setEsLogin(true)
                                        }

                                    >

                                        Iniciar sesión

                                    </Button>


                                </p>


                            )}



                        </Card.Body>


                    </Card>


                </Col>


            </Row>


        </Container>


    );


};


export default Login;