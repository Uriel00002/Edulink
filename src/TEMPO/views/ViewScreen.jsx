/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import HeaderSchedule from '../../components/tempo/create/HeaderSchedule';
import TableSchedule from '../../components/tempo/create/TableSchedule';
import { alertSuccess, storeEdulink } from '../../store/EdulinkStore';
import axios from 'axios';
import { Apiurl } from '../../services/apirest';
import { Link } from 'react-router-dom';
import { generatePDFSchedule } from '../../helpers/reportsPDF';
import Swal from 'sweetalert2';

export const ViewScreen = () => {
    const token = storeEdulink(state => state.auth.token)
    const [data, setData] = useState([])

    useEffect(() => {
        getShedules()
    }, [])

    const getShedules = async () => {
        try {
            const res = await axios.get(Apiurl + 'schedules/', {headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}})
            setData(res.data)
            console.log(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    const generatePdf = (data, name, academic_charge) => {
        generatePDFSchedule(data, name, academic_charge.split(' - ')[1])
    }

    const handleDelete = async (id) => {
        Swal.fire({
            title: '¿Deseas eliminar este horario?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then(async(result) => {
            if (result.isConfirmed) {
              try {
                const res = await axios.delete(Apiurl + 'schedules/' + id + '/', {headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}})
                getShedules()
                alertSuccess('Horario eliminado con exito')
              } catch (error) {
                  console.log(error)
              }
            }
        })
    }

    return (
        <React.Fragment>
      <HeaderSchedule name='Ver Horarios' className='header-tempo' />
      <section className='row px-3'>
        <div className="col col-12 row">
          <div className="schedule-items-subject col col-12">
            <div className="schedule-item table-responsive" style={{cursor: 'default'}}>
              <table className='table'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Carga Academica</th>
                    <th>Fecha Creacion</th>
                    <th>Fecha Actualizacion</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data?.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>{item?.id}</td>
                          <td>{item?.name}</td>
                          <td>{item?.academic_charge}</td>
                          <td>{item?.create_at}</td>
                          <td>{item?.update_at}</td>
                          <td className='d-flex gap-2'>
                            <button className='btn btn-primary' onClick={() => generatePdf(JSON.parse(item?.data), item?.name, item?.academic_charge)}><i className='fas fa-eyes'></i></button>
                            <Link to={`/tempo/create?id=${item?.id}`} className='btn btn-warning'><i className='fas fa-edit'></i></Link>
                            <button className='btn btn-danger' onClick={() => handleDelete(item?.id)}><i className='fas fa-trash'></i></button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
          {/* <div className="schedule-items-classroom col col-6">
            <div className="schedule-item-header">
              Aulas
            </div>
          </div> */}
        </div>
        {/* <div className="create-tempo flex-column col col-8">
          <div className='dropdowns-container mb-3 d-flex justify-content-around align-items-center'>

          </div>
          <TableSchedule data={[[]]} />
        </div> */}
      </section>
    </React.Fragment>
    );
}

export default ViewScreen;