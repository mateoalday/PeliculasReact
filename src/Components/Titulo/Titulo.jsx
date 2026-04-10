
import styles from './Titulo.module.css';

const Titulo = ({ children }) => {
  return (
    <h1 className={styles.titulo}>
      {children}
      <span className={styles.acento}></span>
    </h1>
  );
};

export default Titulo;
