import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../core/services/producto.service';
import { Producto } from '../../models/producto.model';
import { MovimientoRequest } from '../../models/movimiento.model';

@Component({
  selector: 'app-movimiento',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './movimiento.component.html',
  styleUrl: './movimiento.component.scss'
})
export class MovimientoComponent implements OnInit {

  productos: Producto[] = [];
  loading: boolean = false;
  loadingProductos: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  movimiento: MovimientoRequest = {
    productoId: 0,
    cantidad: 1,
    tipo: 'entrada'
  };

  constructor(
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.loadingProductos = true;
    this.productoService.getInventario().subscribe({
      next: (data) => {
        this.productos = data;
        this.loadingProductos = false;
      },
      error: () => {
        this.errorMessage = 'Error al cargar los productos.';
        this.loadingProductos = false;
      }
    });
  }

  registrar(): void {
    if (this.movimiento.productoId === 0) {
      this.errorMessage = 'Por favor selecciona un producto.';
      return;
    }

    if (this.movimiento.cantidad <= 0) {
      this.errorMessage = 'La cantidad debe ser mayor a 0.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.productoService.registrarMovimiento(this.movimiento).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.loading = false;
        this.movimiento = { productoId: 0, cantidad: 1, tipo: 'entrada' };
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al registrar el movimiento.';
        this.loading = false;
      }
    });
  }

  volver(): void {
    this.router.navigate(['/inventario']);
  }
}