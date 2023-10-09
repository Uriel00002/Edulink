import React from 'react';
import Card from './Card';  // Ajusta la ruta según tu estructura de carpetas

export function Navigation () {
  return (
    <div>
      <h2>Bienvenido a la Página de Inicio</h2>
      <div style={cardContainerStyle}>
        
        <Card
          title="Crear Horario"
          description="Crea un nuevo horario."
          link="/create"
        />
        <Card
          title="Editar Horario"
          description="Edita tu horario actual."
          link="/edit"
        />
        <Card
          title="Ver Horario"
          description="Visualiza tu horario actual."
          link="/schedule"
        />
      </div>
    </div>
  );
};

const cardContainerStyle = {
  display: 'flex',
  justifyContent: 'space-around',
};

export default Navigation;
