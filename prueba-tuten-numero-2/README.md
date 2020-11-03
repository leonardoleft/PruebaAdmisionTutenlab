Para la ejecución del proyecto número 2 que comprende de convertir una hora GTM a UTC se debe utilizar "Eclipse IDE for Enterprise Java Developers - 2020-09"
para ejecutar el servicio web.

Para el cliente se utilizo React js. Para esto se debe tener instalado Node versión v12.19.0 y npm versión 6.14.8.
Se utilizo el editor (Visual Studio Code). Para ejecutar el proyecto en visual studio code se debe abrir el proyecto con el editor y
 utilizar el comando npm start.

Para consunir el servicio tambien se puede utilizar la herramienta "Postman". En el cuerpo del envio de datos en formato JSON
debe tener el siguiente formato :

Request :

{
    "horaGTM" : "02:30:22",
    "zonaHoraria" : "-5"
}

Response :

{
	"response": {
		"time": "18:43:00",
		"timezone": "utc"
        }
}