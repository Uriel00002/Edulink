import React from 'react';

export const TableSchedule = ({data, handleDragOver, handleDrop}) => {
  const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
  const horas = ["7-8", "8-9", "9-10", "10-11", "11-12", "12-13", "13-14", "14-15", "15-16", "16-17", "17-18", "18-19", "19-20"];
  return (
    <table className="schedule-table mb-5 w-100" id='schedule-table'>
      <thead>
        <tr>
          <th></th>
          {
            dias.map((dia, index) => {
              return <th key={index}>{dia}</th>
            })
          }
        </tr>
      </thead>
      <tbody>
      {horas.map((hora, horaIndex) => (
        <tr key={horaIndex}>
          <td>{parseInt(hora.split('-')[0]) < 11 ? hora + ' am' : hora + ' pm'}</td>
          {dias.map((dia, diaIndex) => (
            // <td
            //   key={diaIndex}
            //   className="schedule-cell" id={horaIndex * dias.length + diaIndex}
            //   onDragOver={(e) => handleDragOver(e, horaIndex * dias.length + diaIndex, dias.length*horas.length)}
            //   onDrop={(e) => handleDrop(e, horaIndex * dias.length + diaIndex)}
            //   onClick={(e) => {
            //     e.preventDefault();
            //     if(e.target.classList.contains('child')){
            //       e.target.parentElement.children[0].innerText = '';
            //       e.target.parentElement.children[1].innerText = '';
            //     }else{
            //       e.target.children[0].innerText = '';
            //       e.target.children[1].innerText = '';
            //     }
            //   }}
            // >
            //  <div className="subject child"></div>
            //   <div className="classroom child"></div>
            //   {

            //   }
            // </td>
            <td key={diaIndex} 
            id={diaIndex + '-' + horaIndex}
            className="schedule-cell"
            onDragOver={(e) => handleDragOver(e, diaIndex + '-' + horaIndex,)}
            onDrop={(e) => handleDrop(e, diaIndex + '-' + horaIndex)}
            >
              <div className="subject child">{data[diaIndex][horaIndex].teacher + ' - ' + data[diaIndex][horaIndex].subject}</div>
              <div className="classroom child">{data[diaIndex][horaIndex].classroom}</div>
            </td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  );
}

export default TableSchedule;