// Pioneer DDJ-WeGO3 Mapping for Mixxx

var PioneerDDJWeGO3 = function() {};
var wego3 = PioneerDDJWeGO3;

// =============
// Configuración
// =============

// Protección para no detener la pista accidentalmente si está sonando
wego3.AUDIBLE_PLAY_PROTECTION = true;
wego3.AUDIBLE_CUE_PROTECTION = true;

// Activar Scratch en todos los decks por defecto
wego3.ALL_SCRATCH_ON = true;

// Sensibilidad de las ruedas
wego3.JOG_WHEEL_SENSITIVITY = 1.0;
wego3.JOG_WHEEL_SHIFT_FACTOR = 10.0;
wego3.BROWSE_KNOB_SHIFT_FACTOR = 10;

// Configuración de Scratch
wego3.SCRATCH_SETTINGS = {
    alpha: 1.0 / 8,
    beta: 1.0 / 8 / 32,
    jogResolution: 720,
    vinylSpeed: 33 + 1/3,
    safeScratchTimeout: 20 // ms
};

// Intervalos para el Loop Roll (Shift + Sampler buttons)
wego3.BOUNCE_LOOP_INTERVALS = [1 / 4, 1 / 2, 1, 2];

// Variables de estado interno
wego3.shiftPressed = false;
wego3.scratchMode = [true, true, true, true];
wego3.slipMode = [false, false, false, false]; // Slip desactivado por defecto
wego3.jogTouchTimer = [0, 0, 0, 0]; // Para evitar rebote al soltar el jog

// Mapeo de LEDs (Comandos MIDI)
wego3.LED_MAP = {
    headphoneCue: {'[Left]': [0x96, 0x54], '[Right]': [0x96, 0x55], '[Master]': [0x96, 0x5b]},
    loop: {'[Left]': [0x9b, 0x10], '[Right]': [0x9b, 0x11]},
    fx1: {'[Left]': [0x94, 0x43], '[Right]': [0x95, 0x43]},
    fx2: {'[Left]': [0x94, 0x44], '[Right]': [0x95, 0x44]},
    fx3: {'[Left]': [0x94, 0x45], '[Right]': [0x95, 0x45]},
    sync: {'[Left]': [0x90, 0x58], '[Right]': [0x91, 0x58]},
    play: {'[Left]': [0x90, 0x0b], '[Right]': [0x91, 0x0b]},
    cue: {'[Left]': [0x90, 0x0c], '[Right]': [0x91, 0x0c]},
    cuePoint1: {'[Left]': [0x90, 0x2e], '[Right]': [0x91, 0x2e]},
    cuePoint2: {'[Left]': [0x90, 0x2f], '[Right]': [0x91, 0x2f]},
    cuePoint3: {'[Left]': [0x90, 0x30], '[Right]': [0x91, 0x30]},
    cuePoint4: {'[Left]': [0x90, 0x31], '[Right]': [0x91, 0x31]},
    sampler1: {'[Left]': [0x90, 0x3c], '[Right]': [0x91, 0x3c]},
    sampler2: {'[Left]': [0x90, 0x3e], '[Right]': [0x91, 0x3e]},
    sampler3: {'[Left]': [0x90, 0x40], '[Right]': [0x91, 0x40]},
    sampler4: {'[Left]': [0x90, 0x42], '[Right]': [0x91, 0x42]}
};

wego3.LED_CONTROL_FUNCTIONS = {
    play: 'wego3.playLed',
    pfl: 'wego3.headphoneCueLed',
    beat_active: 'wego3.syncLed',
    hotcue_1_enabled: 'wego3.hotCueLed',
    hotcue_2_enabled: 'wego3.hotCueLed',
    hotcue_3_enabled: 'wego3.hotCueLed',
    hotcue_4_enabled: 'wego3.hotCueLed'
};

// ==============
// Inicialización
// ==============

