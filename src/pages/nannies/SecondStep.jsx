import Logo from '../../components/buttons/Logo.jsx';
import Footer from '../../components/layout/Footer.jsx';
import HelpButton from '../../components/buttons/HelpButton.jsx';
import { Row, Col } from 'react-bootstrap';
import { Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';
import Datepicker from '../../components/layout/Datepicker.jsx';
import '../../styles/SecondStep.css'


import { useNavigate } from 'react-router-dom';


export default function SecondStep() {

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/ThirdStep');  
    };


    return (
        <div className="profile-edit-nannies d-flex flex-column min-vh-100">
            <HelpButton />
            <Logo />
            <div class="stepper">
                <div class="step">
                    <div class="circle">1</div>
                </div>
                <div class="step active">
                    <div class="circle">2</div>
                    <div class="label">ΔΗΜΙΟΥΡΓΙΑ ΑΓΓΕΛΙΑΣ & ΟΡΙΣΤΙΚΗ ΥΠΟΒΟΛΗ</div>
                </div>
                <div class="step">
                    <div class="circle">3</div>
                </div>
            </div>
            <div className="content flex-grow-1 d-flex align-items-center justify-content-center">
                <Row className="row">
                        <TextField fullWidth label="Διαθεσιμότητα" type="text" className="my-3" />
                        <FormControl fullWidth className="my-3">
                            <InputLabel>Χρόνος Απασχόλησης</InputLabel>
                            <Select defaultValue="">
                                <MenuItem value="Μερική">Μερική</MenuItem>
                                <MenuItem value="Πλήρης">Πλήρης</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField fullWidth label="Τοποθεσία" type="text" className="my-3" />
                        <Col>
                        <FormControl fullWidth className="my-3">
                            <InputLabel>Έτη προϋπηρεσίας</InputLabel>
                            <Select defaultValue="">
                                <MenuItem value="1">0</MenuItem>
                                <MenuItem value="2">1</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="2">3</MenuItem>
                                <MenuItem value="Άλλο">4+</MenuItem>
                            </Select>
                        </FormControl>
                        </Col>
                        <Col>
                        <FormControl fullWidth className="my-3">
                            <InputLabel>Μέχρι πόσα παιδια μπορείτε να αναλάβετε;</InputLabel>
                            <Select defaultValue="">
                                <MenuItem value="2">1</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="2">3</MenuItem>
                                <MenuItem value="Άλλο">4+</MenuItem>
                            </Select>
                        </FormControl>
                        </Col>
                        <Row className='row'/>
                        <Col>
                        <FormControl fullWidth className="my-3">
                            <InputLabel>Είστε διατεθειμένος να εργαστείτε σε σπίτι με κατοικίδια ζώα;</InputLabel>
                            <Select defaultValue="">
                                <MenuItem value="ΝΑΙ">NAI</MenuItem>
                                <MenuItem value="ΟΧΙ">OXI</MenuItem>
                            </Select>
                        </FormControl>
                        </Col>
                        <Col>
                        <FormControl fullWidth className="my-3">
                            <InputLabel>Είστε καπνιστής;</InputLabel>
                            <Select defaultValue="">
                                <MenuItem value="ΝΑΙ">NAI</MenuItem>
                                <MenuItem value="ΟΧΙ">OXI</MenuItem>
                            </Select>
                        </FormControl>
                        </Col>
                        <TextField fullWidth label="Λίγα λόγια για εσάς..." type="text" className="my-3" />                     
                        <div className='buttons'>
                            <button className="button-temp">Προσωρινή Αποθήκευση</button>
                            <button className='button-apply' onClick={handleSubmit}>Υποβολή</button>
                        </div>
                </Row>
            </div>
            <Footer />
        </div>
    );
}
