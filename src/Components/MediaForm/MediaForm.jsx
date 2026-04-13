import React, { useState, useEffect } from 'react';
import styles from './MediaForm.module.css';

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
        <form onSubmit={handleFormSubmit} className={styles.formContainer}>
            <h2 className={styles.title}>{editingMedia ? 'Editar Obra' : 'Agregar Nueva Obra'}</h2>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.formGroup}>
                <label>Título *: </label>
                <input className={styles.input} name="titulo" value={formData.titulo} onChange={handleChange} placeholder="Ej: Interstellar" />
            </div>

            <div className={styles.formGroup}>
                <label>Director *: </label>
                <input className={styles.input} name="director" value={formData.director} onChange={handleChange} placeholder="Ej: Christopher Nolan" />
            </div>

            <div className={styles.formGroup}>
                <label>Año: </label>
                <input className={styles.input} type="number" name="año" value={formData.año} onChange={handleChange} placeholder="Ej: 2014" />
            </div>

            <div className={styles.formGroup}>
                <label>Género *: </label>
                <input className={styles.input} name="genero" value={formData.genero} onChange={handleChange} placeholder="Ej: Ciencia Ficción" />
            </div>

            <div className={styles.formGroup}>
                <label>Rating (0-10): </label>
                <input className={styles.input} type="number" name="rating" min="0" max="10" step="0.1" value={formData.rating} onChange={handleChange} />
            </div>

            <div className={styles.formGroup}>
                <label>Tipo: </label>
                <select className={styles.input} name="tipo" value={formData.tipo} onChange={handleChange}>
                    <option value="Película">Película</option>
                    <option value="Serie">Serie</option>
                </select>
            </div>

            <div className={styles.buttonContainer}>
                <button type="submit" className={styles.submitBtn}>
                    {editingMedia ? 'Guardar Cambios' : 'Agregar a la lista'}
                </button>

                {editingMedia && onCancel && (
                    <button type="button" onClick={onCancel} className={styles.cancelBtn}>
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
};

export default MediaForm;
