import React, { useState, useEffect, useMemo } from 'react';
import Titulo from "../../components/Titulo/Titulo.jsx";
import MediaList from "../../components/MediaList/MediaList.jsx";
import styles from "./Home.module.css";
import MediaForm from '../../components/MediaForm/MediaForm.jsx';
import StatsPanel from '../../Components/StatsPanel/StatsPanel.jsx';

const Home = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroGenero, setFiltroGenero] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [ordenarPor, setOrdenarPor] = useState('');
  const [orden, setOrden] = useState('asc');
  const [editando, setEditando] = useState(null);

  // 📦 LOCAL STORAGE
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cinetrack-peliculas'));

    if (data && data.length > 0) {
      setPeliculas(data);
    } else {
      // 🔥 DATOS DE PRUEBA
      setPeliculas([
        {
          id: 1,
          titulo: "Batman",
          director: "Nolan",
          año: 2008,
          genero: "Acción",
          rating: 9,
          tipo: "Película",
          visto: false
        },
        {
          id: 2,
          titulo: "Breaking Bad",
          director: "Vince Gilligan",
          año: 2008,
          genero: "Drama",
          rating: 10,
          tipo: "Serie",
          visto: true
        }
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cinetrack-peliculas', JSON.stringify(peliculas));
  }, [peliculas]);

  // ➕ CREAR / EDITAR
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
          id: Date.now(),
          ...formData,
          visto: false
        }
      ]);
    }
  };

  // 👁 CAMBIAR ESTADO
  const cambiarEstado = (id) => {
    setPeliculas(prev =>
      prev.map(p =>
        p.id === id ? { ...p, visto: !p.visto } : p
      )
    );
  };

  // ❌ ELIMINAR
  const eliminar = (id) => {
    setPeliculas(prev => prev.filter(p => p.id !== id));
  };

  // 🔍 FILTRAR + ORDENAR
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

      <StatsPanel peliculas={peliculas} />

      <MediaForm
        editingMedia={editando}
        onSubmit={handleSubmit}
        onCancel={() => setEditando(null)}
      />

      {/* 👇 ACÁ LE PASAMOS TODO */}
      <MediaList peliculas={peliculasFiltradas}
        accionEliminar={(item) => eliminar(item.id)}
        accionEditar={(item) => setEditando(item)}
        accionCambiarEstado={(item) => cambiarEstado(item.id)} />
    </div>
  );
};

export default Home;