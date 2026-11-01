# Pruebas automatizadas de recargos escolares con Cypress

Este repositorio contiene una **calculadora de recargos escolares** y pruebas automatizadas de extremo a extremo (E2E) realizadas con **Cypress**. Esta guía explica cómo instalar todo lo necesario y reproducir las pruebas **desde cero**, incluso si nunca usaste Cypress.

## 1. ¿Qué hace la aplicación?

La calculadora solicita el día del mes en el que se paga una cuota escolar y muestra el recargo correspondiente:

| Día ingresado | Resultado esperado |
| --- | --- |
| Del 1 al 10 | Recargo: 0% |
| Del 11 al 20 | Recargo: 2% |
| Del 21 al 31 | Recargo: 4% |
| Vacío, menor a 1, mayor a 31 o no entero | Día inválido |

La aplicación es un único archivo `index.html` y funciona localmente: **no requiere base de datos ni servicios externos**.

## 2. Requisitos previos

Necesitás:

1. **Node.js (versión LTS vigente)**, que incluye npm. Descargalo desde <https://nodejs.org/>. Para comprobar su instalación, abrí una terminal y ejecutá:

   ```bash
   node --version
   npm --version
   ```

   Ambos comandos deben mostrar un número de versión. Si no funcionan, instalá Node.js, cerrá la terminal y abrila de nuevo.

2. **Una conexión a Internet** para instalar las dependencias y descargar el ejecutable de Cypress la primera vez.
3. **Un editor de código (opcional)**, por ejemplo Visual Studio Code: <https://code.visualstudio.com/>.
4. Un navegador compatible para la ejecución interactiva; Cypress puede usar su navegador Electron incluido.

> **No necesitás tener Cypress instalado globalmente**: el proyecto lo declara como dependencia de desarrollo y `npm` lo instala por vos.

## 3. Preparar el proyecto

1. Descargá y descomprimí el archivo ZIP del proyecto.
2. Abrí una terminal dentro de la carpeta `pruebas-recargos` (la carpeta que contiene `package.json`).
   - **Windows:** abrí la carpeta en el Explorador de archivos, escribí `cmd` en la barra de direcciones y presioná Enter; también podés usar la terminal de VS Code.
   - **macOS/Linux:** abrí una terminal y entrá a esa carpeta con `cd`.
3. Instalá las dependencias:

   ```bash
   npm ci
   ```

   Esto instala las versiones registradas en `package-lock.json`, incluidas **Cypress** y **http-server**. Puede tardar unos minutos la primera vez. Si modificaste las dependencias y el archivo de bloqueo está desactualizado, podés usar `npm install` en su lugar.

4. Comprobá que Cypress esté disponible:

   ```bash
   npx cypress verify
   ```

   Si la verificación termina correctamente, ya podés ejecutar las pruebas.

## 4. Levantar la aplicación local

En una **primera terminal**, dentro de `pruebas-recargos`, ejecutá:

```bash
npx http-server . -p 3000 -a 127.0.0.1
```

Abrí el navegador y visitá <http://localhost:3000/index.html>. Deberías ver la calculadora de recargos. Podés ingresar `15` y comprobar que aparezca **Recargo: 2%**.

**Dejá esta terminal abierta** mientras corrés los tests. Para detener el servidor, presioná `Ctrl+C`.

> La configuración de Cypress (`cypress.config.js`) usa `baseUrl: "http://localhost:3000"`. Si el puerto 3000 está ocupado, liberalo o modificá el puerto tanto en el comando del servidor como en la configuración de Cypress.

## 5. Ejecutar Cypress con interfaz gráfica (recomendado para empezar)

1. Abrí una **segunda terminal** en la misma carpeta, sin cerrar la terminal del servidor.
2. Ejecutá:

   ```bash
   npx cypress open
   ```

3. En la ventana de Cypress, elegí **E2E Testing**.
4. Seleccioná un navegador disponible y hacé clic en **Start E2E Testing**.
5. Abrí el archivo **`recargos.cy.js`** para ejecutar las 24 pruebas de la calculadora.
6. Observá los resultados: Cypress muestra qué casos pasan y, si hubiera fallos, la información de la aserción que falló.

Para ver una demostración de un caso correcto y un fallo deliberado, ejecutá **`demo-fallo.cy.js`** por separado. Ese archivo incluye esperas intencionales para que los pasos se puedan observar con facilidad.

## 6. Ejecutar desde la terminal (sin interfaz gráfica)

