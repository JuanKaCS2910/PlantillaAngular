<div align="center">

# 📦 Sistema de Gestión de Inventario

### Aplicación web de administración — Categorías · Marcas · Productos · Usuarios

![Angular](https://img.shields.io/badge/Angular-21-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![PrimeNG](https://img.shields.io/badge/PrimeNG-21-3B82F6?style=for-the-badge&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/Curso-CURS--000673-8B5CF6?style=for-the-badge)

**Proyecto Final — Angular · Galaxy Training**
Instructor: Aristedes Novoa Arbildo

</div>

---

## ✨ Características

- 🔐 **Autenticación JWT** — Login real con access + refresh token
- 🔄 **Refresh automático** — El interceptor renueva la sesión ante un 401 y reintenta el request
- 📋 **CRUD completo × 4 entidades** — Diálogo único para crear/editar (POST ↔ PUT/PATCH automático)
- 🗑️ **Eliminación segura** — Confirmación previa con `p-confirmDialog`
- 🔍 **Búsqueda en vivo** + paginación + ordenamiento por columna
- 🖼️ **Imágenes de producto** — Selector de archivos, preview local y zoom en grilla
- 📊 **Dashboard real** — Totales, activos e inactivos por entidad con navegación a mantenimientos
- 🔔 **Toast centralizado** — Notificaciones personalizadas en toda la app
- 🌙 **Tema claro/oscuro** — Switcher integrado en el topbar
- 👤 **Menú de usuario** — Cierre de sesión desde el topbar

---

## 🏗️ Arquitectura

> Organización **feature-based** · Patrón **Container → Presenter**

```
src/app/
│
├── 🧩 core/
│   ├── auth/login/          # Login (componente + modelo + servicio)
│   └── interceptor/         # Bearer token + refresh automático
│
├── 🤝 shared/
│   ├── components/toast/    # <app-toast> — instancia única global
│   └── services/            # NotificationService
│
├── 🎨 layout/
│   ├── component/           # Topbar, sidebar, footer, menú
│   └── service/             # Tema, dark mode, estado del menú
│
├── 📦 features/             # ¡Negocio! Una carpeta por entidad
│   ├── categorias/          # master → botonera + list + new + model + service
│   ├── marcas/              # ── mismo patrón ──
│   ├── productos/           # ── mismo patrón ──
│   └── usuarios/            # ── mismo patrón ──
│
└── 📄 pages/                # Dashboard, landing, notfound
```

### Patrón repetido en cada feature

```
🏠 XxxHome (container — orquesta el estado)
    ├── 🔘 XxxBotonera   → emite (nuevo)
    ├── 📋 XxxList       → emite (editar) + delete con confirmación
    └── ✏️  XxxNew        → diálogo crear/editar → emite (saved)
```

**Comunicación con signals modernos:**

| API | Dirección | Uso en el proyecto |
|---|---|---|
| `input()` | Padre → Hijo | `[editData]` — producto a editar |
| `output()` | Hijo → Padre | `(saved)`, `(editar)`, `(nuevo)` |
| `model()` | Bidireccional | `[(visible)]` — abre/cierra diálogo |
| `effect()` | Reacción | Copia `editData` al formulario |

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Framework | **Angular 21** — Standalone, Signals, Zoneless |
| Lenguaje | TypeScript 5.9 |
| Componentes UI | PrimeNG 21 (tema **Aura**) |
| Estilos | **Tailwind CSS 4** + tailwindcss-primeui |
| Íconos | PrimeIcons 7 |
| Backend | API REST .NET + SQL Server |
| HTTP | `HttpClient` + interceptor funcional |

---

## 🚀 Instalación

### Prerrequisitos

- Node.js 20+
- Backend corriendo en `https://localhost:7150` → [Swagger](https://localhost:7150/swagger)

### Pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el servidor de desarrollo
npm start
```

### 3. Abrir `http://localhost:4200/` → redirige a `/login` 🎉

---

## 🗺️ Rutas

| Ruta | Módulo | Descripción |
|:---:|---|---|
| `/` | Dashboard | Estadísticas del negocio |
| `/login` | Auth | Pantalla de acceso |
| `/categorias` | Mantenimiento | CRUD de categorías |
| `/marcas` | Mantenimiento | CRUD de marcas |
| `/productos` | Mantenimiento | CRUD de productos + imágenes |
| `/usuarios` | Seguridad | CRUD de usuarios |
| `/**` | — | Página NotFound |

---

## ⚙️ Configuración

`src/environments/environment.ts` — un solo lugar para la URL del API:

```ts
export const environment = {
    URL_BASE: 'https://localhost:7150'
};
```

**Endpoints consumidos:** `/api/auth/login` · `/api/auth/refresh` · `/api/auth/perfil` · `/api/categorias` · `/api/marcas` · `/api/productos` · `/api/usuarios` · `/api/dashboard/resumen`

---

## 🧠 Decisiones técnicas

| Decisión | Por qué |
|---|---|
| **Standalone** | Sin NgModules — cada componente declara sus propios `imports` |
| **Zoneless** | `provideZonelessChangeDetection()` — detección por signals, más performance |
| **Signals** | `signal()` / `computed()` / `effect()` — estado reactivo explícito |
| **Lazy loading** | `loadComponent` por feature — bundle inicial liviano |
| **DI funcional** | `inject()` en vez de constructor DI |
| **Wrapper API** | `{ exito, mensaje, datos, errores }` — contrato uniforme |

---

## 📦 Scripts

```bash
npm start          # ng serve      → desarrollo en :4200
npm run build      # ng build      → producción en dist/
npm test           # ng test       → Karma + Jasmine
npm run format     # prettier      → formatea el código
```

---

## 👨‍💻 Repositorio

[![GitHub](https://img.shields.io/badge/GitHub-PlantillaAngular-181717?style=for-the-badge&logo=github)](https://github.com/JuanKaCS2910/PlantillaAngular)

Rama activa: **`AngularGalaxy`**

<div align="center">

---
*Desarrollado con Angular 21 · Proyecto final de curso*
</div>
