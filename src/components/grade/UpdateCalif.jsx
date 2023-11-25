/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Apiurl } from "../../services/apirest";
import WarriorUTT from '../../assets/img/guerreroUTT.png'
import '../../assets/css/calif.css'
import Header from "../../templates/Header";
import Footer from "../../templates/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validateUserInView } from "../../helpers/funtionsGlobals";
import { encriptar_desencriptar } from "../../helpers/criptografia";
import { alertError, alertSuccess, storeEdulink } from "../../store/EdulinkStore";


export const UpdateCalif = ({permissions={c:[],r:[],rbid:[],u:[],d:[]}}) => {
    const navigate = useNavigate();
    const token = storeEdulink(state => state.auth.token);
    const typeUser = parseInt(encriptar_desencriptar(storeEdulink(state => state.auth.type), "d")); //tipo de usuario
    const setLoading = storeEdulink(state => state.setLoading);
    const [data, setData] = useState({update:[],search:[]})
    const [groups, setGroups] = useState([])
    const [subjects, setSubjects] = useState([])
    const parcial_mes = [
      {
        parcial: 1,
        mes: [0,4,8]//enero,mayo,septiembre
      },
      {
        parcial: 2,
        mes: [1,5,9]//febrero,junio,octubre
      },
      {
        parcial: 3,
        mes: [2,6,10]//marzo,julio,noviembre
      },
      {
        parcial: 4,
        mes: [3,7,11]//abril,agosto,diciembre
      }
    ]
    useEffect(() => {
        !validateUserInView(typeUser, permissions) && navigate('/');
    }, [])
    
    useEffect(() => {
        const init = async () => {
          setLoading(true);
          try {
            const resp = await axios.get(Apiurl + 'grades/myclass/',{
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
              }
            })
            setGroups(resp.data.groups)
            setSubjects(resp.data.subjects)
          } catch (error) {
            console.log(error)
          } finally {
            setLoading(false);
          }
        }
        init();
    }, [])

    useEffect(() => {
      document.querySelectorAll('input[type=number]').forEach(input => {
        if(parcial_mes[3].mes.includes(new Date().getMonth())){
          input.disabled = false;
        }
      });
    }, [data])

    const handleSearch = async(e) => {
      e.preventDefault();
      const resp = new FormData(e.target);
      const params = Object.fromEntries(resp.entries());
      console.log(params);
      try {
        setLoading(true);
        const res = await axios.post(Apiurl + 'grades/mygs/', params, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
          }
        })
        console.log(res.data);
        const resp = res.data?.sort((a, b) => {
          const nameA = a.student.split(' - ')[1].toLowerCase();
          const nameB = b.student.split(' - ')[1].toLowerCase();

          if (nameA < nameB) {
              return -1;
          }
          if (nameA > nameB) {
              return 1;
          }
          return 0;
        })
        setData({
          ...data,
          update: {
            ...data.update,
            group: params.group,
            subject: params.subject,
            data: resp
          },
          search: resp
        })
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }

    const handleUpdate = async(e) => {
      e.preventDefault();
      const dataFormated = data.update.data.map(data => {
        return {
          id: data.id,
          partial_1: data.partial_1,
          partial_2: data.partial_2,
          partial_3: data.partial_3,
          partial_4: data.partial_4,
        }
      })
      try{
        setLoading(true);
        const res = await axios.post(Apiurl + 'grades/update/', dataFormated, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
          }
        })
        alertSuccess("Calificaciones registradas")
        console.log(res.data);
      } catch (error) {
        alertError(error.response?.data?.error)
        console.log(error)
      } finally {
        setLoading(false);
      }
    }

    return (

        <React.Fragment>

            <section className="header_main">
                <Header name={"Calificaciones grupales"} />
            </section>
            <section className="calif_main">
                <div className="student_info">
                    <div className="d-flex flex-column gap-3">
                      <div className="">
                      </div>
                    </div>
                </div>
                <img src={WarriorUTT} alt="" />
                <div className="notes">
                    <div className="d-flex flex-column gap-3 p-3">
                      <form onSubmit={handleSearch} className="w-100 d-flex flex-column gap-3">
                        <select name="group" id="group">
                          <option value="">Seleccione una opción</option>
                          {
                            groups.map((group, index) => (
                              <option key={index} value={group.split(' - ')[0]}>{group.split(' - ')[1]}</option>
                            ))
                          }
                        </select>
                        <select name="subject" id="subject">
                          <option value="">Seleccione una opción</option>
                          {
                            subjects.map((subject, index) => (
                              <option key={index} value={subject.split(' - ')[0]}>{subject.split(' - ')[1]}</option>
                            ))
                          }
                        </select>
                        <button className="btn btn-primary">Buscar</button>
                      </form>
                      {
                        data?.search?.length > 0 &&
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>Estudiante</th>
                              <th>Parcial 1</th>
                              <th>Parcial 2</th>
                              <th>Parcial 3</th>
                              <th>Parcial 4</th>
                              <th>Promedio</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              data?.search?.map((student, index) => (
                                <tr key={index}>
                                  <td>{student.student.split(' - ')[1].split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</td>
                                  <td><input type="number" disabled={!parcial_mes[0].mes.includes(new Date().getMonth())} name="partial_1" id="partial_1" 
                                      min="1" max="10" defaultValue={student.partial_1 == 0 ? 1 : student.partial_1} onChange={e =>{
                                        e.target.value = e.target.value > 10 ? 10 : e.target.value < 1 ? 1 : e.target.value;
                                        setData({
                                          ...data,
                                          update: {
                                            ...data.update,
                                            data: data.update.data?.map((d,i) => {
                                              if(i == index){
                                                return {
                                                  ...d,
                                                  partial_1: parseInt(e.target.value)
                                                }
                                              }else{
                                                return d
                                              }
                                            })
                                          }
                                        })
                                      }}/></td>
                                  <td><input type="number" disabled={!parcial_mes[1].mes.includes(new Date().getMonth())} name="partial_2" id="partial_2" 
                                      min="1" max="10" defaultValue={student.partial_2 == 0 ? 1 : student.partial_2} onChange={e =>{
                                        e.target.value = e.target.value > 10 ? 10 : e.target.value < 1 ? 1 : e.target.value;
                                        setData({
                                          ...data,
                                          update: {
                                            ...data.update,
                                            data: data.update.data?.map((d,i) => {
                                              if(i == index){
                                                return {
                                                  ...d,
                                                  partial_2: parseInt(e.target.value)
                                                }
                                              }else{
                                                return d
                                              }
                                            })
                                          }
                                        })
                                      }}/></td>
                                  <td><input type="number" disabled={!parcial_mes[2].mes.includes(new Date().getMonth())} name="partial_3" id="partial_3" 
                                      min="1" max="10" defaultValue={student.partial_3 == 0 ? 1 : student.partial_3} onChange={e =>{
                                        e.target.value = e.target.value > 10 ? 10 : e.target.value < 1 ? 1 : e.target.value;
                                        setData({
                                          ...data,
                                          update: {
                                            ...data.update,
                                            data: data.update.data?.map((d,i) => {
                                              if(i == index){
                                                return {
                                                  ...d,
                                                  partial_3: parseInt(e.target.value)
                                                }
                                              }else{
                                                return d
                                              }
                                            })
                                          }
                                        })
                                      }}/></td>
                                  <td><input type="number" disabled={!parcial_mes[3].mes.includes(new Date().getMonth())} name="partial_4" id="partial_4" 
                                      min="1" max="10" defaultValue={student.partial_4 == 0 ? 1 : student.partial_4} onChange={e =>{
                                        e.target.value = e.target.value > 10 ? 10 : e.target.value < 1 ? 1 : e.target.value;
                                        setData({
                                          ...data,
                                          update: {
                                            ...data.update,
                                            data: data.update.data?.map((d,i) => {
                                              if(i == index){
                                                return {
                                                  ...d,
                                                  partial_4: parseInt(e.target.value)
                                                }
                                              }else{
                                                return d
                                              }
                                            })
                                          }
                                        })
                                      }}/></td>
                                  <td>{(student.partial_1 + student.partial_2 + student.partial_3 + student.partial_4)/4}</td>
                                </tr>
                              ))
                            }
                          </tbody>
                          <button type="button" className="btn btn-success w-100 mt-2" onClick={handleUpdate}>Registrar</button>
                        </table>
                      }
                    </div>
                </div>
            </section>
            <section className="footer_main">
                <Footer />
            </section>

        </React.Fragment>
    );
}
