import axios from "axios";
import React, { useEffect, useState } from "react";
import { Apiurl } from "../../services/apirest";

export const Index_categories = () => {
    const token = localStorage.getItem("token");
    const [data, setData] = useState(null);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        try {
            const response = await axios.get(Apiurl + "categories/", {
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