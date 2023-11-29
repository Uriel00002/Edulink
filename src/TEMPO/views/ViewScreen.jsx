/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Header from "../../templates/Header";
import { alertSuccess, storeEdulink } from '../../store/EdulinkStore';
import axios from 'axios';
import { Apiurl } from '../../services/apirest';
import { Link, useLocation } from 'react-router-dom';
import { generatePDFSchedule } from '../../helpers/reportsPDF';
import Swal from 'sweetalert2';
import $ from 'jquery'
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
export const ViewScreen = () => {
    const location = useLocation() 
    const token = storeEdulink(state => state.auth.token)
    const setLoading = storeEdulink(state => state.setLoading)
    const [data, setData] = useState([])

    useEffect(() => {
      setLoading(true)
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
                setTimeout(() => {
                  window.location.reload()
                }, 2000)
              } catch (error) {
                  console.log(error)
              }
            }
        })
    }

    setTimeout(() => {
      try {
          $("#table").dataTable().fnDestroy();
          let table = $( '#table' ).dataTable( {
          "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
              // Bold the grade for all 'A' grade browsers
              if ( aData[4] === "A" )
              {
              $('td:eq(4)', nRow).html( '<b>A</b>' );
              }
          },
          scrollX: true,
          "order": [[ 0, "desc" ]],
          "pageLength": 10,
          } );

          table.on('error.dt', function(e, settings, techNote, message) {
            if (message.indexOf('Incorrect column count') !== -1) {
              // Si el mensaje de error contiene "Incorrect column count", recarga la página
              location.reload();
            }
          });
      } catch (error) {
          console.log(error);
      } finally {
          setLoading(false)
      }
    },2000)

    return (
      <React.Fragment>
      <section className="header_main">
        <Header name={"Horarios"} />
      </section>
      <section className='row px-3'>
        <div className="col col-12 row">
          <div className="schedule-items-subject col col-12">
            <div className="schedule-item table-responsive" style={{cursor: 'default'}}>
              <table className='table table-striped table-bordered' id='table'>
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
                            <button className='btn btn-success' onClick={() => generatePdf(JSON.parse(item?.data), item?.name, item?.academic_charge)}><i className='fas fa-eyes'></i></button>
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