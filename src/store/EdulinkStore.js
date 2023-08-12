import axios from 'axios';
import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import { Apiurl } from '../services/apirest';


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
    logout: async() => {
        try {
          await axios.get(Apiurl + 'users/logout/?username=' + get().auth.user.username);
          set({
            ...get(),
            auth: {
              token: null,
              user: null,
              isAuth: false,
              isTokenActive: false
            }
          })
        } catch (error) {
          console.log(error);
        }
      }

}), {
    name: 'edulink',
}));
