var PioneerDDJWeGO3 = function () { };
var wego3 = PioneerDDJWeGO3;

// =============
// Configuración
// =============

wego3.AUDIBLE_PLAY_PROTECTION = false;
wego3.AUDIBLE_CUE_PROTECTION = true;

wego3.ALL_SCRATCH_ON = true;

wego3.JOG_WHEEL_SENSITIVITY = 1.0;
wego3.JOG_WHEEL_SHIFT_FACTOR = 10.0;
wego3.BROWSE_KNOB_SHIFT_FACTOR = 10;

wego3.SCRATCH_SETTINGS = {
    alpha: 1.0 / 8,
    beta: 1.0 / 8 / 32,
    jogResolution: 720,
    vinylSpeed: 33 + 1 / 3,
    safeScratchTimeout: 20 // ms
};

wego3.BOUNCE_LOOP_INTERVALS = [1 / 4, 1 / 2, 1, 2];

wego3.scratchMode = [true, true, true, true];
wego3.slipMode = [false, false, false, false];
wego3.jogTouchTimer = [0, 0, 0, 0];
wego3.shiftPressed = { '[Left]': false, '[Right]': false };

wego3.LED_MAP = {
    headphoneCue: { '[Left]': [0x96, 0x54], '[Right]': [0x96, 0x55], '[Master]': [0x96, 0x5b] },
    loop: { '[Left]': [0x9b, 0x10], '[Right]': [0x9b, 0x11] },
    fx1: { '[Left]': [0x94, 0x43], '[Right]': [0x95, 0x43] },
    fx2: { '[Left]': [0x94, 0x44], '[Right]': [0x95, 0x44] },
    fx3: { '[Left]': [0x94, 0x45], '[Right]': [0x95, 0x45] },
    sync: { '[Left]': [0x90, 0x58], '[Right]': [0x91, 0x58] },
    play: { '[Left]': [0x90, 0x0b], '[Right]': [0x91, 0x0b] },
    cue: { '[Left]': [0x90, 0x0c], '[Right]': [0x91, 0x0c] },
    cuePoint1: { '[Left]': [0x90, 0x2e], '[Right]': [0x91, 0x2e] },
    cuePoint2: { '[Left]': [0x90, 0x2f], '[Right]': [0x91, 0x2f] },
    cuePoint3: { '[Left]': [0x90, 0x30], '[Right]': [0x91, 0x30] },
    cuePoint4: { '[Left]': [0x90, 0x31], '[Right]': [0x91, 0x31] },
    sampler1: { '[Left]': [0x90, 0x3c], '[Right]': [0x91, 0x3c] },
    sampler2: { '[Left]': [0x90, 0x3e], '[Right]': [0x91, 0x3e] },
    sampler3: { '[Left]': [0x90, 0x40], '[Right]': [0x91, 0x40] },
    sampler4: { '[Left]': [0x90, 0x42], '[Right]': [0x91, 0x42] }
};

wego3.LED_CONTROL_FUNCTIONS = {
    play: 'PioneerDDJWeGO3.playLed',
    pfl: 'PioneerDDJWeGO3.headphoneCueLed',
    beat_active: 'PioneerDDJWeGO3.syncLed',
    hotcue_1_status: 'PioneerDDJWeGO3.hotCueLed',
    hotcue_2_status: 'PioneerDDJWeGO3.hotCueLed',
    hotcue_3_status: 'PioneerDDJWeGO3.hotCueLed',
    hotcue_4_status: 'PioneerDDJWeGO3.hotCueLed'
};

// ==============
// Inicialización
// ==============

wego3.init = function (id) {
    print('Pioneer DDJ-WeGO3: Inicializando...');

    wego3.allChannels = ['[Channel1]', '[Channel2]', '[Channel3]', '[Channel4]'];
    wego3.groupDecks = { '[Channel1]': 0, '[Channel2]': 1, '[Channel3]': 2, '[Channel4]': 3 };
    wego3.deckGroups = ['[Channel1]', '[Channel2]', '[Channel3]', '[Channel4]'];

    wego3.actualGroupMap = { '[Left]': '[Channel1]', '[Right]': '[Channel2]', '[Master]': '[Master]' };
    wego3.actualGroupToggleMap = {
        '[Channel1]': '[Channel3]', '[Channel2]': '[Channel4]',
        '[Channel3]': '[Channel1]', '[Channel4]': '[Channel2]'
    };
    wego3.virtualGroupMap = {
        '[Channel1]': '[Left]', '[Channel2]': '[Right]',
        '[Channel3]': '[Left]', '[Channel4]': '[Right]', '[Master]': '[Master]'
    };

    wego3.highResMSB = { '[Channel1]': {}, '[Channel2]': {}, '[Channel3]': {}, '[Channel4]': {}, '[Master]': {} };

    wego3.setAllSoftTakeover();
    wego3.turnOffAllLeds('[Left]');
    wego3.turnOffAllLeds('[Right]');
    wego3.turnOffAllLeds('[Master]');

    wego3.bindDeckLeds('[Left]', true);
    wego3.bindDeckLeds('[Right]', true);
    wego3.bindGlobalLeds(true);

    print('Pioneer DDJ-WeGO3: Listo.');
};

