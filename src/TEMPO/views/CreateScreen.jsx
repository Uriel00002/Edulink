/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Header from "../../templates/Header";
import TableSchedule from '../../components/tempo/create/TableSchedule';
import Dropdown from '../../components/tempo/create/DropDown';
import '../../assets/css/create_schedule.css';
import { alertError, alertSuccess, storeEdulink } from '../../store/EdulinkStore';
import axios from 'axios';
import { Apiurl } from '../../services/apirest';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';

export const CreateScreen = () => {
  const location = useLocation()
  const idLocation = location.search.split('=')[1]
  const token = storeEdulink(state => state.auth.token)
  const setLoading = storeEdulink(state => state.setLoading)
  const [optionsSICAH, setOptionsSICAH] = useState(null)
  const [academiccharges, setAcademiccharges] = useState(null)
  const [academiccharge, setAcademiccharge] = useState(null)
  const [teachersAndSubjects, setTeachersAndSubjects] = useState([])
  const [draggedItem, setDraggedItem] = useState(null);
  const initialData = new Array(5).fill(null).map(() =>
    new Array(13).fill(null).map(() => ({
      id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      teacher: '',
      subject: '',
      classroom: ''
    }))
  );
  const [data, setData] = useState(initialData);
  const [name, setName] = useState('')


  useEffect(() => {
    getSICAH()
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [])

  useEffect(() => {
    if (academiccharge) {
      setLoading(true);
      let teachers = []
      let subjects = []
      JSON.parse(academiccharge.assignments)?.map(assignment => {
        teachers.push(assignment.teacher)
        subjects.push(assignment.subject)
      })
      teachers = [...new Set(teachers)]
      subjects = [...new Set(subjects)]
      GetEmployeAndSubjectById(teachers, subjects)
    }
  }, [academiccharge])

  useEffect(() => {
    if (idLocation) {
      getScheduleById(idLocation)
    }
  }, [idLocation, academiccharges])

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

  const getScheduleById = async (id) => {
    try {
      const res = await axios.get(Apiurl + 'schedules/' + id + '/', {headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}})
      handleOnChangeDropdown(res.data.academic_charge)
      setData(JSON.parse(res.data.data))
      setName(res.data.name)
      setAcademiccharge(academiccharges?.find(sicah => sicah?.id == res.data.academic_charge))
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnChangeDropdown = (value) => {
    setTeachersAndSubjects([])
    document.getElementById('sicah').value = value
    setData(initialData)
    document.querySelectorAll('.schedule-cell').forEach((item, i) => {
      item.classList.remove('border-1');
      item.classList.remove('border-success');
      item.classList.remove('border-warning');
      item.classList.remove('border-info');
    });
    
    if (value) {
      setAcademiccharge(academiccharges?.find(sicah => sicah?.id == value))
    }else{
      setAcademiccharge(null)
    }
  }

  const GetEmployeAndSubjectById = async(idEmployees=[], idSubjects=[]) => {
    const resp = []
    if(idEmployees.length == idSubjects.length){
      try {
        const promises = idEmployees.map(async (idE, index) => {
          try {
            const resE = await axios.get(Apiurl + 'employees/' + idE + '/', { headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + token } });
            const resS = await axios.get(Apiurl + 'subjects/' + idSubjects[index] + '/', { headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + token } });
            return `${resE.data.full_name} - ${resS.data.name}`;
          } catch (error) {
            console.log(error);
            return ''; // O manejar el error según sea necesario
          }
        });
    
        const results = await Promise.all(promises);
    
        setTeachersAndSubjects(results);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      alertError('Los datos de los docentes y asignaturas no coinciden, revice la carga horaria')
      return
    }
    setLoading(false);
  }

  const handleDragStart = (e, item,type) => {
    setDraggedItem({data:item,type:type});
  };
  
  const handleDragOver = (e, id) => {
    e.preventDefault();
    document.querySelectorAll('.schedule-cell').forEach((item, i) => {
      if (item.id == id) {
        item.classList.add('border-1');
        item.classList.add('border-info');
      } else {
        item.classList.remove('border-1');
        item.classList.remove('border-info');
      }
    });
  };
  
  const handleDrop = (e, id) => {
    document.querySelectorAll('.schedule-cell').forEach((item, i) => {
      item.classList.remove('border-1');
      item.classList.remove('border-info');
    });
    const td = document.getElementById(id);
    const indexHorizontal = parseInt(id.split('-')[0]);
    const indexVertical = parseInt(id.split('-')[1]);
    setData(
      data?.map((row, i) => {
        if (i == indexHorizontal) {
          return row.map((cell, j) => {
            if (j == indexVertical) {
              if(draggedItem.type == 'subject'){
                if(cell.classroom){
                  td.classList.add('border-1');
                  td.classList.add('border-success');
                  td.classList.remove('border-warning');
                }else{
                  td.classList.add('border-1');
                  td.classList.add('border-warning');
                  td.classList.remove('border-success');
                }
                return { ...cell, teacher: draggedItem.data.split(' - ')[0], subject: draggedItem.data.split(' - ')[1] }
              }
              if(draggedItem.type == 'classroom'){
                if(cell.subject && cell.teacher){
                  td.classList.add('border-1');
                  td.classList.add('border-success');
                  td.classList.remove('border-warning');
                }else{
                  td.classList.add('border-1');
                  td.classList.add('border-warning');
                  td.classList.remove('border-success');
                }
                return { ...cell, classroom: draggedItem.data.split(' - ')[1].split(';')[0] }
              }
            }
            return cell;
          });
        }
        return row;
      })
    )
    setDraggedItem(null);
  };

  const handleSubmit = async() => {
    const json = JSON.stringify(data)
    let texto = '¿Deseas guardar el horario?'
    let icon = 'info'
    if(idLocation){
      texto = '¿Deseas actualizar el horario?'
    }
    data?.map((row, i) => {
      row?.map((cell, j) => {
        if((cell.classroom && !cell.subject)||(cell.subject && !cell.classroom)){
          texto = 'Existen campos incompletos, aun asi deseas guardar el horario?'
          icon = 'warning'
        }
      })
    })
    Swal.fire({
      title: 'Guardando...',
      text: texto,
      icon: icon,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then(async(result) => {
      if (result.isConfirmed) {
        if(idLocation){
          try {
            setLoading(true);
            const res = await axios.put(Apiurl + 'schedules/' + idLocation + '/', {
              name: name,
              data: json,
              academic_charge: academiccharge.id
            }, {headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}});
            console.log(res.data);
            alertSuccess('Horario actualizado con exito')
          } catch (error) {
            error.response.data.error 
            ? alertError(error.response.data.error)
            : error.response.data.academic_charge ? alertError(error.response.data.academic_charge) : alertError(error.response.data)
            console.log(error);
          } finally {
            setLoading(false);
          }
        }else{
          try {
            setLoading(true);
            const res = await axios.post(Apiurl + 'schedules/', {
              name: name,
              data: json,
              academic_charge: academiccharge.id
            }, {headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}});
            console.log(res.data);
            alertSuccess('Horario creado con exito')
          } catch (error) {
            error.response.data.error 
            ? alertError(error.response.data.error)
            : error.response.data.academic_charge ? alertError(error.response.data.academic_charge) : alertError(error.response.data)
            console.log(error);
          } finally {
            setLoading(false);
          }
        }
      }
    })
  }

  return (
    <React.Fragment>
      <section className="header_main">
        <Header name={"Crear Horario"} />
      </section>
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
          <div className='dropdowns-container mb-3 d-flex justify-content-around align-items-center'>
            <Dropdown label='Carga Horaria' options={optionsSICAH} id='sicah' name='sicah' onChange={(e)=>handleOnChangeDropdown(e.target.value)} />
            {
              academiccharge &&
              <button className='btn btn-primary' onClick={handleSubmit}>Guardar</button>
            }
          </div>
          {
            academiccharge &&
              <input type="text" placeholder='Nombre del horario' className='w-75 m-0 mb-1' onChange={(e) => setName(e.target.value)} value={name} />
          }
          <div className="contenedor-tabla-schedule p-1">
            <TableSchedule data={data} setData={setData}  handleDragOver={handleDragOver} handleDrop={handleDrop} />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default CreateScreen;