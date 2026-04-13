const MediaCard = ({ item, accionEliminar, accionEditar, accionCambiarEstado, textoBotonEstado }) => {
  return (
    <div>
      <h3>{item.titulo}</h3>
      <p><strong>Director:</strong> {item.director}</p>
      <p><strong>Año:</strong> {item.año}</p>
      <p><strong>Género:</strong> {item.genero}</p>
      <p><strong>Rating:</strong> {item.rating}</p>
      <p><strong>Tipo:</strong> {item.tipo}</p>

      <div>
        <button onClick={() => accionCambiarEstado(item)}>
          {textoBotonEstado || "Cambiar Estado"}
        </button>
        <button onClick={() => accionEditar(item)}>
          Editar
        </button>
        <button onClick={() => accionEliminar(item)}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default MediaCard;
