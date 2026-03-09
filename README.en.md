# Pioneer DDJ-WeGO3 — Mapping for Mixxx

> 🌐 [Español](README.md) · **English** · [Français](README.fr.md) · [中文](README.zh.md)

## Installation

Copy or symlink `Pioneer-DDJ-WeGO3-scripts.js` and `Pioneer-DDJ-WeGO3.midi.xml` to your [user controller mapping folder](http://mixxx.org/wiki/doku.php/controller_mapping_file_locations).

In Mixxx, go to **Preferences → Controllers** and select the first instance of `PIONEER DDJ-WeGO3` (the MIDI controller, not HID).

Enable the controller, open the **Load Preset** menu and select **"Pioneer DDJ-WeGO3 (Enhanced)"**.

---

## Controls

### Transport

| Control | Function |
|---------|----------|
| `PLAY` | Play / Pause |
| `SHIFT + PLAY` | Brake effect |
| `CUE` | Default cue (hold to preview) |
| `SHIFT + CUE` | Jump to track start |

### Sync & Slip

| Control | Function |
|---------|----------|
| `SYNC` | Toggle BPM sync |
| `SHIFT + SYNC` | Toggle Slip mode |

### Jog Wheels

| Control | Function |
|---------|----------|
| Platter surface (touch) | Scratch |
| Outer ring | Nudge (pitch adjust) |

Scratch is enabled by default on all decks. Residual movement is ignored for 200ms after releasing the platter to prevent accidental backspin.

### EQ & Faders

| Control | Function |
|---------|----------|
| `HI` | High EQ (filterHigh) |
| `MID` | Mid EQ (filterMid) |
| `LOW` | Low EQ (filterLow) |
| Channel fader | Channel volume |
| Crossfader | Mix between Deck A and Deck B |
| Tempo slider | Speed control (rate) |

EQ knobs use 14-bit resolution (MSB + LSB) with a non-linear curve (range 0.0 – 4.0).

### Effects (FX)

#### FX Buttons

| Control | Function |
|---------|----------|
| `FX1` | Toggle Effect Unit 1 on deck |
| `FX2` | Toggle Effect Unit 2 on deck |
| `FX3` | Toggle Effect Unit 3 on deck |

Left-side FX buttons control effect units on Deck A, right-side on Deck B.

#### Effect Intensity (SHIFT + EQ Knobs)

Hold `SHIFT` and turn EQ knobs to control individual effect intensity (`meta`):

**Left Side** (EffectUnit1):

| Control | Function |
|---------|----------|
| `SHIFT + HI` | Effect 1 intensity |
| `SHIFT + MID` | Effect 2 intensity |
| `SHIFT + LOW` | Effect 3 intensity |

**Right Side** (EffectUnit2):

| Control | Function |
|---------|----------|
| `SHIFT + HI` | Effect 1 intensity |
| `SHIFT + MID` | Effect 2 intensity |
| `SHIFT + LOW` | Effect 3 intensity |

> **Note:** Make sure effects are loaded in all 3 slots of each Effect Unit in Mixxx for the intensity control to work.

### Loops

| Control | Function |
|---------|----------|
| `LOOP` | Toggle 4-beat loop |
| `1/2X` | Halve loop size |
| `2X` | Double loop size |
| Turn `AUTO LOOP` | Double / Halve loop size |
| `SHIFT` + Turn `AUTO LOOP` | QuickEffect filter control (LP ↔ HP) |

The AUTO LOOP knob is a rotary encoder: clockwise doubles the loop, counter-clockwise halves it.
With SHIFT held, it adjusts the deck's QuickEffect filter (0.0 = Low-pass, 0.5 = neutral, 1.0 = High-pass) in 0.05 steps.

### Hot Cues

| Control | Function |
|---------|----------|
| `1` to `4` | Set or trigger hot cue |
| `SHIFT + 1` to `SHIFT + 4` | Clear hot cue |

### Samplers

| Control | Function |
|---------|----------|
| Sampler buttons `1` to `4` | Preview global Sampler 1-4 (hold) |

### Library Navigation

| Control | Function |
|---------|----------|
| Turn `BROWSE` | Scroll through track list |
| `SHIFT` + Turn `BROWSE` | Move focus between library panels |
| Press `BROWSE` | Maximize / Minimize library |
| `SHIFT` + Press `BROWSE` | Open folder / Go to item |
| `LOAD` | Load selected track into deck (if not playing) |
| `SHIFT + LOAD` | Add track to AutoDJ queue |

### Monitoring (PFL / Headphone Cue)

| Control | Function |
|---------|----------|
| `HEADPHONE SELECT A` | Toggle Deck A PFL |
| `HEADPHONE SELECT B` | Toggle Deck B PFL |

### Virtual Deck Switching

| Control | Function |
|---------|----------|
| `SHIFT + HEADPHONE SELECT A` | Switch between Deck 1 ↔ Deck 3 |
| `SHIFT + HEADPHONE SELECT B` | Switch between Deck 2 ↔ Deck 4 |

Soft takeover is reset on faders and EQ when switching decks to prevent jumps.

---

## LEDs

The following LEDs update automatically based on Mixxx state:

| LED | Indicates |
|-----|-----------|
| `PLAY` | Playback state |
| `CUE` | Cue state |
| `SYNC` | Sync enabled |
| `HOT CUE 1-4` | Hot cue set |
| `PFL A / B` | Headphone monitoring active |

---

## Configuration

Open `Pioneer-DDJ-WeGO3-scripts.js` in a text editor and modify the constants at the top:

| Variable | Description | Default |
|----------|-------------|---------|
| `AUDIBLE_PLAY_PROTECTION` | Prevent stopping track if volume > 0 | `false` |
| `AUDIBLE_CUE_PROTECTION` | Audible cue protection | `true` |
| `ALL_SCRATCH_ON` | Scratch enabled by default on all decks | `true` |
| `JOG_WHEEL_SENSITIVITY` | Jog wheel sensitivity | `1.0` |
| `JOG_WHEEL_SHIFT_FACTOR` | Shift speed factor | `10.0` |
| `BROWSE_KNOB_SHIFT_FACTOR` | Quick scroll factor with Shift | `10` |

Mixxx will automatically reload the file when saved.

---

## License

This mapping is released under the terms of the MIT license. See `LICENSE.md` for details.
