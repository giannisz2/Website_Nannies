import * as React from 'react';
import NavBarNannies from '../../components/layout/NavbarNannies';
import HelpButton from '../../components/buttons/HelpButton';
import Footer from '../../components/layout/Footer'
import Breadcrumb from '../../components/layout/Breadcrumb';
import '../../styles/AgreementHistory.css'

export default function AgreementHistory(){
  return (<div id="AgreementHistory">
            <NavBarNannies className="nav-bar-nannies" />
            <HelpButton/>
            <div id="breadCrumb">
            <Breadcrumb label="Πληρωμές"/>
            </div>
            <div className='transactionBox'>
              <p className='header'>*Δώρο Χριστουγέννων*</p>
              <p className='text'>Το δώρο μπήκε στον τραπεζικό σας λογαριασμό!!!</p>
            </div>
            <div className='transactionBox'>
              <p className='header'>Πληρωμή μηνός Δεκεμβρίου</p>
              <p className='text'>Η πληρωμή σας για τον μήνα Δεκέμβριο πραγματοποιήθηκε επιτυχώς</p>
            </div>
            <div className='transactionBox'>
              <p className='header'>Πληρωμή μηνός Νοεμβρίου</p>
              <p className='text'>Η πληρωμή σας για τον μήνα Νοέμβριο πραγματοποιήθηκε επιτυχώς</p>
            </div>
            <Footer/>
          </div>
  );
}