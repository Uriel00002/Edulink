import { storeEdulink } from "../store/EdulinkStore";
import { encriptar_desencriptar } from "./criptografia";


export const validateUserInView = (typeUser, permissions) => {
    return (permissions?.c.includes(typeUser) || permissions?.c.includes("all")) || 
            (permissions?.r.includes(typeUser) || permissions?.r.includes("all")) || 
            (permissions?.rbid.includes(typeUser) || permissions?.rbid.includes("all")) || 
            (permissions?.u.includes(typeUser) || permissions?.u.includes("all")) ||
            (permissions?.d.includes(typeUser) || permissions?.d.includes("all"));
}