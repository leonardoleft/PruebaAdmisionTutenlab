async function WS_Generico (Informacion_WS) {
     
    let info ;

    if(Informacion_WS.Method == 'GET'){
      info = {
        method: Informacion_WS.Method,          
        headers: new Headers(Informacion_WS.Headers)
      }
    }else{
      info = {
        method: Informacion_WS.Method,  
        body: Informacion_WS.Body,
        headers: new Headers(Informacion_WS.Headers)
      }
    }
    
    let valorRespuesta = await fetch(Informacion_WS.URL, info)
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

      return valorRespuesta;
}

export default WS_Generico;