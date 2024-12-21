import Logo from '../../components/buttons/Logo.jsx';
import Footer from '../../components/layout/Footer.jsx';
import HelpButton from '../../components/buttons/HelpButton.jsx';
import { Row, Col } from 'react-bootstrap';
import { Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';
import Datepicker from '../../components/layout/Datepicker.jsx';
import '../../styles/ThirdStep.css'
import Timepicker from '../../components/layout/Timepicker.jsx';

export default function ThirdStep() {
    return (
        <div className="profile-edit-nannies d-flex flex-column min-vh-100">
            <HelpButton />
            <Logo />
            <div class="stepper">
                <div class="step">
                    <div class="circle">1</div>
                </div>
                <div class="step">
                    <div class="circle">2</div>
                    
                </div>
                <div class="step active">
                    <div class="circle">3</div>
                    <div class="label">ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ ΣΥΝΑΝΤΗΣΗΣ</div>
                </div>
            </div>
            <div className="content flex-grow-1 d-flex align-items-center justify-content-center">
                <Row className="row">
                        <TextField fullWidth label="Κινητό" type="text" className="my-3" />
                        <TextField fullWidth label="Επιτρέπω τη πρόσβαση στο κινητό μου τηλέφωνο σε:" type="text" className="my-3" />
                        <p>Ποιες μέρες/ώρες είσαι διαθέσιμος/η να σε καλέσουν;</p>
                        <Datepicker/>
                        <Timepicker/>                                                                   
                        <div className='buttons'>
                            <button className="button-apply">Υποβολή</button>
                        </div>
                </Row>
            </div>
            <Footer />
        </div>
    );
}