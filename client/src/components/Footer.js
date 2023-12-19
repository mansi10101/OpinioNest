import React from 'react';
import styles from '../stylesheets/Navbar.module.css';
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';

const Footer = ({ setOpencreatepost }) => {
  const handleopen = () => {
    setOpencreatepost(true);
  };
  return (
    <div className={styles.container} style={{ padding: '6px' }}>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <HomeIcon
          onClick={() => {
            window.scroll({
              top: 0,
              left: 0,
              behavior: 'smooth',
            });
          }}
          sx={{ color: 'white' }}
          fontSize='large'
        />{' '}
        <AddBoxIcon
          onClick={handleopen}
          sx={{ color: 'white' }}
          fontSize='large'
        />
      </div>
    </div>
  );
};

export default Footer;
