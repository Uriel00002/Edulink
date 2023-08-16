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

    ui: {
        loading: false,
        error: null,
    },

    setAuth: (auth) => set(state => ({
        ...state,
        auth: auth,
    })),
    setLoading: (loading) => set(state => ({
        ...state,
        ui: loading,
    })),
    logout: async() => {
        try {
          await axios.get(Apiurl + 'users/logout/?username=' + get().auth.user.username);
        } catch (error) {
          console.log(error);
        } finally {
          set({
            ...get(),
            auth: {
              token: null,
              user: null,
              isAuth: false,
              isTokenActive: false
            }
          })
        }
      }

}), {
    name: 'edulink',
}));
