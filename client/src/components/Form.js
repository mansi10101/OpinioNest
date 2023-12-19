import React from 'react';
import styles from '../stylesheets/Form.module.css';
import CreatePostform from './CreatePostform';

const Form = ({ setOpen, user }) => {
  return (
    <div className={styles.form_container}>
      <p className={styles.heading1}>Your Opinion, Our Platform.</p>
      <div className={styles.heading2}> Let's make it count!</div>
      <CreatePostform user={user} setOpen={setOpen} />
    </div>
  );
};

export default Form;
