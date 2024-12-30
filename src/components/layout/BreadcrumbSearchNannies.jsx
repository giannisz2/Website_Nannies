import React from 'react';
import Breadcrumb from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';
import '../../styles/AgreementHistory.css';

export default function BreadcrumbSearchNannies({ label = null }) {
  const navigate = useNavigate(); 

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      onClick={() => navigate('/SearchNannies')}  
      style={{ cursor: 'pointer' }}
    >
      Αναζήτηση
    </Link>,
    <Typography key="2" sx={{ color: 'text.primary' }}>
      {label}
    </Typography>,
  ];

  return (
    <Breadcrumb
      id="bread"
      separator={<NavigateNextIcon fontSize="small" />}  
      aria-label="breadcrumb"
      sx={{
        fontSize: '20px', 
      }}
    >
      {breadcrumbs}  
    </Breadcrumb>
  );
}
