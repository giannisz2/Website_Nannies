import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Routes, Route, BrowserRouter} from 'react-router-dom';


import HomePage from './pages/HomePage';
import SelectionCriteria from './pages/nannies/SelectionCriteria';
import AgreementHistory from './pages/nannies/AgreementHistory.jsx';
import NannyHomepage from './pages/nannies/NannyHomepage';
import PreviewPage from './pages/nannies/PreviewPage.jsx';
import PersonalInfo from './pages/nannies/PersonalInfo';
import FirstStep from "./pages/nannies/FirstStep.jsx"
import PersonalInfoDone from './pages/nannies/PersonalInfoDone.jsx';
import SecondStep from './pages/nannies/SecondStep.jsx';
import ThirdStep from './pages/nannies/ThirdStep.jsx';
import SelectionCriteriaParents from './pages/parents/SelectionCriteriaParents.jsx';
import MeetingNanny from './pages/nannies/MeetingNanny.jsx';
import Rates from './pages/nannies/Rates.jsx';
import Agreement from './pages/nannies/Agreement.jsx';
import TransactionHistory from './pages/nannies/TransactionHistory.jsx';
import Voucher from './pages/nannies/Voucher.jsx';
import Voucher2 from './pages/nannies/Voucher2.jsx';
import Message from './pages/nannies/Message.jsx';
import SearchNannies from './pages/parents/SearchNannies.jsx';
import NanniesProfile from './pages/parents/NanniesProfile.jsx';


import NanniesProfileOthers from './pages/parents/NanniesProfileOthers.jsx';

import NanniesProfileDone from './pages/parents/NanniesProfileDone.jsx';
import PersonalInfoParentsDone from './pages/parents/PersonalInfoParentsDone.jsx';
import PersonalInfoParents from './pages/parents/PersonalInfoParents.jsx';
import ParentHomepage from './pages/parents/ParentHomepage.jsx';
import TransactionHistoryParents from './pages/parents/TransactionHistoryParents.jsx';
import RatesParents from './pages/parents/RatesParents.jsx'
import RatesSubmits from './pages/parents/RatesSubmits.jsx'
import SignUp from './pages/parents/SignUp.jsx'
import PreviewParents from './pages/parents/PreviewParents.jsx'
import MessageParents from './pages/parents/MessageParents.jsx'
import ParentsAgreement from './pages/parents/ParentsAgreement.jsx';
import NewPayment from './pages/parents/NewPayment.jsx';
import PaymentDone from './pages/parents/PaymentDone.jsx';
import AgreementExpiration from './pages/parents/AgreementExpiration.jsx';
import AgreementRenewal from './pages/parents/AgreementRenewal.jsx';
import PreviewAgreement from './pages/parents/PreviewAgreement.jsx'
import TempAgreement from './pages/parents/TempAgreement.jsx';
import SignInPopup from './components/popups/SignInPopup.jsx';
import AgreementHistoryParents from './pages/parents/AgreementHistoryParents.jsx';


function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/SelectionCriteria" element={<SelectionCriteria/>}/>
          <Route path="/AgreementHistory" element={<AgreementHistory/>}/>
          <Route path="/AgreementHistoryParents" element={<AgreementHistoryParents/>}/>
          <Route path="/TransactionHistory" element={<TransactionHistory/>}/>
          <Route path="/NannyHomepage" element={<NannyHomepage/>}/>
          <Route path="/Message" element={<Message/>}/>    
          <Route path="/PersonalInfo" element={<PersonalInfo/>}/>
          <Route path="/PersonalInfoDone" element={<PersonalInfoDone/>}/>
          <Route path="/FirstStep" element={<FirstStep/>}/>          
          <Route path="/PreviewPage" element={<PreviewPage/>}/>
          <Route path="/SecondStep" element={<SecondStep/>}/>
          <Route path="/ThirdStep" element={<ThirdStep/>}/>
          <Route path="/SelectionCriteriaParents" element={<SelectionCriteriaParents/>}/>
          <Route path="/MeetingNanny" element={<MeetingNanny/>}/>
          <Route path="/Rates" element={<Rates/>}/>
          <Route path="/Agreement" element={<Agreement/>}/>
          <Route path="/Voucher" element={<Voucher/>}/>
          <Route path="/Voucher2" element={<Voucher2/>}/>
          <Route path='/SearchNannies' element={<SearchNannies/>}/>     
          <Route path='/NanniesProfile' element={<NanniesProfile/>}/>   
          <Route path='/NanniesProfileDone' element={<NanniesProfileDone/>}/>  
          <Route path='/PersonalInfoParentsDone' element={<PersonalInfoParentsDone/>}/>
          <Route path='/PersonalInfoParents' element={<PersonalInfoParents/>}/>
          <Route path='/ParentHomepage' element={<ParentHomepage/>}/>
          <Route path='/TransactionHistoryParents' element={<TransactionHistoryParents/>}/>
          <Route path='/RatesParents' element={<RatesParents/>}/>
          <Route path='/RatesSubmits' element={<RatesSubmits/>}/>
          <Route path='/MessageParents' element={<MessageParents/>}/>  
          <Route path='/NewPayment' element={<NewPayment/>}/>     
          <Route path='/PaymentDone' element={<PaymentDone/>}/>
          <Route path='/PreviewParents' element={<PreviewParents/>}/>
          <Route path='/SignUp' element={<SignUp/>}/>
          <Route path='/ParentsAgreement' element={<ParentsAgreement/>}/>
          <Route path='/AgreementExpiration' element={<AgreementExpiration/>}/>
          <Route path='/AgreementRenewal' element={<AgreementRenewal/>}/>
          <Route path='/PreviewAgreement' element={<PreviewAgreement/>}/>
          <Route path='/TempAgreement' element={<TempAgreement/>}/>
          <Route path='/SignInPopup' element={<SignInPopup/>}/>
          <Route path='/NanniesProfileOthers' element={<NanniesProfileOthers/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
