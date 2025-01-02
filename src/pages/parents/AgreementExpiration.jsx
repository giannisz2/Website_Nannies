import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../providers/firebaseConfig';
import NavBarParents from '../../components/layout/NavBarParents';
import Footer from '../../components/layout/Footer';
import HelpButton from '../../components/buttons/HelpButton';
import { Row, Col } from 'react-bootstrap';
import { TextField, Alert } from '@mui/material';
import '../../styles/AgreementExpiration.css';

export default function AgreementExpiration() {
    const [formData, setFormData] = useState({
        name: '',
        surname:'',
        address: '',
        phone: '',
        colleagueName: '',
        colleagueAddress: '',
        workHours: ''
    });
    const [isWorkingAtHome, setIsWorkingAtHome] = useState(false);
    const [isSureToTerminate, setIsSureToTerminate] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    console.error('User ID is not available');
                    setIsLoading(false);
                    return;
                }

                const userRef = doc(db, 'Parent', userId);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    const data = userDoc.data();

                    // Adjusting data for display (e.g., date formatting)
                    const formattedData = {
                        name: `${data.name} ${data.surname}`,
                        address: data.residence || '',
                        phone: data.phone || '',
                        colleagueName: data.colleagueName || 'ΜΑΡΙΑ ΜΩΜΜΟΥ',
                        colleagueAddress: data.colleagueAddress || 'ΚΥΨΕΛΗ',
                        workHours: data.workHours || 'ΠΛΗΡΕΣ ΩΡΑΡΙΟ'
                    };

                    setFormData(formattedData);
                } else {
                    console.error('No such document!');
                }
            } catch (error) {
                console.error('Error fetching user data: ', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = () => {
        if (!isWorkingAtHome || !isSureToTerminate || !email.trim()) {
            setShowAlert(true);
        } else {
            setShowAlert(false);
            console.log('Form submitted:', formData);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <NavBarParents />
            <p className='top-text'>Λήξη Συμφωνητικού</p>
            <HelpButton />

            <Row>
                <Col>
                    <p className='text'>Εγώ ο/η</p>
                </Col>
                <Col>
                    <TextField
                        fullWidth
                        className='text-field'
                        value={formData.name}
                        placeholder="ΠΕΤΡΟΣ ΑΝΑΣΤΑΣΙΟΥ (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΌΜΑΤΑ ΑΠΟ ΤΟ ΣΥΣΤΗΜΑ)"
                        InputProps={{ readOnly: true }}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className='text'>Που μένω στην διεύθυνση</p>
                </Col>
                <Col>
                    <TextField
                        fullWidth
                        className='text-field'
                        value={formData.address}
                        placeholder="ΠΑΠΑΓΡΗΓΟΡΙΟΥ 7, 11855, ΑΘΗΝΑ (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΌΜΑΤΑ ΑΠΟ ΤΟ ΣΥΣΤΗΜΑ)"
                        InputProps={{ readOnly: true }}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className='text'>με κινητό τηλέφωνο</p>
                </Col>
                <Col>
                    <TextField
                        fullWidth
                        className='text-field'
                        value={formData.phone}
                        placeholder="+44 592 410 845 (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΌΜΑΤΑ ΑΠΟ ΤΟ ΣΥΣΤΗΜΑ)"
                        InputProps={{ readOnly: true }}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className='text'>και email</p>
                </Col>
                <Col>
                    <TextField
                        fullWidth
                        className='text-field'
                        placeholder="Εισάγετε το email σας"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className='text'>Θα ήθελα να ΔΙΑΚΟΨΩ την συνεργασία μου με τον/την</p>
                </Col>
                <Col>
                    <TextField
                        fullWidth
                        className='text-field'
                        value={formData.colleagueName}
                        placeholder="ΜΑΡΙΑ ΜΩΜΜΟΥ (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΌΜΑΤΑ ΑΠΟ ΤΟ ΣΥΣΤΗΜΑ)"
                        InputProps={{ readOnly: true }}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className='text'>που διαμένει στην</p>
                </Col>
                <Col>
                    <TextField
                        fullWidth
                        className='text-field'
                        value={formData.colleagueAddress}
                        placeholder="ΚΥΨΕΛΗ (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΌΜΑΤΑ ΑΠΟ ΤΟ ΣΥΣΤΗΜΑ)"
                        InputProps={{ readOnly: true }}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className='text'>και εργάζεται στην κατοικία μου</p>
                </Col>
                <Col>
                    <input
                        type="checkbox"
                        className='checkbox'
                        onChange={(e) => setIsWorkingAtHome(e.target.checked)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className='text'>με</p>
                </Col>
                <Col>
                    <TextField
                        fullWidth
                        className='text-field'
                        value={formData.workHours}
                        placeholder="ΠΛΗΡΕΣ ΩΡΑΡΙΟ"
                        InputProps={{ readOnly: true }}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className='text'>ΕΙΜΑΙ ΣΙΓΟΥΡΟΣ ΟΤΙ ΘΕΛΩ ΝΑ ΔΙΑΚΟΨΩ ΤΗΝ ΔΙΑΔΙΚΑΣΙΑ</p>
                </Col>
                <Col>
                    <input
                        type="checkbox"
                        className='checkbox'
                        onChange={(e) => setIsSureToTerminate(e.target.checked)}
                    />
                </Col>
            </Row>
            {showAlert && (
                <Alert
                    severity="error"
                    className="alert"
                    onClose={() => setShowAlert(false)}
                >
                    Παρακαλώ ελέγξτε η νταντά αν εργάζεται στην κατοικία σας, αν είστε σίγουροι ότι θέλετε να διακόψετε την διαδικασία και αν έχετε εισάγει το email σας.
                </Alert>
            )}
            <button type="button" className="button-apply" onClick={handleSubmit}>
                Υποβολή
            </button>
            <p
                onClick={() => navigate('/AgreementRenewal')}
                className='side-button'
                style={{ cursor: 'pointer' }} 
            >
                ΘΑ ΗΘΕΛΑ ΝΑ ΑΝΑΝΕΩΣΩ ΤΟ ΣΥΜΒΟΛΑΙΟ
            </p>
            <Footer />
        </div>
    );
}