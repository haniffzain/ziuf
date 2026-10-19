<p align="center">
  <img src="assets/branding/Ziuf%20OS_%20Pulau%20Terapung%20Fantasi.png" alt="Ziuf OS — peaceful floating-island concept artwork" width="900" />
</p>

<p align="center">
  <em>A peaceful corner of Ziuf — simple, private, independent, and built one careful step at a time.</em>
</p>

<p align="center">
  <a href="ROADMAP.md"><img src="assets/buttons/roadmap.svg" alt="Roadmap" /></a>
  <a href="HISTORY.md"><img src="assets/buttons/history.svg" alt="History" /></a>
  <a href="#package-management"><img src="assets/buttons/zpm.svg" alt="ZPM" /></a>
  <a href="#native-ziuf-platform-services"><img src="assets/buttons/services.svg" alt="Platform services" /></a>
  <a href="#privacy-position"><img src="assets/buttons/privacy.svg" alt="Zero telemetry" /></a>
  <a href="https://buymeacoffee.com/ziuf"><img src="assets/buttons/support.svg" alt="Support Ziuf" /></a>
</p>

# Ziuf OS

**A small name for a long journey.**

Ziuf OS is an independent Linux operating-system project focused on privacy, user ownership, modular design and a careful, evidence-driven engineering process.

Ziuf is not intended to be a cosmetic rebrand of an existing Linux distribution. The project is building its own controlled Linux base, package path, system architecture and desktop experience while continuing to use mature Linux standards where they make sense.

> **Project status:** active development. The public identity is transitioning from the former **ZORX OS** name to **Ziuf OS**. The name has changed; the engineering history has not been reset.

---

## Why Ziuf exists

Ziuf began with a simple question:

> Can a Linux operating system be private by default, pleasant to use, understandable to its owner, and still be built with enough discipline that every important layer can be traced and verified?

The project is being shaped around a few quiet principles:

- **No automatic telemetry.** The operating system should not silently report user activity.
- **Local-first diagnostics.** Crash information stays on the device unless the user chooses to share it.
- **User ownership.** The machine belongs to the person using it.
- **Independent foundation.** Ziuf is being built from a controlled source-based Linux foundation rather than simply reskinning another distribution.
- **Familiar Linux.** Standard Linux commands, filesystem conventions and mature upstream technologies remain valuable.
- **Wayland-first desktop.** The graphical environment is being designed for modern Wayland systems.
- **Modular architecture.** Lower layers should not secretly depend on higher layers.
- **Evidence before claims.** A milestone is not considered complete merely because code exists; the required verification must pass.

Ziuf is meant to grow quietly: fewer claims, more proof.

---

## The engineering journey

Ziuf's public engineering story begins with the construction of its own bootstrap toolchain.

On **25 September 2026**, the M1 reference gate passed after the project successfully built and verified its controlled Binutils/GCC/glibc toolchain path, temporary userspace tools, target sanity checks and host-contamination audit.

From there the project moved forward one verified layer at a time:

```text
M1      Bootstrap toolchain
 ↓
M1.5    Package architecture + ZPM path
 ↓
M2      Minimal root filesystem
 ↓
M3      Kernel, boot + core services
 ↓
M4      Signed repository, updates + recovery
 ↓
M5      Networking + security foundation
 ↓
M5.5    Privilege / PolicyKit foundation
```

The project was developed under the **ZORX OS** name during much of this engineering work. In October 2026, the public identity changed to **Ziuf OS**.

The rename is a continuation of the same engineering line, not a restart and not a change of technical foundation.

See [HISTORY.md](HISTORY.md) for the longer milestone story.

---

## Where the engineering stands

Ziuf inherits the milestone history developed in the existing core engineering repositories.

| Milestone | Purpose | Current project record |
|---|---|---|
| M0 | Architecture lock | ✅ Complete |
| M1 | Bootstrap toolchain | ✅ Reference gate passed |
| M1.5 | Package architecture bootstrap | ✅ Complete and integrated |
| M2 | Minimal root filesystem | ✅ Gate passed in development branch |
| M3 | Bootable console / core system services | ✅ Gates passed in development branch |
| M4 | Signed repository, update and recovery foundation | ✅ Gate passed in development branch |
| M5.0–M5.4 | Network and security foundation through nftables firewall | ✅ Locked checkpoints in development branch |
| M5.5 | Privilege / PolicyKit foundation | 🔧 Active next checkpoint |
| M6+ | Hardware, graphics, desktop integration and later system layers | ⏳ Ahead |

The current M2–M5.4 work remains under review in the development branch while its evidence is completed. Ziuf does not claim later gates before they have passed.

The milestone plan continues toward graphics/input/audio, the graphical session, native platform services, user experience, installer/ISO work and an eventual developer alpha.

See [ROADMAP.md](ROADMAP.md).

---

## Package management

The project already has an established package-management identity:

### ZPM — Ziuf Package Manager

ZPM is the user-facing package-management path built around the project's controlled package architecture.

```bash
zpm install firefox
zpm update
zpm upgrade
zpm remove firefox
```

The `zpm` name is retained through the transition to Ziuf.

---

## Desktop direction

Ziuf is also developing its own modular desktop environment.

The desktop work is:

- **Wayland-first**
- built from restartable, independent components
- designed so the compositor can be replaced behind an abstraction
- using Hyprland as a development/reference backend rather than as Ziuf's permanent UI identity
- built around human-readable configuration, recovery from malformed settings, keyboard/pointer support, accessibility and privacy defaults

