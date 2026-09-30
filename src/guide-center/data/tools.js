window.LEARN_MEDICAT_TOOLS = [
  {
    "id": "mini-windows",
    "name": "Mini Windows",
    "category": "Windows PE / recovery environment",
    "status": "installed-build-inventory-pending",
    "purpose": "Windows-oriented offline workspace for file access, portable repair tools, imaging, and recovery tasks.",
    "recommendedFor": [
      "Windows-oriented repair workflows",
      "Accessing Windows files from outside the installed system",
      "Launching the offline Guide Center"
    ],
    "notFor": [
      "Assuming every installed Windows application will run",
      "Treating it as a permanent general-purpose operating system",
      "Proving a disk or file is healthy merely because it is visible"
    ],
    "versionEvidence": "MediCat v21.12 historical documentation and local menu/config evidence; exact image/browser/runtime inventory pending.",
    "sources": [
      {
        "label": "Microsoft WinPE overview",
        "url": "https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/winpe-intro?view=windows-11"
      },
      {
        "label": "MediCat v21.12 changelog",
        "url": "https://docs.medicat.dev/usb/changelog/"
      }
    ]
  },
  {
    "id": "jayros-lockpick",
    "name": "Jayro's Lockpick",
    "category": "Password and account access environment",
    "status": "exact-image-and-components-unverified",
    "purpose": "Collection of authorized Windows account-access and password-recovery tools presented through a dedicated WinPE image.",
    "recommendedFor": [
      "Only the exact local-account or access problem supported by a verified included component",
      "Authorized recovery after account type and encryption state are identified"
    ],
    "notFor": [
      "Microsoft-account recovery by assumption",
      "BitLocker or EFS decryption without the required key/certificate",
      "Firmware passwords, organization-managed accounts, or unsupported device locks",
      "Trying every reset tool until one changes something"
    ],
    "versionEvidence": "Historical v21.12 changelog describes a Windows 11-based Lockpick and PCUnlocker 5.6. Current target image and component versions require local inventory and boot testing.",
    "sources": [
      {
        "label": "MediCat v21.12 changelog",
        "url": "https://docs.medicat.dev/usb/changelog/"
      }
    ]
  },
  {
    "id": "boot-repair-disk",
    "name": "Boot-Repair-Disk",
    "category": "Boot repair image",
    "status": "historical-version-only",
    "purpose": "Dedicated boot-repair environment historically included for diagnosing and repairing supported boot-loader problems.",
    "recommendedFor": [
      "A boot-loader problem after the disk, operating system, boot mode, and preservation requirements are identified"
    ],
    "notFor": [
      "A disk absent from firmware",
      "Failing hardware or repeated I/O errors",
      "Blind GPT/MBR conversion",
      "Firmware recovery"
    ],
    "versionEvidence": "Historical v21.12 changelog lists Boot-Repair-Disk 2021-12-16. Presence, hash, and behavior on the X10 copy are unverified.",
    "sources": [
      {
        "label": "MediCat v21.12 changelog",
        "url": "https://docs.medicat.dev/usb/changelog/"
      }
    ]
  },
  {
    "id": "systemrescue",
    "name": "SystemRescue",
    "category": "Linux rescue environment",
    "status": "target-has-separately-verified-image",
    "purpose": "Linux-based rescue environment for storage, filesystems, imaging, networking, and command-line recovery work.",
    "recommendedFor": [
      "A verified Linux rescue workflow",
      "Read-only inspection, imaging, or recovery where its included tools match the job"
    ],
    "notFor": [
      "Assuming every command is non-destructive",
      "Replacing diagnosis with generic filesystem repair",
      "Executing unverified copied software"
    ],
    "versionEvidence": "SystemRescue 13.02 was separately downloaded and hash-verified for the paused migration project. Its tutorial inventory and boot evidence still belong in this project's baseline.",
    "sources": [
      {
        "label": "SystemRescue official documentation",
        "url": "https://www.system-rescue.org/"
      }
    ]
  }
];
