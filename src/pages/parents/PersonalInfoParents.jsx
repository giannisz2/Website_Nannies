import Logo from '../../components/buttons/Logo.jsx';
import Footer from '../../components/layout/Footer.jsx';
import HelpButton from '../../components/buttons/HelpButton.jsx';
import { Row, Col } from 'react-bootstrap';
import { Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';
import '../../styles/PersonalInfoParents.css'
import Datepicker from '../../components/layout/Datepicker.jsx';

export default function PersonalInfoParents() {
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
                            <InputLabel>Αριθμός παιδιών</InputLabel>
                            <Select defaultValue="">
                                <MenuItem value="1">1</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="3">3</MenuItem>
                                <MenuItem value="4+">4+</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="Μέχρι πόσα παιδιά μπορείτε να αναλάβετε ταυτόχρονα"
                            type="text"
                            className="my-3"
                        />
                        
                    </Col>
                    <Col
                        md={6}
                        xs={12}
                        className="d-flex flex-column align-items-center justify-content-center text-center"
                    >
                        <FormControl fullWidth className="my-3">
                            <InputLabel>Αριθμός παιδιών από 6 μηνών έως 2.5 ετών</InputLabel>
                            <Select defaultValue="">
                                <MenuItem value="1">1</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="3">3</MenuItem>
                                <MenuItem value="4+">4+</MenuItem>
                            </Select>
                        </FormControl>
                        <label>Ημερομηνία Γέννησης:</label>
                        <Datepicker/>
                        <TextField fullWidth label="Τοποθεσία" type="text" className="my-3" />
                        <FormControl fullWidth className="my-3">
                            <InputLabel>Πόσα παιδιά θα βρσίκονται εκείνη τη στιγμή στο σπίτι;</InputLabel>
                            <Select defaultValue="">
                                <MenuItem value="1">1</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="3">3</MenuItem>
                                <MenuItem value="4+">4+</MenuItem>
                            </Select>
                        </FormControl>
                        
                    </Col>
                </Row>
            </div>
            
            <div className='buttons'>
                            <button className="button-temp">Προσωρινή Αποθήκευση</button>
                            <button className="button-apply">Υποβολή</button>
            </div>
            <Footer />
        </div>
        
    );
}