wego3.shutdown = function () {
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
    engine.softTakeover(channel, 'rate', isBinding);
    engine.softTakeover(channel, 'filterHigh', isBinding);
    engine.softTakeover(channel, 'filterMid', isBinding);
    engine.softTakeover(channel, 'filterLow', isBinding);
};

wego3.resetAllSoftTakeover = function () {
    wego3.allChannels.forEach(function (c) { wego3.resetDeckSoftTakeover(c); });
};

wego3.resetDeckSoftTakeover = function (channel) {
    engine.softTakeoverIgnoreNextValue(channel, 'rate');
    engine.softTakeoverIgnoreNextValue(channel, 'filterHigh');
    engine.softTakeoverIgnoreNextValue(channel, 'filterMid');
    engine.softTakeoverIgnoreNextValue(channel, 'filterLow');
};

wego3.actualGroup = function (group) { return wego3.actualGroupMap[group] || group; };
wego3.virtualGroup = function (group) {
    var virtualGroup = wego3.virtualGroupMap[group];
    return (group == wego3.actualGroup(virtualGroup)) ? virtualGroup : null;
};

// ========================
// Controladores Genéricos (Hi-Res)
// ========================

wego3.hiResControl = function (functionName, controlName, callback, min, midMax, max, predicate, groupNameFn) {
    if (callback === 'linear') {
        min = min || 0.0; max = (midMax === undefined) ? 1.0 : midMax;
        callback = function (fullValue, group) {
            if (!predicate || predicate()) {
                var newValue = script.absoluteLin(fullValue, min, max, 0, 0x3fff);
                if (groupNameFn) group = groupNameFn(group);
                engine.setValue(group, controlName, newValue);
            }
        };
    } else if (callback === 'nonlinear') {
        min = min || 0.0; midMax = midMax || 1.0; max = max || 4.0;
        callback = function (fullValue, group) {
            if (!predicate || predicate()) {
                var newValue = script.absoluteNonLin(fullValue, min, midMax, max, 0, 0x3fff);
                if (groupNameFn) group = groupNameFn(group);
                engine.setValue(group, controlName, newValue);
            }
        };
    }

    var msbName = functionName + 'MSB';
    var lsbName = functionName + 'LSB';

    wego3[msbName] = function (c, ctrl, val, s, group) {
        group = wego3.actualGroup(group);
        wego3.highResMSB[group][functionName] = val;
    };
    wego3[lsbName] = function (c, ctrl, val, s, group) {
        group = wego3.actualGroup(group);
        var fullValue = (wego3.highResMSB[group][functionName] << 7) + val;
        callback(fullValue, group);
    };
};

wego3.canCrossFade = function () { return true; };

wego3.hiResControl('crossFader', 'crossfader', 'linear', -1.0, 1.0, null, wego3.canCrossFade);
wego3.hiResControl('tempoSlider', 'rate', 'linear', 1.0, -1.0);
// EQs — cuando Shift NO está presionado, controlan EQ
wego3.hiResControl('filterHighKnob', 'filterHigh', 'nonlinear', 0.0, 1.0, 4.0, function () { return !wego3.shiftPressed['[Left]'] && !wego3.shiftPressed['[Right]']; });
wego3.hiResControl('filterMidKnob', 'filterMid', 'nonlinear', 0.0, 1.0, 4.0, function () { return !wego3.shiftPressed['[Left]'] && !wego3.shiftPressed['[Right]']; });
wego3.hiResControl('filterLowKnob', 'filterLow', 'nonlinear', 0.0, 1.0, 4.0, function () { return !wego3.shiftPressed['[Left]'] && !wego3.shiftPressed['[Right]']; });
// Faders de volumen
wego3.hiResControl('deckFader', 'volume', 'linear');

