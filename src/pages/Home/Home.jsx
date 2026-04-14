import React, { useState, useEffect, useMemo } from 'react';
import Titulo from "../../components/Titulo/Titulo.jsx";
import MediaList from "../../components/MediaList/MediaList.jsx";
import styles from "./Home.module.css";
import MediaForm from '../../components/MediaForm/MediaForm.jsx';
import StatsPanel from '../../Components/StatsPanel/StatsPanel.jsx';
import Catalogo from '../../components/Catalogo/Catalogo.jsx';

const Home = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroGenero, setFiltroGenero] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [ordenarPor, setOrdenarPor] = useState('');
  const [orden, setOrden] = useState('asc');
  const [editando, setEditando] = useState(null);
  const [cargado, setCargado] = useState(false);
  const [vistaActiva, setVistaActiva] = useState('catalogo');

  // 1-LEER: Al cargar la página lee las películas guardadas en localStorage
  // El [] hace que se ejecute solo una vez al montar el componente
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cinetrack-peliculas'));

    // Si existe memoria y hay al menos 1 película guardada...
    if (data && data.length > 0) {
      setPeliculas(data);
    } else {
      // SINO: Carga automáticamente la lista predeterminada con sus Pósters
      setPeliculas([
        {
          id: 1,
          titulo: "Batman: The Dark Knight",
          director: "Christopher Nolan",
          año: 2008,
          genero: "Acción",
          rating: 9,
          tipo: "Película",
          visto: false,
          imagen: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg"
        },
        {
          id: 2,
          titulo: "Breaking Bad",
          director: "Vince Gilligan",
          año: 2008,
          genero: "Drama",
          rating: 10,
          tipo: "Serie",
          visto: true,
          imagen: "data:image/jpeg;base64,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"
        }
      ]);
    }

    // Una vez que terminó de leer o cargar predeterminados, marca cargado como true
    setCargado(true);
  }, []);
  // 2-GUARDAR: Guarda las películas en localStorage cada vez que cambian
  // Solo guarda si cargado es true, para evitar pisar los datos antes de leerlos
  useEffect(() => {
    if (cargado) {
      localStorage.setItem('cinetrack-peliculas', JSON.stringify(peliculas));
    }
  }, [peliculas, cargado]);

  // Maneja el envío del formulario para crear o editar una película
  // Si hay una película en edición la modifica, sino crea una nueva
  const handleSubmit = (formData) => {
    if (editando) {
      setPeliculas(prev =>
        prev.map(p =>
          p.id === editando.id ? { ...p, ...formData } : p
        )
      );
      setEditando(null);
    } else {
      setPeliculas(prev => [
        ...prev,
        {
          id: Date.now(), // usa la fecha actual como id único
          ...formData,
          visto: false // toda película nueva empieza como no vista
        }
      ]);
    }
    setVistaActiva('catalogo');
  };

  // Cambia el estado visto/no visto de una película buscándola por su id
  const cambiarEstado = (id) => {
    setPeliculas(prev =>
      prev.map(p =>
        p.id === id ? { ...p, visto: !p.visto } : p
      )
    );
  };

  // Elimina una película del array filtrando todas menos la que tiene ese id
  const eliminar = (id) => {
    setPeliculas(prev => prev.filter(p => p.id !== id));
  };

  // Filtra y ordena las películas según búsqueda, géneros, tipo y orden
  // useMemo evita recalcular si no cambiaron las dependencias
  const peliculasFiltradas = useMemo(() => {
    return peliculas
      .filter(p =>
        p.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.director.toLowerCase().includes(busqueda.toLowerCase())
      )
      .filter(p => !filtroGenero || p.genero === filtroGenero)
      .filter(p => !filtroTipo || p.tipo === filtroTipo)
      .sort((a, b) => {
        if (!ordenarPor) return 0;
        let resultado = 0;
        if (ordenarPor === 'año' || ordenarPor === 'rating') {
          resultado = a[ordenarPor] - b[ordenarPor];
        }
        return orden === 'asc' ? resultado : -resultado;
      });
  }, [peliculas, busqueda, filtroGenero, filtroTipo, ordenarPor, orden]);

  return (
    <div className={styles.container}>
      <Titulo>CineTrack</Titulo>
      {/* Panel que muestra estadísticas del total de películas */}
      <StatsPanel peliculas={peliculas} />

      <div className={styles.tabsContainer}>
        <button
          className={`${styles.tabBtn} ${vistaActiva === 'catalogo' ? styles.activeTab : ''}`}
          onClick={() => setVistaActiva('catalogo')}
        >
          Catálogo General
        </button>
        <button
          className={`${styles.tabBtn} ${vistaActiva === 'listas' ? styles.activeTab : ''}`}
          onClick={() => setVistaActiva('listas')}
        >
          Mis Listas (Por Ver / Visto)
        </button>
        <button
          className={`${styles.tabBtn} ${vistaActiva === 'gestion' ? styles.activeTab : ''}`}
          onClick={() => setVistaActiva('gestion')}
        >
          {editando ? 'Editando Obra...' : 'Añadir Nueva Obra'}
        </button>
      </div>

      {vistaActiva === 'gestion' && (
        <MediaForm
          editingMedia={editando}
          onSubmit={handleSubmit}
          onCancel={() => {
            setEditando(null);
            setVistaActiva('catalogo');
          }}
        />
      )}

      {vistaActiva === 'catalogo' && (
        <Catalogo peliculas={peliculasFiltradas}
          accionEliminar={(item) => eliminar(item.id)}
          accionEditar={(item) => {
            setEditando(item);
            setVistaActiva('gestion');
          }}
          accionCambiarEstado={(item) => cambiarEstado(item.id)} />
      )}

      {vistaActiva === 'listas' && (
        <MediaList
          peliculas={peliculasFiltradas}
          accionEliminar={(item) => eliminar(item.id)}
          accionEditar={(item) => {
            setEditando(item);
            setVistaActiva('gestion');
          }}
          accionCambiarEstado={(item) => cambiarEstado(item.id)}
        />
      )}
    </div>
  );
};

export default Home;