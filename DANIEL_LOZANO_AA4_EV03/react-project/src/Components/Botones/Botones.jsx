import React from 'react';
import './Botones.css';

const Botones = ({
  onNuevo,
  onEliminar,
  onPriorizar,
  onPausar,
  onEntregar,
  mostrarPriorizar = true,
  mostrarPausar = true,
  mostrarEntregar = true
}) => {
  return (
    <div className="botones-contenedor">
      <button onClick={onNuevo}>Nuevo</button> {/* Ejecuta la función onNuevo */}
      <button onClick={onEliminar}>Eliminar</button> {/* Ejecuta la función onEliminar */}
      {mostrarEntregar && <button onClick={onEntregar}>Entregar</button>}
      {mostrarPausar && <button onClick={onPausar}>Pausar</button>}
      {mostrarPriorizar && <button onClick={onPriorizar}>Priorizar</button>}
    </div>
  );
};

export default Botones;


