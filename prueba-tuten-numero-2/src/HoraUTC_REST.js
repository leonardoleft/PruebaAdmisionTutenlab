import React from "react";
const $ = require("jquery");

async function CalcularHoraUTC(horaGTM, zonaHoraria) { 
  
  let data = {
        horaGTM: horaGTM,
        zonaHoraria: zonaHoraria
    }

  let valorRespuesta = await fetch(
    "http://localhost:8080/RestJR/servicio/HoraZonaHoraria/obtenerHoraUTC",
    {
      method: "post",
      mode: 'no-cors', 
      'Content-Type': 'application/json',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })      ,
      body: JSON.stringify(data),
    }
  )
    .then((response) => {
      if(response.status === 200){  
      return response.json();
      }else{
          return "Error";
      }
    }).catch(function (err) {
        console.error(err);
      });

  return valorRespuesta;
}

export default CalcularHoraUTC;
