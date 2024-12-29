import NavBarParents from '../../components/layout/NavBarParents'
import Footer from '../../components/layout/Footer'
import HelpButton from '../../components/buttons/HelpButton'
import { Row, Col } from 'react-bootstrap';
import { Select, MenuItem, TextField, InputLabel, FormControl, Button } from '@mui/material';
import '../../styles/AgreementExpiration.css'

export default function AgreementExpiration() {

    return(<div>
            <NavBarParents/>
            <p className='top-text'>Λήξη Συμφωνητικού</p>
            <HelpButton/>
            <Row>
                <Col>
                <p className='text'>Εγώ ο/η</p>
                </Col>
                <Col>
                <TextField fullWidth className='text-field' placeholder={"ΠΕΤΡΟΣ ΑΝΑΣΤΑΣΙΟΥ  (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΌΜΑΤΑ ΑΠΟ ΤΟ ΣΥΣΤΗΜΑ)"}/>
                </Col>
            </Row>
            <Row>
                <Col>
                <p className='text'>Που μένω στην διεύθυνση</p>
                </Col>
                <Col>
                <TextField fullWidth className='text-field' placeholder={"ΠΑΠΑΓΡΗΓΟΡΙΟΥ 7, 11855, ΑΘΗΝΑ  (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΌΜΑΤΑ ΑΠΟ ΤΟ ΣΥΣΤΗΜΑ )"}/>
                </Col>
            </Row>
            <Row>
                <Col>
                <p className='text'>με κινητό τηλέφωνο</p>
                </Col>
                <Col>
                <TextField fullWidth className='text-field' placeholder={"+44 592 410 845 (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΌΜΑΤΑ ΑΠΟ ΤΟ ΣΥΣΤΗΜΑ )"}/>
                </Col>
            </Row>
            <Row>
                <Col>
                <p className='text'>και email</p>
                </Col>
                <Col>
                <TextField fullWidth className='text-field' placeholder={"panastasiou@gmail.com (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΌΜΑΤΑ ΑΠΟ ΤΟ ΣΥΣΤΗΜΑ )"}/>
                </Col>
            </Row>
            <Row>
                <Col>
                <p className='text'>Θα ήθελα να ΔΙΑΚΟΨΩ την συνεργασία μου με τον/την</p>
                </Col>
                <Col>
                <TextField fullWidth className='text-field' placeholder={"ΜΑΡΙΑ ΜΩΜΜΟΥ  (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΌΜΑΤΑ ΑΠΟ ΤΟ ΣΥΣΤΗΜΑ )"}/>
                </Col>
            </Row>
            <Row>
                <Col>
                <p className='text'>που διαμένει στην</p>
                </Col>
                <Col>
                <TextField fullWidth className='text-field' placeholder={"ΚΥΨΕΛΗ  (ΘΑ ΣΥΜΠΛΗΡΩΝΕΤΑΙ ΑΥΤΌΜΑΤΑ ΑΠΟ ΤΟ ΣΥΣΤΗΜΑ )"}/>
                </Col>
            </Row>
            <Row>
                <Col>
                <p className='text'>και εργάζεται στην κατοικία μου</p>
                </Col>
                <Col>
                <input type='checkbox' className='checkbox'/>
                </Col>
            </Row>
            <Row>
                <Col>
                <p className='text'>με</p>
                </Col>
                <Col>
                <TextField fullWidth className='text-field' placeholder={"ΠΛΗΡΕΣ ΩΡΑΡΙΟ"}/>
                </Col>
            </Row>
            <Row>
                <Col>
                <p className='text'>ΕΙΜΑΙ ΣΙΓΟΥΡΟΣ ΟΤΙ ΘΕΛΩ ΝΑ ΔΙΑΚΟΨΩ ΤΗΝ ΔΙΑΔΙΚΑΣΙΑ</p>
                </Col>
                <Col>
                <input type='checkbox' className='checkbox'/>
                </Col>
            </Row>
            <button type="button" className="button-apply">
                Υποβολή
            </button>
            <p className='side-button'>ΘΑ ΗΘΕΛΑ ΝΑ ΑΝΑΝΕΩΣΩ ΤΟ ΣΥΜΒΟΛΑΙΟ</p>
            <Footer/>
            </div>);
}