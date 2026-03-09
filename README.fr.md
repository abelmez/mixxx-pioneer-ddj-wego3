# Pioneer DDJ-WeGO3 — Mapping pour Mixxx

> [🇪🇸 Español](README.md) · [🇬🇧 English](README.en.md) · 🇫🇷 **Français** · [🇨🇳 中文](README.zh.md)

## Installation

Copiez ou créez un lien symbolique des fichiers `Pioneer-DDJ-WeGO3-scripts.js` et `Pioneer-DDJ-WeGO3.midi.xml` dans votre [dossier de mappings de contrôleur](http://mixxx.org/wiki/doku.php/controller_mapping_file_locations).

Dans Mixxx, allez dans **Préférences → Contrôleurs** et sélectionnez la première instance de `PIONEER DDJ-WeGO3` (le contrôleur MIDI, pas le HID).

Activez le contrôleur, ouvrez le menu **Charger un Preset** et sélectionnez **"Pioneer DDJ-WeGO3 (Enhanced)"**.

---

## Contrôles

### Transport

| Contrôle | Fonction |
|----------|----------|
| `PLAY` | Lecture / Pause |
| `SHIFT + PLAY` | Effet de freinage (Brake) |
| `CUE` | Cue par défaut (maintenir pour pré-écouter) |
| `SHIFT + CUE` | Retour au début de la piste |

### Sync et Slip

| Contrôle | Fonction |
|----------|----------|
| `SYNC` | Activer / Désactiver la synchronisation BPM |
| `SHIFT + SYNC` | Activer / Désactiver le mode Slip |

### Jog Wheels

| Contrôle | Fonction |
|----------|----------|
| Surface du plateau (touch) | Scratch |
| Anneau extérieur | Nudge (ajustement du pitch) |

Le scratch est activé par défaut sur tous les decks. Le mouvement résiduel est ignoré pendant 200ms après le relâchement du plateau pour éviter un backspin accidentel.

### EQ et Faders

| Contrôle | Fonction |
|----------|----------|
| `HI` | Égalisation des aigus (filterHigh) |
| `MID` | Égalisation des médiums (filterMid) |
| `LOW` | Égalisation des graves (filterLow) |
| Fader de canal | Volume du canal |
| Crossfader | Mixage entre Deck A et Deck B |
| Tempo slider | Contrôle de vitesse (rate) |

Les knobs EQ utilisent une résolution 14-bit (MSB + LSB) avec une courbe non linéaire (plage 0.0 – 4.0).

### Effets (FX)

#### Boutons FX

| Contrôle | Fonction |
|----------|----------|
| `FX1` | Activer / Désactiver l'Effect Unit 1 sur le deck |
| `FX2` | Activer / Désactiver l'Effect Unit 2 sur le deck |
| `FX3` | Activer / Désactiver l'Effect Unit 3 sur le deck |

Les boutons FX du côté gauche contrôlent les unités d'effet sur le Deck A, ceux du côté droit sur le Deck B.

#### Intensité des Effets (SHIFT + Knobs EQ)

Maintenez `SHIFT` et tournez les knobs EQ pour contrôler l'intensité (`meta`) de chaque effet individuel :

**Côté Gauche** (EffectUnit1) :

| Contrôle | Fonction |
|----------|----------|
| `SHIFT + HI` | Intensité de l'Effet 1 |
| `SHIFT + MID` | Intensité de l'Effet 2 |
| `SHIFT + LOW` | Intensité de l'Effet 3 |

**Côté Droit** (EffectUnit2) :

| Contrôle | Fonction |
|----------|----------|
| `SHIFT + HI` | Intensité de l'Effet 1 |
| `SHIFT + MID` | Intensité de l'Effet 2 |
| `SHIFT + LOW` | Intensité de l'Effet 3 |

> **Note :** Assurez-vous que des effets sont chargés dans les 3 slots de chaque Effect Unit dans Mixxx pour que le contrôle d'intensité fonctionne.

### Boucles

| Contrôle | Fonction |
|----------|----------|
| `LOOP` | Activer / Désactiver une boucle de 4 temps |
| `1/2X` | Réduire la taille de la boucle de moitié |
| `2X` | Doubler la taille de la boucle |
| Tourner `AUTO LOOP` | Doubler / Réduire la taille de la boucle |
| `SHIFT` + Tourner `AUTO LOOP` | Contrôler le filtre QuickEffect (LP ↔ HP) |

Le knob AUTO LOOP est un encodeur rotatif : rotation horaire double la boucle, rotation antihoraire la réduit.
Avec SHIFT maintenu, il ajuste le filtre QuickEffect du deck (0.0 = Passe-bas, 0.5 = neutre, 1.0 = Passe-haut) par pas de 0.05.

### Hot Cues

| Contrôle | Fonction |
|----------|----------|
| `1` à `4` | Définir ou déclencher un hot cue |
| `SHIFT + 1` à `SHIFT + 4` | Effacer un hot cue |

### Samplers

| Contrôle | Fonction |
|----------|----------|
| Boutons Sampler `1` à `4` | Pré-écouter le Sampler global 1-4 (maintenir) |

### Navigation et Bibliothèque

| Contrôle | Fonction |
|----------|----------|
| Tourner `BROWSE` | Défiler dans la liste de pistes |
| `SHIFT` + Tourner `BROWSE` | Déplacer le focus entre les panneaux de la bibliothèque |
| Appuyer sur `BROWSE` | Maximiser / Minimiser la bibliothèque |
| `SHIFT` + Appuyer sur `BROWSE` | Ouvrir le dossier / Aller à l'élément |
| `LOAD` | Charger la piste sélectionnée dans le deck (si pas en lecture) |
| `SHIFT + LOAD` | Ajouter la piste à la file AutoDJ |

### Monitoring (PFL / Écoute au casque)

| Contrôle | Fonction |
|----------|----------|
| `HEADPHONE SELECT A` | Activer / Désactiver le PFL du Deck A |
| `HEADPHONE SELECT B` | Activer / Désactiver le PFL du Deck B |

### Changement de Deck Virtuel

| Contrôle | Fonction |
|----------|----------|
| `SHIFT + HEADPHONE SELECT A` | Basculer entre Deck 1 ↔ Deck 3 |
| `SHIFT + HEADPHONE SELECT B` | Basculer entre Deck 2 ↔ Deck 4 |

Le soft takeover est réinitialisé sur les faders et l'EQ lors du changement de deck pour éviter les sauts.

---

## LEDs

Les LEDs suivantes se mettent à jour automatiquement selon l'état de Mixxx :

| LED | Indique |
|-----|---------|
| `PLAY` | État de lecture |
| `CUE` | État du cue |
| `SYNC` | Synchronisation activée |
| `HOT CUE 1-4` | Hot cue défini |
| `PFL A / B` | Monitoring casque actif |

---

## Configuration

Ouvrez `Pioneer-DDJ-WeGO3-scripts.js` dans un éditeur de texte et modifiez les constantes en haut du fichier :

| Variable | Description | Défaut |
|----------|-------------|--------|
| `AUDIBLE_PLAY_PROTECTION` | Empêcher l'arrêt de la piste si le volume est > 0 | `false` |
| `AUDIBLE_CUE_PROTECTION` | Protection de cue audible | `true` |
| `ALL_SCRATCH_ON` | Scratch activé par défaut sur tous les decks | `true` |
| `JOG_WHEEL_SENSITIVITY` | Sensibilité du jog wheel | `1.0` |
| `JOG_WHEEL_SHIFT_FACTOR` | Facteur de vitesse avec Shift | `10.0` |
| `BROWSE_KNOB_SHIFT_FACTOR` | Facteur de défilement rapide avec Shift | `10` |

Mixxx rechargera automatiquement le fichier à la sauvegarde.

---

## Licence

Ce mapping est distribué sous les termes de la licence MIT. Voir `LICENSE.md` pour plus de détails.