wego3.init = function(id) {
    print('Pioneer DDJ-WeGO3: Inicializando...');
    
    // Mapeo de grupos y decks
    wego3.allChannels = ['[Channel1]', '[Channel2]', '[Channel3]', '[Channel4]'];
    wego3.groupDecks = {'[Channel1]': 0, '[Channel2]': 1, '[Channel3]': 2, '[Channel4]': 3};
    wego3.deckGroups = ['[Channel1]', '[Channel2]', '[Channel3]', '[Channel4]'];
    
    // Mapeo Virtual para conmutar decks (Shift + PFL)
    wego3.actualGroupMap = {'[Left]': '[Channel1]', '[Right]': '[Channel2]', '[Master]': '[Master]'};
    wego3.actualGroupToggleMap = {
        '[Channel1]': '[Channel3]', '[Channel2]': '[Channel4]',
        '[Channel3]': '[Channel1]', '[Channel4]': '[Channel2]'
    };
    wego3.virtualGroupMap = {
        '[Channel1]': '[Left]', '[Channel2]': '[Right]',
        '[Channel3]': '[Left]', '[Channel4]': '[Right]', '[Master]': '[Master]'
    };

    // Estructuras para valores de alta resolución (14-bit)
    wego3.highResMSB = { '[Channel1]': {}, '[Channel2]': {}, '[Channel3]': {}, '[Channel4]': {}, '[Master]': {} };

    // Configuración inicial de Mixxx
    wego3.setAllSoftTakeover();
    wego3.turnOffAllLeds('[Left]');
    wego3.turnOffAllLeds('[Right]');
    wego3.turnOffAllLeds('[Master]');
    
    // Conectar señales (LEDs y estado)
    wego3.bindDeckLeds('[Left]', true);
    wego3.bindDeckLeds('[Right]', true);
    wego3.bindGlobalLeds(true);
    
    print('Pioneer DDJ-WeGO3: Listo.');
};

wego3.shutdown = function() {
    wego3.bindDeckLeds('[Left]', false);
    wego3.bindDeckLeds('[Right]', false);
    wego3.bindGlobalLeds(false);
    wego3.setAllSoftTakeover(false);
};

// ==============================
// Utilidades y Soft Takeover
// ==============================

wego3.setAllSoftTakeover = function (isBinding) {
    isBinding = (isBinding === undefined) ? true : isBinding;
    wego3.allChannels.forEach(function (c) { wego3.setDeckSoftTakeover(c, isBinding); });
};

wego3.setDeckSoftTakeover = function (channel, isBinding) {
    engine.softTakeover(channel, 'pregain', isBinding);
    engine.softTakeover(channel, 'volume', isBinding);
    engine.softTakeover(channel, 'rate', isBinding);
    engine.softTakeover(channel, 'filterHigh', isBinding);
    engine.softTakeover(channel, 'filterMid', isBinding);
    engine.softTakeover(channel, 'filterLow', isBinding);
    engine.softTakeover('[QuickEffectRack1_' + channel + ']', 'super1', isBinding);
};

wego3.resetAllSoftTakeover = function () {
    wego3.allChannels.forEach(function (c) { wego3.resetDeckSoftTakeover(c); });
};

wego3.resetDeckSoftTakeover = function (channel) {
    // Ignora el siguiente valor para evitar saltos al cambiar de capa (Deck 1 -> 3)
    engine.softTakeoverIgnoreNextValue(channel, 'pregain');
    engine.softTakeoverIgnoreNextValue(channel, 'volume');
    engine.softTakeoverIgnoreNextValue(channel, 'rate');
    engine.softTakeoverIgnoreNextValue(channel, 'filterHigh');
    engine.softTakeoverIgnoreNextValue(channel, 'filterMid');
    engine.softTakeoverIgnoreNextValue(channel, 'filterLow');
    engine.softTakeoverIgnoreNextValue('[QuickEffectRack1_' + channel + ']', 'super1');
};

wego3.actualGroup = function (group) { return wego3.actualGroupMap[group] || group; };
wego3.virtualGroup = function (group) {
    var virtualGroup = wego3.virtualGroupMap[group];
    return (group == wego3.actualGroup(virtualGroup)) ? virtualGroup : null;
};

// ========================
// Controladores Genéricos (Hi-Res)
// ========================