Desktop prototype work has already progressed through session/shell preparation, a shared design system, ZBar foundations and a real Qt Quick graphical preview under WSLg.

Planned Ziuf desktop components include:

```text
Ziuf Desktop
├── session
├── shell
├── ZBar
├── launcher
├── settings
├── notifications
├── quick settings
├── overview
├── lock screen
└── Ziuf Files
```

A future Ziuf compositor remains a separate long-term goal. The desktop architecture is intentionally not designed to depend permanently on one compositor implementation.

---

## System architecture

The base operating system follows a dependency-ordered model:

```text
01  Toolchain / bootstrap
02  Base filesystem + libc
03  Kernel + boot
04  Init, devices + core services
05  Package management
06  Networking + security
07  Graphics, audio + input
08  Wayland desktop/session
09  Native Ziuf platform services
10  User experience + applications
11  Installer, image + release infrastructure
```

A higher layer must not quietly become a hidden dependency of a lower one.

This rule is deliberately boring — and that is useful. It keeps the system understandable as it grows.

---

## Native Ziuf platform services

Ziuf is intended to include native system services that support privacy, security and day-to-day use without turning those features into hidden background data collection.

### Sentinel

**Sentinel** is being developed as a local-first network-behaviour and security component. Its engineering path is deliberately progressive:

```text
observe → analyse → defend
```

The current direction is to understand local network behaviour first, make decisions from evidence, and add defensive responses only when those behaviours can be implemented and verified safely. Ziuf does not claim a fully autonomous defensive system before those gates exist and pass.

### Tor Route

**Tor Route** is planned as an optional, user-controlled privacy-routing capability for selected applications or traffic.

It is not intended to mean that every Ziuf connection is silently forced through Tor. The user should remain in control of when privacy routing is enabled, what uses it, and when normal networking is preferred.

Other native-service ideas, including components such as **Downbar** and a future **Droid Wrapper**, remain part of the wider platform direction and will be documented as their interfaces and validation paths become mature enough to claim publicly.

---

## Privacy position

Ziuf's privacy direction is simple:

**The operating system should not need to watch its user in order to work.**

### Zero telemetry, local-first logs

Ziuf is designed so that temporary session data does not quietly accumulate after it is no longer needed. Where practical, ephemeral session data is intended to be cleared automatically when the session ends.

Technical diagnostic information that is genuinely useful for understanding system failures — such as crash, boot, service, kernel or hardware faults — may remain locally available for troubleshooting.

Those technical logs are intended to stay on the user's device. Ziuf does not plan to upload them automatically, report them silently, or treat them as telemetry. Sharing diagnostic information should happen only through an explicit action by the user.

> **Privacy should include forgetting what no longer needs to be remembered.**

The automatic session-cleanup model is still part of active engineering work, so Ziuf describes it as a design target until its implementation and validation gates have passed.

Privacy is treated as architecture, not a checkbox added near release day.

---

## What Ziuf is not yet

Ziuf is **not yet a finished daily-driver distribution**.

There is no stable public release to install today, and later milestone claims will only be made when their validation gates pass.

This repository exists to introduce the project, preserve its story and eventually become the public entry point to the Ziuf ecosystem.

Engineering repositories and component repositories will be linked here gradually as the transition from the ZORX name is completed safely.

---

## Project family

The intended long-term structure is:

```text
Ziuf OS
├── Ziuf Core
├── ZPM
│   └── Ziuf Package Manager
├── Ziuf Desktop
├── Ziuf Shell
├── Ziuf Settings
├── Ziuf Files
├── Ziuf Installer
└── Ziuf SDK
```

Names and repository boundaries may evolve while the architecture is still being validated.

---

## A note on the name

**Ziuf** is intentionally short and understated.

It is not meant to sound like a claim of superiority. The project would rather let reliability, privacy and the experience of using the system give meaning to the name over time.

Internally, the four letters also fit four project values:

- **Z** — Zero telemetry
- **I** — Independence
- **U** — User first
- **F** — Freedom

This is a project mnemonic, not a requirement that the name be treated as an acronym.

---

## Development philosophy

Ziuf follows one rule repeatedly:

> **Build → verify → record → move forward.**

Ziuf does not need to exaggerate what it is. The project should show what has been built, what has passed, and what still remains ahead.

Failures are kept as engineering evidence rather than hidden from the project's history. Several earlier bootstrap failures led directly to stronger source verification, deterministic retry handling, isolation checks and more reliable build gates.

That history matters because Ziuf is being built to be understood, not merely assembled.

---

## Current transition note

Older source code, branches, documentation and package names may still contain the **ZORX** identity while the transition is planned carefully.

They should not be mass-renamed until compatibility, package identity, repository history and test coverage are accounted for.

The public brand is moving to **Ziuf OS**; the technical migration will follow in controlled steps.

---

## Support Ziuf

Ziuf is an independent project and is being developed step by step. If you would like to help with development costs, testing resources, domains, infrastructure and future release work, you can support the project here:

☕ **[Buy Me a Coffee — Ziuf](https://buymeacoffee.com/ziuf)**

Support is entirely optional. Ziuf's goal is to remain useful, privacy-respecting and accessible regardless of whether a user contributes financially.

---

## Project creator

**M. Haniff** — Project Creator / Lead Developer

Ziuf is an independent personal Linux project under active development.
