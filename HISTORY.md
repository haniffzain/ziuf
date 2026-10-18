# Ziuf Project History

Ziuf is a new name, but it is not a new beginning.

This project has moved through several identities as its purpose became clearer.

## 1. Hubuntu — the experimental beginning

The earliest stage was **Hubuntu**.

At that point, the project was still exploring what a useful personal Linux system could become: practical, private, attractive and suitable for everyday work.

Hubuntu was important because it exposed the limits of simply customizing an existing distribution. As the ideas grew, the project needed stronger control over the base system, package flow, security model and desktop architecture.

That led to the next stage.

---

## 2. ZORX OS — from customization to system engineering

The project evolved into **ZORX OS** with a more ambitious goal:

> Build an independent Linux operating-system foundation with controlled dependencies, verifiable source inputs, a native package path and its own desktop direction.

Under the ZORX name, the project stopped treating the operating system as only a visual layer.

The work moved downward into the system itself:

- architecture and dependency boundaries
- authenticated source manifests
- bootstrap toolchain
- libc and base userspace
- package architecture
- signed repositories
- update/recovery behavior
- kernel and boot path
- system services
- networking and firewall foundations
- Wayland-first desktop architecture

### M0 — Architecture lock

M0 established the rules that later work would follow:

- independent Linux distribution direction
- strict dependency layering
- controlled rolling-release model
- glibc as the primary C library
- systemd as the init/service layer
- libalpm/pacman backend with the project's `zpm` frontend
- authenticated source locks and strong checksums
- native project components rather than GNOME Shell extensions

The important result of M0 was not a visible desktop. It was a boundary: later layers should not silently redefine the foundations below them.

### M1 — Bootstrap toolchain

On **25 September 2026**, the M1 reference gate passed.

The canonical run completed the locked source-verification gates and the full bootstrap sequence through:

- Binutils
- GCC
- Linux API headers
- glibc
- temporary userspace tools
- final target toolchain sanity
- host-contamination audit

M1 was reached only after several failed attempts. Truncated downloads, WSL infrastructure interruptions and a late sudo/chroot lifecycle failure were preserved as engineering evidence and used to harden the build process.

That history shaped one of Ziuf's lasting rules:

> A failed build is not wasted if it improves the next verified path.

### M1.5 — Package architecture bootstrap

M1.5 was integrated into the main engineering line on **11 October 2026**.

This phase established the controlled binary-package path around pacman/libalpm and ZPM, including authenticated dependencies, isolated network-denied builds, reproducibility checks, signing/repository foundations and transaction/recovery validation.

The package work included verified builds across foundational libraries and tooling rather than relying blindly on host packages.

### M2 — Minimal root filesystem

The next development line moved into a Ziuf-owned base userspace: filesystem hierarchy, core utilities, shell, accounts, permissions, system identity and the emerging package path.

The recorded M2 gate passed in the development branch.

### M3 — Bootable console and core services

M3 moved the system from a filesystem into a bootable operating-system environment.

The recorded development gates covered the kernel/boot path and the system-services layer, including the foundations required for a usable console system.

### M4 — Repository, updates and recovery

M4 established the next trust boundary: signed package repositories, update transactions and recovery behavior.

The recorded Gate 5 passed in the development branch.

### M5 — Network and security foundation

Development then progressed through M5.0–M5.4.

The latest locked checkpoint in this line is **M5.4**, covering the nftables firewall foundation with authenticated builds, reproducibility, package/repository verification, isolated packet tests, fail-closed policy behavior and repeated integrated KVM runs.

The next active checkpoint is **M5.5 — privilege / PolicyKit foundation**.

Later integration gates are intentionally not claimed yet.

---

## 3. The desktop project

In parallel with the base operating system, a separate desktop-environment project was created.

Its goal is not to copy an existing desktop shell, but to create a modular Wayland-first environment with replaceable compositor backends.

The desktop direction includes:

- session supervision
- shell surfaces
- ZBar
- floating launcher/menu
- settings
- notifications
- quick settings
- overview
- lock screen
- standalone file manager
- accessibility and reduced-motion support

Hyprland is used as a development/reference backend, not as the permanent identity of the desktop architecture.

Desktop work has already produced session/shell preparation, a shared design system, ZBar foundations and a real Qt Quick graphical preview under WSLg.

A dedicated Ziuf compositor remains a future project rather than a dependency of the current desktop work.

---

## 4. Why the name changed again

By October 2026, the engineering project had become clearer than its name.

The project wanted an identity that felt smaller, calmer and less performative.

The name **Ziuf** was chosen as a short, understated public identity.

The change does not erase ZORX.

ZORX remains part of the project's engineering history, commit history, milestone evidence and older technical namespaces.

The migration therefore follows this principle:

> Rename the identity first. Migrate technical names only when compatibility and evidence are understood.

```text
Hubuntu
   ↓
ZORX OS
   ↓
Ziuf OS
```

---

## 5. What continues unchanged

The name changed, but the central ideas did not:

- no automatic telemetry
- local-first diagnostics
- privacy by architecture
- controlled source inputs
- reproducible and authenticated build paths where practical
- strict layer boundaries
- modular system services
- Wayland-first desktop direction
- familiar Linux conventions
- ZPM as the package-management identity
- evidence before milestone claims

Ziuf is the continuation of that work.

---

## 6. The story is still being written

Ziuf is not presented as finished.

There is no stable public release yet. Several engineering repositories still carry the ZORX name while the transition is planned carefully.

This repository exists so that the public identity can have a clear home while the technical system continues to mature beneath it.

The project is moving forward one gate at a time.
