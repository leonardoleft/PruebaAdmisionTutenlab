package com.javarevolutions.ws.rest.service;

import java.time.LocalTime;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.javarevolutions.ws.rest.vo.HoraUtcRequest;
import com.javarevolutions.ws.rest.vo.Response;
import com.javarevolutions.ws.rest.vo.HoraUtcResponse;

@Path("/HoraZonaHoraria")
public class ServicioCalcularHoraUTC {
@POST
@Path("/obtenerHoraUTC")
@Consumes({MediaType.APPLICATION_JSON})
@Produces({MediaType.APPLICATION_JSON})
public HoraUtcResponse validarUsuario(HoraUtcRequest request) {
	
	System.out.println("Hola");
	
    String timeGTM = request.getHoraGTM();
    String timeZone = request.getZonaHoraria();
    
    LocalTime time = LocalTime.of(Integer.parseInt(timeGTM.split(":")[0]),
    		Integer.parseInt(timeGTM.split(":")[1]),
    		Integer.parseInt(timeGTM.split(":")[2])); 
    LocalTime time2 = time.plusHours(Integer.parseInt(timeZone));
	
	HoraUtcResponse horaUtcResponse = new HoraUtcResponse();
	
	Response response = new Response();
	
	response.setTime(time2.getHour() + ":" + time2.getMinute() + ":" + time2.getSecond());
	response.setTimezone("utc");
	
	horaUtcResponse.setResponse(response);
	
	return horaUtcResponse;
}
}
