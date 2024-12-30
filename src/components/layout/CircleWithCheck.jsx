import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 

const CircleWithCheck = ({ circleSize = 100 }) => { 
  return (
    <div style={styles.container}>
      <div style={{ ...styles.circle, width: circleSize, height: circleSize }}>
        <CheckCircleIcon style={{ ...styles.icon, fontSize: circleSize / 2 }} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50px',
  },
  circle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50', 
    borderRadius: '50%', 
    border: '2px solid #388E3C', 
    marginBottom: '20px',
  },
  icon: {
    color: 'white',
  },
};

export default CircleWithCheck;
