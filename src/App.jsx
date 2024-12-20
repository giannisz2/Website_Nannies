import HomePage from './pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import SelectionCriteria from './pages/nannies/SelectionCriteria';
import TransactionHistory from './pages/nannies/TransactionHistory';
import NannyHomepage from './pages/nannies/NannyHomepage';
import ProfileEditNannies from './pages/nannies/ProfileEditNannies';
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import PersonalInfo from './pages/nannies/PersonalInfo';
import Login from './components/authentication/Login'
import Test from './pages/test.jsx';
import FirstStep from "./pages/nannies/FirstStep.jsx"
import PersonalInfoDone from './pages/nannies/PersonalInfoDone.jsx';
import SecondStep from './pages/nannies/SecondStep.jsx';
import ThirdStep from './pages/nannies/ThirdStep.jsx';
import SelectionCriteriaGoneis from './pages/parents/SelectionCriteriaGoneis.jsx';
import MeetingNanny from './pages/nannies/MeetingNanny.jsx';
import React from 'react';
import TestCalendar from './pages/nannies/TestCalendar.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/SelectionCriteria" element={<SelectionCriteria/>}/>
          <Route path="/TransactionHistory" element={<TransactionHistory/>}/>
          <Route path="/NannyHomepage" element={<NannyHomepage/>}/>
          <Route path="/ProfileEditNannies" element={<ProfileEditNannies/>}/>
          <Route path="/PersonalInfo" element={<PersonalInfo/>}/>
          <Route path="/PersonalInfoDone" element={<PersonalInfoDone/>}/>
          <Route path="/FirstStep" element={<FirstStep/>}/>
          <Route path="/test" element={<Test/>}/>
          <Route path="/SecondStep" element={<SecondStep/>}/>
          <Route path="/ThirdStep" element={<ThirdStep/>}/>
          <Route path="/SelectionCriteriaGoneis" element={<SelectionCriteriaGoneis/>}/>
          <Route path="/MeetingNanny" element={<MeetingNanny/>}/>
          <Route path="/TestCalendar" element={<TestCalendar/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
