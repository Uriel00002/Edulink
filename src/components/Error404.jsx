/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/error404.css';


export const Error404 = () => {
  const [game, setGame] = useState(false)
  const height = window.innerHeight
  const width = window.innerWidth

  return (
    <div className='main_error d-flex flex-column w-100 align-items-center'>
      <h1 className='msg_error'>ERROR 404</h1>
      <Link to='/' className='title_error'>Inicio</Link>
      <button onClick={() => window.history.go(-2)} className='btn_back'>Regresar a la página anterior</button>
      <button onClick={() => setGame(!game)} className='btn_play'>Jugar</button>
      {
        game && (width < 800 || height < 600) &&
        <div className="w-100 alert alert-warning">
          No se puede mostrar el juego, las dimensiones de la pantalla no son suficientes
        </div>
      }
      {
        game && width > 800 && height > 600 &&
        <div className="w-100">
          <iframe
          src="https://oojosueoo.github.io/laberinto_unity/"
          frameBorder="0"
          class="giphy-embed"
          allowFullScreen
          style={{ width: '100%', height: '100vh' }}
        ></iframe>
        </div>
      }
    </div>
  )
}
