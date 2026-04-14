import React from 'react';
import Counter from '../Counter/Counter.jsx';
import styles from './StatsPanel.module.css';

const StatsPanel = ({ peliculas = [] }) => {
  const totalItems = peliculas.length;
  const peliculasVistas = peliculas.filter(pelicula => pelicula.visto).length;
  const peliculasPorVer = totalItems - peliculasVistas;

  const conteoGeneros = peliculas.reduce((acumulador, pelicula) => {
    const genero = pelicula.genero || 'Sin género';
    acumulador[genero] = (acumulador[genero] || 0) + 1;
    return acumulador;
  }, {});

  return (
    <div className={styles.dashboard}>
      <h2 className={styles.dashboardTitle}>📊 Resumen de tu Actividad</h2>
      
      {/* Contadores Principales */}
      <div className={styles.countersWrapper}>
        <Counter label="Total" count={totalItems} />
        <Counter label="Vistas" count={peliculasVistas} accent={true} />
        <Counter label="Por ver" count={peliculasPorVer} />
      </div>
      
      {/* Contadores por Género */}
      <div className={styles.genreSection}>
        <h4 className={styles.genreTitle}>Películas/Series por Género:</h4>
        <div className={styles.genreTags}>
          {Object.entries(conteoGeneros).map(([genero, cantidad]) => (
            <span key={genero} className={styles.genreTag}>
              {genero}: <strong>{cantidad}</strong>
            </span>
          ))}
          {Object.keys(conteoGeneros).length === 0 && <span className={styles.emptyText}>Aún no hay géneros registrados.</span>}
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
