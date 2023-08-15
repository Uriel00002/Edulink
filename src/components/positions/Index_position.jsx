import axios from "axios";
import React, { useEffect, useState } from "react";
import { Apiurl } from "../../services/apirest";

export const Index_position = () => {
    const token = localStorage.getItem("token");
    const [data, setData] = useState(null);

    useEffect(() => {
        getPositions();
        
    }, []);

    const getPositions = async () => {
        try {
            const response = await axios.get(Apiurl + "positions/", {
                headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + token,
                },
            });
            setData(response.data);
            console.log(response.data);
            } catch (error) {
            console.log(error);
            }
    }

    return (
        <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}