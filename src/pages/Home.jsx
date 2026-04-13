import React, { useState, useEffect, useMemo } from 'react';
import Titulo from '../../Components/Titulo/Titulo';
import MediaList from '../../Components/MediaList/MediaList';
import styles from './Home.module.css';

const Home = () => {
  const [medias, setMedias] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [editingMedia, setEditingMedia] = useState(null);

  // LocalStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cinetrack-medias')) || [];
    setMedias(data);
  }, []);

  useEffect(() => {
    localStorage.setItem('cinetrack-medias', JSON.stringify(medias));
  }, [medias]);

  // CRUD
  const handleSubmit = (formData) => {
    if (editingMedia) {
      setMedias(prev =>
        prev.map(m => m.id === editingMedia.id ? { ...m, ...formData } : m)
      );
      setEditingMedia(null);
    } else {
      setMedias(prev => [...prev, { id: Date.now(), ...formData, watched: false }]);
    }
  };

  const handleToggleWatched = id => {
    setMedias(prev =>
      prev.map(m => m.id === id ? { ...m, watched: !m.watched } : m)
    );
  };

  const handleDelete = id => {
    setMedias(prev => prev.filter(m => m.id !== id));
  };

  // FILTRO + ORDEN (compactado)
  const filtered = useMemo(() => {
    return medias
      .filter(m =>
        m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.director.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(m => !genreFilter || m.genre === genreFilter)
      .filter(m => !typeFilter || m.type === typeFilter)
      .sort((a, b) => {
        if (!sortBy) return 0;
        let res = sortBy === 'year' || sortBy === 'rating'
          ? a[sortBy] - b[sortBy]
          : 0;
        return sortOrder === 'asc' ? res : -res;
      });
  }, [medias, searchTerm, genreFilter, typeFilter, sortBy, sortOrder]);

  const unwatched = filtered.filter(m => !m.watched);
  const watched = filtered.filter(m => m.watched);

  return (
    <div className={styles.container}>
      <Titulo>CineTrack</Titulo>

      <MediaList title="Por Ver" media={unwatched} />
      <MediaList title="Vistas" media={watched} />
    </div>
  );
};

export default Home;