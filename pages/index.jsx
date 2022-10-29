import React, { Fragment } from 'react'
import GeneratorQR  from './Components/GeneratorQR'


export default function index() {
  return (
    <Fragment>
    <div>
      <h1>CERTIBLOCK</h1>
      <h5>¿Que es certiblock?</h5>
      <p>
      Certiblock es un sistema de seguridad blockchain que ofrece servicios de creacion de 
      colleciones de nfts como su distribucion y verificacion de existencia en la red de 
      polygon en la cual trabaja nuestro servicio.
      </p>
      <p>Certiblock crea colleciones y las distribulle por medio de su propia cartera digital 
         "validateblock" en la cual puedes almacenar tus nfts o simplemente dejarlos en la 
         collecion actual en la que fueron creados. </p>
    </div>
    <GeneratorQR/>
    </Fragment>
  )
}
