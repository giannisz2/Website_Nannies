import React from 'react';
import HomePage from './pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import SelectionCriteria from './pages/nannies/SelectionCriteria';
import AgreementHistory from './pages/nannies/AgreementHistory.jsx';
import NannyHomepage from './pages/nannies/NannyHomepage';
import ProfileEditNannies from './pages/nannies/ProfileEditNannies';
import PreviewPage from './pages/nannies/PreviewPage.jsx';
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import PersonalInfo from './pages/nannies/PersonalInfo';
import FirstStep from "./pages/nannies/FirstStep.jsx"
import PersonalInfoDone from './pages/nannies/PersonalInfoDone.jsx';
import SecondStep from './pages/nannies/SecondStep.jsx';
import SecondStepDone from './pages/nannies/SecondStepDone.jsx';
import ThirdStep from './pages/nannies/ThirdStep.jsx';
import SelectionCriteriaParents from './pages/parents/SelectionCriteriaParents.jsx';
import MeetingNanny from './pages/nannies/MeetingNanny.jsx';
import Rates from './pages/nannies/Rates.jsx';
import Agreement from './pages/nannies/Agreement.jsx';
import Voucher from './pages/nannies/Voucher.jsx';
import SearchNannies from './pages/parents/SearchNannies.jsx';
import PersonalInfoParentsDone from './pages/parents/PersonalInfoParentsDone.jsx';
import PersonalInfoParents from './pages/parents/PersonalInfoParents.jsx';
import ParentHomepage from './pages/parents/ParentHomepage.jsx';
import TransactionHistoryParents from './pages/parents/TransactionHistoryParents.jsx';
import RatesParents from './pages/parents/RatesParents.jsx'
import Stars from './pages/parents/stars.jsx'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/SelectionCriteria" element={<SelectionCriteria/>}/>
          <Route path="/AgreementHistory" element={<AgreementHistory/>}/>
          <Route path="/NannyHomepage" element={<NannyHomepage/>}/>
          <Route path="/ProfileEditNannies" element={<ProfileEditNannies/>}/>   {/*tipota*/}
          <Route path="/PersonalInfo" element={<PersonalInfo/>}/>
          <Route path="/PersonalInfoDone" element={<PersonalInfoDone/>}/>
          <Route path="/FirstStep" element={<FirstStep/>}/>          
          <Route path="/PreviewPage" element={<PreviewPage/>}/>
          <Route path="/SecondStep" element={<SecondStep/>}/>
          <Route path="/SecondStepDone" element={<SecondStepDone/>}/>
          <Route path="/ThirdStep" element={<ThirdStep/>}/>
          <Route path="/SelectionCriteriaParents" element={<SelectionCriteriaParents/>}/>
          <Route path="/MeetingNanny" element={<MeetingNanny/>}/>
          <Route path="/Rates" element={<Rates/>}/>
          <Route path="/Agreement" element={<Agreement/>}/>
          <Route path="/Voucher" element={<Voucher/>}/>
          <Route path='/SearchNannies' element={<SearchNannies/>}/>
          <Route path='/PersonalInfoParentsDone' element={<PersonalInfoParentsDone/>}/>
          <Route path='/PersonalInfoParents' element={<PersonalInfoParents/>}/>
          <Route path='/ParentHomepage' element={<ParentHomepage/>}/>
          <Route path='/TransactionHistoryParents' element={<TransactionHistoryParents/>}/>
          <Route path='/RatesParents' element={<RatesParents/>}/>
          <Route path='/Stars' element={<Stars/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
