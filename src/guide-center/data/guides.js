window.LEARN_MEDICAT_GUIDES = [
  {
    "id": "identify-password-problem",
    "category": "Password and account access",
    "title": "I cannot sign in to Windows",
    "eyebrow": "Access restoration / classify first",
    "summary": "Work out whether the problem is a local password, Microsoft account, PIN, encryption, firmware lock, or managed account before opening a reset tool.",
    "risk": "high",
    "evidenceStatus": "procedure-pending-installed-version-verification",
    "tags": ["password", "PIN", "Microsoft account", "local account", "Lockpick", "BitLocker", "EFS"],
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
    "related": ["decide-backup", "prepare-wipe"]
  },
  {
    "id": "windows-will-not-boot",
    "category": "Boot and startup repair",
    "title": "Windows will not boot",
    "eyebrow": "Diagnose the failed layer before writing",
    "summary": "Separate power, firmware, disk detection, boot mode, partition layout, boot files, and Windows failures before using a repair command.",
    "risk": "high",
    "evidenceStatus": "concept-verified-procedures-pending",
    "tags": ["boot", "BCD", "UEFI", "Legacy", "GPT", "MBR", "EFI", "GRUB", "automatic repair"],
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
    "related": ["choose-live-environment", "clean-install-windows"]
  },
  {
    "id": "choose-live-environment",
    "category": "Live OS and recovery environments",
    "title": "Which environment should I boot?",
    "eyebrow": "Choose by job, not by name",
    "summary": "Decide whether you need Mini Windows, a Linux live/rescue system, an installer, or a dedicated diagnostic image.",
    "risk": "low",
    "evidenceStatus": "routing-principles-verified-images-pending",
    "tags": ["live OS", "WinPE", "Mini Windows", "Linux", "installer", "ISO", "WIM", "VHD"],
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
    "related": ["windows-will-not-boot", "clean-install-windows"]
  },
  {
    "id": "decide-backup",
    "category": "Backup and recovery",
    "title": "Do I even need a backup?",
    "eyebrow": "Protect the outcome, not every byte by default",
    "summary": "Verify what exists only on this device, what is genuinely recoverable elsewhere, and whether a file copy, image, or no extra backup is appropriate.",
    "risk": "medium",
    "evidenceStatus": "workflow-prototype",
    "tags": ["backup", "cloud", "OneDrive", "Google Drive", "iCloud", "clone", "image", "files", "recovery"],
    "goalPrompt": "Spend only the time and storage needed to protect what the owner actually cares about.",
    "sections": [
      {
        "id": "recommended",
        "kind": "recommended",
        "label": "Recommended",
        "title": "Check what would be gone if this device vanished",
        "paragraphs": [
          "Ask the owner what must survive. From another trusted device or the provider's website, verify that current important files and recovery information are actually accessible."
        ],
        "bullets": [
          "Check Desktop, Documents, Pictures, Downloads, local email, browser data, application projects, game saves, and non-obvious folders.",
          "Check password-manager access, passkeys, authenticator accounts, trusted-device prompts, recovery codes, and disk/device recovery keys.",
          "Confirm cloud coverage, recency, exclusions, and the ability to open or download representative files.",
          "Check source-disk health before choosing repeated ordinary copy operations."
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
    "related": ["prepare-wipe", "identify-password-problem"]
  },
  {
    "id": "prepare-wipe",
    "category": "Before destructive work",
    "title": "Prepare to wipe, flash, or reset",
    "eyebrow": "Identity continuity checkpoint",
    "summary": "Confirm the target, accepted data loss, account recovery, passkeys, 2FA, recovery codes, password managers, and encryption keys before the old environment disappears.",
    "risk": "high",
    "evidenceStatus": "workflow-prototype",
    "tags": ["wipe", "flash", "reset", "passkey", "2FA", "authenticator", "recovery codes", "password manager", "BitLocker"],
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
          "Disk/device encryption: retain and verify BitLocker, FileVault, or device-recovery keys."
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
    "related": ["decide-backup", "clean-install-windows"]
  },
  {
    "id": "clean-install-windows",
    "category": "Install and image an OS",
    "title": "Install Windows cleanly",
    "eyebrow": "One sane default path",
    "summary": "Prepare identity and data, boot the installer in the intended mode, select the physical target carefully, and verify the machine boots the new installation rather than the USB.",
    "risk": "high",
    "evidenceStatus": "concept-prototype-version-specific-prompts-pending",
    "tags": ["install", "reinstall", "Windows", "partition", "format", "UEFI", "GPT", "drivers", "product key"],
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
    "related": ["prepare-wipe", "windows-will-not-boot", "decide-backup"]
  }
];
