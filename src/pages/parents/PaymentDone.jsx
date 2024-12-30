import React from 'react';
import { Row, Col } from 'react-bootstrap';
import CircleWithCheck from '../../components/layout/CircleWithCheck'; 
import "../../styles/PaymentDone.css"

export default function PaymentDone() {
    const handleReturnHome = () => {
        window.location.href = "/"; 
    };

    return (
        <div className="payment-done-container">
            <Row>
                <Col md={6}>
                    <div className='tic'>
                        <CircleWithCheck circleSize={120} />
                    </div>
                </Col>
                <Col md={6}>
                    <div className="this_text_payment" >
                        <p >Η πληρωμή σας έγινε με επιτυχία</p>
                        <button 
                            type="submit" 
                            className="button-apply-pc" 
                            onClick={handleReturnHome}
                        >
                            Επιστροφή στην αρχική
                        </button>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
