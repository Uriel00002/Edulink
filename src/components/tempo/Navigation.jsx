import React from 'react';
import Card from '../tempo/Card';


export function Navigation () {
  return (
    <div>
      <div className='card-container'>
          <Card
            title="Crear Horario"
            description="Crea un nuevo horario."
            icon="fa-cog"
            to="/tempo/create"
          />

          <Card
            title="Editar Horario"
            description="Edita tu horario actual."
            icon="fa-edit"
            to="/edit"
          />
        
          <Card
            title="Ver Horario"
            description="Visualiza tu horario actual."
            icon="fa-window-maximize"
            to="/tempo/view"
          />
        
      </div>
    </div>
  );
};


export default Navigation;
