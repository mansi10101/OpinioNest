import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styles from '../stylesheets/Home.module.css';
import { useMediaQuery } from '@mui/material';

export default function Alert({ open, text }) {
  const isMobile = useMediaQuery('(max-width:400px)');
  return (
    <div className={styles.modal}>
      <Modal
        open={open}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: isMobile ? '200px' : '255px',
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: isMobile ? '20px' : '22px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div>
                <CheckCircleIcon
                  style={{ fill: '#32CD32' }}
                  fontSize='medium'
                />{' '}
              </div>
              <div>
                {' '}
                <Typography sx={{ fontSize: '0.8rem' }}>{text}</Typography>
              </div>
            </div>
          </Box>
        </div>
      </Modal>
    </div>
  );
}
