import React, { Component } from "react";
import ReactJson from "react-json-view";
import "bootstrap/dist/css/bootstrap.css";
import {
  Container,
  Row,
  Col,
  Button,
  FormSelect,
  Card,
  CardBody,
} from "shards-react";
import CalcularHoraUTC from "./HoraUTC_REST";
import SweetAlert from "react-bootstrap-sweetalert";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

class SeleccionarHoraGTM extends Component {
  constructor(props) {
    super(props);

    let hora = [];

    for (let i = 1; i < 25; i++) {
      let item = {
        Valor: "",
        Selected: false,
      };
      if (i < 10) {
        item.Valor = "0" + i;
        hora.push(item);
      } else {
        item.Valor = i;
        hora.push(item);
      }
    }

    let minSeg = [];

    for (let i = 1; i < 60; i++) {
      let item = {
        Valor: "",
        Selected: false,
      };
      if (i < 10) {
        item.Valor = "0" + i;
        minSeg.push(item);
      } else {
        item.Valor = i;
        minSeg.push(item);
      }
    }

    let zonaHoraria = [];

    for (let i = -12; i < 13; i++) {
      let item = {
        Valor: "",
        Selected: false,
      };
      if (i > -10 && i < 10) {
        if (i > -10 && i < 0) {
          item.Valor = "-0" + i * -1;
          zonaHoraria.push(item);
        } else if (i >= 0 && i < 10) {
          item.Valor = "0" + i;
          zonaHoraria.push(item);
        }
      } else {
        item.Valor = i;
        zonaHoraria.push(item);
      }
    }

    this.state = {
      hora: hora,
      minSeg: minSeg,
      zonaHoraria: zonaHoraria,
      horaSelect: "01",
      minSelect: "01",
      segSelect: "01",
      zonaSelect: "-12",
      response: {},
      listadoCategoria: [],
      listadoPais: [],
      abrirModal: false,
    };
  }

  render() {
    return (
      <div>
        <SweetAlert
          info
          show={this.state.abrirModal}
          showCancel={false}
          showConfirm={false}
          showCloseButton={false}
          title="Procesando la información"
          style={{ color: "black" }}
        >
          <p>Espere mientra se realiza la consulta solicitada</p>
          <Loader
            type="Oval"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={300000} //3 secs
          />
        </SweetAlert>
        <Container fluid className="main-content-container px-4 pb-4">
          <Row>
            <Col lg="12" md="12">
              <Card small className="mb-3">
                <CardBody>
                  <Container fluid className="main-content-container px-4">
                    <Row
                      style={{ color: "black" }}
                      noGutters
                      className="page-header py-4"
                    >
                      Convertir hora GTM a UTC
                    </Row>
                    <Row>
                      <Col lg="12">
                        <Row style={{ color: "black" }} form>
                          <Col md="4" className="form-group">
                            <label htmlFor="listaHora">Hora</label>
                            <FormSelect
                              id="listaHora"
                              name="listaHora"
                              style={{ color: "black" }}
                              onChange={() => {
                                let valor = document.getElementById("listaHora")
                                  .value;

                                this.setState({ horaSelect: valor });
                              }}
                            >
                              {this.state.hora
                                .slice(0, 1000000)
                                .map((post, key) => (
                                  <option
                                    value={post.Valor}
                                    selected={post.Selected}
                                  >
                                    {post.Valor}
                                  </option>
                                ))}
                            </FormSelect>
                          </Col>
                          <Col md="4" className="form-group">
                            <label htmlFor="listaMinuto">Minuto</label>
                            <FormSelect
                              id="listaMinuto"
                              name="listaMinuto"
                              onChange={() => {
                                let valor = document.getElementById(
                                  "listaMinuto"
                                ).value;

                                this.setState({ minSelect: valor });
                              }}
                            >
                              {this.state.minSeg
                                .slice(0, 1000000)
                                .map((post, key) => (
                                  <option
                                    value={post.Valor}
                                    selected={post.Selected}
                                  >
                                    {post.Valor}
                                  </option>
                                ))}
                            </FormSelect>
                          </Col>
                          <Col md="4" className="form-group">
                            <label htmlFor="listaSegundo">Segundo</label>
                            <FormSelect
                              id="listaSegundo"
                              name="listaSegundo"
                              onChange={() => {
                                let valor = document.getElementById(
                                  "listaSegundo"
                                ).value;

                                this.setState({ segSelect: valor });
                              }}
                            >
                              {this.state.minSeg
                                .slice(0, 1000000)
                                .map((post, key) => (
                                  <option
                                    value={post.Valor}
                                    selected={post.Selected}
                                  >
                                    {post.Valor}
                                  </option>
                                ))}
                            </FormSelect>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="12">
                        <Row style={{ color: "black" }} form>
                          <Col md="12" className="form-group">
                            <label htmlFor="listaZonaHoraria">
                              Zona Horaria
                            </label>
                            <FormSelect
                              id="listaZonaHoraria"
                              name="listaZonaHoraria"
                              style={{ color: "black" }}
                              onChange={() => {
                                let valor = document.getElementById(
                                  "listaZonaHoraria"
                                ).value;

                                this.setState({ zonaSelect: valor });
                              }}
                            >
                              {this.state.zonaHoraria
                                .slice(0, 1000000)
                                .map((post, key) => (
                                  <option
                                    value={post.Valor}
                                    selected={post.Selected}
                                  >
                                    {post.Valor}
                                  </option>
                                ))}
                            </FormSelect>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Container>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Button
            onClick={async () => {
              this.setState({ abrirModal: true });

              let hora = this.state.horaSelect;
              let min = this.state.minSelect;
              let seg = this.state.segSelect;
              let zona = this.state.zonaSelect;

              let H = hora + ":" + min + ":" + seg;

              let response = await CalcularHoraUTC(H, zona.toString());

              if (
                response === null ||
                response === undefined ||
                response === "Error"
              ) {
                this.setState({
                  response: {
                    error: "Error en la consulta.",
                  },
                });
              } else {
                this.setState({ response: response });
              }

              this.setState({ abrirModal: false });
            }}
          >
            CALCULAR ZONA HORARIA
          </Button>
          <br></br>
          <br></br>
          <label>RESULTADO DE LA CONSULTA :</label>
          <ReactJson src={this.state.response} theme="monokai" />
        </Container>
      </div>
    );
  }
}

export default SeleccionarHoraGTM;
