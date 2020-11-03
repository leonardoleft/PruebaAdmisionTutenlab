export const  isNumber = (n)=> {
  return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}

//export default isNumber;

export const  Comprobacion = (consulta, valorListado) => {
    if (consulta.includes(">=") ) {
        let valorBusqueda = consulta.split(">=")[1].trim();
        if(parseInt(valorBusqueda) >= parseInt(valorListado)){
          return true;
        }            
      } else if (consulta.includes("<=")) {
        let valorBusqueda = consulta.split("<=")[1].trim();
        if(parseInt(valorBusqueda) <= parseInt(valorListado)){
          return true;
        }             
      } else if (consulta.includes(">")) {
        let valorBusqueda = consulta.split(">")[1].trim();
        if(parseInt(valorBusqueda) > parseInt(valorListado)){
          return true;
        }            
      } else if (consulta.includes("<")) {
        let valorBusqueda = consulta.split("<")[1].trim();
        if(parseInt(valorBusqueda) < parseInt(valorListado)){
          return true;
        }             
      } else if (consulta.includes("==")) {
        let valorBusqueda = consulta.split("==")[1].trim();
        if(parseInt(valorBusqueda) == parseInt(valorListado)){
          return true;
        }            
      }

  return false;
}

//export default Comprobacion;
