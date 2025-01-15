import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import '../../styles/Breadcrumb.css'

function handleClick(event) {
  event.preventDefault();
}

export default function CustomSeparator({label = null}) {
  const breadcrumbs = [
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"
      onClick={handleClick}
    >
    Αρχική
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
    {label}
    </Typography>,
  ];

  return (
      <Breadcrumbs className='bread'
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
  );
}