wego3.hiResControl = function (functionName, controlName, callback, min, midMax, max, predicate, shifted, groupNameFn) {
    // Lógica para 14-bit MIDI (combinando MSB y LSB)
    if (callback === 'linear') {
        min = min || 0.0; max = (midMax === undefined) ? 1.0 : midMax;
        callback = function(fullValue, group) {
            if (!!wego3.shiftPressed != !!shifted) return;
            if (!predicate || predicate()) {
                var newValue = script.absoluteLin(fullValue, min, max, 0, 0x3fff);
                if (groupNameFn) group = groupNameFn(group);
                engine.setValue(group, controlName, newValue);
            }
        };
    } else if (callback === 'nonlinear') {
        min = min || 0.0; midMax = midMax || 1.0; max = max || 4.0;
        callback = function(fullValue, group) {
            if (!!wego3.shiftPressed != !!shifted) return;
            if (!predicate || predicate()) {
                var newValue = script.absoluteNonLin(fullValue, min, midMax, max, 0, 0x3fff);
                if (groupNameFn) group = groupNameFn(group);
                engine.setValue(group, controlName, newValue);
            }
        };
    }
    
    var suffix = shifted ? 'WhileShiftPressed' : '';
    var msbName = functionName + 'MSB' + suffix;
    var lsbName = functionName + 'LSB' + suffix;
    var fnKey = functionName + suffix;

    wego3[msbName] = function (c, ctrl, val, s, group) {
        group = wego3.actualGroup(group);
        wego3.highResMSB[group][fnKey] = val;
    };
    wego3[lsbName] = function (c, ctrl, val, s, group) {
        group = wego3.actualGroup(group);
        var fullValue = (wego3.highResMSB[group][fnKey] << 7) + val;
        callback(fullValue, group);
    };
};

// Definición de controles de Hardware
wego3.canCrossFade = function () { return true; }; // Simplificado
wego3.quickEffectRackGroup = function (group) { return '[QuickEffectRack1_' + group + ']'; };

wego3.hiResControl('crossFader', 'crossfader', 'linear', -1.0, 1.0, null, wego3.canCrossFade);
wego3.hiResControl('tempoSlider', 'rate', 'linear', 1.0, -1.0);
// Filtro (Shift + High Knob)
wego3.hiResControl('filterHighKnob', 'super1', 'linear', 0, 1.0, null, null, true, wego3.quickEffectRackGroup);
// EQs
wego3.hiResControl('filterHighKnob', 'filterHigh', 'nonlinear');
wego3.hiResControl('filterMidKnob', 'filterMid', 'nonlinear');
// Gain (Shift + Mid Knob)
wego3.hiResControl('filterMidKnob', 'pregain', 'nonlinear', 0.0, 1.0, 4.0, null, true);
wego3.hiResControl('filterLowKnob', 'filterLow', 'nonlinear');
// Faders de volumen
wego3.hiResControl('deckFader', 'volume', 'linear');
wego3.hiResControl('deckFader', 'volume', 'linear', 0.0, 1.0, null, null, true); // Soporte Shift

// =================
// Botones y Logica
// =================

wego3.shiftButton = function (channel, control, value, status, group) {
    wego3.bindDeckLeds(group, false); // Apagar conexiones anteriores
    wego3.turnOffAllLeds(group);
    wego3.shiftPressed = (value > 0);
    wego3.bindDeckLeds(group, true); // Reconectar para la nueva capa
    wego3.resetAllSoftTakeover();
};

// Navegación
wego3.browseKnob = function (channel, control, value, status, group, shiftFactor) {
    var delta = (value === 0x01) ? 1 : -1;
    var factor = shiftFactor || 1;
    engine.setValue('[Library]', 'MoveVertical', delta * factor);
};

wego3.browseKnobShifted = function (channel, control, value, status, group) {
    // Scroll rápido o navegación lateral
    var delta = (value === 0x01) ? 1 : -1;
    engine.setValue('[Library]', 'MoveFocus', delta); 
};

wego3.browseButton = function (channel, control, value, status, group) {
    if (value) {
        // Maximizar/Minimizar librería
        script.toggleControl('[Library]', 'MaximizeLibrary');
    }
};

wego3.browseButtonShifted = function (channel, control, value, status, group) {
    if (value) {
        // Cargar en previo o expandir carpeta
        script.toggleControl('[Library]', 'GoToItem');
    }
};

wego3.loadButton = function (channel, control, value, status, group) {
    group = wego3.actualGroup(group);
    if (value && !engine.getValue(group, 'play')) {
        engine.setValue(group, 'LoadSelectedTrack', 1);
    }
};

wego3.loadButtonShifted = function (channel, control, value, status, group) {
    if (value) {
        // Añadir a AutoDJ o cargar en deck secundario
        engine.setValue('[Library]', 'AutoDjAddBottom', 1);
    }
};

// Transporte
wego3.playButton = function (channel, control, value, status, group) {
    group = wego3.actualGroup(group);
    if (value) {
        if (wego3.AUDIBLE_PLAY_PROTECTION && engine.getValue(group, 'volume') > 0 && engine.getValue(group, 'play')) {
            // Protección: no parar si suena
            return;
        }
        var deck = wego3.groupDecks[group];
        engine.brake(deck + 1, 0); // Desactivar freno si estaba activo
        script.toggleControl(group, 'play');
    }
};

