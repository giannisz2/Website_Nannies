import * as React from 'react';
import NavBarParents from '../../components/layout/NavBarParents';
import HelpButton from '../../components/buttons/HelpButton';
import Footer from '../../components/layout/Footer'
import Breadcrumb from '../../components/layout/Breadcrumb';
import '../../styles/TransactionHistoryParents.css'

export default function TransactionHistoryParents(){
  return (<div id="TransactionHistory">
            <NavBarParents className="nav-bar-parents" />
            <HelpButton/>
            <div id="breadCrumb">
            <Breadcrumb label="Πληρωμές"/>
            </div>
            <div className='transactionBox'>
              <p className='header'>Πληρωμή #4</p>
              <p className='text'>10/06/2024 με τον Κώστα Παπαδόπουλο</p>
            </div>
            <div className='transactionBox'>
              <p className='header'>Πληρωμή #3</p>
              <p className='text'>25/09/2023 με την Ελευθερία Ελευθερίου</p>
            </div>
            <div className='transactionBox'>
              <p className='header'>Πληρωμή #2</p>
              <p className='text'>31/10/2022 με τον Ιωάννη Ιωάννου </p>
            </div>
            <div className='transactionBox'>
              <p className='header'>Πληρωμή #1</p>
              <p className='text'>14/03/2018 με τον Αποστόλη Γραμματόπουλο</p>
            </div>
            <Footer/>
          </div>
  );
}