# Marketplace Next.js

## Descripción

Este proyecto es un **Marketplace de anuncios** desarrollado con **Next.js**, **TailwindCSS** y **Prisma**.  
Permite a los usuarios crear, listar y gestionar anuncios de productos de manera sencilla y rápida.

El objetivo principal del proyecto fue **aprender y aplicar buenas prácticas en un proyecto Fullstack** usando tecnologías modernas de React y Node.js.

---

## Tecnologías

- **Frontend:** Next.js (App Router), React, TailwindCSS  
- **Backend:** Next.js API Routes, Prisma ORM, PostgreSQL  
- **Testing:** Vitest  
- **Autenticación:** Gestión de usuarios con Prisma (login simple)  
- **Herramientas:** Git, npm  

---

## Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd marketplace-nextjs
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno(.env):
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
NEXT_PUBLIC_ENV=development
```

4. Generar Prisma Client:
```bash
npx prisma db push
```

5. Iniciar la aplicación en modo desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en http://localhost:3000.

## Testing

Se incluyen tests unitarios para las acciones del servidor (Server Actions) usando Vitest.

Ejecutar los tests:
```bash
npm run test
```


## Estructura del proyecto

/src
  /app            # Páginas y App Router de Next.js
  /components     # Componentes React reutilizables
  /lib            # Librerías y acciones del servidor
/tests            # Tests unitarios con Vitest
/prisma           # Esquema de base de datos Prisma
/public           # Recursos estáticos

## Seed de base de datos
El proyecto incluye un script para poblar la base de datos con datos iniciales.

Archivo:
```
prisma/seed.ts
```
Este script crea:

- usuarios de prueba

- anuncios iniciales

Ejecutarlo con:
```bash
npx tsx prisma/seed.ts
```

## Hash de contraseñas

El proyecto incluye un script para generar contraseñas seguras usando hashing.

Archivo:
```
scripts/hashPasswords.ts
```
Este script permite:

- generar contraseñas hasheadas

- usarlas para seed o creación manual de usuarios

Ejecutarlo con:
```bash
npx tsx scripts/hashPasswords.ts
```