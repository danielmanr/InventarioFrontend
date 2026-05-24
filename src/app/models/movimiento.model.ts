export interface MovimientoRequest {
  productoId: number;
  cantidad: number;
  tipo: 'entrada' | 'salida';
}

export interface MovimientoResponse {
  message: string;
  producto: {
    id: number;
    nombre: string;
    cantidad: number;
  };
}