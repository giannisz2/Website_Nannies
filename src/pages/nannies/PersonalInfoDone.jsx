import Logo from '../../components/buttons/Logo.jsx';
import Footer from '../../components/layout/Footer.jsx';
import HelpButton from '../../components/buttons/HelpButton.jsx';
import { Row, Col } from 'react-bootstrap';
import { Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';
import '../../styles/PersonalInfoDone.css'
import Datepicker from '../../components/layout/Datepicker.jsx';

export default function PersonalInfoDone() {
    return (
        <div className="profile-edit-nannies d-flex flex-column min-vh-100">
            <HelpButton />
            <Logo />

            <div className="content flex-grow-1 d-flex align-items-center justify-content-center">
                <Row className="align-items-start justify-content-center g-5 m-0 w-100">
                    <Col
                        md={6}
                        xs={12}
                        className="d-flex flex-column align-items-center justify-content-center text-center"
                    >
                        <TextField fullWidth label="Όνομα" type="text" className="my-3" />
                        <TextField fullWidth label="Φύλο" type="text" className="my-3" />
                        <FormControl fullWidth className="my-3">
                            <InputLabel>Εκπαίδευση</InputLabel>
                            <Select defaultValue="">
                                <MenuItem value="Τριτοβάθμια εκπαίδευση">Τριτοβάθμια εκπαίδευση</MenuItem>
                                <MenuItem value="Δευτεροβάθμια εκπαίδευση">Δευτεροβάθμια εκπαίδευση</MenuItem>
                                <MenuItem value="Πρωτοβάθμια εκπαίδευση">Πρωτοβάθμια εκπαίδευση</MenuItem>
                                <MenuItem value="Άλλο">Άλλο</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField fullWidth label="Χρόνος απασχόλησης" type="text" className="my-3" />
                        <TextField fullWidth label="Συστατικές επιστολές" type="text" className="my-3" />
                        <TextField fullWidth label="Έτη προϋπηρεσίας" type="text" className="my-3" />
                        <TextField
                            fullWidth
                            label="Μέχρι πόσα παιδιά μπορείτε να αναλάβετε ταυτόχρονα"
                            type="text"
                            className="my-3"
                        />
                        <FormControl fullWidth className="my-3">
                            <InputLabel>Είστε καπνιστής;</InputLabel>
                            <Select defaultValue="">
                                <MenuItem value="ΝΑΙ">ΝΑΙ</MenuItem>
                                <MenuItem value="ΟΧΙ">ΟΧΙ</MenuItem>
                            </Select>
                        </FormControl>
                    </Col>
                    <Col
                        md={6}
                        xs={12}
                        className="d-flex flex-column align-items-center justify-content-center text-center"
                    >
                        <TextField fullWidth label="Επώνυμο" type="text" className="my-3" />
                        <Datepicker/>
                        <TextField fullWidth label="Διαθεσιμότητα" type="text" className="my-3" />
                        <TextField fullWidth label="Εμπειρία" type="text" className="my-3" />
                        <TextField fullWidth label="Λίγα λόγια για εσάς" type="text" className="my-3" />
                        <TextField fullWidth label="Τοποθεσία" type="text" className="my-3" />
                        <FormControl fullWidth className="my-3">
                            <InputLabel>Είστε διαθέσιμος να εργαστείτε σε σπίτι με κατοικίδια;</InputLabel>
                            <Select defaultValue="">
                                <MenuItem value="ΝΑΙ">ΝΑΙ</MenuItem>
                                <MenuItem value="ΟΧΙ">ΟΧΙ</MenuItem>
                            </Select>
                        </FormControl>
                        <button className="button-apply">Οριστική Υποβολή</button>
                    </Col>
                </Row>
            </div>
            <Footer />
        </div>
    );
}