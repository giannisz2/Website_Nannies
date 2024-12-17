import Logo from '../../components/buttons/Logo.jsx';
import Footer from '../../components/layout/Footer.jsx';
import HelpButton from '../../components/buttons/HelpButton.jsx';
import { Row, Col } from 'react-bootstrap';
import { Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';
import Datepicker from '../../components/layout/Datepicker.jsx';
import '../../styles/FirstStep.css'

export default function FirstStep() {
    return (
        <div className="profile-edit-nannies d-flex flex-column min-vh-100">
            <HelpButton />
            <Logo />
            <div class="stepper">
                <div class="step active">
                    <div class="circle">1</div>
                    <div class="label">ΣΤΟΙΧΕΙΑ</div>
                </div>
                <div class="step">
                    <div class="circle">2</div>
                </div>
                <div class="step">
                    <div class="circle">3</div>
                </div>
            </div>
            <div className="content flex-grow-1 d-flex align-items-center justify-content-center">
                <Row className="row">
                        <TextField fullWidth label="Όνομα" type="text" className="my-3" />
                        <TextField fullWidth label="Επώνυμο" type="text" className="my-3" />
                        <Col>
                        <TextField fullWidth label="Φύλο" type="text" className="my-3" />
                        </Col>
                        <Col>
                        <Datepicker/>
                        </Col>
                        <FormControl fullWidth className="my-3">
                            <InputLabel>Επίπεδο σπουδών~</InputLabel>
                            <Select defaultValue="">
                                <MenuItem value="Τριτοβάθμια εκπαίδευση">Τριτοβάθμια εκπαίδευση</MenuItem>
                                <MenuItem value="Δευτεροβάθμια εκπαίδευση">Δευτεροβάθμια εκπαίδευση</MenuItem>
                                <MenuItem value="Πρωτοβάθμια εκπαίδευση">Πρωτοβάθμια εκπαίδευση</MenuItem>
                                <MenuItem value="Άλλο">Άλλο</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField fullWidth label="Εμπειρία" type="text" className="my-3" />
                        <TextField fullWidth label="Συστατικές επιστολές~" type="text" className="my-3" />
                        
                        <p className="paragraph">Τα υπόλοιπα στοιχεία θα συμπληρώνονται αυτόματα από το Taxisnet</p>
                        <div className='buttons'>
                            <button className="button-temp">Προσωρινή Αποθήκευση</button>
                            <button className="button-apply">Υποβολή</button>
                        </div>
                    
                </Row>
            </div>
            <Footer />
        </div>
    );
}