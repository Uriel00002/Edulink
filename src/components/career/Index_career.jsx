import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { Apiurl } from '../../services/apirest';

export const Index_career = () => {
    const token = localStorage.getItem("token");

    const [data, setData] = useState(null)

    useEffect(() => {
        getCareers();
    }, [])

    const getCareers = async() => {
        try {
            const response = await axios.get(Apiurl + 'careers/', {headers: {'Content-Type': 'application/json', 'Authorization': 'Token ' + token}})
            setData(response.data)
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <Fragment>
       
       <pre>{JSON.stringify(data, null, 2)}</pre>
       
    </Fragment>
  )
}
