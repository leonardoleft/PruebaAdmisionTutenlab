//var Informacion_WS_GetBookings = require("./Informacion_WS_GetBookings.json");

async function GetBookings () {
  
    let url_get = 'https://dev.tuten.cl:443/TutenREST/rest/user/contacto%40tuten.cl/bookings?current=true&adminemail=testapis@tuten.cl&email=contacto@tuten.cl&app=APP_BCK&token=testapis@tuten.clqbfdobdbhfv9ubhbbbos5fieoq';

     let valorRespuesta = await fetch(url_get, {
      method: "get",
      headers: new Headers(
        {"Content-Type": "application/json",
         "Accept":"application/json",
         "App" : "APP_BCK",
         "Adminemail": "testapis@tuten.cl",
         "Token" : "testapis@tuten.clqbfdobdbhfv9ubhbbbos5fieoq" 
        }
     )
    })
      .then(function (response) {

        if(response !== null && response !== undefined && response.status === 200){
          return response.json(); 
        }else{

          if(response === null){
            console.log('Valor de la respuesta  igual a nulo.');
          }else if(response === undefined){
            console.log('Valor de la respuesta igual a (undefined)');
          }else {
            console.log('Error estatus número : ' + response.status);
          }         

          return 'ERROR';
        }
        
      })      
      .catch(function (err) {
        console.error(err);
      });

      console.log('El valor resultante de la consulta (GET Bookings) es :');
      console.log(valorRespuesta);
}

export default GetBookings;