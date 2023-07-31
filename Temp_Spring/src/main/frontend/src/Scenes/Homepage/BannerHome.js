import { Col, Container, Row, Col } from "react-bootstrap"
import { ArrowRightCircle } from "react-bootstrap-icons"


export const Banner = () => {
    return (
        <section className="banner" id="index">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7}>
                        <span className="taglibe">Welcome to FEC</span>
                        <h1>{'Smart Monitoring Application'}<span className="wrap">Friendly, Easy, Convenient</span></h1>
                        <p></p>
                        <button onClick={() => console.log('login')}>Login<ArrowRightCircle size={25}/></button>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}