wego3.playButtonShifted = function (channel, control, value, status, group) {
    // Efecto Frenado (Brake)
    group = wego3.actualGroup(group);
    if (value && engine.getValue(group, 'play')) {
        engine.brake(wego3.groupDecks[group] + 1, true);
    }
};

wego3.cueButton = function (channel, control, value, status, group) {
    group = wego3.actualGroup(group);
    engine.setValue(group, 'cue_default', value ? 1 : 0);
};

wego3.cueButtonShifted = function (channel, control, value, status, group) {
    group = wego3.actualGroup(group);
    // Backspin o ir al inicio
    engine.setValue(group, 'start', value ? 1 : 0);
};

// Sync y Slip
wego3.syncButton = function (channel, control, value, status, group) {
    group = wego3.actualGroup(group);
    if (value) script.toggleControl(group, 'sync_enabled');
};

wego3.syncButtonShifted = function (channel, control, value, status, group) {
    group = wego3.actualGroup(group);
    if (value) {
        var deck = wego3.groupDecks[group];
        wego3.slipMode[deck] = !wego3.slipMode[deck];
        script.toggleControl(group, 'slip_enabled');
        print("Slip Mode Deck " + (deck+1) + ": " + wego3.slipMode[deck]);
    }
};

// Loops
wego3.loopButton = function(c, ctrl, val, s, group) {
    if (val) script.toggleControl(wego3.actualGroup(group), 'beatloop_4_toggle');
};
wego3.loopHalfButton = function(c, ctrl, val, s, group) {
    if (val) engine.setValue(wego3.actualGroup(group), 'loop_halve', 1);
};
wego3.loopDoubleButton = function(c, ctrl, val, s, group) {
    if (val) engine.setValue(wego3.actualGroup(group), 'loop_double', 1);
};

// Hot Cues
wego3.hotCueButton = function (channel, control, value, status, group) {
    var idx = control - 0x2d; // 1-4
    group = wego3.actualGroup(group);
    engine.setValue(group, 'hotcue_' + idx + '_activate', value ? 1 : 0);
};

wego3.hotCueButtonShifted = function (channel, control, value, status, group) {
    var idx = control - 0x5e; // 1-4
    if (value) engine.setValue(wego3.actualGroup(group), 'hotcue_' + idx + '_clear', 1);
};

// Samplers (Controla Samplers 1-4 con Left, 5-8 con Right si se mapeara así, pero usaremos el grupo del deck)
// El WeGO tiene botones físicos dedicados para Sampler con notas diferentes a HotCue.
wego3.samplerButton = function (channel, control, value, status, group) {
    // Mapeamos a Samplers 1-4 globales para simplificar, o samplers por deck
    var idx = ((control - 0x3c) / 2) + 1; 
    // Usaremos Samplers globales 1-4
    engine.setValue('[Sampler' + idx + ']', 'cue_preview', value ? 1 : 0);
};

// Efectos
wego3.fxButton = function (channel, control, value, status, group) {
    if (value) {
        var fxUnit = control - 0x42; // 1, 2, 3
        group = wego3.actualGroup(group);
        script.toggleControl('[EffectRack1_EffectUnit' + fxUnit + ']', 'group_' + group + '_enable');
    }
};

// Cambio de Deck (Headphone Select + Shift)
wego3.headphoneCueButton = function (channel, control, value, status, group) {
    if (!value) return;
    if (wego3.shiftPressed && group !== '[Master]') {
        // Cambiar Deck (1<->3 o 2<->4)
        var currentActual = wego3.actualGroup(group);
        var newActual = wego3.actualGroupToggleMap[currentActual];
        
        // Apagar luces viejas
        wego3.bindDeckLeds(group, false);
        wego3.turnOffAllLeds(group);
        
        // Cambiar mapeo
        wego3.actualGroupMap[group] = newActual;
        
        // Encender luces nuevas
        wego3.bindDeckLeds(group, true);
        print("Cambiado lado " + group + " a controlar " + newActual);
    } else {
        // PFL normal
        if (group === '[Master]') {
            // No suele tener PFL el master en Mixxx de la misma forma, usamos headMix
            // Si value es 1, forzamos mix a master, si 0 a cue? No es toggle.
            // Simplemente toggleamos el modo split o similar si fuera necesario.
        } else {
            script.toggleControl(wego3.actualGroup(group), 'pfl');
        }
    }
};