// Shift + EQ Knobs → Intensidad individual de cada efecto (meta)
// HI = FX1, MID = FX2, LOW = FX3
// Left → EffectUnit1, Right → EffectUnit2
wego3.fxIntensityFromEQ = function (eqFunctionName, fxSlotNum, val, group, side) {
    var fullValue = (wego3.highResMSB[group][eqFunctionName] << 7) + val;
    var newValue = script.absoluteLin(fullValue, 0.0, 1.0, 0, 0x3fff);
    var unitNum = (side === '[Left]') ? 1 : 2;
    engine.setValue('[EffectRack1_EffectUnit' + unitNum + '_Effect' + fxSlotNum + ']', 'meta', newValue);
};

var origFilterHighLSB = wego3.filterHighKnobLSB;
var origFilterMidLSB = wego3.filterMidKnobLSB;
var origFilterLowLSB = wego3.filterLowKnobLSB;

wego3.filterHighKnobLSB = function (c, ctrl, val, s, group) {
    var side = group;
    if (wego3.shiftPressed[side]) {
        wego3.fxIntensityFromEQ('filterHighKnob', 1, val, wego3.actualGroup(group), side);
    } else {
        origFilterHighLSB(c, ctrl, val, s, group);
    }
};
wego3.filterMidKnobLSB = function (c, ctrl, val, s, group) {
    var side = group;
    if (wego3.shiftPressed[side]) {
        wego3.fxIntensityFromEQ('filterMidKnob', 2, val, wego3.actualGroup(group), side);
    } else {
        origFilterMidLSB(c, ctrl, val, s, group);
    }
};
wego3.filterLowKnobLSB = function (c, ctrl, val, s, group) {
    var side = group;
    if (wego3.shiftPressed[side]) {
        wego3.fxIntensityFromEQ('filterLowKnob', 3, val, wego3.actualGroup(group), side);
    } else {
        origFilterLowLSB(c, ctrl, val, s, group);
    }
};

// =================
// Botones y Logica
// =================

// Navegación
wego3.browseKnob = function (channel, control, value, status, group, shiftFactor) {
    var delta = (value === 0x01) ? 1 : -1;
    var factor = shiftFactor || 1;
    engine.setValue('[Library]', 'MoveVertical', delta * factor);
};

wego3.browseKnobShifted = function (channel, control, value, status, group) {
    var delta = (value === 0x01) ? 1 : -1;
    engine.setValue('[Library]', 'MoveFocus', delta);
};

// Shift Button
wego3.shiftButton = function (channel, control, value, status, group) {
    var pressed = value > 0;
    wego3.shiftPressed['[Left]'] = pressed;
    wego3.shiftPressed['[Right]'] = pressed;
};

wego3.shiftButtonLeft = function (channel, control, value, status, group) {
    wego3.shiftPressed['[Left]'] = value > 0;
};
wego3.shiftButtonRight = function (channel, control, value, status, group) {
    wego3.shiftPressed['[Right]'] = value > 0;
};

wego3.browseButton = function (channel, control, value, status, group) {
    if (value) {
        script.toggleControl('[Library]', 'MaximizeLibrary');
    }
};

wego3.browseButtonShifted = function (channel, control, value, status, group) {
    if (value) {
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
        engine.setValue('[Library]', 'AutoDjAddBottom', 1);
    }
};

wego3.playButton = function (channel, control, value, status, group) {
    group = wego3.actualGroup(group);
    if (value) {
        if (wego3.AUDIBLE_PLAY_PROTECTION && engine.getValue(group, 'volume') > 0 && engine.getValue(group, 'play')) {
            return;
        }
        var deck = wego3.groupDecks[group];
        engine.brake(deck + 1, 0);
        script.toggleControl(group, 'play');
    }
};

wego3.playButtonShifted = function (channel, control, value, status, group) {
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
    engine.setValue(group, 'start', value ? 1 : 0);
};

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
        print("Slip Mode Deck " + (deck + 1) + ": " + wego3.slipMode[deck]);
    }
};

wego3.loopButton = function (c, ctrl, val, s, group) {
    if (val) script.toggleControl(wego3.actualGroup(group), 'beatloop_4_toggle');
};

