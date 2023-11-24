/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const Error404 = () => {
  const [game, setGame] = useState(false)
  const height = window.innerHeight
  const width = window.innerWidth

  return (
    <div className='d-flex flex-column w-100 align-items-center'>
      <h1>ERROR 404</h1>
      <Link to='/'>Inicio</Link>
      <button onClick={() => window.history.go(-2)}>Regresar a la página anterior</button>
      <button onClick={() => setGame(!game)}>Jugar</button>
      {
        game && (width < 800 || height < 600) &&
        <div className="w-100 alert alert-warning">
          No se puede mostrar el juego, las dimensiones de la pantalla no son suficientes
        </div>
      }
      {
        game && width > 800 && height > 600 &&
        <>En producción...</>
        // <div className="w-100">
        //   <iframe
        //   src="https://oojosueoo.github.io/laberinto_unity/"
        //   frameBorder="0"
        //   class="giphy-embed"
        //   allowFullScreen
        //   style={{ width: '100%', height: '100vh' }}
        // ></iframe>
        // </div>
      }
    </div>
  )
}
