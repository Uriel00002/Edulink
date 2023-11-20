/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import HeaderSchedule from '../../components/tempo/create/HeaderSchedule'; 
import TableSchedule from '../../components/tempo/create/TableSchedule';
import Dropdown from '../../components/tempo/create/DropDown';
import '../../assets/css/create_schedule.css';
import { storeEdulink } from '../../store/EdulinkStore';
import axios from 'axios';
import { Apiurl } from '../../services/apirest';

export const CreateScreen = () => {
  const token = storeEdulink(state => state.auth.token)
  const [optionsSICAH, setOptionsSICAH] = useState(null)
  const [academiccharges, setAcademiccharges] = useState(null)
  const [academiccharge, setAcademiccharge] = useState(null)
  const [teachersAndSubjects, setTeachersAndSubjects] = useState([])
  const [draggedItem, setDraggedItem] = useState(null);



  useEffect(() => {
    getSICAH()
  }, [])

  useEffect(() => {
    if (academiccharge) {
      JSON.parse(academiccharge.assignments)?.map(assignment => {
        GetEmployeAndSubjectById({idE: assignment.teacher, idS: assignment.subject})
      })
    }
  }, [academiccharge])

  const getSICAH = async () => {
    try {
      const res = await axios.get(Apiurl + 'academiccharges/', {headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}})
      setAcademiccharges(res.data)
      setOptionsSICAH([{id: '', group: ' - Seleccione una opción'}, ...res.data]?.map(sicah => {
        return {
          value: sicah.id,
          label: sicah.group.split(' - ')[1]
        }
      }))
    } catch (error) { 
      console.log(error)
    }
  }

  const handleOnChangeDropdown = (e) => {
    const value = e.target.value
    if (value) {
      setAcademiccharge(academiccharges.find(sicah => sicah.id == value))
    }else{
      setAcademiccharge(null)
      setTeachersAndSubjects([])
    }
  }

  const GetEmployeAndSubjectById = async({idE, idS}) => {
    try {
      const resE = await axios.get(Apiurl + 'employees/' + idE + '/', {headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}})
      const resS = await axios.get(Apiurl + 'subjects/' + idS + '/', {headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}})
      setTeachersAndSubjects([...teachersAndSubjects, `${resE.data.full_name} - ${resS.data.name}`])
    } catch (error) {
      console.log(error)
    }
  }

  const handleDragStart = (e, item,type) => {
    // Aquí puedes manejar el evento de arrastre para iniciar el arrastre del elemento.
    setDraggedItem({data:item,type:type});
  };
  
  const handleDragOver = (e, itemID, totalIndex) => {
    // Aquí puedes manejar el evento de arrastre sobre la tabla para permitir el soltar.
    e.preventDefault();
    document.querySelectorAll('.schedule-cell').forEach((item, i) => {
      if (i == itemID) {
        item.classList.add('border-1');
        item.classList.add('border-info');
      } else {
        item.classList.remove('border-1');
        item.classList.remove('border-info');
      }
    });
  };
  
  const handleDrop = (e, id) => {
    // Aquí puedes manejar el evento de soltar el elemento arrastrado en la tabla.
    // Puedes usar el estado draggedItem para obtener los datos que se están soltando.
    const item = document.getElementById(id);
    const divSubject = item.childNodes[0];
    const divClassroom = item.childNodes[1];
    if(draggedItem.type === 'subject'){
      divSubject.innerText = draggedItem.data;
    }else if(draggedItem.type === 'classroom'){
      divClassroom.innerText = draggedItem.data.split(' - ')[1].split(';')[0];
    }
    e.target.classList.remove('border-1');
    e.target.classList.remove('border-info');
    setDraggedItem(null);
  };

  const handleSubmit = () => {
    const table = document.getElementById('schedule-table'); // Obtener la referencia a la tabla por su ID

    const tableData = []; // Arreglo para almacenar los datos de la tabla

    // Recorrer las filas del cuerpo de la tabla
    for (let i = 0; i < table.rows.length; i++) {
      const row = table.rows[i]; // Obtener la referencia a la fila actual
      const rowData = []; // Arreglo para almacenar los datos de la fila actual

      // Recorrer las celdas de la fila actual
      for (let j = 0; j < row.cells.length; j++) {
        const cell = row.cells[j]; // Obtener la referencia a la celda actual
        rowData.push(cell.innerText); // Agregar el texto de la celda al arreglo de datos de la fila
      }

      tableData.push(rowData); // Agregar los datos de la fila al arreglo de datos de la tabla
    }

    console.log(tableData);
  }

  return (
    <React.Fragment>
      <HeaderSchedule className='header-tempo' />
      <section className='row px-3'>
        <div className="col col-4 row">
          <div className="schedule-items-subject col col-6">
            <div className="schedule-item-header">
              Profesores/Materias
            </div>
            {
              academiccharge && academiccharge?.assignments && teachersAndSubjects?.map((assignment, index) => {
                return (
                  <div key={index} className="schedule-item" draggable onDragStart={(e) => handleDragStart(e, assignment, 'subject')} >{assignment} </div>
                )
              })
            }
          </div>
          <div className="schedule-items-classroom col col-6">
            <div className="schedule-item-header">
              Aulas
            </div>
            {
              academiccharge && academiccharge.classrooms?.map((classroom, index) => {
                return (
                  <div className="schedule-item" key={index} id={classroom.split(' - ')[0]} draggable onDragStart={(e) => handleDragStart(e, classroom, 'classroom')}>{classroom.split(' - ')[1].split(';')[0]}</div>
                )
              })
            }
          </div>
        </div>
        <div className="create-tempo flex-column col col-8">
          <div className='dropdowns-container w-75 mb-3'>
            <Dropdown label='Carga Horaria' options={optionsSICAH} id='sicah' name='sicah' onChange={handleOnChangeDropdown} />
            {
              academiccharge &&
                <button className='btn btn-primary' onClick={handleSubmit}>Guardar</button>
            }
          </div>
          <TableSchedule handleDragOver={handleDragOver} handleDrop={handleDrop} />
        </div>
      </section>
    </React.Fragment>
  );
}

export default CreateScreen;