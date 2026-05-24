import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../../models/producto.model';
import { MovimientoRequest, MovimientoResponse } from '../../models/movimiento.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = 'http://localhost:5126/productos';

  constructor(private http: HttpClient) {}

  getInventario(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/inventario`);
  }

  registrarMovimiento(movimiento: MovimientoRequest): Observable<MovimientoResponse> {
    return this.http.post<MovimientoResponse>(`${this.apiUrl}/movimiento`, movimiento);
  }
}