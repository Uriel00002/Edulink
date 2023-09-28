import axios from 'axios';
import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import { Apiurl } from '../services/apirest';
import Swal from 'sweetalert2';

export const alertError = (msg) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: msg + ' ---- Intente nuevamente o cierre la sesión.'
  })
}

export const alertSuccess = (msg) => {
  Swal.fire({
    icon: 'success',
    title: 'Correcto',
    text: msg
  })
}

export const alertWarning = (msg) => {
  Swal.fire({
    icon: 'warning',
    title: 'Advertencia',
    text: msg
  })
}


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
    setToken: (token) => set(state => ({
        ...state,
        auth: {
            ...state.auth,
            token: token,
        },
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
