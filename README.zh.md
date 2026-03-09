# Pioneer DDJ-WeGO3 — Mixxx 映射

> [🇪🇸 Español](README.md) · [🇬🇧 English](README.en.md) · [🇫🇷 Français](README.fr.md) · 🇨🇳 **中文**

## 安装

将 `Pioneer-DDJ-WeGO3-scripts.js` 和 `Pioneer-DDJ-WeGO3.midi.xml` 文件复制或创建符号链接到你的[控制器映射文件夹](http://mixxx.org/wiki/doku.php/controller_mapping_file_locations)。

在 Mixxx 中，进入 **首选项 → 控制器**，选择 `PIONEER DDJ-WeGO3` 的第一个实例（MIDI 控制器，非 HID）。

启用控制器，打开 **加载预设** 菜单并选择 **"Pioneer DDJ-WeGO3 (Enhanced)"**。

---

## 控制

### 走带控制

| 控制 | 功能 |
|------|------|
| `PLAY` | 播放 / 暂停 |
| `SHIFT + PLAY` | 刹车效果（Brake） |
| `CUE` | 默认提示点（按住预听） |
| `SHIFT + CUE` | 跳转到曲目开头 |

### 同步与滑移

| 控制 | 功能 |
|------|------|
| `SYNC` | 开启 / 关闭 BPM 同步 |
| `SHIFT + SYNC` | 开启 / 关闭滑移模式（Slip） |

### 转盘

| 控制 | 功能 |
|------|------|
| 盘面（触摸） | 搓碟（Scratch） |
| 外圈 | 微调（Nudge） |

所有碟盘默认启用搓碟功能。松开盘面后的 200ms 内会忽略残余运动以防止意外回旋。

### 均衡器与推子

| 控制 | 功能 |
|------|------|
| `HI` | 高频均衡（filterHigh） |
| `MID` | 中频均衡（filterMid） |
| `LOW` | 低频均衡（filterLow） |
| 通道推子 | 通道音量 |
| 交叉推子 | Deck A 与 Deck B 之间的混音 |
| 速度滑杆 | 速度控制（rate） |

EQ 旋钮使用 14 位分辨率（MSB + LSB），非线性曲线（范围 0.0 – 4.0）。

### 效果器（FX）

#### FX 按钮

| 控制 | 功能 |
|------|------|
| `FX1` | 开启 / 关闭碟盘上的效果器单元 1 |
| `FX2` | 开启 / 关闭碟盘上的效果器单元 2 |
| `FX3` | 开启 / 关闭碟盘上的效果器单元 3 |

左侧 FX 按钮控制 Deck A 的效果器单元，右侧控制 Deck B。

#### 效果强度（SHIFT + EQ 旋钮）

按住 `SHIFT` 并旋转 EQ 旋钮来控制各个效果的强度（`meta`）：

**左侧**（EffectUnit1）：

| 控制 | 功能 |
|------|------|
| `SHIFT + HI` | 效果 1 强度 |
| `SHIFT + MID` | 效果 2 强度 |
| `SHIFT + LOW` | 效果 3 强度 |

**右侧**（EffectUnit2）：

| 控制 | 功能 |
|------|------|
| `SHIFT + HI` | 效果 1 强度 |
| `SHIFT + MID` | 效果 2 强度 |
| `SHIFT + LOW` | 效果 3 强度 |

> **注意：** 请确保在 Mixxx 中每个 Effect Unit 的 3 个插槽都已加载效果，以便强度控制正常工作。

### 循环

| 控制 | 功能 |
|------|------|
| `LOOP` | 开启 / 关闭 4 拍循环 |
| `1/2X` | 将循环大小减半 |
| `2X` | 将循环大小翻倍 |
| 旋转 `AUTO LOOP` | 翻倍 / 减半循环大小 |
| `SHIFT` + 旋转 `AUTO LOOP` | 控制 QuickEffect 滤波器（LP ↔ HP） |

AUTO LOOP 旋钮是旋转编码器：顺时针翻倍循环，逆时针减半。
按住 SHIFT 时，调节碟盘的 QuickEffect 滤波器（0.0 = 低通, 0.5 = 中性, 1.0 = 高通），步进为 0.05。

### 热提示点

| 控制 | 功能 |
|------|------|
| `1` 到 `4` | 设置或触发热提示点 |
| `SHIFT + 1` 到 `SHIFT + 4` | 清除热提示点 |

### 采样器

| 控制 | 功能 |
|------|------|
| 采样器按钮 `1` 到 `4` | 预听全局采样器 1-4（按住） |

### 库导航

| 控制 | 功能 |
|------|------|
| 旋转 `BROWSE` | 在曲目列表中滚动 |
| `SHIFT` + 旋转 `BROWSE` | 在库面板之间切换焦点 |
| 按下 `BROWSE` | 最大化 / 最小化库 |
| `SHIFT` + 按下 `BROWSE` | 打开文件夹 / 进入项目 |
| `LOAD` | 将选中的曲目加载到碟盘（需未在播放） |
| `SHIFT + LOAD` | 将曲目添加到 AutoDJ 队列 |

### 监听（PFL / 耳机监听）

| 控制 | 功能 |
|------|------|
| `HEADPHONE SELECT A` | 开启 / 关闭 Deck A 的 PFL |
| `HEADPHONE SELECT B` | 开启 / 关闭 Deck B 的 PFL |

### 虚拟碟盘切换

| 控制 | 功能 |
|------|------|
| `SHIFT + HEADPHONE SELECT A` | 在 Deck 1 ↔ Deck 3 之间切换 |
| `SHIFT + HEADPHONE SELECT B` | 在 Deck 2 ↔ Deck 4 之间切换 |

切换碟盘时会重置推子和 EQ 的软接管以防止跳变。

---

## LED 指示灯

以下 LED 会根据 Mixxx 的状态自动更新：

| LED | 指示 |
|-----|------|
| `PLAY` | 播放状态 |
| `CUE` | 提示点状态 |
| `SYNC` | 同步已启用 |
| `HOT CUE 1-4` | 已设置热提示点 |
| `PFL A / B` | 耳机监听已激活 |

---

## 配置

用文本编辑器打开 `Pioneer-DDJ-WeGO3-scripts.js`，修改文件顶部的常量：

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `AUDIBLE_PLAY_PROTECTION` | 音量 > 0 时防止停止曲目 | `false` |
| `AUDIBLE_CUE_PROTECTION` | 可听提示保护 | `true` |
| `ALL_SCRATCH_ON` | 所有碟盘默认启用搓碟 | `true` |
| `JOG_WHEEL_SENSITIVITY` | 转盘灵敏度 | `1.0` |
| `JOG_WHEEL_SHIFT_FACTOR` | Shift 速度因子 | `10.0` |
| `BROWSE_KNOB_SHIFT_FACTOR` | Shift 快速滚动因子 | `10` |

保存文件后 Mixxx 会自动重新加载。

---

## 许可证

本映射在 MIT 许可证条款下发布。详情请参阅 `LICENSE.md`。
