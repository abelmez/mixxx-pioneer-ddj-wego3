# Pioneer DDJ-WeGO3 — Mapping para Mixxx

> 🌐 **Español** · [English](README.en.md) · [Français](README.fr.md) · [中文](README.zh.md)

## Instalación

Copia o crea un enlace simbólico de los archivos `Pioneer-DDJ-WeGO3-scripts.js` y `Pioneer-DDJ-WeGO3.midi.xml` en tu [carpeta de mappings de controlador](http://mixxx.org/wiki/doku.php/controller_mapping_file_locations).

En Mixxx, ve a **Preferencias → Controladores** y selecciona la primera instancia de `PIONEER DDJ-WeGO3` (el controlador MIDI, no el HID).

Activa el controlador, abre el menú **Cargar Preset** y selecciona **"Pioneer DDJ-WeGO3 (Enhanced)"**.

---

## Controles

### Transporte

| Control | Función |
|---------|---------|
| `PLAY` | Reproducir / Pausar |
| `SHIFT + PLAY` | Efecto de frenado (Brake) |
| `CUE` | Cue por defecto (mantener para preescuchar) |
| `SHIFT + CUE` | Ir al inicio de la pista |

### Sync y Slip

| Control | Función |
|---------|---------|
| `SYNC` | Activar / Desactivar sincronización de BPM |
| `SHIFT + SYNC` | Activar / Desactivar modo Slip |

### Jog Wheels

| Control | Función |
|---------|---------|
| Superficie del plato (touch) | Scratch |
| Anillo exterior del plato | Nudge (ajuste de pitch) |

El scratch está activado por defecto en todos los decks. Al soltar el plato se ignora el movimiento residual durante 200ms para evitar backspin accidental.

### EQ y Faders

| Control | Función |
|---------|---------|
| `HI` | Ecualización de agudos (filterHigh) |
| `MID` | Ecualización de medios (filterMid) |
| `LOW` | Ecualización de graves (filterLow) |
| Fader de canal | Volumen del canal |
| Crossfader | Mezcla entre Deck A y Deck B |
| Tempo slider | Control de velocidad (rate) |

Los knobs EQ utilizan resolución de 14-bit (MSB + LSB) con curva no lineal (rango 0.0 – 4.0).

### Efectos (FX)

#### Botones FX

| Control | Función |
|---------|---------|
| `FX1` | Activar / Desactivar Effect Unit 1 en el deck |
| `FX2` | Activar / Desactivar Effect Unit 2 en el deck |
| `FX3` | Activar / Desactivar Effect Unit 3 en el deck |

Los botones FX del lado izquierdo controlan las unidades de efecto sobre el Deck A, los del lado derecho sobre el Deck B.

#### Intensidad de Efectos (SHIFT + EQ Knobs)

Mantén presionado `SHIFT` y gira los knobs de EQ para controlar la intensidad (`meta`) de cada efecto individual:

**Lado Izquierdo** (EffectUnit1):

| Control | Función |
|---------|---------|
| `SHIFT + HI` | Intensidad del Efecto 1 |
| `SHIFT + MID` | Intensidad del Efecto 2 |
| `SHIFT + LOW` | Intensidad del Efecto 3 |

**Lado Derecho** (EffectUnit2):

| Control | Función |
|---------|---------|
| `SHIFT + HI` | Intensidad del Efecto 1 |
| `SHIFT + MID` | Intensidad del Efecto 2 |
| `SHIFT + LOW` | Intensidad del Efecto 3 |

> **Nota:** Asegúrate de tener efectos cargados en los 3 slots de cada Effect Unit en Mixxx para que el control de intensidad funcione.

### Loops

| Control | Función |
|---------|---------|
| `LOOP` | Activar / Desactivar loop de 4 beats |
| `1/2X` | Reducir el tamaño del loop a la mitad |
| `2X` | Duplicar el tamaño del loop |
| Girar `AUTO LOOP` | Duplicar / Reducir tamaño del loop |
| `SHIFT` + Girar `AUTO LOOP` | Controlar filtro QuickEffect (LP ↔ HP) |

El knob AUTO LOOP es un encoder rotativo: giro horario duplica el loop, giro antihorario lo reduce.
Con SHIFT presionado, ajusta el filtro QuickEffect del deck (0.0 = Low-pass, 0.5 = neutro, 1.0 = High-pass) en pasos de 0.05.

### Hot Cues

| Control | Función |
|---------|---------|
| `1` a `4` | Establecer o disparar hot cue |
| `SHIFT + 1` a `SHIFT + 4` | Borrar hot cue |

### Samplers

| Control | Función |
|---------|---------|
| Botones de Sampler `1` a `4` | Preescuchar Sampler global 1-4 (mantener) |

### Navegación y Librería

| Control | Función |
|---------|---------|
| Girar `BROWSE` | Desplazarse por la lista de pistas |
| `SHIFT` + Girar `BROWSE` | Mover foco entre paneles de la librería |
| Presionar `BROWSE` | Maximizar / Minimizar librería |
| `SHIFT` + Presionar `BROWSE` | Abrir carpeta / Ir al elemento |
| `LOAD` | Cargar pista seleccionada en el deck (si no está reproduciendo) |
| `SHIFT + LOAD` | Agregar pista al final de la cola AutoDJ |

### Monitoreo (PFL / Headphone Cue)

| Control | Función |
|---------|---------|
| `HEADPHONE SELECT A` | Activar / Desactivar PFL del Deck A |
| `HEADPHONE SELECT B` | Activar / Desactivar PFL del Deck B |

### Cambio de Deck Virtual

| Control | Función |
|---------|---------|
| `SHIFT + HEADPHONE SELECT A` | Alternar entre Deck 1 ↔ Deck 3 |
| `SHIFT + HEADPHONE SELECT B` | Alternar entre Deck 2 ↔ Deck 4 |

Al cambiar de deck se resetean los soft takeover de los faders y EQ para evitar saltos.

---

## LEDs

Los siguientes LEDs se actualizan automáticamente según el estado de Mixxx:

| LED | Indica |
|-----|--------|
| `PLAY` | Estado de reproducción |
| `CUE` | Estado de cue |
| `SYNC` | Sincronización activada |
| `HOT CUE 1-4` | Hot cue establecido |
| `PFL A / B` | Monitoreo de auriculares activado |

---

## Configuración

Abre `Pioneer-DDJ-WeGO3-scripts.js` en un editor de texto y modifica las constantes al inicio del archivo:

| Variable | Descripción | Default |
|----------|-------------|---------|
| `AUDIBLE_PLAY_PROTECTION` | No detener la pista si el volumen es > 0 | `false` |
| `AUDIBLE_CUE_PROTECTION` | Protección de cue audible | `true` |
| `ALL_SCRATCH_ON` | Scratch activado por defecto en todos los decks | `true` |
| `JOG_WHEEL_SENSITIVITY` | Sensibilidad del jog wheel | `1.0` |
| `JOG_WHEEL_SHIFT_FACTOR` | Factor de velocidad con Shift | `10.0` |
| `BROWSE_KNOB_SHIFT_FACTOR` | Factor de scroll rápido con Shift | `10` |

Al guardar el archivo, Mixxx lo recargará automáticamente.

---

## Licencia

Este mapping se distribuye bajo los términos de la licencia MIT. Ver `LICENSE.md` para más detalles.
