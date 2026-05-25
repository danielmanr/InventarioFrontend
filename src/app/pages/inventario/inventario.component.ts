import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../core/services/producto.service';
import { AuthService } from '../../core/services/auth.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.scss'
})
export class InventarioComponent implements OnInit {

  productos: Producto[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private productoService: ProductoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarInventario();
  }

  cargarInventario(): void {
    this.loading = true;
    this.errorMessage = '';

    this.productoService.getInventario().subscribe({
      next: (data) => {
        this.productos = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Error al cargar el inventario.';
        this.loading = false;
      }
    });
  }

  irAMovimiento(): void {
    this.router.navigate(['/movimiento']);
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getTotalUnidades(): number {
  return this.productos.reduce((sum, p) => sum + p.cantidad, 0);
}

  getStockBajo(): number {
    return this.productos.filter(p => p.cantidad <= 5).length;
  }
}