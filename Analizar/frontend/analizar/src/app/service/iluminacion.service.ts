import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IluminacionService {
  constructor(private http: HttpClient) { }
  apiUrl = 'http://localhost:8000/iluminacion/'
  apiUrlAdd = 'http://localhost:8000/iluminacion/addIluminacion'
  apiUrlGet = 'http://localhost:8000/iluminacion/'
  apiUrlDel = 'http://localhost:8000/iluminacion/deleteIluminacion'
  apiUrlEdit = 'http://localhost:8000/iluminacion/editIluminacion'

  getIluminacion(): Observable<any> {
    //return this.http.get(this.apiUrlGet);
    let userId = localStorage.getItem('userId')
    //console.log(userId);       
    const url = `${this.apiUrl}iluminacionbyuser/${userId}`;
    return this.http.get(url);
  }
  addIluminacion(nombre: string, detalle: string, identificador: string, user: number, intensidad: number, encendido: boolean): Observable<any> {
    const medidor = { nombre, detalle, identificador, user, intensidad, encendido }
    return this.http.post(this.apiUrlAdd, medidor)
  }


  removeIluminacion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrlDel}/${id}`);
  }
  getIluminacionById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}getIluminacionById/${id}`);
  }

  updateIluminacion(id: number, intensidad: number, encendido: boolean): Observable<any>{
    const iluminacion = { intensidad, encendido}
    return this.http.put(`${this.apiUrlEdit}/${id}`, iluminacion);
  }
}

