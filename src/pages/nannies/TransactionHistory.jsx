import * as React from 'react';
import NavBarNannies from '../../components/layout/NavbarNannies';
import HelpButton from '../../components/buttons/HelpButton';
import Footer from '../../components/layout/Footer'
import Breadcrumb from '../../components/layout/Breadcrumb';
import '../../styles/TransactionHistory.css'

export default function TransactionHistory(){
  return (<div id="TransactionHistory">
            <NavBarNannies className="nav-bar-nannies" />
            <HelpButton/>
            <div id="breadCrumb">
            <Breadcrumb/>
            </div>
            <div className='transactionBox'>
              <p className='header'>Συμφωνητικό #4</p>
              <p className='text'>10/06/2024 με τον Κώστα Παπαδόπουλο</p>
            </div>
            <div className='transactionBox'>
              <p className='header'>Συμφωνητικό #3</p>
              <p className='text'>25/09/2023 με την Ελευθερία Ελευθερίου</p>
            </div>
            <div className='transactionBox'>
              <p className='header'>Συμφωνητικό #2</p>
              <p className='text'>31/10/2022 με τον Ιωάννη Ιωάννου </p>
            </div>
            <div className='transactionBox'>
              <p className='header'>Συμφωνητικό #1</p>
              <p className='text'>14/03/2018 με τον Αποστόλη Γραμματόπουλο</p>
            </div>
            <Footer/>
          </div>
  );
}