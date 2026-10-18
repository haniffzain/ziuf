# Ziuf Project History

Ziuf is a new public name, but it continues an engineering line that was already well underway.

This history intentionally begins with the project's verified system-engineering milestones rather than with earlier naming experiments. The focus here is the operating system that was actually built, tested and advanced gate by gate.

---

## M1 — Bootstrap toolchain

The first major engineering story begins with the bootstrap toolchain.

On **25 September 2026**, the M1 reference gate passed.

The successful reference path completed:

- authenticated and locked source verification
- Binutils bootstrap
- GCC bootstrap
- Linux API headers
- glibc
- temporary userspace tools
- final target C/C++ sanity checks
- privileged chroot validation
- host-contamination audit

M1 was not reached in a single perfect attempt. Earlier runs exposed truncated downloads, WSL infrastructure interruptions and a sudo/chroot credential-lifecycle problem.

Those failures were preserved as engineering evidence and used to harden the process.

That established a principle that still guides Ziuf:

> A failed build is not wasted if it improves the next verified path.

---

## M1.5 — Package architecture bootstrap

M1.5 was integrated into the main engineering line on **11 October 2026**.

This phase established the controlled package path around pacman/libalpm and the project's `zpm` frontend.

The work included:

- authenticated upstream source trust
- pinned dependency metadata
- isolated network-denied build execution
- reproducibility checks
- package metadata validation
- signing and repository foundations
- transaction and recovery validation
- the initial ZPM interface path

The important change was architectural: the project was no longer only capable of building a toolchain. It now had a controlled path toward building, packaging, signing and installing its own system components.

---

## M2 — Minimal root filesystem

M2 moved the project into a self-contained base userspace.

The target was to enter a project-owned chroot and operate with its own base system rather than depending on the host environment for normal runtime behavior.

The recorded M2 gate passed in the development branch.

This stage covered the foundations for:

- filesystem hierarchy
- core utilities
- shell environment
- accounts and permissions
- system identity
- base package installation through the emerging package path

---

## M3 — Kernel, boot and core services

M3 transformed the root filesystem into a bootable operating-system environment.

The recorded development gates covered:

- Linux kernel integration
- initramfs
- boot path
- systemd
- D-Bus and udev foundations
- journald and core system services

The milestone demonstrated that the project could move beyond a chroot and into a bootable console system.

---

## M4 — Signed repository, updates and recovery

M4 established another trust boundary: package delivery and recovery.

The recorded Gate 5 passed in the development branch.

The work covered the foundations for:

- signed package repositories
- repository metadata
- dependency validation
- update transactions
- recovery behavior
- rollback and downgrade strategy for critical package families
- the standard `zpm` command path

The goal was not merely to install packages, but to understand how the system should recover when an update goes wrong.

---

## M5 — Network and security foundation

Development then progressed through **M5.0–M5.4**.

The latest locked checkpoint in this line is **M5.4**, covering the nftables firewall foundation.

The recorded work includes:

- authenticated source builds
- reproducible package output
- package and repository-role verification
- dependency closure checks
- isolated IPv4/IPv6 packet tests
- permitted established replies
- DHCP behavior
- denied unlisted egress
- denied unsolicited input and forwarding
- malformed-policy preservation
- fail-closed behavior
- deny-all recovery
- repeated integrated KVM runs across failure and recovery scenarios

The current next checkpoint is:

### M5.5 — Privilege / PolicyKit foundation

Later integration gates are intentionally not claimed before their validation evidence exists.

---

## Desktop engineering in parallel

While the base operating system was moving through its system milestones, a separate desktop-environment project was also developed.

Its direction is modular and **Wayland-first**.

The architecture is designed so that the compositor can be replaced behind an abstraction instead of becoming the identity of the entire desktop.

Hyprland is used as a development/reference backend, not as the permanent public UI architecture.

Desktop work has progressed through:

- session supervision foundations
- shell preparation
- compositor abstraction work
- shared design-system contracts
- dark/light theme tokens
- centered floating launcher direction
- ZBar foundations
- Qt Quick graphical preview under WSLg

Planned desktop components include:

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

A dedicated Ziuf compositor remains a future project rather than a requirement for the current desktop work.

---

## From ZORX OS to Ziuf OS

Much of the engineering above was originally developed under the **ZORX OS** project name.

By October 2026, the engineering direction was clearer than the public identity, and the project adopted the name **Ziuf**.

The rename does not reset the system's history.

The same milestone evidence, package architecture, source-verification work, boot path, security work and desktop development continue forward under the Ziuf identity.

The migration follows a simple rule:

> Rename the public identity first. Migrate technical names only when compatibility and evidence are understood.

Older repositories, branches, package identifiers and source namespaces may therefore still contain the ZORX name during the transition.

---

## What remains unchanged

The name changed, but the project's central ideas remain:

- no automatic telemetry
- local-first diagnostics
- user ownership
- privacy by architecture
- controlled source inputs
- authenticated and reproducible build paths where practical
- strict dependency-layer boundaries
- modular system services
- Wayland-first desktop direction
- familiar Linux conventions
- ZPM as the package-management identity
- evidence before milestone claims

---

## The story now

Ziuf is still under active development.

There is no stable public release yet.

The project is currently moving forward from the M5.4 network/security checkpoint toward M5.5 and later hardware, graphics, desktop, installer and release milestones.

The public story therefore begins where the engineering became measurable:

```text
M1
 ↓
M1.5
 ↓
M2
 ↓
M3
 ↓
M4
 ↓
M5.0–M5.4
 ↓
M5.5 and beyond
```

Ziuf continues one verified gate at a time.
