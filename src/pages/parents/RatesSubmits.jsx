import React, { useEffect } from 'react';
import '../../styles/Voucher.css';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Voucher2() {
    const navigate = useNavigate();

    useEffect(() => {
      const timer = setTimeout(() => {
        navigate('/NanniesProfile'); 
      }, 1500);
  
      return () => clearTimeout(timer); 
    }, [navigate]);
  

    return (
        <>
            <div className="nanny-voucher2">
                  <Row className="row justify-content-center align-items-center text-center">
                    <Col md={6} className="text-container">
                        <p className="this_text">
                            Ευχαριστούμε για το σχολιασμό!!!
                        </p>
                    </Col>
                </Row>
            </div>
        </>
    );
}
