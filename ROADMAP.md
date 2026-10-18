# Ziuf OS Roadmap

Ziuf inherits the engineering roadmap developed under the former ZORX OS name.

The rename does **not** reset milestone history.

This public roadmap separates three things clearly:

- **completed and integrated work**
- **passed/locked work still living in an active development branch**
- **future milestones that are not yet claimed**

---

## Status legend

- ✅ **Complete** — milestone/gate passed and integrated into the main engineering line.
- 🟢 **Passed / locked in development** — evidence exists in the active development branch, but integration/review is still in progress.
- 🔧 **Active** — current engineering checkpoint.
- ⏳ **Planned** — not yet claimed.

---

## Base operating-system roadmap

| ID | Scope | Status |
|---|---|---|
| M0 | Architecture lock | ✅ Complete |
| M1 | Bootstrap toolchain | ✅ Complete — reference gate passed 25 Sep 2026 |
| M1.5 | Package architecture bootstrap | ✅ Complete — integrated 11 Oct 2026 |
| M2 | Minimal root filesystem | 🟢 Gate passed in development branch |
| M3 | Kernel, boot and core system services | 🟢 Gates passed in development branch |
| M4 | Signed repository, update and recovery foundation | 🟢 Gate passed in development branch |
| M5.0–M5.4 | Network/security foundation through nftables firewall | 🟢 Locked checkpoints in development branch |
| M5.5 | Privilege / PolicyKit foundation | 🔧 Active next checkpoint |
| M6 | Wayland hardware stack: graphics, input and audio | ⏳ Planned |
| M7 | First supported graphical Ziuf session | ⏳ Planned |
| M8 | Native Ziuf platform services | ⏳ Planned |
| M9 | Cohesive user experience and native applications | ⏳ Planned |
| M10 | Installer and installation image | ⏳ Planned |
| M11 | Developer alpha | ⏳ Planned |

---

## What each major stage means

### M0 — Architecture lock

Define the system before implementation drifts:

- independent distribution direction
- dependency-layer rules
- source/checksum policy
- build order
- rolling-release model
- systemd base
- glibc base
- package architecture direction
- native project services

### M1 — Bootstrap toolchain

Build and validate the controlled compiler/toolchain foundation from authenticated sources.

The reference gate passed the full source-verification and bootstrap sequence, final C/C++ sanity and host-contamination checks.

### M1.5 — Package architecture bootstrap

Establish the binary package path and the foundations behind **ZPM — Ziuf Package Manager**:

- authenticated package sources
- isolated/network-denied builds
- dependency contracts
- reproducibility checks
- pacman/libalpm integration
- signing/keyring foundations
- local repository path
- transaction/recovery validation

### M2 — Minimal root filesystem

Target: a Ziuf-owned base userspace that can operate inside the project root filesystem without depending on the host distribution for its normal runtime.

### M3 — Kernel, boot and core services

Target: boot into a usable Ziuf console/system-services environment.

### M4 — Repository, updates and recovery

Target: install/update Ziuf-built packages from signed repositories with understood recovery behavior.

### M5 — Network and security base

Target: establish networking, DNS, firewall, privilege boundaries and the security primitives needed by later desktop/system layers.

The latest recorded locked checkpoint is M5.4, including the nftables firewall foundation and repeated integrated runtime tests.

### M6 — Wayland hardware stack

Target: graphics, input and audio usable without depending on a finished desktop environment.

### M7 — Graphical Ziuf session

Target: first supported graphical session on top of the stable hardware/system foundation.

The current desktop project uses a compositor abstraction so the desktop is not permanently tied to one backend.

### M8 — Native Ziuf services

Target: integrate Ziuf-native platform services behind stable APIs and package boundaries.

### M9 — Ziuf user experience

Target: settings, themes, app discovery, first-run experience and first-party desktop applications such as Ziuf Files.

### M10 — Installer / installation image

Target: repeatable clean installation from Ziuf media.

### M11 — Developer alpha

Target: an installable developer release with signed packages, reproducible build metadata, controlled channels and a defined recovery path.

---

## Desktop roadmap

The desktop effort develops in parallel but must not bypass the base operating-system gates required for real integration.

Current verified/prototyped areas include:

- session supervision architecture
- shell/compositor abstraction preparation
- shared dark/light design tokens
- centered floating menu design contracts
- ZBar state/IPC/view-model foundations
- real Qt Quick graphical preview under WSLg

Planned desktop progression includes:

```text
Session
  ↓
Shell surfaces
  ↓
ZBar
  ↓
Launcher
  ↓
Notifications + Quick Settings
  ↓
Settings
  ↓
Overview / workspaces
  ↓
Lock + session controls
  ↓
Utilities
  ↓
Ziuf Files
  ↓
Accessibility / multi-monitor / hardening
  ↓
Integrated desktop prototype
```

A dedicated Ziuf compositor is a longer-term project and is intentionally not required before the rest of the desktop can mature.

---

## Rules for moving forward

A milestone should move forward only when the relevant conditions are satisfied:

- required tests pass
- dependency contracts are understood and documented
- source trust requirements are satisfied
- recovery/rollback behavior is understood where applicable
- no higher layer becomes a hidden dependency of a lower layer
- runtime evidence exists where static checks are insufficient
- milestone claims match the evidence actually available

Experimental work may run ahead of the current gate, but it should remain isolated until the dependency boundary below it is ready.

---

## Naming transition

Older engineering branches, package identities and source paths may continue to use `zorx` temporarily.

That is intentional.

The public project identity is now **Ziuf OS**, while technical renaming will happen gradually so that repository history, package compatibility and validation evidence are not damaged by a cosmetic mass rename.