wego3.headphoneCueButtonWhileShiftPressed = wego3.headphoneCueButton; // Redundancia manejada arriba

// =================
// Jog Wheels
// =================

wego3.jogWheelDelta = function (value) { return value - 0x40; };

wego3.jogTouch = function (channel, control, value, status, group) {
    group = wego3.actualGroup(group);
    var deckIdx = wego3.groupDecks[group];
    
    if (value) { // Tocar
        engine.scratchEnable(deckIdx + 1, wego3.SCRATCH_SETTINGS.jogResolution, wego3.SCRATCH_SETTINGS.vinylSpeed, wego3.SCRATCH_SETTINGS.alpha, wego3.SCRATCH_SETTINGS.beta);
    } else { // Soltar
        engine.scratchDisable(deckIdx + 1, true);
        // FIX: Evitar que el movimiento residual al soltar mueva el pitch
        wego3.jogTouchTimer[deckIdx] = new Date().getTime(); 
    }
};
wego3.jogTouchShifted = wego3.jogTouch;

wego3.jogPlatterTick = function (channel, control, value, status, group) {
    group = wego3.actualGroup(group);
    var deckIdx = wego3.groupDecks[group];
    var now = new Date().getTime();
    
    // Si soltamos el plato hace menos de 200ms, ignorar movimiento (evita backspin accidental)
    if (now - wego3.jogTouchTimer[deckIdx] < 200) return;

    var delta = wego3.jogWheelDelta(value);
    
    if (engine.isScratching(deckIdx + 1)) {
        engine.scratchTick(deckIdx + 1, delta);
    } else {
        engine.setValue(group, 'jog', delta * wego3.JOG_WHEEL_SENSITIVITY / 5);
    }
};

wego3.jogRingTick = function (channel, control, value, status, group) {
    group = wego3.actualGroup(group);
    var delta = wego3.jogWheelDelta(value);
    engine.setValue(group, 'jog', delta * wego3.JOG_WHEEL_SENSITIVITY / 5);
};

// =================
// Iluminación (LEDs)
// =================

wego3.setLed = function (group, name, value) {
    if (!wego3.LED_MAP[name] || !wego3.LED_MAP[name][group]) return;
    var data = wego3.LED_MAP[name][group];
    midi.sendShortMsg(data[0], data[1], value ? 0x7f : 0x00);
};

wego3.turnOffAllLeds = function (group) {
    for (var k in wego3.LED_MAP) wego3.setLed(group, k, 0);
};

// Callbacks de Mixxx para actualizar LEDs
wego3.playLed = function (val, group) { wego3.setLed(wego3.virtualGroup(group), 'play', val); };
wego3.headphoneCueLed = function (val, group) { wego3.setLed(wego3.virtualGroup(group), 'headphoneCue', val); };
wego3.syncLed = function (val, group) { wego3.setLed(wego3.virtualGroup(group), 'sync', val); };
wego3.hotCueLed = function (val, group, key) {
    // Detectar qué hotcue es (1,2,3,4) basado en el nombre del control
    var num = key.charAt(7); // hotcue_X_enabled
    wego3.setLed(wego3.virtualGroup(group), 'cuePoint' + num, val);
};
wego3.fxLed = function (val, group, key) {
    // Lógica compleja para mapear EffectUnit LEDs a los botones físicos
};

wego3.bindDeckLeds = function(group, bind) {
    var actual = wego3.actualGroup(group);
    script.bindConnections(actual, wego3.LED_CONTROL_FUNCTIONS, !bind);
};
wego3.bindGlobalLeds = function(bind) {
    // Master PFL
};

// Habilitar funciones Shift automáticamente con CAPTURA CORRECTA
for (var fnName in wego3) {
    if (fnName.endsWith('WhileShiftPressed')) {
        var shortName = fnName.replace('WhileShiftPressed', '');
        
        (function (shiftedName, unshiftedName) {
            var originalFn = wego3[unshiftedName]; // IMPORTANTE: Capturar la función original aquí
            var shiftedFn = wego3[shiftedName];
            
            wego3[unshiftedName] = function (c, ct, v, s, g) {
                if (wego3.shiftPressed) {
                    shiftedFn(c, ct, v, s, g);
                } else {
                    if (originalFn) originalFn(c, ct, v, s, g);
                }
            };
        })(fnName, shortName);
    }
}