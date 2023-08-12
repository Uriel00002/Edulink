import {create} from 'zustand';
import { persist } from 'zustand/middleware';


export const storeEdulink = create(persist((set, get) => ({
    auth:{
        token: null,
        user: null,
        isAuth: false,
        isTokenActive: false,
    },

    setAuth: (auth) => set(state => ({
        auth: auth
    })),

}), {
    name: 'edulink',
}));
