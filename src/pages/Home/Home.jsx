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
    if (data) {
      setPeliculas(data);
    }
    // Una vez que terminó de leer, marca cargado como true
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
          {editando ? '📝 Editando Obra...' : '➕ Añadir Nueva Obra'}
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