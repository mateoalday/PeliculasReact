import React, { useState, useEffect } from 'react';

const MediaForm = ({ editingMedia, onSubmit, onCancel }) => {
    // 1. Estado inicial del formulario vacío
    const initialState = {
        titulo: '',
        director: '',
        año: '',
        genero: '',
        rating: '',
        tipo: 'Película' // Valor por defecto como te piden (Película / Serie)
    };

    // 2. Manejo de estado general con useState
    const [formData, setFormData] = useState(initialState);
    const [error, setError] = useState('');

    // 3. useEffect para cargar los datos en caso de edición (editingMedia)
    useEffect(() => {
        if (editingMedia) {
            setFormData({
                titulo: editingMedia.titulo || '',
                director: editingMedia.director || '',
                año: editingMedia.año || '',
                genero: editingMedia.genero || '',
                rating: editingMedia.rating || '',
                tipo: editingMedia.tipo || 'Película'
            });
        } else {
            // Si no estamos editando (ej. se canceló), volvemos a vaciar todo
            setFormData(initialState);
        }
    }, [editingMedia]);

    // Función genérica para manejar el cambio en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Función previa al envío de datos
    const handleFormSubmit = (e) => {
        e.preventDefault();

        // 4. Validar campos obligatorios antes de enviar (Título, Director y Género)
        if (!formData.titulo.trim() || !formData.director.trim() || !formData.genero.trim()) {
            setError('Error: El título, el director y el género son obligatorios.');
            return;
        }

        // Validación extra: comprobar los rangos del rating (0 a 10)
        if (formData.rating !== '' && (formData.rating < 0 || formData.rating > 10)) {
            setError('Error: El rating debe estar entre 0 y 10.');
            return;
        }

        setError(''); // Limpiamos errores en caso de éxito

        // Si queremos estar seguros de que el número viaje como número
        const dataToSend = {
            ...formData,
            año: formData.año ? Number(formData.año) : '',
            rating: formData.rating ? Number(formData.rating) : ''
        };

        // Llamamos la función prop (que será el "handleSubmit" de tu Home.jsx)
        onSubmit(dataToSend);

        // Al agregar una nueva, limpiamos el formulario para poder agregar otra
        if (!editingMedia) {
            setFormData(initialState);
        }
    };

    return (
        <form onSubmit={handleFormSubmit} style={{ border: '1px solid #ccc', padding: '1rem', marginTop: '1rem' }}>
            <h2>{editingMedia ? 'Editar Obra' : 'Agregar Nueva Obra'}</h2>

            {/* Mostramos el mensaje de error si la validación falla */}
            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

            <div style={{ marginBottom: '10px' }}>
                <label>Título *: </label>
                <input name="titulo" value={formData.titulo} onChange={handleChange} placeholder="Ej: Interstellar" />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>Director *: </label>
                <input name="director" value={formData.director} onChange={handleChange} placeholder="Ej: Christopher Nolan" />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>Año: </label>
                <input type="number" name="año" value={formData.año} onChange={handleChange} placeholder="Ej: 2014" />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>Género *: </label>
                <input name="genero" value={formData.genero} onChange={handleChange} placeholder="Ej: Ciencia Ficción" />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>Rating (0-10): </label>
                {/* Se define el min y el max desde el HTML además de JS */}
                <input type="number" name="rating" min="0" max="10" step="0.1" value={formData.rating} onChange={handleChange} />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>Tipo: </label>
                <select name="tipo" value={formData.tipo} onChange={handleChange}>
                    <option value="Película">Película</option>
                    <option value="Serie">Serie</option>
                </select>
            </div>

            <button type="submit">{editingMedia ? 'Guardar Cambios' : 'Agregar a la lista'}</button>

            {/* Mostrar botón de cancelar SÓLO si estamos en modo de edición */}
            {editingMedia && onCancel && (
                <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>
                    Cancelar
                </button>
            )}
        </form>
    );
};

export default MediaForm;