wego3.autoLoopTurn = function (channel, control, value, status, group) {
    group = wego3.actualGroup(group);
    var delta = (value < 64) ? 1 : -1;

    if (wego3.shiftPressed['[Left]'] || wego3.shiftPressed['[Right]']) {
        var filterGroup = '[QuickEffectRack1_' + group + ']';
        var current = engine.getValue(filterGroup, 'super1');
        var step = 0.05;
        var newVal = Math.max(0.0, Math.min(1.0, current + (delta * step)));
        engine.setValue(filterGroup, 'super1', newVal);
    } else {
        if (delta > 0) {
            engine.setValue(group, 'loop_double', 1);
        } else {
            engine.setValue(group, 'loop_halve', 1);
        }
    }
};

wego3.loopHalfButton = function (channel, control, value, status, group) {
    if (value) {
        engine.setValue(wego3.actualGroup(group), 'loop_halve', 1);
    }
};

wego3.loopDoubleButton = function (channel, control, value, status, group) {
    if (value) {
        engine.setValue(wego3.actualGroup(group), 'loop_double', 1);
    }
};

wego3.hotCueButton = function (channel, control, value, status, group) {
    var idx = control - 0x2d;
    group = wego3.actualGroup(group);
    engine.setValue(group, 'hotcue_' + idx + '_activate', value ? 1 : 0);
};

wego3.hotCueButtonShifted = function (channel, control, value, status, group) {
    var idx = control - 0x5e;
    if (value) engine.setValue(wego3.actualGroup(group), 'hotcue_' + idx + '_clear', 1);
};

wego3.samplerButton = function (channel, control, value, status, group) {
    var idx = ((control - 0x3c) / 2) + 1;
    engine.setValue('[Sampler' + idx + ']', 'cue_preview', value ? 1 : 0);
};

wego3.fxButton = function (channel, control, value, status, group) {
    if (value) {
        var fxUnit = control - 0x42;
        group = wego3.actualGroup(group);
        script.toggleControl('[EffectRack1_EffectUnit' + fxUnit + ']', 'group_' + group + '_enable');
    }
};

wego3.headphoneCueButton = function (channel, control, value, status, group) {
    if (!value) return;
    if (group === '[Master]') {
        return;
    }
    script.toggleControl(wego3.actualGroup(group), 'pfl');
};

wego3.headphoneCueButtonShifted = function (channel, control, value, status, group) {
    if (!value || group === '[Master]') return;
    var currentActual = wego3.actualGroup(group);
    var newActual = wego3.actualGroupToggleMap[currentActual];

    wego3.bindDeckLeds(group, false);
    wego3.turnOffAllLeds(group);

    wego3.actualGroupMap[group] = newActual;

    wego3.resetAllSoftTakeover();

    wego3.bindDeckLeds(group, true);
    print("Cambiado lado " + group + " a controlar " + newActual);
};

// =================
// Jog Wheels
// =================

wego3.jogWheelDelta = function (value) { return value - 0x40; };

wego3.jogTouch = function (channel, control, value, status, group) {
    group = wego3.actualGroup(group);
    var deckIdx = wego3.groupDecks[group];

    if (value) {
        engine.scratchEnable(deckIdx + 1, wego3.SCRATCH_SETTINGS.jogResolution, wego3.SCRATCH_SETTINGS.vinylSpeed, wego3.SCRATCH_SETTINGS.alpha, wego3.SCRATCH_SETTINGS.beta);
    } else {
        engine.scratchDisable(deckIdx + 1, true);
        wego3.jogTouchTimer[deckIdx] = new Date().getTime();
    }
};
wego3.jogTouchShifted = wego3.jogTouch;

wego3.jogPlatterTick = function (channel, control, value, status, group) {
    group = wego3.actualGroup(group);
    var deckIdx = wego3.groupDecks[group];
    var now = new Date().getTime();

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

wego3.playLed = function (val, group) { wego3.setLed(wego3.virtualGroup(group), 'play', val); };
wego3.headphoneCueLed = function (val, group) { wego3.setLed(wego3.virtualGroup(group), 'headphoneCue', val); };
wego3.syncLed = function (val, group) { wego3.setLed(wego3.virtualGroup(group), 'sync', val); };
wego3.hotCueLed = function (val, group, key) {
    var num = key.charAt(7);
    wego3.setLed(wego3.virtualGroup(group), 'cuePoint' + num, val);
};
wego3.fxLed = function (val, group, key) {
};

wego3.bindDeckLeds = function (group, bind) {
    var actual = wego3.actualGroup(group);
    script.bindConnections(actual, wego3.LED_CONTROL_FUNCTIONS, !bind);
};
wego3.bindGlobalLeds = function (bind) {
};
