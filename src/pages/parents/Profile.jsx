import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import { useParams, useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../providers/firebaseConfig";
import SidebarFilters from "../../components/layout/SidebarRO";
import NavBarParents from "../../components/layout/NavBarParents";
import Footer from "../../components/layout/Footer";
import { Row, Col } from 'react-bootstrap';
import { TextField } from '@mui/material';
import Breadcrumb from "../../components/layout/BreadcrumbSearchNannies";
import HelpButton from '../../components/buttons/HelpButton';
import "../../styles/SearchNannies.css";
import "../../styles/NanniesProfile.css";
import '../../styles/PopUp.css';
import HoursPicker from "../../components/layout/Hourspicker";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { collection, query, where, getDocs } from "firebase/firestore";
import {  addDoc } from "firebase/firestore";
import {  useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});




export default function NanniesProfile() {
    const { id } = useParams();
    const location = useLocation();
    const [nanny, setNanny] = useState(location.state || null);
    const [loading, setLoading] = useState(!nanny);
    const [error, setError] = useState(null);
    
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [availableHours, setAvailableHours] = useState([]);

    const [childrenCount, setChildrenCount] = useState(""); 
    const [hasExistingBooking, setHasExistingBooking] = useState(false);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("error");

    const navigate = useNavigate();


    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const [parent, setParent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Ανάκτηση δεδομένων νταντάς
                if (!nanny) {
                    const docRef = doc(db, "users", id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setNanny({ id, ...docSnap.data() });
                    } else {
                        setError("Η νταντά δεν βρέθηκε.");
                    }
                }
    
                
                const userId = localStorage.getItem("userId");
                if (!userId) {
                    console.error("User ID is not available in localStorage");
                    return;
                }
    
                const parentRef = doc(db, "Parent", userId);
                const parentSnap = await getDoc(parentRef);
    
                if (parentSnap.exists()) {
                    const parentData = parentSnap.data();
                    setParent(parentData);
    
                    
                    const bookingQuery = query(
                        collection(db, "bookings"),
                        where("nannyId", "==", nanny.id),
                        where("parentPhone", "==", parentData.phone)
                    );
                    const querySnapshot = await getDocs(bookingQuery);
                    console.log("Booking Query Results: ", querySnapshot.docs.map(doc => doc.data()));


                    if (!querySnapshot.empty) {
                        console.log("Existing booking found");
                        setHasExistingBooking(true);
                    } else {
                        console.log("No existing booking found");
                        setHasExistingBooking(false);
                    }
                    
                } else {
                    console.error("Δεν βρέθηκαν δεδομένα γονέα.");
                }
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Σφάλμα κατά τη λήψη δεδομένων.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [id, nanny]);
    
    

    const [show, setShow] = useState(false);
    const togglePopUp = () => setShow(!show);

    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);  
    };

    const [successMessage, setSuccessMessage] = useState(false);

    const handleSendMessage = () => {
        setSuccessMessage(true);
        setShow(false);
        setTimeout(() => {
            setSuccessMessage(false);
        }, 3000);
    };

    

    const handleDateChange = (date) => {
        const selectedDay = date.toISOString().split("T")[0];
    
        if (nanny.availableDate?.some(d => d.startsWith(selectedDay))) {
            
            const fromHour = new Date(nanny.availableTimeFrom).getHours();
            const toHour = new Date(nanny.availableTimeTo).getHours();
    
            
            const hours = [];
            for (let i = fromHour; i < toHour; i++) {
                hours.push(`${i}:00 - ${i + 1}:00`);
            }
            console.log("Available Time From:", nanny.availableTimeFrom);
            console.log("Available Time To:", nanny.availableTimeTo);
            console.log("Calculated Hours:", hours);

            setAvailableHours(hours);
        } else {
            setAvailableHours([]);
        }
        setSelectedDate(selectedDay);
    };
    
    const handleSendRequest =() =>{
        navigate('/TempAgreement', {
            state: {
                nannyName: `${nanny.name} ${nanny.surname}`,
                nannyAddress: nanny.location,
                nannyEmploymentTime: nanny.employmentTime,
            },
        });
    };


    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };

    if (loading) {
        return <p>Φόρτωση δεδομένων...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const breadcrumbLinks = [
        { label: 'Αναζήτηση Νταντάδων', path: '/SearchNannies' },
    ];

    const handleDownload = () => {
        const fileUrl = 'path/to/your/recommendation-letter.pdf';
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = 'Συστατική-Επιστολή.pdf'; 
        link.click(); 
    };

    const handleRateNanny = () => {
        navigate('/RatesParents', {
            state: {
                nannyId: nanny.id,
                nannyName: `${nanny.name} ${nanny.surname}`,
                nannySurname: nanny.surname
            }
        });
    };



    const handleBooking = async () => {
        if (!childrenCount.trim()) {
            setSnackbarMessage("Παρακαλώ συμπληρώστε πόσα παιδιά έχετε.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }
        if (!selectedDate || !selectedTime) {
            setSnackbarMessage("Παρακαλώ επιλέξτε ημερομηνία και ώρα.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }

        const bookingData = {
            parentName: parent.name ,
            parentSurname: parent.surname, 
            parentPhone: parent.phone, 
            nannyName: nanny.name ,
            nannySurname: nanny.surname,
            nannyId: nanny.id,
            date: selectedDate,
            time: selectedTime,
            childrenCount: childrenCount,
            pets: parent.pets,
        };

        try {
            const bookingRef = await addDoc(collection(db, "bookings"), bookingData);
            console.log("Booking added with ID: ", bookingRef.id);
            setSnackbarMessage("Το ραντεβού σας καταχωρήθηκε με επιτυχία!");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
        } catch (error) {
            console.error("Error adding booking: ", error);
            setSnackbarMessage("Σφάλμα κατά την καταχώρηση του ραντεβού.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };




    return (
        <>
            <NavBarParents className="navbar" />
            <HelpButton />
            <div className="search-result-nannies-container">
                <SidebarFilters
                    className="sidebar"
                    defaultFilters={{
                        name: nanny.name,
                        age: nanny.age,
                        specialization: nanny.experience,
                        experience: nanny.experienceYears ,
                        studies: nanny.educationLevel,
                        employmentTime: nanny.employmentTime
                        
                    }}
                    disabled={true}
                />
                {successMessage && (
                    <div className="success-message">
                        Το μήνυμα στάλθηκε με επιτυχία!
                    </div>
                )}

                <Row>
                    <Col md={7}>
                        <div className="profil-list">
                            <div className="breadCrumb">
                                <Breadcrumb links={breadcrumbLinks} label={`${nanny.name} ${nanny.surname}`}/>  
                            </div>                          
                            <div className="profil-card">
                                <div className="profil-content">
                                    <div className="profil-image">
                                        <img src={nanny.imageUrl || "/path/to/placeholder.png"} alt={nanny.name} />
                                    </div>
                                    <div className="profil-info">
                                        <h2>{`${nanny.name} ${nanny.surname}`}</h2>
                                        <p>Ηλικία: {nanny.age}</p>
                                        <p>Εξειδίκευση: {nanny.experience}</p>
                                        <p>Εμπειρία: {nanny.experienceYears} χρόνια</p>
                                        <p>Σπουδές: {nanny.educationLevel}</p>
                                        <p>Τύπος απασχόλησης: {nanny.employmentTime === 'full-time' ? 'Πλήρης Απασχόληση' : 'Μερική Απασχόληση'}</p>
                                        <p>{nanny.bio}</p>
                                        <div className="button-container">
                                            <button className="talk-button" onClick={togglePopUp}>
                                                <span className="icon">💬</span> Μίλα με την νταντά
                                            </button>
                                            {show && (
                                                <div className="popup-overlay">
                                                    <div className="popup">
                                                        <button className="close-btn" onClick={togglePopUp}>
                                                            &times;
                                                        </button>
                                                        <TextField fullWidth label="Το μήνυμά σου..." type="text" className="popup_text" />
                                                        <div className="popup-buttons">
                                                            <button className="cancel-btn" onClick={togglePopUp}>
                                                                Ακύρωση
                                                            </button>
                                                            <button className="send-btn" onClick={handleSendMessage}>
                                                                Αποστολή
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <button className="rate-button" onClick={handleRateNanny}>
                                                <span className="icon">⭐</span> Αξιολόγησε τη νταντά
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="additional-boxes">
                                <div className="info-box">
                                    <h3>Εμπειρία</h3>
                                    <p>Έχω εργαστεί ήδη 3 χρόνια σαν νταντά και 8 χρόνια σε παιδότοπο.</p>
                                </div>
                                <div className="info-box">
                                    <h3>Επίπεδο Σπουδών</h3>
                                    <p>Έχω πτυχίο από το Τμήμα Δημοτικής Εκπαίδευσης του Πανεπιστημίου Αθηνών.
                                        Γνωρίζω Μουσική και κάνω σεμινάρια Μουσικοκινητικής Αγωγής.
                                        Έχω το πτυχίο του Proficiency και αν η οικογένεια επιθυμεί μπορώ να επικοινωνώ με το παιδί αποκλειστικά στα Αγγλικά.</p>
                                </div>
                            </div>
                            <button className="button-recommendations" onClick={handleDownload}>
                                Συστατικές Επιστολές
                            </button>
                        </div>
                    </Col>
                    <Col md={5}>
                    <div className="center-container">
                        {hasExistingBooking ? (
                            <div className="message-container">
                               
                            </div>
                            
                        ) : (
                            <>
                                <div className="header-meet"> ΚΡΑΤΗΣΗ ΡΑΝΤΕΒΟΥ</div>
                                <Calendar
                                    onChange={handleDateChange}
                                    value={selectedDate}
                                    tileDisabled={({ date }) =>
                                        !nanny.availableDate?.some(d =>
                                            d.startsWith(date.toISOString().split("T")[0])
                                        )
                                    }
                                />

                                {availableHours.length > 0 ? (
                                    <div className="time-picker">
                                        {availableHours.map((hour, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleTimeChange(hour)}
                                                className={selectedTime === hour ? "selected-time" : ""}
                                            >
                                                {hour}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <p>Δεν υπάρχουν διαθέσιμες ώρες.</p>
                                )}

                                {selectedTime && <p>Επιλέξατε ώρα: {selectedTime}</p>}

                                <div className="info-box-children">
                                    <span>Έχω</span>
                                    <input
                                        className="children-input"
                                        type="text"
                                        placeholder="Συμπληρώστε τον αριθμό"
                                        value={childrenCount}
                                        onChange={(e) => setChildrenCount(e.target.value)}
                                    />
                                    <span>παιδιά</span>
                                </div>

                                <div className="pets">
                                    <span className="span-text">Έχω κατοικίδιο</span>
                                    <input
                                        className="checkbox"
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="button-apply-pc"
                                    onClick={handleBooking}
                                >
                                    Κλείσε ραντεβού
                                </button>
                            </>
                        )}
                        {hasExistingBooking && (
                        <div className="booking-message">
                            <div className="center-container">
                                <div className="header-meet"> ΚΡΑΤΗΣΗ ΡΑΝΤΕΒΟΥ</div>
                                <div className="this_text"> !!! Έχεις ήδη κάνει το το ραντέβου που δικαιούσαι με την συγκεκριμένη επαγγελματία</div>
                                <div className="info-box-children2">
                                    <ch3>Έχω 3 παιδιά</ch3>
                                </div>
                                <div className="pets">
                                    <span className='span-text'>Έχω κατοικίδιο</span>
                                        <input
                                            className='checkbox' 
                                            type="checkbox" 
                                            disabled
                                        />
                                </div>
                                <button type="button" className="button-apply-pc" onClick={handleSendRequest}>Δείξε το ενδιαφέρον σου για να συνεργαστείτε</button>
                            </div>
                        </div>
                    )}

                    </div>
                </Col>

                </Row>
            </div>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
                            

            <Footer />
        </>
    );
}
