window.LEARN_MEDICAT_INTAKE = {
  "version": 2,
  "storageKey": "learn-medicat-job-v1",
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
      "label": "Problem or goal",
      "title": "What is happening, or what do you need to do?",
      "prompt": "Choose the closest observable problem or requested result. You can change this later.",
      "options": [
        {
          "id": "sign-in",
          "label": "I cannot sign in or access an account",
          "detail": "A PIN, password, recovery key, or account prompt is in the way.",
          "guide": "identify-password-problem"
        },
        {
          "id": "boot",
          "label": "The computer will not start or boot correctly",
          "detail": "Find whether power, firmware, disk detection, boot files, or the operating system failed.",
          "guide": "windows-will-not-boot",
          "questionIds": [
            "job",
            "target",
            "authority",
            "preservation"
          ]
        },
        {
          "id": "unstable",
          "label": "The computer runs badly or may be infected",
          "detail": "Crashes, freezes, slowness, errors, or suspicious behavior need diagnosis.",
          "guide": "diagnose-unstable",
          "questionIds": [
            "job",
            "target",
            "authority",
            "preservation"
          ]
        },
        {
          "id": "files",
          "label": "Files are missing or a drive may be failing",
          "detail": "Protect the source and choose the right recovery path.",
          "guide": "recover-files",
          "questionIds": [
            "job",
            "target",
            "authority",
            "preservation"
          ]
        },
        {
          "id": "backup",
          "label": "I need to back up, clone, or restore",
          "detail": "Decide what must be saved and where a copy or restore should go.",
          "guide": "decide-backup"
        },
        {
          "id": "install",
          "label": "I need to install or reinstall Windows",
          "detail": "Prepare the target, data, identity, boot mode, and installer path.",
          "guide": "clean-install-windows",
          "destructive": true
        },
        {
          "id": "wipe",
          "label": "I need to wipe, reset, or prepare a device for reuse",
          "detail": "Confirm accepted loss and account recovery before erasing the old environment.",
          "guide": "prepare-wipe",
          "destructive": true
        },
        {
          "id": "disk",
          "label": "I need to inspect or change partitions",
          "detail": "Separate missing data, layout mismatch, and planned resize or format work.",
          "guide": "disk-layout"
        },
        {
          "id": "medicat",
          "label": "MediCat itself will not boot or a tool fails",
          "detail": "Find whether the USB, Ventoy, an image, or one application is failing.",
          "guide": "medicat-not-working",
          "questionIds": [
            "job"
          ]
        },
        {
          "id": "unsure",
          "label": "I am not sure what the problem is",
          "detail": "Use the first repeatable symptom to choose a route.",
          "guide": "not-sure",
          "questionIds": [
            "job"
          ]
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
          "avoid": [
            "Do not run BCD, GPT/MBR, or filesystem repair for a machine that has not reached firmware."
          ],
          "ignore": [
            "Windows recovery choices can wait until the machine reaches a stable firmware screen."
          ]
        },
        {
          "id": "firmware-no-disk",
          "label": "Firmware opens, but the internal disk is absent",
          "detail": "The device list does not show the expected physical drive.",
          "status": "stop",
          "finding": "Boot files cannot be the first repair while firmware cannot see the disk.",
          "next": "Verify the physical disk, connection, controller mode, power, and storage health before writing to the disk.",
          "avoid": [
            "Do not rebuild BCD or convert partitions on a disk that is absent or intermittently disconnecting."
          ],
          "ignore": [
            "The Windows installation state is secondary until the hardware path is stable."
          ]
        },
        {
          "id": "disk-no-entry",
          "label": "The disk is visible, but no intended boot entry appears",
          "detail": "Firmware detects the drive but not the expected operating-system entry.",
          "status": "caution",
          "finding": "Boot mode, partition layout, EFI/System partition, or firmware entry may be the failed layer.",
          "next": "Record UEFI or Legacy boot mode and inspect the partition layout and intended system partition without converting or formatting anything.",
          "avoid": [
            "Do not convert GPT/MBR merely because the firmware entry is missing."
          ],
          "ignore": [
            "Windows driver and application repair can wait until the boot entry exists."
          ]
        },
        {
          "id": "boot-manager-error",
          "label": "Windows Boot Manager starts and reports an error",
          "detail": "The system reaches Windows boot files but cannot continue.",
          "status": "caution",
          "finding": "The firmware and at least part of the boot chain are working.",
          "next": "Capture the exact error and inspect the Windows volume, EFI/System partition, and BCD relationship before selecting a repair command.",
          "avoid": [
            "Do not update firmware or rewrite every boot sector when Windows Boot Manager is already running."
          ],
          "ignore": [
            "Power-on hardware diagnosis is not the first route unless new hardware symptoms appear."
          ]
        },
        {
          "id": "windows-loop",
          "label": "Windows logo or recovery starts, then loops or fails",
          "detail": "The boot manager hands off to Windows before the failure.",
          "status": "ready",
          "finding": "The failure is probably later than firmware entry and initial boot-manager loading.",
          "next": "Use the exact recovery symptom to check updates, drivers, filesystem state, storage health, and Windows recovery options.",
          "avoid": [
            "Do not convert partition style or rebuild the entire boot chain without evidence that those layers failed."
          ],
          "ignore": [
            "Firmware repair can wait while the intended Windows loader starts consistently."
          ]
        },
        {
          "id": "unknown",
          "label": "I have not isolated the stage",
          "detail": "The observations are incomplete or inconsistent.",
          "status": "caution",
          "finding": "The failed layer is not yet known.",
          "next": "Restart once, observe from power-on, and record the last repeatable screen plus whether firmware lists the intended disk.",
          "avoid": [
            "Do not repair the boot chain before identifying the last layer that still works."
          ],
          "ignore": [
            "Specific repair commands can wait until the stage is repeatable."
          ]
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
          "avoid": [
            "Do not assume every normal Windows application runs in WinPE."
          ],
          "ignore": [
            "A Linux shell is unnecessary unless the job specifically benefits from its tools or filesystem support."
          ]
        },
        {
          "id": "disk-recovery",
          "label": "Inspect or image a failing or uncertain disk",
          "detail": "Read stability and preservation matter more than desktop familiarity.",
          "status": "caution",
          "finding": "A verified rescue environment with the required imaging and health tools is the better route.",
          "next": "Use the live-environment guide to choose a read-first rescue workflow and a separate destination disk.",
          "avoid": [
            "Do not begin with filesystem repair when the disk is disappearing or reporting I/O errors."
          ],
          "ignore": [
            "Desktop appearance and the number of bundled utilities do not decide recovery suitability."
          ]
        },
        {
          "id": "linux-work",
          "label": "Use Linux filesystems, networking, or command-line recovery",
          "detail": "The required workflow is explicitly Linux-based.",
          "status": "ready",
          "finding": "A Linux rescue/live environment is the direct route.",
          "next": "Choose the verified image containing the required filesystem, network, or recovery tool and confirm the target before mounting read-write.",
          "avoid": [
            "Do not assume a live Linux session is read-only."
          ],
          "ignore": [
            "Mini Windows is optional when no Windows-specific tool is required."
          ]
        },
        {
          "id": "install-os",
          "label": "Install or reinstall an operating system",
          "detail": "The required environment is an installer rather than a general rescue desktop.",
          "status": "caution",
          "finding": "Use the intended OS installer after completing the preservation and identity checks.",
          "next": "Continue to the installation workflow and verify target disk, firmware mode, and accepted erase scope.",
          "avoid": [
            "Do not use a general live desktop as proof that the installer will choose the correct disk or layout."
          ],
          "ignore": [
            "Most rescue utilities are irrelevant once the authorized outcome is a verified clean installation."
          ]
        },
        {
          "id": "unknown",
          "label": "I only know that I need something bootable",
          "detail": "The required capability has not been identified.",
          "status": "caution",
          "finding": "The environment cannot be selected safely from the current description.",
          "next": "Return to the requested outcome and identify whether the job is access, boot repair, file recovery, imaging, diagnostics, or installation.",
          "avoid": [
            "Do not choose an image because it contains the most tools."
          ],
          "ignore": [
            "Image-by-image comparison can wait until the required capability is known."
          ]
        }
      ]
    },
    "decide-backup": {
      "id": "copy-purpose",
      "label": "Copy or restore purpose",
      "title": "What do you need the copy to do?",
      "prompt": "A file copy, image, clone, and restore have different source and destination risks.",
      "options": [
        {
          "id": "files",
          "label": "Keep or move selected files",
          "detail": "The goal is a recoverable copy of specific material.",
          "status": "caution",
          "finding": "A file copy may be sufficient if the source is healthy.",
          "next": "List required files, choose a separate destination, copy, then open sample files from the destination.",
          "avoid": [
            "Do not mistake a copied folder name for verified recovery."
          ],
          "ignore": [
            "A full-disk image may be unnecessary."
          ]
        },
        {
          "id": "image",
          "label": "Image or clone a healthy computer",
          "detail": "The goal is full-system rollback or migration.",
          "status": "caution",
          "finding": "The destination needs enough capacity and must be identified independently.",
          "next": "Choose image versus direct clone by the restore goal, then verify source, destination, and a restore sample before writing.",
          "avoid": [
            "Do not select a destination by drive letter alone."
          ],
          "ignore": [
            "File-by-file recovery tools are unrelated unless source data is missing."
          ]
        },
        {
          "id": "restore",
          "label": "Restore or overwrite a disk from a backup",
          "detail": "The destination will be changed.",
          "status": "stop",
          "finding": "A restore may erase the selected physical disk.",
          "next": "Verify the backup opens, confirm the physical target and accepted erase scope, then use a verified restore procedure.",
          "avoid": [
            "Do not restore onto an ambiguous disk or the only good backup."
          ],
          "ignore": [
            "Creating another backup format can wait if the existing one is verified."
          ],
          "destructive": true
        },
        {
          "id": "decide",
          "label": "I am deciding whether a backup is needed",
          "detail": "The outcome and existing copies need checking.",
          "status": "caution",
          "finding": "Backup scope depends on what cannot be recovered elsewhere.",
          "next": "Verify important files, keys, and account access from another device before choosing no copy, files, or image.",
          "avoid": [
            "Do not infer backup coverage from a sync icon."
          ],
          "ignore": [
            "A full image may be skipped when it protects no requested outcome."
          ]
        },
        {
          "id": "failing",
          "label": "The source drive may be failing",
          "detail": "Read errors or disconnects are present.",
          "status": "stop",
          "finding": "Normal copying may not be the best first move.",
          "next": "Open file recovery and assess imaging the source before repair.",
          "avoid": [
            "Do not run a filesystem fix or clone to an uncertain destination."
          ],
          "ignore": [
            "Routine backup scheduling can wait."
          ],
          "nextGuide": "recover-files"
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
          "avoid": [
            "Do not erase the only working copy of a recovery key, authenticator, passkey, or required file."
          ],
          "ignore": [
            "Preserving the broken operating-system installation is optional when complete replacement is authorized and recovery is verified."
          ]
        },
        {
          "id": "transfer-disposal",
          "label": "Transfer, return, sale, donation, or disposal",
          "detail": "The device will leave the current owner's control.",
          "status": "caution",
          "finding": "The job includes both recovery preparation and an appropriate data-removal method for the device and handoff context.",
          "next": "Verify required recovery material, remove account/device associations where appropriate, and use a documented erase method matched to the storage and handoff requirement.",
          "avoid": [
            "Do not treat deleting visible files as equivalent to preparing a device for transfer."
          ],
          "ignore": [
            "Repairing the existing OS is unnecessary when the authorized result is a properly prepared handoff."
          ]
        },
        {
          "id": "credential-fallback",
          "label": "Erase is the accepted fallback if access cannot be restored",
          "detail": "Preserving the old installation is preferred but not required after recovery options are exhausted.",
          "status": "stop",
          "finding": "The fallback is destructive, so the boundary between attempted recovery and accepted erasure must be explicit.",
          "next": "Finish the sign-in classification and document when the owner accepts moving from recovery to erase.",
          "avoid": [
            "Do not let an unsuccessful password tool silently turn a preservation attempt into a wipe."
          ],
          "ignore": [
            "A wipe procedure can wait until the recovery attempt and fallback authorization are clearly separated."
          ]
        },
        {
          "id": "unknown",
          "label": "The reason or accepted result is unclear",
          "detail": "The work request does not yet distinguish repair, recovery, reinstall, or transfer.",
          "status": "stop",
          "finding": "There is no defined success condition for an irreversible action.",
          "next": "Confirm the intended result and accepted losses with the owner before selecting an erase method.",
          "avoid": [
            "Do not start a wipe because it is the fastest way to make the current problem disappear."
          ],
          "ignore": [
            "Tool selection can wait until the requested outcome is explicit."
          ]
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
          "avoid": [
            "Do not delete partitions by disk number alone when more than one physical disk is attached."
          ],
          "ignore": [
            "Legacy/MBR conversion advice is irrelevant when the verified target is an authorized UEFI/GPT clean install."
          ]
        },
        {
          "id": "legacy-mbr",
          "label": "Legacy boot and MBR are intentional",
          "detail": "Older compatibility requirements have been identified and accepted.",
          "status": "caution",
          "finding": "This may be a valid compatibility path, but it should be intentional rather than inherited accidentally.",
          "next": "Confirm the hardware and intended Windows version support the legacy path before retaining it.",
          "avoid": [
            "Do not convert to GPT or switch firmware mode without checking the compatibility requirement and preservation plan."
          ],
          "ignore": [
            "UEFI/GPT recommendations are not an automatic command to convert a working required legacy system."
          ]
        },
        {
          "id": "mismatch-error",
          "label": "Windows Setup reports an MBR/GPT mismatch",
          "detail": "Setup rejects the selected disk for the current boot mode.",
          "status": "stop",
          "finding": "The installer boot mode and target partition style are not aligned for the selected installation path.",
          "next": "Confirm whether the intended result is UEFI/GPT or a required Legacy/MBR installation before rebooting or changing the disk.",
          "avoid": [
            "Do not immediately run DiskPart clean or convert commands; reformatting removes data and the wrong boot mode may be the actual problem."
          ],
          "ignore": [
            "The error does not by itself prove that firmware is broken or that the disk is failing."
          ]
        },
        {
          "id": "unknown",
          "label": "I do not know the boot mode or partition style",
          "detail": "The installer was started, but its mode and target layout were not recorded.",
          "status": "caution",
          "finding": "The clean-install path is not ready to make a partition-layout decision.",
          "next": "Record how the USB was booted, identify the physical target, and inspect whether it is GPT or MBR before deleting or converting anything.",
          "avoid": [
            "Do not use a partition error as permission to erase the disk."
          ],
          "ignore": [
            "Manual partition creation can wait until boot mode and accepted erase scope are known."
          ]
        }
      ]
    },
    "diagnose-unstable": {
      "id": "symptom-pattern",
      "label": "Observed symptom",
      "title": "Which symptom can you repeat?",
      "prompt": "The first repeatable failure determines the first diagnostic route.",
      "options": [
        {
          "id": "disk-errors",
          "label": "The drive disappears or reports read errors",
          "detail": "Storage may be failing.",
          "status": "stop",
          "finding": "Required data may be at risk.",
          "next": "Open file recovery and protect the source before repair or stress testing.",
          "avoid": [
            "Do not run filesystem repair or heavy benchmarks on the only copy."
          ],
          "ignore": [
            "Scanner and performance tuning can wait."
          ],
          "nextGuide": "recover-files"
        },
        {
          "id": "crashes",
          "label": "The system crashes, freezes, or shows a stop error",
          "detail": "The failure repeats during normal use.",
          "status": "caution",
          "finding": "The cause could be hardware, driver, update, or software.",
          "next": "Record the exact error and when it occurs, then choose one read-first diagnostic matched to the stage.",
          "avoid": [
            "Do not reinstall or change firmware before checking the evidence."
          ],
          "ignore": [
            "Unrelated portable utilities can wait."
          ]
        },
        {
          "id": "slow",
          "label": "It is slow, hot, or noisy",
          "detail": "Performance is the main complaint.",
          "status": "caution",
          "finding": "A single symptom does not identify the failing component.",
          "next": "Record temperature, storage, memory, and process observations with verified tools before changing anything.",
          "avoid": [
            "Do not run every cleaner or stress test by default."
          ],
          "ignore": [
            "Boot repair can wait if the operating system starts consistently."
          ]
        },
        {
          "id": "suspicious",
          "label": "There may be malware or unwanted software",
          "detail": "Unexpected software, redirects, or alerts are visible.",
          "status": "caution",
          "finding": "The suspicious behavior needs a verified finding.",
          "next": "Preserve the report and use a verified non-Defender scanner in report-only mode.",
          "avoid": [
            "Do not allow automatic delete, quarantine, or repair."
          ],
          "ignore": [
            "Partition conversion is unrelated to a software finding."
          ]
        },
        {
          "id": "unknown",
          "label": "The symptom is inconsistent",
          "detail": "There is no repeatable first failure yet.",
          "status": "caution",
          "finding": "The failed layer is not known.",
          "next": "Record the earliest screen, error, and timing across one controlled retry.",
          "avoid": [
            "Do not make broad changes to chase an intermittent report."
          ],
          "ignore": [
            "Tool selection can wait for a repeatable observation."
          ]
        }
      ]
    },
    "recover-files": {
      "id": "loss-pattern",
      "label": "Data-loss pattern",
      "title": "What happened to the files or drive?",
      "prompt": "Classify the source before attempting recovery.",
      "options": [
        {
          "id": "deleted",
          "label": "Files were deleted from a readable drive",
          "detail": "The source still works.",
          "status": "caution",
          "finding": "Continued use could overwrite recoverable data.",
          "next": "Minimize source use, check existing backups, and recover to another physical destination.",
          "avoid": [
            "Do not install recovery software or save output on the source."
          ],
          "ignore": [
            "Disk repair is not the first step for a deletion."
          ],
          "nextGuide": "recover-files"
        },
        {
          "id": "read-errors",
          "label": "The drive disconnects or has read errors",
          "detail": "Hardware or media may be failing.",
          "status": "stop",
          "finding": "The source may worsen under ordinary repair writes or repeated scans.",
          "next": "Use the recovery guide to assess controlled imaging and a separate destination.",
          "avoid": [
            "Do not initialize, format, or run filesystem repair on the source."
          ],
          "ignore": [
            "Clean installation can wait."
          ],
          "nextGuide": "recover-files"
        },
        {
          "id": "encrypted",
          "label": "The volume asks for an encryption key",
          "detail": "Files cannot be read without the matching key or certificate.",
          "status": "stop",
          "finding": "A recovery utility cannot replace the required key.",
          "next": "Find the owner’s matching recovery key or certificate before trying other data recovery.",
          "avoid": [
            "Do not reset passwords or format the drive expecting decryption."
          ],
          "ignore": [
            "File carving can wait until authorized decryption is resolved."
          ]
        },
        {
          "id": "backup",
          "label": "A verified backup has the missing files",
          "detail": "Another copy exists and opens.",
          "status": "ready",
          "finding": "Restore from the verified copy may be the simplest route.",
          "next": "Open the backup guide and restore a small sample to an independent location first.",
          "avoid": [
            "Do not overwrite the only good backup or the damaged source."
          ],
          "ignore": [
            "A full scan of the source may be unnecessary."
          ],
          "nextGuide": "decide-backup"
        },
        {
          "id": "unknown",
          "label": "I do not know whether the source is healthy",
          "detail": "The loss is not yet classified.",
          "status": "caution",
          "finding": "Recovery method cannot be chosen safely yet.",
          "next": "Identify the source and check whether it is stable and whether a verified copy exists elsewhere.",
          "avoid": [
            "Do not write to an uncertain source."
          ],
          "ignore": [
            "Tool comparison can wait."
          ]
        }
      ]
    },
    "disk-layout": {
      "id": "layout-problem",
      "label": "Disk layout problem",
      "title": "What prompted the partition work?",
      "prompt": "The answer decides whether this is installation, recovery, or planned space management.",
      "options": [
        {
          "id": "setup-mismatch",
          "label": "Windows Setup mentions MBR or GPT",
          "detail": "The installer rejects the selected disk.",
          "status": "caution",
          "finding": "Installer boot mode and target layout need checking.",
          "next": "Open the Windows install guide; record the boot mode and physical target before conversion.",
          "avoid": [
            "Do not run DiskPart clean merely because Setup offers an error."
          ],
          "ignore": [
            "Partition recovery can wait if no data is missing."
          ],
          "nextGuide": "clean-install-windows"
        },
        {
          "id": "resize",
          "label": "I need to create, resize, or move partitions",
          "detail": "The existing layout will change.",
          "status": "caution",
          "finding": "A partition write may affect required data or boot files.",
          "next": "Record the layout and verify a separate recovery copy before using a version-verified partition tool.",
          "avoid": [
            "Do not apply pending operations to an unconfirmed disk."
          ],
          "ignore": [
            "Boot repair can wait if the current system starts normally."
          ],
          "destructive": true
        },
        {
          "id": "raw",
          "label": "A partition is missing, RAW, or unreadable",
          "detail": "Existing data may still be required.",
          "status": "stop",
          "finding": "This is a recovery problem before a formatting task.",
          "next": "Open the file-recovery route and protect the source.",
          "avoid": [
            "Do not initialize or format the partition to make it visible."
          ],
          "ignore": [
            "New partition creation can wait."
          ],
          "nextGuide": "recover-files"
        },
        {
          "id": "drive-absent",
          "label": "The physical disk is not detected",
          "detail": "Firmware or tools cannot see the disk consistently.",
          "status": "stop",
          "finding": "A partition utility cannot repair a disk that is absent.",
          "next": "Check connection and storage health, then use the recovery route if required files are at risk.",
          "avoid": [
            "Do not create a partition on another disk by mistake."
          ],
          "ignore": [
            "GPT and MBR advice can wait."
          ],
          "nextGuide": "recover-files"
        },
        {
          "id": "unknown",
          "label": "I am unsure what change is needed",
          "detail": "The final layout has not been defined.",
          "status": "caution",
          "finding": "There is no safe write plan yet.",
          "next": "Record the current disk map and the desired outcome before selecting a tool.",
          "avoid": [
            "Do not click initialize, format, or convert speculatively."
          ],
          "ignore": [
            "Advanced partition operations can wait."
          ]
        }
      ]
    },
    "medicat-not-working": {
      "id": "medicat-stage",
      "label": "MediCat failure stage",
      "title": "Where does MediCat stop working?",
      "prompt": "The first failed stage narrows the next check.",
      "options": [
        {
          "id": "usb-absent",
          "label": "The USB does not appear in the boot menu",
          "detail": "Firmware never offers it as a boot choice.",
          "status": "caution",
          "finding": "The failure precedes Ventoy and every MediCat tool.",
          "next": "Check the physical USB, port, and firmware boot menu on a known-working computer.",
          "avoid": [
            "Do not reinstall MediCat before confirming the USB is detectable."
          ],
          "ignore": [
            "Individual tool versions are irrelevant at this stage."
          ]
        },
        {
          "id": "ventoy-fails",
          "label": "Ventoy appears, but one selected image fails",
          "detail": "The menu loads before the failure.",
          "status": "caution",
          "finding": "The USB boot path works at least through Ventoy.",
          "next": "Record the exact image and error; compare a known-working image without modifying the drive.",
          "avoid": [
            "Do not format the whole USB for one failing image."
          ],
          "ignore": [
            "PortableApps troubleshooting can wait."
          ]
        },
        {
          "id": "tool-missing",
          "label": "Mini Windows boots, but a tool is missing or crashes",
          "detail": "The environment loads.",
          "status": "caution",
          "finding": "The failure may be the copied files, version, or tool dependency.",
          "next": "Confirm the installed MediCat version and whether the exact tool files exist before replacing anything.",
          "avoid": [
            "Do not assume every historical catalog item is included."
          ],
          "ignore": [
            "USB boot-order changes are unrelated once Mini Windows starts."
          ]
        },
        {
          "id": "one-computer",
          "label": "MediCat works elsewhere but not on this computer",
          "detail": "The failure depends on the host.",
          "status": "caution",
          "finding": "Host boot mode or hardware compatibility may be involved.",
          "next": "Record the host model, boot mode, last visible stage, and working comparison.",
          "avoid": [
            "Do not overwrite a working USB without host-specific evidence."
          ],
          "ignore": [
            "A complete reinstall can wait."
          ]
        },
        {
          "id": "unknown",
          "label": "The failure stage is unclear",
          "detail": "There is no exact screen or error yet.",
          "status": "caution",
          "finding": "The first failing component is unknown.",
          "next": "Try one controlled boot and record USB detection, Ventoy, selected image, and program stage.",
          "avoid": [
            "Do not alter the drive to chase an undocumented symptom."
          ],
          "ignore": [
            "Version-specific fixes can wait."
          ]
        }
      ]
    },
    "not-sure": {
      "id": "first-symptom",
      "label": "First symptom",
      "title": "What is the first thing you can observe?",
      "prompt": "Choose the closest observation even if the cause is unknown.",
      "options": [
        {
          "id": "no-start",
          "label": "The computer never reaches a stable firmware or Windows screen",
          "detail": "Power, display, or startup fails.",
          "status": "caution",
          "finding": "Start with the earliest boot or hardware layer.",
          "next": "Open the boot workflow and record the last repeatable screen.",
          "avoid": [
            "Do not start with password or partition tools."
          ],
          "ignore": [
            "Application repair can wait."
          ],
          "nextGuide": "windows-will-not-boot"
        },
        {
          "id": "prompt",
          "label": "A sign-in, password, PIN, or recovery-key prompt appears",
          "detail": "An access layer is visible.",
          "status": "caution",
          "finding": "Classify the exact prompt before changing credentials.",
          "next": "Open the account-access workflow and copy the exact prompt text.",
          "avoid": [
            "Do not assume every prompt is a Windows local password."
          ],
          "ignore": [
            "Boot repair can wait if the sign-in screen appears."
          ],
          "nextGuide": "identify-password-problem"
        },
        {
          "id": "data",
          "label": "Files are missing or a disk acts unreliable",
          "detail": "Required data may be at risk.",
          "status": "caution",
          "finding": "Preservation takes priority over repair writes.",
          "next": "Open file recovery and identify the source and any existing backup.",
          "avoid": [
            "Do not format or run broad repair writes."
          ],
          "ignore": [
            "Clean installation can wait."
          ],
          "nextGuide": "recover-files"
        },
        {
          "id": "running",
          "label": "Windows runs but is slow, unstable, or suspicious",
          "detail": "The system reaches a usable session.",
          "status": "caution",
          "finding": "Diagnosis should follow the repeatable symptom.",
          "next": "Open the unstable-system route and record timing and exact errors.",
          "avoid": [
            "Do not reinstall or clean automatically."
          ],
          "ignore": [
            "Boot-record repair can wait."
          ],
          "nextGuide": "diagnose-unstable"
        },
        {
          "id": "toolkit",
          "label": "Only MediCat or one included tool fails",
          "detail": "The target computer may be otherwise usable.",
          "status": "caution",
          "finding": "The toolkit has its own failure path.",
          "next": "Open MediCat troubleshooting and identify the first failed stage.",
          "avoid": [
            "Do not change the internal disk to fix a USB tool failure."
          ],
          "ignore": [
            "Windows account recovery can wait."
          ],
          "nextGuide": "medicat-not-working"
        },
        {
          "id": "rebuild",
          "label": "The goal is a clean installation or device handoff",
          "detail": "No single failure is the reason.",
          "status": "caution",
          "finding": "The desired final state determines preservation and erase checks.",
          "next": "Open the install workflow, or the wipe-preparation guide if no new OS is needed.",
          "avoid": [
            "Do not erase before the target and accepted loss are clear."
          ],
          "ignore": [
            "Crash diagnosis may be unnecessary when replacement is authorized."
          ],
          "nextGuide": "clean-install-windows"
        },
        {
          "id": "unknown",
          "label": "I cannot describe a stable symptom or goal yet",
          "detail": "Observations or owner instructions are missing.",
          "status": "caution",
          "finding": "The next step is to collect a clear observation.",
          "next": "Ask what success looks like and record the earliest repeatable screen or error.",
          "avoid": [
            "Do not run a repair utility by guesswork."
          ],
          "ignore": [
            "Tool selection can wait."
          ]
        }
      ]
    }
  }
};
