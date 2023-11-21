/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import HeaderSchedule from '../../components/tempo/create/HeaderSchedule';
import TableSchedule from '../../components/tempo/create/TableSchedule';
import { storeEdulink } from '../../store/EdulinkStore';
import axios from 'axios';
import { Apiurl } from '../../services/apirest';

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
    return (
        <React.Fragment>
      <HeaderSchedule name='Ver Horarios' className='header-tempo' />
      <section className='row px-3'>
        <div className="col col-12 row">
          <div className="schedule-items-subject col col-12">
            <div className="schedule-item" style={{cursor: 'default'}}>
              <table className='table'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Carga Academica</th>
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
                          <td>{item?.academicCharge}</td>
                          <td>
                            <button className='btn btn-primary'>Ver</button>
                            <button className='btn btn-warning'>Editar</button>
                            <button className='btn btn-danger'>Eliminar</button>
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