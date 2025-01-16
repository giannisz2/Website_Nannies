import Favorite from '@mui/icons-material/Favorite'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NavBar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WalletIcon from '@mui/icons-material/Wallet';
import ParentImage from '../../assets/images/parents.jpeg'
import HelpButton from '../../components/buttons/HelpButton';
import '../../styles/SelectionCriteriaParents.css'

import { useNavigate } from 'react-router-dom';

export default function SelectionCriteriaParents() {

    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate('/SignUp'); 
    };


    return(<div id="SelectionCriteriaGoneis">
                <NavBar/>
                <p className="criteria">ΚΡΙΤΗΡΙΑ ΕΠΙΛΕΞΙΜΟΤΗΤΑΣ</p>
                <HelpButton />
                <img id="parentsImage" src={ParentImage} alt="Parents and kids"></img>
                <div className='P'>
                    <Favorite id="icons"/>
                    <div>
                        <p className='this_text1'>Βρες τη νταντά σου!</p>
                        <p className='text2'>Mπορείτε τώρα να εντοπίσετε 
                                        έμπιστες νταντάδες που έχουν αξιολογηθεί και εγκριθεί.
                                         Απλώς αναζητήστε σύμφωνα με τις ανάγκες της οικογένειάς σας
                                          και βρείτε την κατάλληλη επαγγελματία για τα παιδιά σας.</p>
                    </div>
                </div>
                <div className='P'>
                    <AccountCircleIcon id="icons"/>
                    <div>
                        <p className='this_text1'>Δημιούργησε το προφίλ σου</p>
                        <p className='text2'>Για να ξεκινήσετε, συμπληρώστε βασικές πληροφορίες σχετικά με 
                                        την οικογένεια και τις ανάγκες σας. Αυτό θα βοηθήσει την πλατφόρμα να σας 
                                        προτείνει τις καλύτερες επιλογές και να διευκολύνει την
                                        επικοινωνία με τις νταντάδες. Αρκεί να πληρείτε τα οικονομικά κριτήρια και 
                                        να μένετε στις περιοχές που λειτουργεί το πρόγραμμα.</p>
                    </div>
                </div>
                <div className='P'>
                    <EditCalendarIcon id="icons"/>
                    <div>
                        <p className='this_text1'>Κλείσε τα Ραντεβού σου</p>
                        <p className='text2'>Αφού βρείτε την κατάλληλη νταντά, επικοινωνήστε μαζί της για να συζητήσετε 
                                            τις λεπτομέρειες και να προγραμματίσετε μια συνάντηση γνωριμίας.</p>
                    </div>
                </div>
                <div className='P'>
                    <PeopleAltIcon id="icons"/>
                    <div>
                        <p className='this_text1'>Υπογράψτε την συμφωνία σου</p>
                        <p className='text2'>Όλες οι υπηρεσίες είναι διαφανείς και ρυθμίζονται μέσω συμβάσεων που διασφαλίζουν 
                                            τόσο τη δική σας προστασία όσο και της νταντάς.</p>
                    </div>
                </div>
                <div className='P'>
                    <WalletIcon id="icons"/>
                    <div>
                        <p className='this_text1'>Διατηρήστε τον έλεγχο της φροντίδας των παιδιών σου</p>
                        <p className='text2'>Η πλατφόρμα προσφέρει ασφαλείς και δοκιμασμένες λύσεις για να νιώθετε 
                                    σιγουριά κάθε στιγμή που εμπιστεύεστε τα παιδιά σας σε επαγγελματίες.</p>
                    </div>
                </div>
                <div className='signIn'>
                    <p className='this_text1'>Βρείτε νταντά κάνοντας εγγραφή!</p>
                    <button className='signInButton' onClick={handleSignUp}>Εγγραφή!</button>
                </div>
                <Footer/>
            </div>
    )
}
