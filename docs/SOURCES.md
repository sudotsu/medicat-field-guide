# Authoritative source registry

Record every source used to support shipped guidance. A URL alone is insufficient: capture the installed version, supported claim, verification date, and any mismatch or uncertainty.

| Area | Authoritative source | Verified | Use |
|---|---|---:|---|
| MediCat installer | https://github.com/mon5termatt/medicat_installer | 2026-09-29 | Installer behavior, archive version, verification workflow, VHD support |
| MediCat documentation | https://medicatusb.com/docs/ | 2026-09-29 | Project overview, tool index, legal notices, installation and troubleshooting; corroborate AI-assisted pages before relying on them |
| Historical MediCat changelog | https://docs.medicat.dev/usb/changelog/ | 2026-09-29 | v21.12 contents, Ventoy 1.0.63, menu behavior, Lockpick historical state, and external Mini Windows startup feature |
| Ventoy plugin entrypoint | https://www.ventoy.net/en/plugin.html | 2026-09-29 | `ventoy.json` location and plugin structure |
| Ventoy menu tips | https://www.ventoy.net/en/plugin_menutip.html | 2026-09-29 | Tooltip format and single-line limitation |
| Ventoy tree view | https://www.ventoy.net/en/doc_treeview.html | 2026-09-29 | Tree navigation behavior |
| Ventoy menu extension | https://www.ventoy.net/en/plugin_grubmenu.html | 2026-09-29 | F6 `ventoy_grub.cfg` extension |
| Microsoft WinPE overview | https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/winpe-intro?view=windows-11 | 2026-09-29 | WinPE purpose, features, storage/boot capabilities, and limitations |
| Microsoft WinPE customization | https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/winpe-mount-and-customize?view=windows-11 | 2026-09-29 | Supported customization and startup mechanisms |
| Microsoft Windows PIN reset | https://support.microsoft.com/en-au/windows/change-or-reset-your-pin-in-windows-a386c519-3ab2-b873-1e9b-bb228a98b904 | 2026-09-29 | Distinguish a Windows Hello PIN from a Microsoft account password and route official PIN recovery first |
| Microsoft BitLocker recovery key | https://support.microsoft.com/en-gb/windows/security/encryption/find-your-bitlocker-recovery-key | 2026-09-29 | Explain why a BitLocker recovery prompt is an encryption-key problem rather than an ordinary Windows password problem |
| Microsoft Windows Setup disk layout | https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/windows-setup-installing-using-the-mbr-or-gpt-partition-style?view=windows-11 | 2026-09-29 | Support UEFI/GPT and Legacy/MBR installation routing and the warning that repartitioning can erase data |
| Microsoft account recovery code | https://support.microsoft.com/en-us/accounts-billing/manage/how-to-get-a-microsoft-account-recovery-code | 2026-09-29 | Support preserving an account-recovery path before a device is erased |
| Microsoft account password reset | https://support.microsoft.com/en-us/accounts-billing/security/change-or-reset-your-microsoft-account-password-in-windows | 2026-09-29 | Route Microsoft-account password problems to the official recovery path before offline credential changes |
| Microsoft Reset this PC | https://support.microsoft.com/en-us/windows/experience/backup-recovery/reset-your-pc | 2026-09-29 | Distinguish reset choices and require backup and encryption-key preparation before reset |

## Source-entry template

```text
Tool or topic:
Installed version:
Claim or procedure:
Primary source:
Source version/date:
Verified on:
Local test evidence:
Mismatch or uncertainty:
```
