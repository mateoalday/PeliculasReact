import React from 'react';
import Counter from '../Counter/Counter.jsx';
import styles from './StatsPanel.module.css';

const StatsPanel = ({ peliculas = [] }) => {
  const totalItems = peliculas.length;
  const peliculasVistas = peliculas.filter(pelicula => pelicula.visto).length;
  const peliculasPorVer = totalItems - peliculasVistas;

  return (
    <div className={styles.statsContainer}>
      <Counter label="Total" count={totalItems} />
      <Counter label="Vistas" count={peliculasVistas} accent={true} />
      <Counter label="Por ver" count={peliculasPorVer} />
    </div>
  );
};

export default StatsPanel;
