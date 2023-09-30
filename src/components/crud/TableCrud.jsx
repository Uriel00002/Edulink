import React, { useEffect, useState } from 'react'
import DataTable from 'datatables.net-dt';
import translate from "translate";
import $ from 'jquery'

import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import { useLocation, useNavigate } from 'react-router-dom';
import { storeEdulink } from '../../store/EdulinkStore';


export const TableCrud = ({data, setAction}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [fields, setFields] = useState([])
  const setLoading = storeEdulink(state => state.setLoading)
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }, [])

  setTimeout(() => {
      try {
          $("#tableCrud").dataTable().fnDestroy();
          $( '#tableCrud' ).dataTable( {
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
      } catch (error) {
          console.log(error);
      }
    },2000)

  useEffect(() => {
      const translateAllWords = async () => {
        const translatedFields = await Promise.all(
          Object.keys(data[0]).map((key) => translateWord(key.toUpperCase().replace(/_/g, " ")))
        );
        setFields(translatedFields);
      };
  
      if (data && data.length > 0) {
        translateAllWords();
      }
    }, [data]);

    const translateWord = async (key) => {
      try {
        const translation = await translate(key, "es");
        return translation;
      } catch (err) {
        console.error(err);
        return key; // Si hay un error en la traducción, usa la clave original
      }
    };
  return (
    <div className='container py-4'>
       
       {  data?.length > 0 ?
          <table id="tableCrud" className="table table-striped table-bordered" style={{width: '100%'}}>
            <thead>
                <tr>
                    {
                        fields?.concat('Acciones')?.map((field, index) => (
                        <th key={index}>{field}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.length && data?.map((item, index) => (
                        <tr key={index}>
                            {
                                Object.keys(item).concat('Acciones')?.map((field, index) => (
                                    <>{
                                        field === 'Acciones' ? (
                                            <td key={index} className=''>
                                                <button className="btn btn-primary me-3" onClick={() => {setAction('registrar'); navigate(location.pathname + '?id='+ item.id)}}><i className="fas fa-solid fa-pen-to-square"></i></button>
                                                <button className="btn btn-danger" ><i className="fas fa-solid fa-trash"></i></button>
                                            </td>
                                        ) : (
                                            <td key={index}>{item[field]}</td>
                                        )
                                    }</>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
          </table>
          : <p className='text-center'>No hay datos</p>
       }
       
    </div>
  )
}
