import React from 'react';
import styles from './Counter.module.css';

const Counter = ({ label, count, accent = false }) => {
  return (
    <div className={`${styles.counter} ${accent ? styles.accent : ''}`}>
      <span className={styles.count}>{count}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
};

export default Counter;
