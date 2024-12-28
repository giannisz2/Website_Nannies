import React, { useEffect, useState } from 'react';
import Logo from '../../components/buttons/Logo.jsx';
import Footer from '../../components/layout/Footer.jsx';
import HelpButton from '../../components/buttons/HelpButton.jsx';
import { Row, Col } from 'react-bootstrap';
import { TextField } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../providers/firebaseConfig.js';
import '../../styles/PersonalInfoParents.css';

export default function PersonalInfoPreview() {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        gender: '',
        birthdate: '',
        phone: '',
        residence: '',
        childrenCount: '',
        pets: '',
        childrenUnder2: '',
        nannyChildrenCount: '',
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchParentData = async () => {
            try {
                const userId = localStorage.getItem('userId'); // Αποθήκευση του ID του χρήστη στο localStorage
                if (!userId) {
                    console.error('User ID not found');
                    return;
                }

                const docRef = doc(db, 'users', userId); // Ανάγνωση του εγγράφου για τον συγκεκριμένο γονέα
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setFormData(docSnap.data());
                } else {
                    console.error('No such document!');
                }
            } catch (error) {
                console.error('Error fetching parent data: ', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchParentData();
    }, []);

    if (isLoading) {
        return <p>Φόρτωση...</p>;
    }

    return (
        <div className="profile-edit-nannies d-flex flex-column min-vh-100">
            <HelpButton />
            <Logo />

            <div className="content flex-grow-1 d-flex align-items-center justify-content-center">
                <Row className="align-items-start justify-content-center g-5 m-0 w-100">
                    <Col md={6} xs={12} className="d-flex flex-column align-items-center justify-content-center text-center">
                        <TextField
                            fullWidth
                            label="Όνομα"
                            value={formData.name || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Φύλο"
                            value={formData.gender || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Τηλέφωνο Επικοινωνίας"
                            value={formData.phone || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Αριθμός Παιδιών"
                            value={formData.childrenCount || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Πόσα παιδιά έχετε σε ηλικίες από 6 μηνών έως 2.5 ετών"
                            value={formData.childrenUnder2 || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                    </Col>
                    <Col md={6} xs={12} className="d-flex flex-column align-items-center justify-content-center text-center">
                        <TextField
                            fullWidth
                            label="Επώνυμο"
                            value={formData.surname || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Ημερομηνία Γέννησης"
                            value={formData.birthdate || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Τόπος Κατοικίας"
                            value={formData.residence || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Έχετε κατοικίδια στο σπίτι"
                            value={formData.pets || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Πόσα παιδιά θέλετε να αναλάβει η ντάντα"
                            value={formData.nannyChildrenCount || ''}
                            InputProps={{ readOnly: true }}
                            className="my-3"
                        />
                    </Col>
                </Row>
            </div>
            <Footer />
        </div>
    );
}
