import Favorite from '@mui/icons-material/Favorite'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NavBar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WalletIcon from '@mui/icons-material/Wallet';
import NannyImage from '../../assets/images/nannies.jpg'
import HelpButton from '../../components/buttons/HelpButton';
import '../../styles/SelectionCriteria.css'

import { useNavigate } from 'react-router-dom';

export default function SelectionCriteria() {

    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate('/FirstStep'); // Ανακατευθύνει στη σελίδα FirstStep
    };


    return(<div id="SelectionCriteria">
                <NavBar/>
                <HelpButton />
                <img id="nannyImage" src={NannyImage} alt="Nanny and kids"></img>
                <div className='P'>
                    <Favorite id="icons"/>
                    <div>
                        <p className='this_text1'>Αγαπάς τα Παιδιά;</p>
                        <p className='text2'>Τώρα μπορείς να προσέχεις παιδιά όταν οι γονείς τους λείπουν 
                            είτε με μερική είτε με πλήρη απασχόληση και να τους προσφέρεις 
                            την αγάπη και την  φροντίδα που χρειάζονται.</p>
                    </div>
                </div>
                <div className='P'>
                    <AccountCircleIcon id="icons"/>
                    <div>
                        <p className='this_text1'>Δημιούργησε το προφίλ σου</p>
                        <p className='text2'>Είναι πολύ εύκολο να δημιουργήσεις και να δημοσιεύσεις ένα 
                                                προφίλ, ώστε να ξεκινήσεις να προσέχεις παιδάκια. 
                                                Βήμα προς βήμα θα συμπληρώσεις τις απαραίτητες 
                                                πληροφορίες ώστε να φτιάξεις ένα 
                                                ελκυστικό προφίλ που θα σε κάνει να ξεχωρίζεις. 
                                                Πρόσεχε μόνο πριν ξεκινήσεις να έχεις επισκεφτεί 
                                                έναν καρδιολόγο και έναν δερματολόγο σε ένα δημόσιο 
                                                νοσοκομείο ή κεντρο υγείας και να έχεις 
                                                τις πιστοποιήσεις σου σε φωτογραφία.</p>
                    </div>
                </div>
                <div className='P'>
                    <EditCalendarIcon id="icons"/>
                    <div>
                        <p className='this_text1'>Κλείσε τα Ραντεβού σου</p>
                        <p className='text2'>Μετά τη δημιουργία του προφίλ σου, 
                            μπορείς εύκολα να προγραμματίσεις τα ραντεβού σου μέσω της πλατφόρμας μας. 
                            Είτε  μέσω τηλεφώνου είτε μέσω βιντεοκλήσης.</p>
                    </div>
                </div>
                <div className='P'>
                    <PeopleAltIcon id="icons"/>
                    <div>
                        <p className='this_text1'>Κλείσε την συμφωνία σου</p>
                        <p className='text2'>Μόλις βρεις την κατάλληλη για εσένα οικογένεια, 
                            έχεις την δυνατότητα να συνάψεις συμφωνία μαζί τους μέσω της πλατφόρμας μας.</p>
                    </div>
                </div>
                <div className='P'>
                    <WalletIcon id="icons"/>
                    <div>
                        <p className='this_text1'>Πώς θα παίρνεις την αμοιβή σου</p>
                        <p className='text2'>Η πληρωμή σου γίνεται μέσω της πλατφόρμας και συγκεκριμένα μέσω 
                            voucher που θα καταθέτονται στον λογαριασμό σου κάθε μήνα, 
                            αρκεί να μπαίνεις να επιβεβαιώνεις την παροχή των υπηρεσιών σου.</p>
                    </div>
                </div>
                <div className='signIn'>
                    <p className='this_text1'>Γίνε μια από τις νταντάδες μας!</p>
                    <button className='signInButton' onClick={handleSignUp}>Εγγραφή!</button>
                </div>
                <Footer/>
            </div>
    )
}
