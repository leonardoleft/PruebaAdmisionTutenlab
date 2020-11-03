import React, { Component } from "react";
import WS_Generico from "./WS_Generico";
import Loader from "react-loader-spinner";

import { Table } from "reactstrap";
import { isNumber, Comprobacion } from "./Util";

// Dialog
import SweetAlert from "react-bootstrap-sweetalert";

import TextField from "@material-ui/core/TextField";

import "bootstrap/dist/css/bootstrap.css";
import { Button, ButtonGroup, ButtonToolbar } from "reactstrap";

var Informacion_WS_PutLogin = require("./Informacion_WS_PutLogin.json");
var Informacion_WS_GetBookings = require("./Informacion_WS_GetBookings.json");

class Consumir_API_REST extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ListaClientes: [],
      ListaOriginalClientes: [],
      open: false,
      textoBusqueda: "",
      labelTextoBusqueda: "Buscar en la tabla",
      error: false,
    };
  }
  render() {
    return (
      <div>
        <br></br>
        <br></br>
        <Button color={"primary"} onClick={this.LlamadoServicioWeb}>
          Buscar
        </Button>
        <br></br>
        <br></br>
        <ButtonToolbar>
          <ButtonGroup>
            <TextField
              id="outlined-basic"
              error={this.state.error}
              label={this.state.labelTextoBusqueda}
              variant="outlined"
              value={this.state.textoBusqueda}
              onChange={(event) => {
                this.setState({
                  labelTextoBusqueda: "Buscar en la tabla",
                  error: false,
                  textoBusqueda: event.target.value,
                });

                console.log(event.target.value);
              }}
            />
          </ButtonGroup>

          <ButtonGroup>
            <Button
              color={"primary"}
              onClick={() => {
                let textoBusqueda = this.state.textoBusqueda;

                if (textoBusqueda.length === 0) {
                  this.GenerarErrorCuadroBusqueda("Debe indicar una condición");
                  return;
                }

                if (this.state.ListaClientes.length === 0) {
                  this.GenerarErrorCuadroBusqueda("Debe buscar datos");
                  return;
                }

                this.BusquedaEnTabla(textoBusqueda);
              }}
            >
              Buscar
            </Button>
          </ButtonGroup>

          <ButtonGroup>
            <Button
              color={"primary"}
              onClick={() => {
                this.setState({
                  labelTextoBusqueda: "Buscar en la tabla",
                  error: false,
                  textoBusqueda: "",
                  ListaClientes: this.state.ListaOriginalClientes,
                });
              }}
            >
              Limpiar
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
        <br></br>
        <br></br>
        <Table autoWidth striped bordered hover small responsive>
          <thead textWhite>
            <tr>
              <th>BookingId</th>

              <th>Cliente</th>

              <th>Fecha Creación</th>

              <th>Dirección</th>

              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {this.state.ListaClientes.slice(0, 100).map((valor) => (
              <tr>
                <td>{valor.BookingId}</td>
                <td>{valor.Cliente}</td>
                <td>{valor.Creacion}</td>
                <td>{valor.Direccion}</td>
                <td>{valor.Precio}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <SweetAlert
          info
          show={this.state.open}
          showCancel={false}
          showConfirm={false}
          showCloseButton={false}
          title="Procesando la información"
        >
          Espere mientra se realiza la consulta solicitada
          <Loader
            type="Oval"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </SweetAlert>
      </div>
    );
  }

  LlamadoServicioWeb = async () => {
    this.setState({ open: true });

    let respuesta_WS_PutLogin = await WS_Generico(Informacion_WS_PutLogin);

    // El valor 'TokenName' existe por si en algún momento cambia el nombre
    // del parametro en el servicio web y asi no afecte el código.
    let token = respuesta_WS_PutLogin[Informacion_WS_PutLogin.TokenName];

    Informacion_WS_GetBookings.Headers["Token"] = token;

    let respuesta_WS_GetBookings = await WS_Generico(
      Informacion_WS_GetBookings
    );

    let listaClientes = [];

    respuesta_WS_GetBookings.forEach(function (valor, i) {
      console.log("Cliente número :", ++i);
      console.log("BookingId : ", valor.bookingId);
      console.log(
        "Cliente : ",
        valor.tutenUserProfessional.tutenUser1.firstName,
        valor.tutenUserProfessional.tutenUser1.lastName
      );
      console.log("Creación : ", valor.bookingTime);
      console.log("Dirección : ", valor.locationId.streetAddress);
      console.log("Precio : ", valor.bookingPrice);

      let nombre = valor.tutenUserProfessional.tutenUser1.firstName;
      let apellido = valor.tutenUserProfessional.tutenUser1.lastName;

      var a = new Date(valor.bookingTime);

      console.log(a);

      var months = [
        "Enero",
        "Febbrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time =
        date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;

      listaClientes.push({
        BookingId: valor.bookingId,
        Cliente: nombre + " , " + apellido,
        Creacion: time,
        Direccion: valor.locationId.streetAddress,
        Precio: valor.bookingPrice,
      });
    });

    console.log(listaClientes);

    console.log(respuesta_WS_GetBookings);

    this.setState({
      ListaClientes: listaClientes,
      ListaOriginalClientes: listaClientes,
      open: false,
    });
  };

  BusquedaEnTabla = (textoBusqueda) => {
    textoBusqueda = textoBusqueda.toUpperCase();

    textoBusqueda = textoBusqueda.replace("&&", "AND");
    textoBusqueda = textoBusqueda.replace("&", "AND");
    textoBusqueda = textoBusqueda.replace("||", "OR");
    textoBusqueda = textoBusqueda.replace("|", "OR");

    if (!textoBusqueda.includes("ID") && !textoBusqueda.includes("PRECIO")) {
      this.GenerarErrorCuadroBusqueda("Formato inválido");
      return;
    }

    if (
      !textoBusqueda.includes(">=") &&
      !textoBusqueda.includes("<=") &&
      !textoBusqueda.includes(">") &&
      !textoBusqueda.includes("<") &&
      !textoBusqueda.includes("==")
    ) {
      this.GenerarErrorCuadroBusqueda("Formato inválido");
      return;
    }

    let nuevaListaCliente = [];

    let listaClientes = this.state.ListaClientes;

    var respuesta = textoBusqueda.includes("AND");

    if (respuesta) {
      var res = textoBusqueda.split("AND");

      let consulta1 = res[0].toUpperCase().trim();
      let consulta2 = res[1].toUpperCase().trim();

      if (consulta1.includes("ID") && consulta2.includes("ID")) {
        this.GenerarErrorCuadroBusqueda("Formato inválido");
        return;
      }

      if (consulta1.includes("PRECIO") && consulta2.includes("PRECIO")) {
        this.GenerarErrorCuadroBusqueda("Formato inválido");
        return;
      }

      listaClientes.forEach((row) => {
        let esID = false;
        let esPrecio = false;

        // Se realizan las validaciones suponiendo que lo primero que se
        // consulto el id y despues el precio en una consulta AND ejemplo :
        // id > 3 and precio <= 200.
        if (consulta1.includes("ID")) {
          // Para comparar el id en la búsqueda y el id del registro.
          esID = Comprobacion(consulta1, row.BookingId);

          // La segunda consulta debe ser por el precio.

          esPrecio = Comprobacion(consulta2, row.Precio);
        }
        // Ahora hacer lo contrario, suponiendo que primero se
        // consulto el precio y despues el id ejemplo :
        // precio > 100 and id < 2.
        else {
          // Para comparar el precio en la búsqueda y el precio del registro
          esPrecio = Comprobacion(consulta1, row.Precio);

          // La segunda consulta debe ser por el id.

          esID = Comprobacion(consulta2, row.BookingId);
        }

        if (esID && esPrecio) {
          nuevaListaCliente.push(row);
        }
      });
    } else if (textoBusqueda.includes("OR")) {
      let arreRes = textoBusqueda.split("OR");

      listaClientes.forEach((row) => {
        arreRes.forEach((consulta) => {
          if (
            consulta.includes("ID") &&
            Comprobacion(consulta, row.BookingId)
          ) {
            nuevaListaCliente.push(row);
          } else if (Comprobacion(consulta, row.Precio)) {
            nuevaListaCliente.push(row);
          }
        });
      });
    } else {
      nuevaListaCliente = this.ValidarBusqueda(textoBusqueda);
    }

    if (nuevaListaCliente !== undefined && nuevaListaCliente !== null) {
      this.setState({ ListaClientes: nuevaListaCliente });
    }
  };

  ValidarBusqueda = (busqueda) => {
    let arre = [];

    if (busqueda.includes(">=")) {
      arre = busqueda.split(">=");
    } else if (busqueda.includes("<=")) {
      arre = busqueda.split("<=");
    } else if (busqueda.includes(">")) {
      arre = busqueda.split(">");
    } else if (busqueda.includes("<")) {
      arre = busqueda.split("<");
    } else if (busqueda.includes("==")) {
      arre = busqueda.split("==");
    }

    if (!isNumber(arre[1].trim())) {
      this.GenerarErrorCuadroBusqueda("Se debe buscar por número");
      return;
    }

    let ListaClientes = this.state.ListaClientes;

    let nuevaListaClientes = [];

    let valorNumerico = arre[1].trim();

    if (busqueda.includes(">=")) {
      ListaClientes.forEach((row) => {
        if (
          arre[0].toUpperCase().includes("ID") &&
          parseInt(row.BookingId) >= parseInt(valorNumerico)
        ) {
          nuevaListaClientes.push(row);
        } else if (
          arre[0].toUpperCase().includes("PRECIO") &&
          parseInt(row.Precio) >= parseInt(valorNumerico)
        ) {
          nuevaListaClientes.push(row);
        }
      });
    } else if (busqueda.includes("<=")) {
      ListaClientes.forEach((row) => {
        if (
          arre[0].toUpperCase().includes("ID") &&
          parseInt(row.BookingId) <= parseInt(valorNumerico)
        ) {
          nuevaListaClientes.push(row);
        } else if (
          arre[0].toUpperCase().includes("PRECIO") &&
          parseInt(row.Precio) <= parseInt(valorNumerico)
        ) {
          nuevaListaClientes.push(row);
        }
      });
    } else if (busqueda.includes(">")) {
      ListaClientes.forEach((row) => {
        if (
          arre[0].toUpperCase().includes("ID") &&
          parseInt(row.BookingId) > parseInt(valorNumerico)
        ) {
          nuevaListaClientes.push(row);
        } else if (
          arre[0].toUpperCase().includes("PRECIO") &&
          parseInt(row.Precio) > parseInt(valorNumerico)
        ) {
          nuevaListaClientes.push(row);
        }
      });
    } else if (busqueda.includes("<")) {
      ListaClientes.forEach((row) => {
        if (
          arre[0].toUpperCase().includes("ID") &&
          parseInt(row.BookingId) < parseInt(valorNumerico)
        ) {
          nuevaListaClientes.push(row);
        } else if (
          arre[0].toUpperCase().includes("PRECIO") &&
          parseInt(row.Precio) < parseInt(valorNumerico)
        ) {
          nuevaListaClientes.push(row);
        }
      });
    } else if (busqueda.includes("==")) {
      ListaClientes.forEach((row) => {
        if (
          arre[0].toUpperCase().includes("ID") &&
          parseInt(row.BookingId) == parseInt(valorNumerico)
        ) {
          nuevaListaClientes.push(row);
        } else if (
          arre[0].toUpperCase().includes("PRECIO") &&
          parseInt(row.Precio) == parseInt(valorNumerico)
        ) {
          nuevaListaClientes.push(row);
        }
      });
    }

    return nuevaListaClientes;
  };

  GenerarErrorCuadroBusqueda = (labelTextoBusqueda) => {
    this.setState({
      labelTextoBusqueda: labelTextoBusqueda,
      error: true,
    });
  };
}

export default Consumir_API_REST;
