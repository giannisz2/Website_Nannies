import React, { useState, useEffect } from 'react';
import Logo from '../../components/buttons/Logo.jsx';
import Footer from '../../components/layout/Footer.jsx';
import HelpButton from '../../components/buttons/HelpButton.jsx';
import { Row, Col } from 'react-bootstrap';
import { Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';
import '../../styles/PersonalInfo.css';
import Datepicker from '../../components/layout/Datepicker.jsx';
import { db } from '../../providers/firebaseConfig';
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function PersonalInfo() {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        gender: '',
        birthdate: '',
        educationLevel: '',
        employmentTime: '',
        recommendationLetters: '',
        experienceYears: '',
        maxChildren: '',
        smoker: '',
        availability: '',
        experience: '',
        bio: '',
        location: '',
        pets: '',
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const userId = localStorage.getItem("userId");
            if (!userId) {
              console.error("User ID is not available");
              setIsLoading(false);
              return;
            }
      
            const userRef = doc(db, "users", userId);
            const userDoc = await getDoc(userRef);
      
            if (userDoc.exists()) {
              setFormData(userDoc.data());
            } else {
              console.error("No such document!");
            }
          } catch (error) {
            console.error("Error fetching user data: ", error);
          } finally {
            setIsLoading(false);
          }
        };
      
        fetchData();
      }, []);
      

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        try {
            const userId = "USER_DOCUMENT_ID"; // Αντικαταστήστε με το πραγματικό ID
            const userRef = doc(db, "users", userId);
            await updateDoc(userRef, formData);
            alert('Τα στοιχεία ενημερώθηκαν επιτυχώς!');
        } catch (error) {
            console.error("Error updating document: ", error);
            alert('Σφάλμα κατά την ενημέρωση των στοιχείων.');
        }
    };

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
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Φύλο"
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="my-3"
                        />
                        <FormControl fullWidth className="my-3">
                            <InputLabel>Εκπαίδευση~</InputLabel>
                            <Select
                                name="educationLevel"
                                value={formData.educationLevel}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="Τριτοβάθμια εκπαίδευση">Τριτοβάθμια εκπαίδευση</MenuItem>
                                <MenuItem value="Δευτεροβάθμια εκπαίδευση">Δευτεροβάθμια εκπαίδευση</MenuItem>
                                <MenuItem value="Πρωτοβάθμια εκπαίδευση">Πρωτοβάθμια εκπαίδευση</MenuItem>
                                <MenuItem value="Άλλο">Άλλο</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="Χρόνος απασχόλησης~"
                            name="employmentTime"
                            value={formData.employmentTime}
                            onChange={handleInputChange}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Συστατικές επιστολές~"
                            name="recommendationLetters"
                            value={formData.recommendationLetters}
                            onChange={handleInputChange}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Έτη προϋπηρεσίας~"
                            name="experienceYears"
                            value={formData.experienceYears}
                            onChange={handleInputChange}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Μέχρι πόσα παιδιά μπορείτε να αναλάβετε ταυτόχρονα~"
                            name="maxChildren"
                            value={formData.maxChildren}
                            onChange={handleInputChange}
                            className="my-3"
                        />
                        <FormControl fullWidth className="my-3">
                            <InputLabel>Είστε καπνιστής;</InputLabel>
                            <Select
                                name="smoker"
                                value={formData.smoker}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="ΝΑΙ">ΝΑΙ</MenuItem>
                                <MenuItem value="ΟΧΙ">ΟΧΙ</MenuItem>
                            </Select>
                        </FormControl>
                    </Col>
                    <Col md={6} xs={12} className="d-flex flex-column align-items-center justify-content-center text-center">
                        <TextField
                            fullWidth
                            label="Επώνυμο"
                            name="surname"
                            value={formData.surname}
                            onChange={handleInputChange}
                            className="my-3"
                        />
                        <Datepicker
                            selected={formData.birthdate ? new Date(formData.birthdate) : null}
                            onChange={(date) => handleInputChange({ target: { name: 'birthdate', value: date.toISOString() } })}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Διαθεσιμότητα~"
                            name="availability"
                            value={formData.availability}
                            onChange={handleInputChange}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Εμπειρία~"
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            className="my-3"
                        />
                        <TextField
                            fullWidth
                            label="Λίγα λόγια για εσάς~"
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            className="about-me my-3"
                        />
                        <TextField
                            fullWidth
                            label="Τοποθεσία~"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="my-3"
                        />
                        <FormControl fullWidth className="my-3">
                            <InputLabel>Είστε διαθέσιμος να εργαστείτε σε σπίτι με κατοικίδια;</InputLabel>
                            <Select
                                name="pets"
                                value={formData.pets}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="ΝΑΙ">ΝΑΙ</MenuItem>
                                <MenuItem value="ΟΧΙ">ΟΧΙ</MenuItem>
                            </Select>
                        </FormControl>
                        <p>Όσα πεδία εχουν ~ μπορούν να αλλάξουν</p>
                        <div className="buttons-pu">
                            <button className="button-temp-pu">Προσωρινή Αποθήκευση</button>
                            <button type="button" onClick={handleSave} className="button-apply-pu">Υποβολή</button>
                        </div>
                    </Col>
                </Row>
            </div>
            <Footer />
        </div>
    );
}
