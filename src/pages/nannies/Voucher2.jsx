import React from 'react';
import NavBarNannies from '../../components/layout/NavbarNannies';
import Footer from '../../components/layout/Footer';
import '../../styles/Voucher.css';
import BreadcrumpbVoucher from '../../components/layout/BreadcrumbSearchNannies';
import { Row, Col } from 'react-bootstrap';
import HelpButton from '../../components/buttons/HelpButton'

export default function Voucher2() {
    return (
        <>
            <div className="nanny-voucher2">
                <NavBarNannies />
                <HelpButton/>
                <div Breadcrumb="breadCrumb">
                    <BreadcrumpbVoucher label="Εισαγωγή ποσού" />  
                </div>      
                  <Row className="row justify-content-center align-items-center text-center">
                    <Col md={6} className="text-container">
                        <p className="this_text">
                            Το ποσό θα μπει εντός ολίγων ημερών στον τραπεζικό σας λογαριασμό!
                        </p>
                        <p className="text">
                            Για οποιοδήποτε θέμα είμαστε στη διάθεσή σας.
                        </p>
                    </Col>
                </Row>
                <Footer />
            </div>
        </>
    );
}
