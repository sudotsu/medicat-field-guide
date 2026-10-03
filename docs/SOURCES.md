# Authoritative source registry

Record every source used to support shipped guidance. A URL alone is insufficient: capture the installed version, supported claim, verification date, and any mismatch or uncertainty.

| Area | Authoritative source | Verified | Use |
|---|---|---:|---|
| MediCat installer | https://github.com/mon5termatt/medicat_installer | 2026-09-29 | Installer behavior, archive version, verification workflow, VHD support |
| MediCat documentation | https://medicatusb.com/docs/ | 2026-09-29 | Project overview, tool index, legal notices, installation and troubleshooting; corroborate AI-assisted pages before relying on them |
| Historical MediCat changelog | https://docs.medicat.dev/usb/changelog/ | 2026-09-29 | v21.12 contents, Ventoy 1.0.63, menu behavior, Lockpick historical state, and external Mini Windows startup feature |
| User-supplied Lockpick photos | Private local evidence, reviewed 2026-10-03; photos are not distributed with this repository | 2026-10-03 | MInstAll launcher shows 14 entries and displayed version labels; Start-menu photos show a live desktop, Drivers_PE utilities, and a partial System Tools list. The title says Windows 10 x64, unlike the changelog's Windows 11 based description. No executable was inspected. |
| Installed-tool inventory | [Read-only scan record](INVENTORY.md) | 2026-10-03 | 607 named entries at 630 installed locations; file presence only, with no boot or behavior test. |
| NirLauncher manifest and NirSoft | Bundled `nirsoft.nlp` and https://www.nirsoft.net/launcher/ | 2026-10-03 | 239 launcher entries matched to local executables; bundled versions and behavior unverified. |
| Microsoft Sysinternals | https://learn.microsoft.com/en-us/sysinternals/downloads/ | 2026-10-03 | Purposes of 29 individually present utilities; current documentation may describe newer builds. |
| Ransomware decryptor identification | https://www.avast.com/en-in/ransomware-decryption-tools and https://www.nomoreransom.org/en/decryption-tools.html | 2026-10-03 | Family-specific decryptor selection; 66 local executables were inventoried by filename, not run or individually matched to variants. |
| Malwarebytes | https://help.malwarebytes.com/hc/en-us/articles/31589496411291-Run-and-schedule-scans-in-Malwarebytes-for-Windows-and-Mac | 2026-10-03 | Current Windows product can quarantine scan detections; bundled bootable WIM behavior is unverified, so the lesson requires checking settings before scanning. |
| Rescuezilla | https://rescuezilla.com/ | 2026-10-03 | Graphical backup and restore purpose; bundled ISO version and screens unverified. |
| Boot-Repair-Disk | https://sourceforge.net/p/boot-repair-cd/home/Home/ | 2026-10-03 | Linux boot repair and Boot-Info purpose; bundled ISO version unverified. |
| MemTest86+ | https://memtest.org/readme | 2026-10-03 | Test passes and error interpretation; bundled ISO version unverified. |
| CrystalDiskInfo | https://crystalmark.info/en/software/crystaldiskinfo/crystaldiskinfo-general-information/ | 2026-10-03 | Drive identity and health display; bundled portable version unverified. |
| TestDisk and PhotoRec | https://www.cgsecurity.org/testdisk_doc/photorec.html | 2026-10-03 | Recover files to another destination; folder is labeled 7.2-WIP but binary was not run. |
| DiskGenius | https://www.diskgenius.com/manual/DiskGenius_User_Guide.pdf | 2026-10-03 | Partition inspection and recovery preview; bundled WIM version unverified. |
| ShredOS | https://github.com/PartialVolume/shredos.x86_64 | 2026-10-03 | Whole-disk erasure and target selection; bundled IMG version unverified. |
| Windows Recovery | https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/windows-re-troubleshooting-features?view=windows-11 | 2026-10-03 | Startup Repair purpose; bundled Windows 11 recovery WIM contents unverified. |
| Rufus | https://rufus.ie/en/ | 2026-10-03 | Bootable USB creation; bundled portable version unverified. |
| PCUnlocker vendor reset guide | https://www.pcunlocker.com/reset-windows-password.html | 2026-10-03 | Local SAM and account selection, password reset effect, and reboot; photographed launcher labels PCUnlocker 5.6 |
| Passcape Reset Windows Password screenshots | https://passcape.com/reset_windows_password_screenshots | 2026-10-03 | Local-account workflow; photographed version label begins 9.3.0 but is truncated, and vendor documentation may be newer |
| Passcape Reset Windows Password overview | https://www.passcape.com/reset_windows_password | 2026-10-03 | DPAPI and EFS risk after offline password changes |
| Active@ Password Changer guide | https://www.password-changer.com/guide.htm | 2026-10-03 | SAM/account selection, backup option, password and account-flag actions; photographed launcher labels v11.0 |
| Active@ Password Changer download terms | https://www.password-changer.com/download.htm | 2026-10-03 | Demo limitation; the bundled license remains unverified |
| O&O BlueCon 18 UserManager manual | https://docs.oo-software.com/en/oobluecon-18/oo-usermanager-oobc18 | 2026-10-03 | Local-account scope and encrypted-file warning; photographed UserManager label begins 1.0.1 and is not a BlueCon product version |
| ntpwedit 0.7 source mirror | https://github.com/linuixtux/NTPWEdit-version-0.7-GPL | 2026-10-03 | Local SAM editing and scope limits; mirror is not verified provenance for the photographed binary |
| Lazesoft password reset guide | https://www.lazesoft.com/how-to-reset-windows-password.html | 2026-10-03 | Windows volume and local-user selection, Reset/Unlock action; photographed launcher labels v4.0.0.1, while current vendor UI may differ |
| SQL Server Password Changer vendor page | https://www.top-password.com/sql-server-password-recovery.html | 2026-10-03 | SQL Server login scope and demo limitation; photographed launcher labels 1.9, while vendor page may describe a newer release |
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
| GitHub Pages custom workflows | https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages | 2026-09-30 | Current Pages action versions, artifact deployment flow, permissions, and environment requirements for the public prototype |

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
