import React from 'react';
import Breadcrumb from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';
import '../../styles/AgreementHistory.css';

export default function BreadcrumbSearchNannies({ links = [], label = null }) {
  const navigate = useNavigate();

  // Δημιουργία breadcrumbs δυναμικά από το array `links`
  const breadcrumbs = [
    ...links.map((link, index) => (
      <Link
        underline="hover"
        key={index}
        color="inherit"
        onClick={() => navigate(link.path)} // Χρήση του `path` για πλοήγηση
        style={{ cursor: 'pointer' }}
      >
        {link.label}
      </Link>
    )),
    label && (
      <Typography key="current" sx={{ color: 'text.primary' }}>
        {label}
      </Typography>
    ),
  ];

  return (
    <Breadcrumb
      id="bread"
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{
        fontSize: '16px', 
      }}
    >
      {breadcrumbs}
    </Breadcrumb>
  );
}
