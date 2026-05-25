# Sistema de Gestión de Inventario para ccl

Sistema web para gestionar el inventario de productos segun prueba tecnica para CCL.
Permite a usuarios autenticados registrar entradas y salidas de productos,
así como consultar el inventario actual.

---

## Tecnologías utilizadas

### Backend
- C# con .NET 9
- PostgreSQL 16
- Entity Framework Core 9
- JWT (Bearer Token)
- Swagger / OpenAPI

### Frontend
- Angular 19 con TypeScript
- SCSS
- HttpClient con Interceptores

---

## Arquitectura del Backend

El backend está desarrollado con arquitectura por capas: 
- InventarioAPI.Domain         → Entidades del dominio
- InventarioAPI.Infrastructure → DbContext y acceso a datos
- InventarioAPI.Application    → Servicios, interfaces y DTOs
- InventarioAPI.API            → Controllers y configuración

---

## Requisitos previos

- .NET 9 SDK
- PostgreSQL 16 o superior
- Node.js 20+
- Angular CLI 19

---

## Configuración del Backend

### 1. Clonar el repositorio
```bash
git clone https://github.com/danielmanr/InventarioApi.git
cd InventarioApi
```

### 2. Configurar la base de datos
Crear la base de datos en PostgreSQL:
```sql
CREATE DATABASE inventario_ccl;
```

### 3. Configurar appsettings.json
Editar el archivo `InventarioAPI.API/appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=inventario_ccl;Username=postgres;Password=TU_PASSWORD"
  },
  "Jwt": {
    "Key": "TU_CLAVE_JWT_MINIMO_32_CARACTERES",
    "Issuer": "InventarioAPI",
    "Audience": "InventarioApp"
  }
}
```

### 4. Correr las migraciones
```bash
# Instalar herramienta EF Core (solo la primera vez)
dotnet tool install --global dotnet-ef

# Aplicar migraciones y cargar datos iniciales
dotnet ef database update --startup-project InventarioAPI.API
```

### 5. Correr el backend
```bash
cd InventarioAPI.API
dotnet run
```

El servidor estará disponible en: `http://localhost:5126`
Swagger disponible en: `http://localhost:5126/swagger`

---

### Credenciales de prueba

Usuario: admin
Contraseña: admin123

---

### Ejemplo de movimiento
```json
{
  "productoId": 1,
  "cantidad": 5,
  "tipo": "entrada"
}
```

---
## Configuración del Frontend

### 1. Clonar el repositorio
```bash
git clone https://github.com/danielmanr/InventarioFrontend.git
cd inventario-frontend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Correr el frontend
```bash
ng serve
```

La aplicación estará disponible en: `http://localhost:4200`

---

## Datos iniciales

La base de datos se inicializa automáticamente con estos productos:

| ID | Producto | Cantidad |
|----|----------|----------|
| 1 | Laptop | 10 |
| 2 | Mouse | 25 |
| 3 | Teclado | 15 |
| 4 | Monitor | 8 |
| 5 | Auriculares | 20 |

---

## Flujo de la aplicación

1. El usuario inicia sesión en `/login`
2. El sistema valida las credenciales y devuelve un JWT
3. El token se almacena en localStorage
4. El interceptor agrega el token automáticamente en cada petición
5. El guard protege las rutas `/inventario` y `/movimiento`
6. El usuario puede consultar el inventario y registrar movimientos