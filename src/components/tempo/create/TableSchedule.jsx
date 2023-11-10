import React from 'react';

export const TableSchedule = () => {
  const datos = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
  const horas = ["7-8", "8-9", "9-10", "10-11", "11-12", "12-13", "13-14", "14-15", "15-16", "16-17", "17-18", "18-19", "19-20"];
  return (
    <table className="schedule-table mb-5">
      <thead>
        <tr>
          <th></th>
          {
            datos.map((dia, index) => {
              return <th key={index}>{dia}</th>
            })
          }
        </tr>
      </thead>
      <tbody>
        {
          horas.map((hora, index) => {
            return <tr key={index}>
              <td>{parseInt(hora.split('-')[0]) < 11 ? hora + ' am' : hora + ' pm'}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          })
        }
      </tbody>
    </table>
  );
}

export default TableSchedule;