import { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { FaTicketAlt } from 'react-icons/fa'
function GestionCupones() {

    const [cupon, setCupon] = useState({
        codigo: "",
        descuento: ""
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setCupon({
            ...cupon,
            [name]: value
        });

    };

    const guardarCupon = async (e) => {

        e.preventDefault();

        if (cupon.codigo.trim() === "") {

            alert("Ingresá un código de cupón.");
            return;

        }

        if (Number(cupon.descuento) <= 0) {

            alert("El descuento debe ser mayor a 0.");
            return;

        }

        try {

            const cuponesRef = collection(db, "cupones");

            await addDoc(cuponesRef, {
                codigo: cupon.codigo.toUpperCase(),
                descuento: Number(cupon.descuento)
            });

            alert("✅ Cupón creado correctamente.");

            setCupon({
                codigo: "",
                descuento: ""
            });

        } catch (error) {

            console.error(error);
            alert("Ocurrió un error al guardar el cupón.");

        }

    };

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <Card className="shadow">
                        <Card.Body>

                            <h2 className="text-center mb-4">
                                <FaTicketAlt /> Gestión de Cupones
                            </h2>

                            <Form onSubmit={guardarCupon}>

                                <Form.Group className="mb-3">

                                    <Form.Label>
                                        Código
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        name="codigo"
                                        value={cupon.codigo}
                                        onChange={handleChange}
                                        placeholder="Ej: INVIERNO25"
                                    />

                                </Form.Group>

                                <Form.Group className="mb-3">

                                    <Form.Label>
                                        Descuento (%)
                                    </Form.Label>

                                    <Form.Control
                                        type="number"
                                        name="descuento"
                                        value={cupon.descuento}
                                        onChange={handleChange}
                                        placeholder="Ej: 25"
                                    />

                                </Form.Group>

                                <div className="d-grid">

                                    <Button
                                        type="submit"
                                        variant="success"
                                    >
                                        Crear Cupón
                                    </Button>

                                </div>

                            </Form>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );

}

export default GestionCupones;