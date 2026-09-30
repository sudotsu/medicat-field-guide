window.LEARN_MEDICAT_INTAKE = {
  "version": 1,
  "storageKey": "medicat-field-guide-job-v1",
  "coreQuestionIds": [
    "job",
    "target",
    "authority",
    "preservation",
    "identity"
  ],
  "questions": [
    {
      "id": "job",
      "label": "Requested outcome",
      "title": "What result are you responsible for?",
      "prompt": "Choose the requested outcome, not the first tool you planned to open.",
      "options": [
        {
          "id": "sign-in",
          "label": "Restore Windows sign-in",
          "detail": "Classify the credential or lock before changing it.",
          "guide": "identify-password-problem"
        },
        {
          "id": "boot",
          "label": "Make Windows boot again",
          "detail": "Find the last working layer before choosing a repair.",
          "guide": "windows-will-not-boot"
        },
        {
          "id": "live",
          "label": "Choose a live environment",
          "detail": "Select Mini Windows, Linux rescue, an installer, or a dedicated image by job.",
          "guide": "choose-live-environment"
        },
        {
          "id": "backup",
          "label": "Decide what must be backed up",
          "detail": "Separate recoverable cloud data from the only copy of something important.",
          "guide": "decide-backup"
        },
        {
          "id": "wipe",
          "label": "Prepare to wipe, flash, or reset",
          "detail": "Confirm accepted loss and replacement recovery methods before erasing the old environment.",
          "guide": "prepare-wipe"
        },
        {
          "id": "install",
          "label": "Install Windows cleanly",
          "detail": "Align target disk, preservation requirement, firmware mode, and partition layout.",
          "guide": "clean-install-windows"
        }
      ]
    },
    {
      "id": "target",
      "label": "Physical target",
      "title": "Can you identify the exact device and disk?",
      "prompt": "Drive letters and disk numbers can change. Use the physical model, capacity, and partition layout.",
      "options": [
        {
          "id": "confirmed",
          "label": "Yes — model and capacity match",
          "detail": "The intended device and physical disk are unambiguous."
        },
        {
          "id": "unclear",
          "label": "Not yet",
          "detail": "More than one device or disk could plausibly be the target."
        }
      ]
    },
    {
      "id": "authority",
      "label": "Authorization",
      "title": "Is the requested outcome authorized?",
      "prompt": "Confirm who owns or controls the device and what change they asked you to make.",
      "options": [
        {
          "id": "confirmed",
          "label": "Yes — owner and outcome confirmed",
          "detail": "The requested repair, access change, or erase scope is understood."
        },
        {
          "id": "unclear",
          "label": "The authority or requested outcome is unclear",
          "detail": "Inspection can continue, but credential changes and destructive work cannot."
        }
      ]
    },
    {
      "id": "preservation",
      "label": "Data requirement",
      "title": "What has to survive?",
      "prompt": "A clean wipe can accept loss. A preservation job cannot discover afterward that the only copy was local.",
      "options": [
        {
          "id": "must-preserve",
          "label": "Files, settings, or the current installation must survive",
          "detail": "Treat writes, resets, conversions, and reinstall choices as consequential."
        },
        {
          "id": "loss-accepted",
          "label": "A complete erase is accepted",
          "detail": "Nothing on the target is required, or required material is verified elsewhere."
        },
        {
          "id": "undecided",
          "label": "Not decided yet",
          "detail": "The work cannot safely choose between repair, recovery, and erase paths yet."
        }
      ]
    },
    {
      "id": "identity",
      "label": "Recovery identity",
      "title": "Will this device disappear as an authentication method?",
      "prompt": "Check passkeys, authenticator codes, push approvals, recovery codes, password vaults, and encryption keys before wiping or replacing the environment.",
      "options": [
        {
          "id": "safe",
          "label": "Checked — replacements exist or the device holds none",
          "detail": "Recovery was verified from another device, account, or safe copy."
        },
        {
          "id": "at-risk",
          "label": "Yes — something important still depends on this device",
          "detail": "Create and verify replacement access before any destructive action."
        },
        {
          "id": "unknown",
          "label": "Not checked",
          "detail": "Do not treat a file backup as proof that account recovery is covered."
        }
      ]
    }
  ],
  "branchQuestions": {
    "identify-password-problem": {
      "id": "sign-in-state",
      "label": "Sign-in classification",
      "title": "What is actually asking for a credential?",
      "prompt": "The screen and account type decide whether offline password tools are relevant at all.",
      "options": [
        {
          "id": "pin",
          "label": "Windows Hello PIN",
          "detail": "The prompt says PIN or offers Windows Hello sign-in options.",
          "status": "ready",
          "finding": "This is a Windows Hello PIN problem, not automatically a Windows password problem.",
          "next": "Use Sign-in options to confirm whether the account password still works. Use Microsoft's PIN reset path when it is offered.",
          "avoid": [
            "Do not change a local password merely because the PIN failed.",
            "Do not open Lockpick until the underlying account and password state are known."
          ],
          "ignore": [
            "Disk partitioning and boot repair are unrelated while Windows reaches the intended sign-in screen."
          ]
        },
        {
          "id": "local-password",
          "label": "Local Windows account password",
          "detail": "The account is local and Windows reaches its normal sign-in screen.",
          "status": "caution",
          "finding": "A verified local-account recovery route may be relevant, but encryption and data-preservation requirements still matter.",
          "next": "Check built-in recovery paths first: security questions, a password-reset disk, or another authorized administrator. Then use the full sign-in workflow to decide whether a verified Lockpick component is appropriate.",
          "avoid": [
            "Do not treat Microsoft accounts, PINs, BitLocker, EFS, firmware passwords, and local passwords as interchangeable.",
            "Do not try every reset utility until one changes the account database."
          ],
          "ignore": [
            "Online Microsoft-account recovery is not the primary route for a confirmed local account."
          ]
        },
        {
          "id": "microsoft-account",
          "label": "Microsoft account password",
          "detail": "The Windows user signs in with a Microsoft account identity.",
          "status": "ready",
          "finding": "This is an online account-recovery problem before it is an offline password-reset problem.",
          "next": "Use Microsoft's account recovery or password-reset path from another trusted browser or device, then test the recovered account at the Windows sign-in screen.",
          "avoid": [
            "Do not assume an offline local-password change repairs the Microsoft account.",
            "Do not erase the device merely to solve an account recovery problem."
          ],
          "ignore": [
            "Lockpick is not the default route for recovering a Microsoft account."
          ]
        },
        {
          "id": "managed-account",
          "label": "Work, school, or domain-managed account",
          "detail": "An organization controls the account or device policy.",
          "status": "stop",
          "finding": "The responsible organization may control the password, recovery keys, policy, and acceptable repair path.",
          "next": "Use the organization's administrator or IT recovery process and record the exact request before making a local change.",
          "avoid": [
            "Do not bypass organization-managed access with an offline reset tool.",
            "Do not assume the person holding the device controls its account policy."
          ],
          "ignore": [
            "Consumer Microsoft-account and local-account instructions do not replace the organization process."
          ]
        },
        {
          "id": "bitlocker",
          "label": "BitLocker recovery screen",
          "detail": "The screen asks for a 48-digit BitLocker recovery key.",
          "status": "stop",
          "finding": "This is drive-encryption recovery, not a Windows sign-in password prompt.",
          "next": "Record the recovery-key ID and retrieve the matching key from the owner's Microsoft account, work or school account, printout, USB copy, or organization administrator.",
          "avoid": [
            "Do not reset a Windows account and expect that to decrypt the drive.",
            "Do not format or reinstall while preserved encrypted data is still required."
          ],
          "ignore": [
            "PIN reset and ordinary local-password tools are unrelated to the BitLocker recovery-key prompt."
          ]
        },
        {
          "id": "firmware-password",
          "label": "Firmware, BIOS, or UEFI password",
          "detail": "The prompt appears before the operating system starts.",
          "status": "stop",
          "finding": "This is outside the Windows account layer.",
          "next": "Identify the exact manufacturer, model, ownership evidence, and supported service process before attempting firmware-password recovery.",
          "avoid": [
            "Do not use Windows password-reset tools for a firmware prompt.",
            "Do not treat generic board-clearing advice as model-specific evidence."
          ],
          "ignore": [
            "Windows account type does not matter until the firmware permits the operating system to start."
          ]
        },
        {
          "id": "unknown",
          "label": "I do not know yet",
          "detail": "The exact prompt or account type has not been identified.",
          "status": "caution",
          "finding": "The credential layer is still unknown.",
          "next": "Record the exact screen text, when it appears, the available Sign-in options, and whether Windows reaches the intended account.",
          "avoid": [
            "Do not start with Lockpick just because the problem appears to involve signing in.",
            "Do not change credentials until the account and encryption layers are identified."
          ],
          "ignore": [
            "Detailed reset procedures can wait until the prompt is classified."
          ]
        }
      ]
    },
    "windows-will-not-boot": {
      "id": "boot-stage",
      "label": "Last working layer",
      "title": "What is the last thing that still works?",
      "prompt": "Choose the latest confirmed stage, not the error category you suspect.",
      "options": [
        {
          "id": "no-power-display",
          "label": "No reliable power, display, or firmware screen",
          "detail": "The machine does not consistently reach firmware output.",
          "status": "stop",
          "finding": "The failure has not reached the disk or Windows boot chain.",
          "next": "Diagnose power, display path, memory, board, and other hardware before changing partitions or boot files.",
          "avoid": ["Do not run BCD, GPT/MBR, or filesystem repair for a machine that has not reached firmware."],
          "ignore": ["Windows recovery choices can wait until the machine reaches a stable firmware screen."]
        },
        {
          "id": "firmware-no-disk",
          "label": "Firmware opens, but the internal disk is absent",
          "detail": "The device list does not show the expected physical drive.",
          "status": "stop",
          "finding": "Boot files cannot be the first repair while firmware cannot see the disk.",
          "next": "Verify the physical disk, connection, controller mode, power, and storage health before writing to the disk.",
          "avoid": ["Do not rebuild BCD or convert partitions on a disk that is absent or intermittently disconnecting."],
          "ignore": ["The Windows installation state is secondary until the hardware path is stable."]
        },
        {
          "id": "disk-no-entry",
          "label": "The disk is visible, but no intended boot entry appears",
          "detail": "Firmware detects the drive but not the expected operating-system entry.",
          "status": "caution",
          "finding": "Boot mode, partition layout, EFI/System partition, or firmware entry may be the failed layer.",
          "next": "Record UEFI or Legacy boot mode and inspect the partition layout and intended system partition without converting or formatting anything.",
          "avoid": ["Do not convert GPT/MBR merely because the firmware entry is missing."],
          "ignore": ["Windows driver and application repair can wait until the boot entry exists."]
        },
        {
          "id": "boot-manager-error",
          "label": "Windows Boot Manager starts and reports an error",
          "detail": "The system reaches Windows boot files but cannot continue.",
          "status": "caution",
          "finding": "The firmware and at least part of the boot chain are working.",
          "next": "Capture the exact error and inspect the Windows volume, EFI/System partition, and BCD relationship before selecting a repair command.",
          "avoid": ["Do not update firmware or rewrite every boot sector when Windows Boot Manager is already running."],
          "ignore": ["Power-on hardware diagnosis is not the first route unless new hardware symptoms appear."]
        },
        {
          "id": "windows-loop",
          "label": "Windows logo or recovery starts, then loops or fails",
          "detail": "The boot manager hands off to Windows before the failure.",
          "status": "ready",
          "finding": "The failure is probably later than firmware entry and initial boot-manager loading.",
          "next": "Use the exact recovery symptom to check updates, drivers, filesystem state, storage health, and Windows recovery options.",
          "avoid": ["Do not convert partition style or rebuild the entire boot chain without evidence that those layers failed."],
          "ignore": ["Firmware repair can wait while the intended Windows loader starts consistently."]
        },
        {
          "id": "unknown",
          "label": "I have not isolated the stage",
          "detail": "The observations are incomplete or inconsistent.",
          "status": "caution",
          "finding": "The failed layer is not yet known.",
          "next": "Restart once, observe from power-on, and record the last repeatable screen plus whether firmware lists the intended disk.",
          "avoid": ["Do not repair the boot chain before identifying the last layer that still works."],
          "ignore": ["Specific repair commands can wait until the stage is repeatable."]
        }
      ]
    },
    "choose-live-environment": {
      "id": "live-purpose",
      "label": "Environment purpose",
      "title": "What must the live environment do?",
      "prompt": "Choose the environment from the required capability, not from the longest tool list.",
      "options": [
        {
          "id": "windows-tools",
          "label": "Use Windows-oriented portable tools or inspect Windows",
          "detail": "The job depends on Windows files, interfaces, or utilities.",
          "status": "ready",
          "finding": "Mini Windows is the default candidate, subject to the installed browser and tool inventory.",
          "next": "Open the Mini Windows workflow and confirm the exact required tool exists before changing the target.",
          "avoid": ["Do not assume every normal Windows application runs in WinPE."],
          "ignore": ["A Linux shell is unnecessary unless the job specifically benefits from its tools or filesystem support."]
        },
        {
          "id": "disk-recovery",
          "label": "Inspect or image a failing or uncertain disk",
          "detail": "Read stability and preservation matter more than desktop familiarity.",
          "status": "caution",
          "finding": "A verified rescue environment with the required imaging and health tools is the better route.",
          "next": "Use the live-environment guide to choose a read-first rescue workflow and a separate destination disk.",
          "avoid": ["Do not begin with filesystem repair when the disk is disappearing or reporting I/O errors."],
          "ignore": ["Desktop appearance and the number of bundled utilities do not decide recovery suitability."]
        },
        {
          "id": "linux-work",
          "label": "Use Linux filesystems, networking, or command-line recovery",
          "detail": "The required workflow is explicitly Linux-based.",
          "status": "ready",
          "finding": "A Linux rescue/live environment is the direct route.",
          "next": "Choose the verified image containing the required filesystem, network, or recovery tool and confirm the target before mounting read-write.",
          "avoid": ["Do not assume a live Linux session is read-only."],
          "ignore": ["Mini Windows is optional when no Windows-specific tool is required."]
        },
        {
          "id": "install-os",
          "label": "Install or reinstall an operating system",
          "detail": "The required environment is an installer rather than a general rescue desktop.",
          "status": "caution",
          "finding": "Use the intended OS installer after completing the preservation and identity checks.",
          "next": "Continue to the installation workflow and verify target disk, firmware mode, and accepted erase scope.",
          "avoid": ["Do not use a general live desktop as proof that the installer will choose the correct disk or layout."],
          "ignore": ["Most rescue utilities are irrelevant once the authorized outcome is a verified clean installation."]
        },
        {
          "id": "unknown",
          "label": "I only know that I need something bootable",
          "detail": "The required capability has not been identified.",
          "status": "caution",
          "finding": "The environment cannot be selected safely from the current description.",
          "next": "Return to the requested outcome and identify whether the job is access, boot repair, file recovery, imaging, diagnostics, or installation.",
          "avoid": ["Do not choose an image because it contains the most tools."],
          "ignore": ["Image-by-image comparison can wait until the required capability is known."]
        }
      ]
    },
    "decide-backup": {
      "id": "backup-state",
      "label": "Recovery evidence",
      "title": "What is verified outside this device?",
      "prompt": "A sync client icon is not recovery evidence. Check coverage, recency, and access from somewhere else.",
      "options": [
        {
          "id": "verified-elsewhere",
          "label": "Required material is verified elsewhere",
          "detail": "Files and account recovery were checked from another device, provider site, or separate copy.",
          "status": "ready",
          "finding": "A full disk image may be unnecessary if the authorized outcome does not require the current installation, settings, or locally installed applications.",
          "next": "List the small set of material that is not reproducible, then use the full backup guide to choose no extra copy, a file copy, or an image.",
          "avoid": ["Do not create a large image by default when nothing in it is required for recovery."],
          "ignore": ["Caches, reinstallable applications, and verified cloud copies may not need another copy."]
        },
        {
          "id": "local-only",
          "label": "Important material exists only here",
          "detail": "At least one required file, key, profile, or configuration has no verified recovery copy.",
          "status": "stop",
          "finding": "Preservation must happen before repair writes or erasure.",
          "next": "Identify the smallest sufficient backup method and a separate destination before changing the source disk.",
          "avoid": ["Do not reset, format, convert, or run broad repair writes before the required material is copied or imaged."],
          "ignore": ["Reinstallable programs and reproducible downloads can wait while irreplaceable material is secured."]
        },
        {
          "id": "uncertain",
          "label": "Cloud or another backup may exist, but it has not been checked",
          "detail": "Coverage, recency, credentials, or recovery from another device is unknown.",
          "status": "caution",
          "finding": "Backup status is unknown rather than confirmed.",
          "next": "Verify the provider or separate copy from another device and compare it with what must survive locally.",
          "avoid": ["Do not assume that installed Google Drive, iCloud, OneDrive, or another sync client means every required item is recoverable."],
          "ignore": ["A full disk image decision can wait until the recovery gap is known."]
        }
      ]
    },
    "prepare-wipe": {
      "id": "wipe-purpose",
      "label": "Erase purpose",
      "title": "Why is the old environment being removed?",
      "prompt": "The accepted outcome determines what must be proved before the erase begins.",
      "options": [
        {
          "id": "repair-reinstall",
          "label": "Repair through a known clean reinstall or reimage",
          "detail": "The owner wants a usable device and accepts replacement of the current environment.",
          "status": "caution",
          "finding": "Proceed only after required data, account recovery, encryption keys, and the installation source are verified.",
          "next": "Complete the wipe-preparation guide, then continue to the exact installation or flashing workflow.",
          "avoid": ["Do not erase the only working copy of a recovery key, authenticator, passkey, or required file."],
          "ignore": ["Preserving the broken operating-system installation is optional when complete replacement is authorized and recovery is verified."]
        },
        {
          "id": "transfer-disposal",
          "label": "Transfer, return, sale, donation, or disposal",
          "detail": "The device will leave the current owner's control.",
          "status": "caution",
          "finding": "The job includes both recovery preparation and an appropriate data-removal method for the device and handoff context.",
          "next": "Verify required recovery material, remove account/device associations where appropriate, and use a documented erase method matched to the storage and handoff requirement.",
          "avoid": ["Do not treat deleting visible files as equivalent to preparing a device for transfer."],
          "ignore": ["Repairing the existing OS is unnecessary when the authorized result is a properly prepared handoff."]
        },
        {
          "id": "credential-fallback",
          "label": "Erase is the accepted fallback if access cannot be restored",
          "detail": "Preserving the old installation is preferred but not required after recovery options are exhausted.",
          "status": "stop",
          "finding": "The fallback is destructive, so the boundary between attempted recovery and accepted erasure must be explicit.",
          "next": "Finish the sign-in classification and document when the owner accepts moving from recovery to erase.",
          "avoid": ["Do not let an unsuccessful password tool silently turn a preservation attempt into a wipe."],
          "ignore": ["A wipe procedure can wait until the recovery attempt and fallback authorization are clearly separated."]
        },
        {
          "id": "unknown",
          "label": "The reason or accepted result is unclear",
          "detail": "The work request does not yet distinguish repair, recovery, reinstall, or transfer.",
          "status": "stop",
          "finding": "There is no defined success condition for an irreversible action.",
          "next": "Confirm the intended result and accepted losses with the owner before selecting an erase method.",
          "avoid": ["Do not start a wipe because it is the fastest way to make the current problem disappear."],
          "ignore": ["Tool selection can wait until the requested outcome is explicit."]
        }
      ]
    },
    "clean-install-windows": {
      "id": "install-layout",
      "label": "Boot and layout state",
      "title": "What is known about firmware mode and disk layout?",
      "prompt": "UEFI or Legacy describes the boot method. GPT or MBR describes the partition layout.",
      "options": [
        {
          "id": "uefi-gpt",
          "label": "UEFI boot and GPT target are confirmed",
          "detail": "The intended modern installation path and physical target are known.",
          "status": "ready",
          "finding": "The boot method and partition style are aligned for the intended UEFI installation.",
          "next": "Continue through the clean-install guide, re-identify the physical disk in Setup, and remove partitions only within the accepted erase scope.",
          "avoid": ["Do not delete partitions by disk number alone when more than one physical disk is attached."],
          "ignore": ["Legacy/MBR conversion advice is irrelevant when the verified target is an authorized UEFI/GPT clean install."]
        },
        {
          "id": "legacy-mbr",
          "label": "Legacy boot and MBR are intentional",
          "detail": "Older compatibility requirements have been identified and accepted.",
          "status": "caution",
          "finding": "This may be a valid compatibility path, but it should be intentional rather than inherited accidentally.",
          "next": "Confirm the hardware and intended Windows version support the legacy path before retaining it.",
          "avoid": ["Do not convert to GPT or switch firmware mode without checking the compatibility requirement and preservation plan."],
          "ignore": ["UEFI/GPT recommendations are not an automatic command to convert a working required legacy system."]
        },
        {
          "id": "mismatch-error",
          "label": "Windows Setup reports an MBR/GPT mismatch",
          "detail": "Setup rejects the selected disk for the current boot mode.",
          "status": "stop",
          "finding": "The installer boot mode and target partition style are not aligned for the selected installation path.",
          "next": "Confirm whether the intended result is UEFI/GPT or a required Legacy/MBR installation before rebooting or changing the disk.",
          "avoid": ["Do not immediately run DiskPart clean or convert commands; reformatting removes data and the wrong boot mode may be the actual problem."],
          "ignore": ["The error does not by itself prove that firmware is broken or that the disk is failing."]
        },
        {
          "id": "unknown",
          "label": "I do not know the boot mode or partition style",
          "detail": "The installer was started, but its mode and target layout were not recorded.",
          "status": "caution",
          "finding": "The clean-install path is not ready to make a partition-layout decision.",
          "next": "Record how the USB was booted, identify the physical target, and inspect whether it is GPT or MBR before deleting or converting anything.",
          "avoid": ["Do not use a partition error as permission to erase the disk."],
          "ignore": ["Manual partition creation can wait until boot mode and accepted erase scope are known."]
        }
      ]
    }
  }
};