Con el servidor del paso 4 todavía funcionando, abrí otra terminal y elegí uno de estos comandos:

**Ejecutar únicamente las pruebas funcionales (24 casos; resultado esperado: todas aprobadas):**

```bash
npx cypress run --spec "cypress/e2e/recargos.cy.js"
```

**Ejecutar la demostración de PASS/FAIL (un fallo intencional):**

```bash
npx cypress run --spec "cypress/e2e/demo-fallo.cy.js"
```

**Ejecutar todos los archivos:**

```bash
npx cypress run
```

**Atención:** el último comando incluye `demo-fallo.cy.js`, por lo que **se espera un resultado global con fallo**. Esto es deliberado y no implica necesariamente que la aplicación esté mal implementada.

## 7. ¿Qué casos de prueba incluye?

| Archivo | Técnica / objetivo | Cantidad |
| --- | --- | ---: |
| `cypress/e2e/recargos.cy.js` | Tabla de decisión: días representativos de los tres tramos y un inválido | 4 |
| `cypress/e2e/recargos.cy.js` | Valores límite: bordes de los tramos y del rango permitido | 12 |
| `cypress/e2e/recargos.cy.js` | Clases de equivalencia: entradas válidas e inválidas (texto, decimal, vacío, etc.) | 8 |
| `cypress/e2e/demo-fallo.cy.js` | Demostración visual: 1 prueba que pasa y 1 que falla a propósito | 2 |

**Total: 26 pruebas definidas, de las cuales 1 está diseñada para fallar.**

### ¿Por qué falla una prueba de demostración?

En `demo-fallo.cy.js`, el caso `FAIL - Día 15, recargo del 4%` ingresa el día 15, pero **espera equivocadamente** `Recargo: 4%`. La calculadora devuelve correctamente `Recargo: 2%`, por lo que Cypress marca el test como fallido. Esta prueba sirve para aprender a leer el resultado de un test que no cumple su expectativa.

## 8. Estructura del proyecto

```text
pruebas-recargos/
├── index.html                  # Aplicación web: calculadora de recargos
├── package.json                # Dependencias del proyecto
├── package-lock.json           # Versiones fijadas de las dependencias
├── cypress.config.js           # Configuración de Cypress (puerto 3000)
├── README.md                   # Esta guía
└── cypress/
    └── e2e/
        ├── recargos.cy.js      # 24 pruebas funcionales
        └── demo-fallo.cy.js    # 2 pruebas de demostración
```

La carpeta `node_modules/` **no necesita incluirse en el ZIP**, porque se reconstruye al ejecutar `npm ci`.

## 9. Problemas frecuentes

**`node` o `npm` no se reconoce:** instalá Node.js desde su sitio oficial, reiniciá la terminal y comprobá sus versiones.

**`npm ci` falla:** asegurate de estar en la carpeta que contiene `package.json` y `package-lock.json`, verificá la conexión a Internet y consultá el error mostrado. Si el bloqueo está desactualizado respecto de `package.json`, usá `npm install`.

**Cypress no se abre o indica que falta su ejecutable:** ejecutá:

```bash
npx cypress install
npx cypress verify
```

**`cy.visit()` falla o aparece `ECONNREFUSED`:** comprobá que el servidor de la primera terminal siga encendido y que <http://localhost:3000/index.html> se abra en tu navegador.

**El puerto 3000 está ocupado:** cerrá el programa que lo usa o cambiá de puerto en el servidor y en `cypress.config.js`.

**Aparece 1 prueba fallida al ejecutar todo:** es el comportamiento esperado del archivo `demo-fallo.cy.js`. Ejecutá solamente `recargos.cy.js` para validar la funcionalidad.

**Linux: faltan bibliotecas gráficas:** Cypress puede requerir librerías del sistema para Electron. Revisá los requisitos de tu distribución en <https://docs.cypress.io/app/get-started/install-cypress>.

## 10. Guía rápida (si ya tenés Node.js)

Desde la carpeta `pruebas-recargos`:

```bash
npm ci
```

**Terminal 1:**

```bash
npx http-server . -p 3000 -a 127.0.0.1
```

**Terminal 2 (modo visual):**

```bash
npx cypress open
```

**O Terminal 2 (ejecución funcional automática):**

```bash
npx cypress run --spec "cypress/e2e/recargos.cy.js"
```

**Resultado esperado:** 24 casos funcionales aprobados, siempre que la aplicación y las dependencias funcionen correctamente en el equipo.
