import React from 'react';
import BreadcrumbVoucher from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';
import '../../styles/AgreementHistory.css';

export default function CustomSeparator({ label = null }) {
  const navigate = useNavigate(); // Εισαγωγή του useNavigate

  const breadcrumbs = [
    <Link
      underline="hover"
      key="2"
      color="inherit"
      onClick={() => navigate('/Voucher')} // Πλοήγηση στην σελίδα AgreementHistory
      style={{ cursor: 'pointer' }}
    >
      Voucher
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      {label}
    </Typography>,
  ];

  return (
    <BreadcrumbVoucher
      id="bread"
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {breadcrumbs}
    </BreadcrumbVoucher>
  );
}
