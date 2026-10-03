# Installed-tool inventory behind this prototype

On 2026-10-03, the MediCat `Ventoy` volume used to build this guide was scanned read-only. The scan found 29,668 files and 4,745 directories. Two unreadable paths were Windows-managed system folders, outside the MediCat program areas. No program or boot image on the volume was run, and the volume was not changed.

The [Tool Directory](../src/guide-center/data/tools.js) has **607 named tools at 630 locations**. It includes 112 top-level program folders, 145 portable-app folders, and 38 named boot tools or environments. A deeper pass added 239 NirLauncher menu utilities, one additional NirCmd executable, 29 Sysinternals utilities, and 66 ransomware utilities. Repeated copies are combined into one entry with each location shown. The two PortableApps support folders and the one excluded Windows security-control utility are omitted. The 14 launcher entries in Jayro's Lockpick have a separate [password data file](../src/guide-center/data/password.js).

The boot-image sections represented here are Antivirus (1), Backup and Recovery (11), Boot Repair (5), Diagnostic Tools (5), Live Operating Systems (4), Partition Tools (8), Password Removal (1), and Windows Recovery (3). The `OSimages` folder holds download helpers but no Windows installer ISO. The `VHD` folder holds no VHD image.

Four saved Ventoy aliases point to image filenames that are absent on this copy. One is Jayro's Lockpick: the alias names `Jayro's_Lockpick.wim`, while the folder contains `Lockpick.wim`. This proves a filename mismatch in the saved label; it does not prove whether Ventoy can list or boot the actual image. The other absent alias targets are MediCat VHD, O&O BlueCon, and NIUBI Partition Editor. A second SystemRescue image, labeled 13.02, exists beside the older SystemRescue image.

The NirLauncher menu has 239 named applications, each matched to a present executable. Its 119 extra x64 executables are variants of named utilities. Individual executables inside ordinary single-app packages, and programs inside boot images or WIMs, are outside this catalog pass.

Twelve representative tools have short lessons based on official project or vendor documentation. The dedicated password module goes deeper. **File presence is not a boot test or a program behavior test.** Exact bundled builds, menus, licenses, and repair outcomes still need confirmation before this becomes an installed MediCat guide.

## Quality comparison and current status

The [MediCat included-tools index](https://docs.medicat.dev/usb/tools/) is the baseline for category coverage. This prototype covers the eight installed boot-image sections plus the named Windows program folders found on this particular copy, and it adds search by job and location. Official product manuals such as [Rescuezilla's help](https://rescuezilla.com/help) are the baseline for click-by-click accuracy. This prototype has short, cautious lessons for selected tools and a deeper Lockpick module; it has not verified those screens against the bundled builds. The directory is therefore a useful review prototype, while installed-MediCat runtime and per-tool procedure quality remain open gates.
