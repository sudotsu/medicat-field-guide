window.LEARN_MEDICAT_GUIDES = [
  {
    "id": "identify-password-problem",
    "category": "Password and account access",
    "title": "I cannot sign in to Windows",
    "eyebrow": "Access restoration / classify first",
    "summary": "Work out whether the problem is a local password, Microsoft account, PIN, encryption, firmware lock, or managed account before opening a reset tool.",
    "risk": "high",
    "evidenceStatus": "procedure-pending-installed-version-verification",
    "tags": [
      "password",
      "PIN",
      "Microsoft account",
      "local account",
      "Lockpick",
      "BitLocker",
      "EFS"
    ],
    "goalPrompt": "Regain authorized access while preserving the existing installation and protected data whenever that is still possible.",
    "sections": [
      {
        "id": "recommended",
        "kind": "recommended",
        "label": "Recommended",
        "title": "Identify the protection before changing it",
        "paragraphs": [
          "Photograph or write down the exact sign-in screen and error. Confirm the Windows installation and owner. Ask whether the user normally enters an email address, a short PIN, a local username, a fingerprint, or a security key.",
          "Use an official owner-assisted recovery route first when it preserves both account access and protected data. Keep offline credential changes as a later, explicitly informed step."
        ],
        "bullets": [
          "Email address shown: usually a Microsoft or organization-managed account.",
          "Short numeric code labeled PIN: Windows Hello credential for that device, not necessarily the account password.",
          "Plain username with no email: may be a local Windows account.",
          "Recovery-key screen before Windows starts: disk encryption, not a Windows password.",
          "Password prompt before any operating-system logo: likely firmware or drive security, not a Windows account.",
          "Work or school branding: stop and involve the organization or authorized administrator."
        ]
      },
      {
        "id": "why",
        "kind": "explain",
        "label": "Why this action",
        "title": "One screen can hide several unrelated locks",
        "paragraphs": [
          "An offline local-password change does not reset a Microsoft account, recover a forgotten BitLocker key, remove a firmware password, or prove that encrypted files will remain readable.",
          "A successful desktop login also does not prove that EFS files, stored browser credentials, network credentials, password vaults, or account-linked services survived the change."
        ],
        "bullets": []
      },
      {
        "id": "skip",
        "kind": "skip",
        "label": "Safe to skip",
        "title": "Do not try every password utility",
        "paragraphs": [
          "Skip tools that do not match the identified account and encryption state. Skip wiping or reinstalling when the authorized outcome is to preserve the existing installation and a less destructive route remains."
        ],
        "bullets": [
          "Do not chase PIN settings when the machine is asking for a BitLocker recovery key.",
          "Do not use an offline reset tool for an online account until the owner-assisted route has been evaluated.",
          "Do not interpret a tool finding an account as proof that it can safely change that account."
        ]
      },
      {
        "id": "attention",
        "kind": "attention",
        "label": "Pay attention",
        "title": "Credential changes can break access to protected material",
        "paragraphs": [
          "Before an offline change, determine whether EFS, BitLocker, saved credentials, browser sessions, mapped network resources, or a password manager are part of the requested outcome. Explain what is known, what is not, and what the exact method may affect."
        ],
        "bullets": [
          "Record which physical Windows installation and user account are being considered.",
          "Confirm whether important files are already accessible from another account or recovery environment.",
          "Preserve recovery keys and identity alternatives before any destructive fallback."
        ]
      },
      {
        "id": "stop",
        "kind": "stop",
        "label": "Stop here",
        "title": "Do not continue past the authorization or encryption boundary",
        "paragraphs": [
          "Stop if ownership or permission is unclear, the wrong Windows installation may be selected, the request excludes credential changes, or encrypted data must be preserved but the recovery key/certificate state is unknown."
        ],
        "bullets": [
          "A domain or organization-managed account requires the authorized administrator.",
          "A BitLocker recovery screen requires the correct recovery route; password-reset utilities do not decrypt it.",
          "A firmware or drive password is a different problem and needs model-specific authorized support."
        ]
      },
      {
        "id": "success",
        "kind": "success",
        "label": "How to know it worked",
        "title": "Verify the requested outcome, not just a login",
        "paragraphs": [
          "Confirm that the intended account opens, the system still boots normally, and the owner can access the specific data and services they asked to preserve. Record any credentials or protected items that were not verified."
        ],
        "bullets": []
      },
      {
        "id": "failure",
        "kind": "failure",
        "label": "If it did not work",
        "title": "Route by what actually failed",
        "paragraphs": [],
        "bullets": [],
        "failures": [
          {
            "when": "The account is online-managed",
            "next": "Return to official account recovery or the authorized administrator; do not keep changing the local SAM."
          },
          {
            "when": "The Windows volume is encrypted",
            "next": "Locate and validate the recovery key before making the installation harder to recover."
          },
          {
            "when": "The tool cannot find Windows or the account",
            "next": "Check storage drivers, encryption, hibernation/dirty state, and whether the correct installation was selected."
          },
          {
            "when": "Login works but protected data does not",
            "next": "Stop changing credentials. Document the exact inaccessible material and investigate its encryption or account dependency."
          }
        ]
      },
      {
        "id": "understand",
        "kind": "understand",
        "label": "Understand why",
        "title": "A password is not the same as the key to every protected item",
        "paragraphs": [
          "Windows can use several credential layers at once. The sign-in method, account identity, disk-encryption key, file-encryption certificate, and application secrets may be related, but they are not interchangeable."
        ],
        "bullets": []
      },
      {
        "id": "advanced",
        "kind": "advanced",
        "label": "Advanced",
        "title": "Exact Lockpick procedure is intentionally withheld",
        "paragraphs": [
          "The installed Jayro's Lockpick image and its component versions have not yet been inventoried and boot-tested on this X10 build. Do not publish button-by-button credential-changing instructions until that evidence exists."
        ],
        "bullets": []
      }
    ],
    "sources": [
      {
        "label": "MediCat v21.12 historical changelog",
        "url": "https://docs.medicat.dev/usb/changelog/",
        "status": "verified-source-only",
        "note": "Historical evidence for the v21.12 Lockpick image and listed component state; current target still requires inventory."
      }
    ],
    "related": [
      "decide-backup",
      "prepare-wipe"
    ]
  },
  {
    "id": "windows-will-not-boot",
    "category": "Boot and startup repair",
    "title": "Windows will not boot",
    "eyebrow": "Diagnose the failed layer before writing",
    "summary": "Separate power, firmware, disk detection, boot mode, partition layout, boot files, and Windows failures before using a repair command.",
    "risk": "high",
    "evidenceStatus": "concept-verified-procedures-pending",
    "tags": [
      "boot",
      "BCD",
      "UEFI",
      "Legacy",
      "GPT",
      "MBR",
      "EFI",
      "GRUB",
      "automatic repair"
    ],
    "goalPrompt": "Return the authorized installation to a bootable state without converting, formatting, or rewriting the wrong layer.",
    "sections": [
      {
        "id": "recommended",
        "kind": "recommended",
        "label": "Recommended",
        "title": "Find the last layer that still works",
        "paragraphs": [
          "Start the machine and record the last thing that appears. Use the observation to select the next inspection step; do not start with a boot-record write."
        ],
        "bullets": [
          "No power, no fans, or no display: hardware/power/display route.",
          "Firmware opens but the internal drive is absent: connection, controller mode, drive, or storage hardware route.",
          "Drive exists but no operating-system entry appears: boot mode, partition layout, or firmware entry route.",
          "Windows Boot Manager starts and shows a BCD or file error: Windows boot-file route.",
          "Windows logo appears and loops into recovery: operating-system, update, driver, filesystem, or storage-health route.",
          "GRUB prompt or Linux boot error: Linux boot-loader route, not automatic Windows repair."
        ]
      },
      {
        "id": "why",
        "kind": "explain",
        "label": "Why this action",
        "title": "BIOS, UEFI, GPT, MBR, and Windows are different layers",
        "paragraphs": [
          "UEFI and Legacy describe how firmware starts software. GPT and MBR describe how a disk stores partition information. An EFI System Partition stores UEFI boot files. Windows BCD tells Windows Boot Manager which installation to start.",
          "A message mentioning GPT or MBR does not automatically mean the BIOS is broken, and a firmware settings screen does not prove the disk layout is correct."
        ],
        "bullets": []
      },
      {
        "id": "skip",
        "kind": "skip",
        "label": "Safe to skip",
        "title": "Ignore branches that do not match the observed layer",
        "paragraphs": [
          "If the firmware cannot detect the disk, skip BCD repair for now. If Windows Boot Manager is already loading, skip random firmware updates and boot-sector rewrites."
        ],
        "bullets": [
          "Do not convert MBR/GPT merely because a tool offers the button.",
          "Do not change storage-controller mode casually; it can make an otherwise intact Windows installation fail to start.",
          "Do not repair every operating system found on every attached disk."
        ]
      },
      {
        "id": "attention",
        "kind": "attention",
        "label": "Pay attention",
        "title": "Booting the USB in the wrong mode changes what repair tools see",
        "paragraphs": [
          "A firmware menu may list the same USB twice—one UEFI entry and one Legacy/non-UEFI entry. For a normal modern Windows installation on GPT, start the repair environment in UEFI mode unless local evidence says otherwise."
        ],
        "bullets": [
          "Identify the internal disk by model and capacity.",
          "Record the current firmware boot mode before changing it.",
          "Check for an EFI System Partition and the actual Windows volume.",
          "Treat read/write errors or disappearing disks as a recovery problem before a boot-repair problem."
        ]
      },
      {
        "id": "stop",
        "kind": "stop",
        "label": "Stop here",
        "title": "Do not write through uncertainty",
        "paragraphs": [
          "Stop if the target disk is ambiguous, the disk repeatedly disconnects, the partition table appears damaged, encryption is unresolved, or the proposed repair would convert/format/delete partitions that must be preserved."
        ],
        "bullets": []
      },
      {
        "id": "success",
        "kind": "success",
        "label": "How to know it worked",
        "title": "The internal disk boots without the repair USB",
        "paragraphs": [
          "Remove or deprioritize the USB and confirm the firmware starts the intended internal installation. One successful repair-environment command is not the success condition."
        ],
        "bullets": [
          "The expected boot entry appears.",
          "Windows reaches the intended sign-in screen.",
          "No new disk/partition warnings appear.",
          "The original data-preservation requirement remains satisfied."
        ]
      },
      {
        "id": "failure",
        "kind": "failure",
        "label": "If it did not work",
        "title": "Use the new symptom",
        "paragraphs": [],
        "bullets": [],
        "failures": [
          {
            "when": "The disk disappears or reports I/O errors",
            "next": "Stop repair writes and move to health assessment, imaging, or data recovery."
          },
          {
            "when": "The boot entry exists but Windows still loops",
            "next": "Move from firmware/boot-entry diagnosis to Windows recovery, update, driver, filesystem, or hardware diagnosis."
          },
          {
            "when": "The repair environment sees no Windows volume",
            "next": "Check encryption, storage drivers/controller mode, disk visibility, and whether the correct disk was selected."
          },
          {
            "when": "The machine only boots with the USB attached",
            "next": "Recheck which device supplied the boot files and whether they were written to the intended internal EFI/System partition."
          }
        ]
      },
      {
        "id": "understand",
        "kind": "understand",
        "label": "Understand why",
        "title": "A visible Windows folder and a working boot chain are separate facts",
        "paragraphs": [
          "A repair environment can mount a Windows volume even when firmware has no usable entry, the EFI partition is missing, or boot configuration points elsewhere. Diagnosis follows the chain from firmware to disk layout to boot files to Windows."
        ],
        "bullets": []
      },
      {
        "id": "advanced",
        "kind": "advanced",
        "label": "Advanced",
        "title": "Manual repair waits for a verified layout",
        "paragraphs": [
          "BCDBoot, BCD editing, boot-sector repair, partition activation, GPT/MBR conversion, and GRUB repair are advanced branches. Publish exact commands only with a known disk map, boot mode, installed OS, tested rollback, and version-matched source."
        ],
        "bullets": []
      }
    ],
    "sources": [
      {
        "label": "Microsoft WinPE overview",
        "url": "https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/winpe-intro?view=windows-11",
        "status": "verified",
        "note": "Primary description of WinPE repair, storage, DiskPart, and BCDBoot capabilities."
      },
      {
        "label": "Ventoy TreeView documentation",
        "url": "https://www.ventoy.net/en/doc_treeview.html",
        "status": "verified",
        "note": "Primary reference for navigating the file tree."
      }
    ],
    "related": [
      "choose-live-environment",
      "clean-install-windows"
    ]
  },
  {
    "id": "choose-live-environment",
    "category": "Live OS and recovery environments",
    "title": "Which environment should I boot?",
    "eyebrow": "Choose by job, not by name",
    "summary": "Decide whether you need Mini Windows, a Linux live/rescue system, an installer, or a dedicated diagnostic image.",
    "risk": "low",
    "evidenceStatus": "routing-principles-verified-images-pending",
    "tags": [
      "live OS",
      "WinPE",
      "Mini Windows",
      "Linux",
      "installer",
      "ISO",
      "WIM",
      "VHD"
    ],
    "goalPrompt": "Boot the smallest environment that can safely complete the current job without accidentally installing or writing to the internal disk.",
    "sections": [
      {
        "id": "recommended",
        "kind": "recommended",
        "label": "Recommended",
        "title": "Match the environment to the work",
        "paragraphs": [
          "Choose the environment according to the next concrete action, not which name sounds most powerful."
        ],
        "bullets": [
          "Need Windows-oriented file access or portable Windows repair tools: start with Mini Windows.",
          "Need Linux filesystems, Linux boot repair, imaging, or a hardware-agnostic rescue shell: choose a verified Linux rescue/live image.",
          "Need to install or reinstall an operating system: choose that operating system's installer.",
          "Need a focused memory, disk, boot, or backup tool: choose the dedicated image documented for that job.",
          "Need only to inspect files before deciding: prefer a read-only-capable recovery environment."
        ]
      },
      {
        "id": "why",
        "kind": "explain",
        "label": "Why this action",
        "title": "Live does not mean install",
        "paragraphs": [
          "A live operating system or WinPE can run from USB or memory without becoming the computer's installed operating system. An installer is specifically designed to change the internal disk. A dedicated boot image may contain only one repair or diagnostic product."
        ],
        "bullets": []
      },
      {
        "id": "skip",
        "kind": "skip",
        "label": "Safe to skip",
        "title": "You do not need to understand every image format first",
        "paragraphs": [
          "For the basic choice, it is enough to know the job and whether the selected item is a live/recovery environment, installer, or focused tool. Detailed ISO/WIM/VHD internals can wait."
        ],
        "bullets": [
          "Skip persistence setup unless you specifically need changes saved between boots.",
          "Skip network setup when the required files and documentation are already offline.",
          "Skip advanced boot modes unless the normal boot produces a specific failure."
        ]
      },
      {
        "id": "attention",
        "kind": "attention",
        "label": "Pay attention",
        "title": "A live environment can still alter internal disks",
        "paragraphs": [
          "Running from USB does not make every action read-only. File managers, partition tools, imaging tools, password tools, and installers can write to internal storage."
        ],
        "bullets": [
          "Identify the internal disk before mounting or writing.",
          "Know whether the environment automatically mounts volumes.",
          "Keep the installer and the installed system distinct after a restart.",
          "Use the documented exit/reboot route; remove the USB when the next boot should use the internal disk."
        ]
      },
      {
        "id": "stop",
        "kind": "stop",
        "label": "Stop here",
        "title": "Do not guess at an unfamiliar boot image",
        "paragraphs": [
          "Stop if the image's purpose, architecture, boot-mode support, persistence, automatic mounting, or data-writing behavior is not documented for the installed version."
        ],
        "bullets": []
      },
      {
        "id": "success",
        "kind": "success",
        "label": "How to know it worked",
        "title": "You reached the environment intended for the job",
        "paragraphs": [
          "Confirm the environment name/version where possible, verify the target storage is visible in the expected mode, and ensure no installation or repair action has begun merely by booting."
        ],
        "bullets": []
      },
      {
        "id": "failure",
        "kind": "failure",
        "label": "If it did not work",
        "title": "Route the boot failure",
        "paragraphs": [],
        "bullets": [],
        "failures": [
          {
            "when": "The image does not appear in Ventoy",
            "next": "Verify its current path, filename, file integrity, and whether the configuration filters or aliases it."
          },
          {
            "when": "The image starts in one firmware entry but not the other",
            "next": "Record whether UEFI or Legacy was used and consult the image's verified boot-mode support."
          },
          {
            "when": "Storage or network hardware is absent",
            "next": "Check the environment's driver coverage and choose a verified alternative only for that limitation."
          },
          {
            "when": "The machine restarts back into the installer",
            "next": "Remove or deprioritize the USB and boot the intended internal disk."
          }
        ]
      },
      {
        "id": "understand",
        "kind": "understand",
        "label": "Understand why",
        "title": "The file format is a container; the booted environment determines behavior",
        "paragraphs": [
          "ISO, WIM, IMG, and VHD describe packaging or disk-image forms. They do not by themselves tell you whether the contents inspect, repair, install, or erase."
        ],
        "bullets": []
      },
      {
        "id": "advanced",
        "kind": "advanced",
        "label": "Advanced",
        "title": "Inventory every installed image before final release",
        "paragraphs": [
          "The final Guide Center needs exact image hashes, versions, boot modes, architecture, persistence, driver limitations, internal-disk behavior, and tested exit path. The MVP intentionally does not fabricate that inventory."
        ],
        "bullets": []
      }
    ],
    "sources": [
      {
        "label": "Microsoft WinPE overview",
        "url": "https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/winpe-intro?view=windows-11",
        "status": "verified",
        "note": "Primary source for WinPE purpose, capabilities, memory boot, persistence limitations, and UEFI/Legacy considerations."
      },
      {
        "label": "Ventoy TreeView documentation",
        "url": "https://www.ventoy.net/en/doc_treeview.html",
        "status": "verified",
        "note": "Primary source for F3 tree navigation behavior."
      }
    ],
    "related": [
      "windows-will-not-boot",
      "clean-install-windows"
    ]
  },
  {
    "id": "decide-backup",
    "category": "Backup and recovery",
    "title": "Back up, clone, or restore a computer",
    "eyebrow": "Protect the outcome, not every byte by default",
    "summary": "Choose between a verified file copy, disk image, clone, restore, or no extra copy, then prove the chosen result works.",
    "risk": "medium",
    "evidenceStatus": "workflow-prototype",
    "tags": [
      "backup",
      "cloud",
      "OneDrive",
      "Google Drive",
      "iCloud",
      "clone",
      "image",
      "files",
      "recovery"
    ],
    "goalPrompt": "Protect the required files or system state with a confirmed source, separate destination, and tested recovery path.",
    "sections": [
      {
        "id": "recommended",
        "kind": "recommended",
        "label": "Recommended",
        "title": "Choose the copy that matches the requested result",
        "paragraphs": [
          "Ask the owner what must survive. Verify any existing cloud or separate backup from another device. Then identify the physical source and destination before opening a copy or restore tool."
        ],
        "bullets": [
          "For selected files on a healthy source: copy only required folders to a separate device, then open representative files from that copy.",
          "For whole-system rollback or migration: choose an image or clone only after confirming destination capacity and whether the current system state is worth preserving.",
          "For a restore: open the backup first, confirm the physical overwrite target and accepted loss, and verify the restored system and files afterward.",
          "If the source has read errors or disconnects: stop routine copying and open the file-recovery route before repair writes.",
          "Check password-manager access, passkeys, authenticator accounts, trusted-device prompts, recovery codes, and disk/device recovery keys before replacing an environment."
        ]
      },
      {
        "id": "why",
        "kind": "explain",
        "label": "Why this action",
        "title": "The smallest adequate backup is usually the best one",
        "paragraphs": [
          "A full disk image protects a different outcome than a file copy. If the owner only needs documents that are already verified elsewhere, imaging the entire machine may add hours without protecting anything new."
        ],
        "bullets": [
          "File copy: selected readable files.",
          "Cloud sync: current synchronized state, which may also synchronize deletion or damage.",
          "Versioned backup: earlier recoverable versions over time.",
          "Disk image: stored representation of disk sectors or used regions.",
          "Clone: another disk made to resemble the source.",
          "Restore point: selected Windows system state, not a personal-file backup."
        ]
      },
      {
        "id": "skip",
        "kind": "skip",
        "label": "Safe to skip",
        "title": "Skip the full image when it protects no required outcome",
        "paragraphs": [
          "If every important item is confirmed accessible elsewhere, identity recovery is preserved, and the owner accepts rebuilding applications/settings, an additional full file backup or disk image may be unnecessary."
        ],
        "bullets": [
          "Skip temporary caches and re-downloadable files unless they matter to the owner.",
          "Skip application binaries when the clean-reinstall goal requires trusted installers instead.",
          "Skip a system image when the owner does not want the current system state reproduced."
        ]
      },
      {
        "id": "attention",
        "kind": "attention",
        "label": "Pay attention",
        "title": "Installed sync software is not proof",
        "paragraphs": [
          "A cloud icon or installed application does not establish that every relevant folder finished syncing, that files are current, or that the owner can still sign in after the device is wiped."
        ],
        "bullets": [
          "Open representative files from outside the target device.",
          "Look for local-only folders and unsynced/conflicted indicators.",
          "Verify ownership and recovery of the cloud account itself.",
          "Account for large files, archives, virtual machines, and app-specific data that sync tools may exclude."
        ]
      },
      {
        "id": "stop",
        "kind": "stop",
        "label": "Stop here",
        "title": "Do not repair a failing source before protecting data",
        "paragraphs": [
          "Stop ordinary repair writes when the disk disconnects, reports repeated read errors, makes abnormal noises, or contains irreplaceable data that is not confirmed elsewhere. Recovery or imaging may need priority."
        ],
        "bullets": []
      },
      {
        "id": "success",
        "kind": "success",
        "label": "How to know it worked",
        "title": "Prove recovery from somewhere else",
        "paragraphs": [
          "Open representative files from the backup or provider, verify the owner can authenticate without the target device, and record anything intentionally excluded. A completed progress bar alone is insufficient."
        ],
        "bullets": []
      },
      {
        "id": "failure",
        "kind": "failure",
        "label": "If it did not work",
        "title": "Choose the failure-specific route",
        "paragraphs": [],
        "bullets": [],
        "failures": [
          {
            "when": "Cloud files are missing or old",
            "next": "Preserve the local copies before wiping and diagnose synchronization separately."
          },
          {
            "when": "The owner cannot sign in elsewhere",
            "next": "Restore account/recovery access before making the target device unavailable."
          },
          {
            "when": "The source returns read errors",
            "next": "Minimize rereads and move to a health-aware recovery or imaging plan."
          },
          {
            "when": "The destination copy cannot be verified",
            "next": "Do not erase the source; resolve errors and compare hashes or representative recovery results."
          }
        ]
      },
      {
        "id": "understand",
        "kind": "understand",
        "label": "Understand why",
        "title": "Backup means recoverable, not merely copied somewhere",
        "paragraphs": [
          "A backup succeeds when the required data and identity can be restored after the original is unavailable. Location, recency, completeness, credentials, encryption keys, and a tested restore all matter."
        ],
        "bullets": []
      },
      {
        "id": "advanced",
        "kind": "advanced",
        "label": "Advanced",
        "title": "Images and clones need a defined restore target",
        "paragraphs": [
          "Before imaging or cloning, decide whether the goal is forensic preservation, failing-disk recovery, bare-metal restoration, migration, or rollback. The format, read strategy, verification, and destination requirements differ."
        ],
        "bullets": []
      }
    ],
    "sources": [],
    "related": [
      "prepare-wipe",
      "identify-password-problem",
      "recover-files",
      "disk-layout"
    ]
  },
  {
    "id": "prepare-wipe",
    "category": "Before destructive work",
    "title": "Before you wipe, reset, or hand off a device",
    "eyebrow": "Identity continuity checkpoint",
    "summary": "Confirm the exact device, accepted loss, required files, account recovery, and the next environment before erasing anything.",
    "risk": "high",
    "evidenceStatus": "workflow-prototype",
    "tags": [
      "wipe",
      "flash",
      "reset",
      "passkey",
      "2FA",
      "authenticator",
      "recovery codes",
      "password manager",
      "BitLocker"
    ],
    "goalPrompt": "Make the authorized destructive change without unintentionally locking the owner out of important accounts or protected data.",
    "sections": [
      {
        "id": "recommended",
        "kind": "recommended",
        "label": "Recommended",
        "title": "Test another way back in before erasing this one",
        "paragraphs": [
          "Confirm the exact physical target and accepted loss. Then ask whether the device stores or approves sign-ins. Use each provider's supported migration or recovery process and test the alternative from another device."
        ],
        "bullets": [
          "Passkeys: determine whether they sync, are device-bound, or live on external hardware; create/test another sign-in route.",
          "Authenticator codes: transfer, export, or re-enroll through the provider-supported method; test replacement codes.",
          "Push approvals/trusted devices: add and test another device or alternate method.",
          "Recovery codes: retain them somewhere that survives the wipe and generate a fresh set when appropriate.",
          "Password managers: prove the vault opens elsewhere with the required password, recovery key, or emergency kit.",
          "Disk/device encryption: retain and verify BitLocker, FileVault, or device-recovery keys.",
          "After those checks, choose the documented reset, reinstall, or erase path that matches the handoff goal; verify the device reaches the agreed new-owner or disposal state."
        ]
      },
      {
        "id": "why",
        "kind": "explain",
        "label": "Why this action",
        "title": "The device may be part of the owner's identity",
        "paragraphs": [
          "Erasing a computer or phone can remove the only passkey, authenticator seed, trusted-device approval route, password vault, or recovery-code copy. Reinstalling the operating system does not recreate those secrets."
        ],
        "bullets": []
      },
      {
        "id": "skip",
        "kind": "skip",
        "label": "Safe to skip",
        "title": "Do not force recovery work that is outside the authorized outcome",
        "paragraphs": [
          "For a newly acquired device or an authorized clean wipe where preserving the previous environment and account access is explicitly not part of the job, record the status as yes, no, or unknown, explain the consequence, and continue."
        ],
        "bullets": [
          "Skip migrating accounts the owner confirms are abandoned.",
          "Skip preserving the old operating-system state when the requested outcome is a trusted clean rebuild.",
          "Skip exhaustive backup when required data and identity are proven recoverable elsewhere."
        ]
      },
      {
        "id": "attention",
        "kind": "attention",
        "label": "Pay attention",
        "title": "“It should be synced” is not a verification",
        "paragraphs": [
          "Open the vault, use the alternate sign-in, generate a valid code, retrieve the recovery key, or access the provider account from somewhere that will remain available."
        ],
        "bullets": [
          "Do not store customer recovery material in a technician's personal account.",
          "Do not photograph recovery codes into an unrelated cloud library.",
          "Agree where temporary recovery material will be returned or deleted."
        ]
      },
      {
        "id": "stop",
        "kind": "stop",
        "label": "Stop here",
        "title": "Stop only when proceeding contradicts the job",
        "paragraphs": [
          "Stop if the target is uncertain, permission is unclear, the owner requested preservation but recoverability is unknown, or the action exceeds the accepted fallback. Do not invent a universal block when the authorized outcome explicitly accepts the loss."
        ],
        "bullets": []
      },
      {
        "id": "success",
        "kind": "success",
        "label": "How to know it worked",
        "title": "The owner can recover without this device",
        "paragraphs": [
          "A tested alternate sign-in/recovery route works, required files and keys exist elsewhere, the physical target is confirmed, and accepted loss is recorded before the destructive action begins."
        ],
        "bullets": []
      },
      {
        "id": "failure",
        "kind": "failure",
        "label": "If it did not work",
        "title": "Resolve the dependency or redefine the outcome",
        "paragraphs": [],
        "bullets": [],
        "failures": [
          {
            "when": "An authenticator cannot be transferred",
            "next": "Use the provider's recovery or re-enrollment route while the original device still works."
          },
          {
            "when": "A password vault will not open elsewhere",
            "next": "Do not erase the only working vault until supported recovery/export is complete or loss is explicitly accepted."
          },
          {
            "when": "No BitLocker/FileVault key can be found",
            "next": "Explain that encrypted data may become unrecoverable and align the next action with the authorized outcome."
          },
          {
            "when": "The owner is unavailable",
            "next": "Proceed only within previously documented authorization; do not access or export unrelated personal material."
          }
        ]
      },
      {
        "id": "understand",
        "kind": "understand",
        "label": "Understand why",
        "title": "Availability and possession are part of authentication",
        "paragraphs": [
          "Modern account recovery often depends on a device, key, approval channel, or encrypted vault—not just a memorized password. Destructive repair can remove that possession factor."
        ],
        "bullets": []
      },
      {
        "id": "advanced",
        "kind": "advanced",
        "label": "Advanced",
        "title": "Provider-specific instructions require current primary sources",
        "paragraphs": [
          "Passkey synchronization, authenticator transfer, recovery-code rotation, and password-manager emergency access change over time. The final guide must link current provider documentation rather than generalize from one product."
        ],
        "bullets": []
      }
    ],
    "sources": [],
    "related": [
      "decide-backup",
      "clean-install-windows"
    ]
  },
  {
    "id": "clean-install-windows",
    "category": "Install and image an OS",
    "title": "Install Windows cleanly",
    "eyebrow": "One sane default path",
    "summary": "Prepare identity and data, boot the installer in the intended mode, select the physical target carefully, and verify the machine boots the new installation rather than the USB.",
    "risk": "high",
    "evidenceStatus": "concept-prototype-version-specific-prompts-pending",
    "tags": [
      "install",
      "reinstall",
      "Windows",
      "partition",
      "format",
      "UEFI",
      "GPT",
      "drivers",
      "product key"
    ],
    "goalPrompt": "Create a clean, bootable Windows installation on the authorized target disk without erasing another device or overcomplicating the normal path.",
    "sections": [
      {
        "id": "recommended",
        "kind": "recommended",
        "label": "Recommended",
        "title": "Use the normal UEFI clean-install path when the hardware supports it",
        "paragraphs": [
          "Complete the backup and identity checkpoint, disconnect unnecessary writable disks when practical, boot trusted installation media in UEFI mode, identify the target by model/capacity, and let Windows Setup create the required system partitions on the intended unallocated target.",
          "Exact screens, account requirements, bypass behavior, editions, and product-key prompts depend on the installation-media version. Verify them before publishing button-by-button instructions."
        ],
        "bullets": [
          "Confirm the device and accepted erase scope.",
          "Preserve required files, recovery keys, passkeys, 2FA, and license/account information.",
          "Use trusted installation media and verify its source.",
          "Choose the intended physical disk—not whichever line happens to be Disk 0.",
          "After the first restart, boot the internal disk rather than starting Setup again.",
          "Install only required trusted drivers and verify networking, storage, display, audio, updates, and activation state."
        ]
      },
      {
        "id": "why",
        "kind": "explain",
        "label": "Why this action",
        "title": "UEFI plus GPT is the normal modern pairing",
        "paragraphs": [
          "UEFI describes the firmware boot method; GPT describes the partition scheme. Windows Setup can create the EFI, recovery, reserved, and operating-system partitions it needs when the correct target is presented as unallocated space."
        ],
        "bullets": []
      },
      {
        "id": "skip",
        "kind": "skip",
        "label": "Safe to skip",
        "title": "Skip customization that does not serve the immediate outcome",
        "paragraphs": [
          "For a normal clean install, skip manual partition sizing, unattended files, debloat scripts, dual boot, custom images, and advanced driver injection unless a verified requirement calls for them."
        ],
        "bullets": [
          "A product-key prompt may be deferrable when the machine has an appropriate digital license, but verify against the exact Setup version and licensing state.",
          "Optional feature and personalization decisions can usually wait until Windows boots.",
          "Do not spend time restoring re-downloadable applications before core hardware and account access are verified."
        ]
      },
      {
        "id": "attention",
        "kind": "attention",
        "label": "Pay attention",
        "title": "Partition deletion is the erase",
        "paragraphs": [
          "Deleting or formatting partitions changes the selected disk. The installer listing may use sizes and generic names; drive letters from the old Windows session are not reliable identifiers here."
        ],
        "bullets": [
          "Cross-check capacity, model information when available, and the planned target.",
          "If more than one similar disk is connected, stop or disconnect the non-target.",
          "Do not delete OEM/recovery/data partitions unless the accepted outcome includes their loss.",
          "If Setup cannot see storage, investigate drivers/controller mode instead of randomly converting disks."
        ]
      },
      {
        "id": "stop",
        "kind": "stop",
        "label": "Stop here",
        "title": "Do not choose a disk by guesswork",
        "paragraphs": [
          "Stop if the target cannot be distinguished, required data is not recoverable, identity recovery is not accepted, encryption consequences are unresolved, or Setup proposes a destructive conversion outside the authorization."
        ],
        "bullets": []
      },
      {
        "id": "success",
        "kind": "success",
        "label": "How to know it worked",
        "title": "The internal disk starts the intended new installation",
        "paragraphs": [
          "Remove or deprioritize the installer, boot the internal disk, complete initial setup, and verify Device Manager/storage/network/display/audio as applicable. Record missing drivers, activation/account steps, and owner actions before handoff."
        ],
        "bullets": []
      },
      {
        "id": "failure",
        "kind": "failure",
        "label": "If it did not work",
        "title": "Route by the stage that failed",
        "paragraphs": [],
        "bullets": [],
        "failures": [
          {
            "when": "Setup cannot see the disk",
            "next": "Check firmware detection, storage-controller mode, required storage drivers, and hardware health."
          },
          {
            "when": "Setup reports GPT/MBR mismatch",
            "next": "Confirm how the installer was booted and whether erasing/converting the target is authorized; do not blindly convert a preservation disk."
          },
          {
            "when": "The machine starts Setup again after restart",
            "next": "Boot the internal Windows Boot Manager or remove/deprioritize the USB."
          },
          {
            "when": "Windows boots but hardware is missing",
            "next": "Inventory missing device IDs and obtain trusted model-matched drivers; do not use random driver packs as the first response."
          }
        ]
      },
      {
        "id": "understand",
        "kind": "understand",
        "label": "Understand why",
        "title": "Setup has two jobs: lay down Windows, then hand boot control to the internal disk",
        "paragraphs": [
          "The USB starts Setup. Setup prepares partitions and files on the target. After restart, firmware should start the new boot manager from the internal disk. Returning to the first installer screen often means the USB was selected again."
        ],
        "bullets": []
      },
      {
        "id": "advanced",
        "kind": "advanced",
        "label": "Advanced",
        "title": "Manual partitioning and imaging are separate branches",
        "paragraphs": [
          "Dual boot, custom recovery partitions, image capture/apply, unattended installation, driver injection, Windows-to-Go-style workflows, and unusual firmware layouts need their own tested procedures and rollback plans."
        ],
        "bullets": []
      }
    ],
    "sources": [
      {
        "label": "Microsoft WinPE overview",
        "url": "https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/winpe-intro?view=windows-11",
        "status": "verified",
        "note": "Primary source for WinPE installation/deployment purpose and UEFI/Legacy relationship."
      }
    ],
    "related": [
      "prepare-wipe",
      "windows-will-not-boot",
      "decide-backup"
    ]
  },
  {
    "id": "diagnose-unstable",
    "category": "Diagnostics and malware triage",
    "title": "The computer runs badly or may be infected",
    "eyebrow": "Classify the symptom before choosing a tool",
    "summary": "Separate a failing drive, memory or heat problem, Windows fault, and suspicious software before trying a repair or scan.",
    "risk": "medium",
    "evidenceStatus": "concept-verified-procedures-pending-installed-inventory",
    "tags": [
      "crash",
      "freeze",
      "slow",
      "blue screen",
      "hardware",
      "memory",
      "malware",
      "virus"
    ],
    "goalPrompt": "Find a repeatable cause and protect required data before making the system harder to recover.",
    "sections": [
      {
        "id": "recommended",
        "kind": "recommended",
        "label": "Recommended",
        "title": "Capture the symptom and check the storage path first",
        "paragraphs": [
          "Record exactly when the failure occurs: before Windows, at sign-in, under load, or only in one application. Note any error text and whether the same problem appears from a live environment."
        ],
        "bullets": [
          "If files disappear, the disk disconnects, or read errors appear, open the file-recovery route before running repair writes.",
          "For repeatable crashes, distinguish a hardware signal from a Windows or application failure using a verified diagnostic appropriate to the installed build.",
          "If suspicious software is suspected, preserve needed data and use a verified non-Defender scanner in report-only mode; review findings before any removal."
        ]
      },
      {
        "id": "explain",
        "kind": "explain",
        "label": "Why this action",
        "title": "Slow and broken are symptoms, not diagnoses",
        "paragraphs": [
          "A slow computer can be caused by storage, memory, temperature, drivers, software, or malware. A scanner result by itself cannot identify every cause."
        ],
        "bullets": []
      },
      {
        "id": "skip",
        "kind": "skip",
        "label": "Safe to skip",
        "title": "Skip broad changes until the failing layer is known",
        "paragraphs": [
          "Do not start with a reinstall, firmware update, registry cleaner, or every available diagnostic. Test the symptom that actually repeats."
        ],
        "bullets": []
      },
      {
        "id": "attention",
        "kind": "attention",
        "label": "Pay attention",
        "title": "A diagnostic can still write or stress hardware",
        "paragraphs": [
          "Check the selected tool, test mode, target, and installed version. If the disk may be failing, protect data before stress tests or filesystem repair. Keep malware scans report-only."
        ],
        "bullets": []
      },
      {
        "id": "stop",
        "kind": "stop",
        "label": "Stop here",
        "title": "Pause if continued testing threatens the data",
        "paragraphs": [
          "Stop write-heavy tests when the disk drops offline, reports read errors, or contains required files without a recovery copy. Stop automatic cleanup when the finding has not been reviewed."
        ],
        "bullets": []
      },
      {
        "id": "success",
        "kind": "success",
        "label": "How to know it worked",
        "title": "You can name the failing layer and verify the outcome",
        "paragraphs": [
          "A useful result identifies a repeatable hardware, storage, operating-system, application, or suspicious-software path, and the next action has a testable success condition. A single clean scan does not prove the machine is healthy."
        ],
        "bullets": []
      },
      {
        "id": "failure",
        "kind": "failure",
        "label": "If it did not work",
        "title": "Route by the evidence that appeared",
        "paragraphs": [],
        "bullets": [],
        "failures": [
          {
            "when": "The disk reports errors or disappears",
            "next": "Move to file recovery and evaluate imaging before repair."
          },
          {
            "when": "A memory diagnostic reports errors",
            "next": "Record the exact test result and investigate hardware before reinstalling Windows."
          },
          {
            "when": "A scan is clean but the symptom repeats",
            "next": "Continue hardware, driver, update, and application diagnosis rather than declaring the system clean."
          },
          {
            "when": "A scanner finds something",
            "next": "Preserve its report and verify the finding and removal method before changing files."
          }
        ]
      },
      {
        "id": "understand",
        "kind": "understand",
        "label": "Understand why",
        "title": "Test one hypothesis at a time",
        "paragraphs": [
          "The earliest repeatable failure is often more useful than the most dramatic later error. A bootable toolkit helps isolate a layer, but it does not diagnose automatically."
        ],
        "bullets": []
      },
      {
        "id": "advanced",
        "kind": "advanced",
        "label": "Advanced",
        "title": "Exact diagnostic and cleaning steps wait for inventory",
        "paragraphs": [
          "The X10 MediCat image and included diagnostic and scanner versions have not been fully inventoried. Do not assume a named utility or an automatic-cleanup setting is safe on this build."
        ],
        "bullets": []
      }
    ],
    "sources": [
      {
        "label": "MediCat current tool index",
        "url": "https://medicatusb.com/docs/",
        "status": "verified-source-only",
        "note": "Documents diagnostic and repair categories, not this drive’s exact contents."
      },
      {
        "label": "MediCat v21.12 historical included tools",
        "url": "https://docs.medicat.dev/usb/tools/",
        "status": "verified-source-only",
        "note": "Historical antivirus and diagnostic categories; current availability requires local verification."
      }
    ],
    "related": [
      "recover-files",
      "windows-will-not-boot",
      "choose-live-environment"
    ]
  },
  {
    "id": "recover-files",
    "category": "Data recovery",
    "title": "Files are missing or a drive may be failing",
    "eyebrow": "Classify the symptom before choosing a tool",
    "summary": "Find the safest recovery source and destination before a reset, repair, format, or recovery scan can overwrite the only copy.",
    "risk": "high",
    "evidenceStatus": "concept-verified-procedures-pending-installed-inventory",
    "tags": [
      "deleted files",
      "missing files",
      "data recovery",
      "damaged drive",
      "read error",
      "disk image"
    ],
    "goalPrompt": "Recover the required files or establish a trustworthy recovery copy without writing over their source.",
    "sections": [
      {
        "id": "recommended",
        "kind": "recommended",
        "label": "Recommended",
        "title": "Check existing copies, then classify the source",
        "paragraphs": [
          "Ask which files are missing, when they were last seen, and whether a verified backup or cloud copy exists. Check the source drive’s identity and whether it reads reliably."
        ],
        "bullets": [
          "If files were recently deleted from a healthy drive, minimize use of that drive and recover to a different destination.",
          "If the drive reports errors, disconnects, or becomes very slow to read, consider a read-first image of the failing source before filesystem repair.",
          "If encryption blocks access, find the matching recovery key or certificate; a file-recovery tool cannot replace it."
        ]
      },
      {
        "id": "explain",
        "kind": "explain",
        "label": "Why this action",
        "title": "Recovery depends on what was lost",
        "paragraphs": [
          "Deleted-file recovery, a damaged filesystem, a failing physical drive, and an encrypted volume are different problems. The safe first action changes with the failure."
        ],
        "bullets": []
      },
      {
        "id": "skip",
        "kind": "skip",
        "label": "Safe to skip",
        "title": "Skip repair writes on the source for now",
        "paragraphs": [
          "Do not run a broad filesystem repair, initialize, format, repartition, or reinstall just to see whether files reappear. Do not save recovered files back to the source."
        ],
        "bullets": []
      },
      {
        "id": "attention",
        "kind": "attention",
        "label": "Pay attention",
        "title": "The destination matters as much as the source",
        "paragraphs": [
          "Identify source and destination by physical model and capacity. Ensure the destination has space and is on a separate physical device for a failing-drive image. Check a sample of recovered files by opening them."
        ],
        "bullets": []
      },
      {
        "id": "stop",
        "kind": "stop",
        "label": "Stop here",
        "title": "Stop when the source is worsening or the target is uncertain",
        "paragraphs": [
          "Stop if the drive repeatedly disconnects, makes unusual mechanical noises, or the imaging/recovery destination could be confused with the source. Escalate irreplaceable data to a recovery specialist when further reads could reduce the chance of recovery."
        ],
        "bullets": []
      },
      {
        "id": "success",
        "kind": "success",
        "label": "How to know it worked",
        "title": "Required files open from an independent location",
        "paragraphs": [
          "Verify the specific files the owner asked for, not just a success count. Record missing, damaged, encrypted, or untested items."
        ],
        "bullets": []
      },
      {
        "id": "failure",
        "kind": "failure",
        "label": "If it did not work",
        "title": "Match the failure to the source",
        "paragraphs": [],
        "bullets": [],
        "failures": [
          {
            "when": "A verified backup contains the files",
            "next": "Restore a small sample and use the backup or restore guide before scanning the damaged source."
          },
          {
            "when": "The disk is absent or unstable",
            "next": "Stop repair writes; assess hardware and a controlled imaging or specialist path."
          },
          {
            "when": "The volume is encrypted",
            "next": "Use the owner’s matching key or certificate before attempting file recovery."
          },
          {
            "when": "Recovered files are corrupt or incomplete",
            "next": "Record which files failed and re-evaluate the source, backup versions, and image evidence."
          }
        ]
      },
      {
        "id": "understand",
        "kind": "understand",
        "label": "Understand why",
        "title": "Copy first when the source cannot be trusted",
        "paragraphs": [
          "Recovery tools need readable source data. Each write to a deleted-file source may overwrite remnants; repeated reads of a failing disk may also carry risk."
        ],
        "bullets": []
      },
      {
        "id": "advanced",
        "kind": "advanced",
        "label": "Advanced",
        "title": "Version-specific recovery procedures are pending",
        "paragraphs": [
          "Exact steps for included recovery utilities and imaging tools require installed-version evidence, destination checks, and a tested rollback path."
        ],
        "bullets": []
      }
    ],
    "sources": [
      {
        "label": "Microsoft Windows File Recovery",
        "url": "https://support.microsoft.com/en-us/windows/experience/backup-recovery/windows-file-recovery",
        "status": "verified-source-only",
        "note": "Explains why source use should be minimized and recovery should go to another drive."
      },
      {
        "label": "GNU ddrescue manual",
        "url": "https://www.gnu.org/software/ddrescue/manual/ddrescue_manual.html",
        "status": "verified-source-only",
        "note": "Recommends copying a failing drive before trying repair on the copy."
      },
      {
        "label": "MediCat backup and recovery tools",
        "url": "https://medicatusb.com/docs/",
        "status": "verified-source-only",
        "note": "Lists recovery tools without proving the installed version."
      }
    ],
    "related": [
      "decide-backup",
      "diagnose-unstable",
      "choose-live-environment"
    ]
  },
  {
    "id": "disk-layout",
    "category": "Partitions and disk layout",
    "title": "A disk or partition layout needs attention",
    "eyebrow": "Classify the symptom before choosing a tool",
    "summary": "Distinguish a missing partition, an installation mismatch, a resize request, and a failing disk before changing the table.",
    "risk": "high",
    "evidenceStatus": "concept-verified-procedures-pending-installed-inventory",
    "tags": [
      "partition",
      "GPT",
      "MBR",
      "resize",
      "unallocated",
      "format",
      "Disk Management"
    ],
    "goalPrompt": "Identify the physical disk and desired final layout while preserving data and bootability required by the job.",
    "sections": [
      {
        "id": "recommended",
        "kind": "recommended",
        "label": "Recommended",
        "title": "Draw the current layout before changing it",
        "paragraphs": [
          "Identify the physical disk by model and capacity, then record its partition table, partitions, free space, encryption state, and boot mode. State the requested result in ordinary language."
        ],
        "bullets": [
          "Confirm who authorized the layout change and whether the current data and bootability must survive.",
          "Windows Setup says MBR/GPT: check installer boot mode and the intended Windows installation route before any conversion.",
          "A partition vanished or became RAW: treat it as recovery first, especially if files must survive.",
          "A healthy disk needs a new or resized partition: verify a backup and the exact affected space before choosing a tool."
        ]
      },
      {
        "id": "explain",
        "kind": "explain",
        "label": "Why this action",
        "title": "Partition style is not the same as firmware mode",
        "paragraphs": [
          "GPT and MBR describe a disk’s partition map. UEFI and Legacy describe how the firmware starts software. A mismatch message does not itself prove data must be erased."
        ],
        "bullets": []
      },
      {
        "id": "skip",
        "kind": "skip",
        "label": "Safe to skip",
        "title": "Skip conversion because a button exists",
        "paragraphs": [
          "Do not initialize, clean, convert, or format a disk to silence a warning before the target, purpose, backup, and boot path are clear."
        ],
        "bullets": []
      },
      {
        "id": "attention",
        "kind": "attention",
        "label": "Pay attention",
        "title": "Many tools show several disks at once",
        "paragraphs": [
          "Match model and capacity, not a temporary drive letter or disk number. Check the preview of pending operations before applying anything; partition changes may affect existing data and boot files."
        ],
        "bullets": []
      },
      {
        "id": "stop",
        "kind": "stop",
        "label": "Stop here",
        "title": "Do not rewrite an uncertain or damaged layout",
        "paragraphs": [
          "Stop if the disk is disappearing, important files have no recoverable copy, the selected disk is ambiguous, or the action would remove an EFI, recovery, or customer-data partition outside the approved scope."
        ],
        "bullets": []
      },
      {
        "id": "success",
        "kind": "success",
        "label": "How to know it worked",
        "title": "The new layout and required data both check out",
        "paragraphs": [
          "Verify the intended partitions and capacity, access required files, and boot the intended operating system if bootability was part of the job."
        ],
        "bullets": []
      },
      {
        "id": "failure",
        "kind": "failure",
        "label": "If it did not work",
        "title": "Use the exact failed stage",
        "paragraphs": [],
        "bullets": [],
        "failures": [
          {
            "when": "Windows Setup still rejects the disk",
            "next": "Recheck how the installer was booted and the intended partition style before changing the disk."
          },
          {
            "when": "A partition is missing or RAW",
            "next": "Return to file recovery and avoid formatting the source."
          },
          {
            "when": "The resized system no longer boots",
            "next": "Use the boot route and the recorded pre-change layout; do not make another blind conversion."
          }
        ]
      },
      {
        "id": "understand",
        "kind": "understand",
        "label": "Understand why",
        "title": "A partition map tells tools where data begins and ends",
        "paragraphs": [
          "Changing the map can hide or expose volumes without fixing the files inside them. Booting also depends on firmware entries and system partitions."
        ],
        "bullets": []
      },
      {
        "id": "advanced",
        "kind": "advanced",
        "label": "Advanced",
        "title": "Exact operations wait for a confirmed disk and tool",
        "paragraphs": [
          "The current MediCat image’s partition utilities, versions, and safe rollback behavior are unverified; no button-by-button write procedure is supplied yet."
        ],
        "bullets": []
      }
    ],
    "sources": [
      {
        "label": "MediCat partition tools",
        "url": "https://medicatusb.com/docs/",
        "status": "verified-source-only",
        "note": "Lists partition products; installed paths and versions remain unverified."
      },
      {
        "label": "Microsoft Windows Setup MBR/GPT guidance",
        "url": "https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/windows-setup-installing-using-the-mbr-or-gpt-partition-style?view=windows-11",
        "status": "verified-source-only",
        "note": "Explains the boot-mode and partition-style relationship for Windows Setup."
      }
    ],
    "related": [
      "clean-install-windows",
      "recover-files",
      "windows-will-not-boot"
    ]
  },
  {
    "id": "medicat-not-working",
    "category": "MediCat troubleshooting",
    "title": "MediCat will not boot or a tool fails",
    "eyebrow": "Classify the symptom before choosing a tool",
    "summary": "Find whether the failure is USB detection, Ventoy, a selected image, a missing file, or one program.",
    "risk": "low",
    "evidenceStatus": "concept-verified-procedures-pending-installed-inventory",
    "tags": [
      "Medicat USB",
      "Ventoy",
      "USB boot",
      "black screen",
      "tool crash",
      "missing tool"
    ],
    "goalPrompt": "Get the intended MediCat environment working, or identify the exact failed stage without rebuilding a healthy drive by guesswork.",
    "sections": [
      {
        "id": "recommended",
        "kind": "recommended",
        "label": "Recommended",
        "title": "Identify the first stage that fails",
        "paragraphs": [
          "Record the computer model, boot mode, MediCat version, selected menu item, and exact screen or error. Distinguish a USB that is not detected from Ventoy loading, an image starting, and an application failing inside that image."
        ],
        "bullets": [
          "If the USB is not listed: check the physical connection and one-time boot menu before changing files.",
          "If Ventoy appears but one image fails: record its exact name and try a different known-working image for comparison.",
          "If one tool is missing or crashes: verify it belongs to this MediCat release and whether its files exist before reinstalling the whole drive."
        ]
      },
      {
        "id": "explain",
        "kind": "explain",
        "label": "Why this action",
        "title": "Each stage has a different repair",
        "paragraphs": [
          "A host firmware setting, USB hardware issue, incomplete MediCat copy, incompatible boot image, and portable application dependency do not share one fix."
        ],
        "bullets": []
      },
      {
        "id": "skip",
        "kind": "skip",
        "label": "Safe to skip",
        "title": "Skip a full reinstall until the scope is known",
        "paragraphs": [
          "Do not format or recreate the drive because a single image or application failed. Preserve existing data and any working boot paths."
        ],
        "bullets": []
      },
      {
        "id": "attention",
        "kind": "attention",
        "label": "Pay attention",
        "title": "Verify the physical USB before any installer action",
        "paragraphs": [
          "A MediCat installer or Ventoy operation can change the selected disk. Reconfirm model, capacity, partitions, and backup before accepting a write."
        ],
        "bullets": []
      },
      {
        "id": "stop",
        "kind": "stop",
        "label": "Stop here",
        "title": "Do not overwrite the wrong drive or lose the only copy",
        "paragraphs": [
          "Stop if the target USB identity is uncertain, the drive contains data not backed up elsewhere, or an apparent tool failure may actually be a failing USB device."
        ],
        "bullets": []
      },
      {
        "id": "success",
        "kind": "success",
        "label": "How to know it worked",
        "title": "The same failing path now completes",
        "paragraphs": [
          "Boot the intended image or launch the intended tool on the target computer and verify it performs the needed basic function. A visible Ventoy menu alone is not proof the selected tool works."
        ],
        "bullets": []
      },
      {
        "id": "failure",
        "kind": "failure",
        "label": "If it did not work",
        "title": "Narrow the support case",
        "paragraphs": [],
        "bullets": [],
        "failures": [
          {
            "when": "The USB is never detected",
            "next": "Compare another port and known-working computer, then investigate USB or firmware detection."
          },
          {
            "when": "Ventoy loads but one image fails",
            "next": "Record the exact image, boot mode, error, and whether another image works."
          },
          {
            "when": "A tool is missing",
            "next": "Check the installed release and file inventory before claiming it should be present."
          },
          {
            "when": "A tool starts then crashes",
            "next": "Record its version, dependencies, error, and host details for support."
          }
        ]
      },
      {
        "id": "understand",
        "kind": "understand",
        "label": "Understand why",
        "title": "The USB is a chain of components",
        "paragraphs": [
          "Firmware starts Ventoy; Ventoy loads an image; the image supplies an environment; the program runs inside it. Find the first broken link."
        ],
        "bullets": []
      },
      {
        "id": "advanced",
        "kind": "advanced",
        "label": "Advanced",
        "title": "Avoid undocumented repair of this build",
        "paragraphs": [
          "Exact Ventoy configuration paths and installed image versions on the X10 copy require read-only inventory before a replacement or deployment instruction."
        ],
        "bullets": []
      }
    ],
    "sources": [
      {
        "label": "MediCat troubleshooting guide",
        "url": "https://medicatusb.com/docs/medicat/support/troubleshooting/",
        "status": "verified-source-only",
        "note": "Documents USB boot, black screen, missing tools, and tool-crash categories."
      },
      {
        "label": "MediCat included tools",
        "url": "https://docs.medicat.dev/usb/tools/",
        "status": "verified-source-only",
        "note": "Historical tool catalog, not proof of exact current files."
      }
    ],
    "related": [
      "choose-live-environment",
      "windows-will-not-boot"
    ]
  },
  {
    "id": "not-sure",
    "category": "First diagnosis",
    "title": "I am not sure what the problem is",
    "eyebrow": "Classify the symptom before choosing a tool",
    "summary": "Use one observable symptom and the requested outcome to reach a useful workflow without guessing a tool.",
    "risk": "low",
    "evidenceStatus": "concept-verified-procedures-pending-installed-inventory",
    "tags": [
      "start here",
      "unsure",
      "triage",
      "diagnose",
      "unknown"
    ],
    "goalPrompt": "Find the first repeatable symptom and choose a route that protects the requested outcome.",
    "sections": [
      {
        "id": "recommended",
        "kind": "recommended",
        "label": "Recommended",
        "title": "Describe what you can actually see",
        "paragraphs": [
          "Ask what the person wants to work at the end: files back, access restored, a bootable system, a clean device, or a trustworthy diagnosis. Then observe the first repeatable failure."
        ],
        "bullets": [
          "No power or no firmware screen: start with the boot and hardware layer.",
          "A password or key prompt: use the access route.",
          "Missing files, read errors, or a disappearing disk: use file recovery.",
          "Windows runs but fails or acts suspiciously: use the unstable-system route.",
          "Only MediCat fails: use the MediCat troubleshooting route."
        ]
      },
      {
        "id": "explain",
        "kind": "explain",
        "label": "Why this action",
        "title": "The first symptom narrows the layer",
        "paragraphs": [
          "The same later error can follow several different causes. Starting with observation avoids treating every failure as a Windows or partition problem."
        ],
        "bullets": []
      },
      {
        "id": "skip",
        "kind": "skip",
        "label": "Safe to skip",
        "title": "Skip tool shopping",
        "paragraphs": [
          "You do not need to know which boot image or utility to open until the problem and preservation requirement are clear."
        ],
        "bullets": []
      },
      {
        "id": "attention",
        "kind": "attention",
        "label": "Pay attention",
        "title": "Ask what must survive",
        "paragraphs": [
          "Before changing a disk, account, or installation, confirm the exact target, permission, required data, and acceptable fallback."
        ],
        "bullets": []
      },
      {
        "id": "stop",
        "kind": "stop",
        "label": "Stop here",
        "title": "Stop before a write without a defined goal",
        "paragraphs": [
          "If there is no confirmed target or desired result, keep the work read-only and ask the owner what success looks like."
        ],
        "bullets": []
      },
      {
        "id": "success",
        "kind": "success",
        "label": "How to know it worked",
        "title": "You have a specific route and testable outcome",
        "paragraphs": [
          "The next guide matches the observed symptom, says what to check first, and names an observable success condition."
        ],
        "bullets": []
      },
      {
        "id": "failure",
        "kind": "failure",
        "label": "If it did not work",
        "title": "If no route fits, record the missing fact",
        "paragraphs": [],
        "bullets": [],
        "failures": [
          {
            "when": "Symptoms change between attempts",
            "next": "Record timing, exact screens, and hardware behavior before running another tool."
          },
          {
            "when": "Several problems coexist",
            "next": "Protect required data first, then address the earliest repeatable failure."
          },
          {
            "when": "The owner cannot say what outcome matters",
            "next": "Clarify whether preservation, access, clean reuse, or diagnosis is the priority."
          }
        ]
      },
      {
        "id": "understand",
        "kind": "understand",
        "label": "Understand why",
        "title": "A guide is a decision aid",
        "paragraphs": [
          "The aim is to rule out wrong tools and surface the next useful observation, not to promise one program will fix every problem."
        ],
        "bullets": []
      },
      {
        "id": "advanced",
        "kind": "advanced",
        "label": "Advanced",
        "title": "Tool selection comes after classification",
        "paragraphs": [
          "Open the live-environment guide only when a route calls for an image or utility with a verified capability."
        ],
        "bullets": []
      }
    ],
    "sources": [
      {
        "label": "MediCat overview",
        "url": "https://medicatusb.com/docs/medicat/general/overview/",
        "status": "verified-source-only",
        "note": "Describes broad diagnostic, recovery, and system-tool categories, not job frequency."
      }
    ],
    "related": [
      "identify-password-problem",
      "windows-will-not-boot",
      "recover-files",
      "diagnose-unstable",
      "medicat-not-working"
    ]
  }
];
