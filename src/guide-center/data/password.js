window.LEARN_MEDICAT_PASSWORD = {
  "title": "Password and access recovery",
  "summary": "Identify the lock on the screen, then take the smallest authorized step that preserves the requested data and account access.",
  "paths": [
    {
      "id": "pin",
      "label": "Windows asks for a PIN",
      "clue": "Windows reaches the user sign-in screen and the entry says PIN or Windows Hello.",
      "first": "Select Sign-in options and try the account password if it is known. If I forgot my PIN appears, follow that recovery route for the selected account.",
      "steps": [
        "Confirm which Windows user is selected and whether the prompt says PIN rather than password.",
        "If I forgot my PIN is shown, use it and complete the account verification. Microsoft says this sign-in-screen option is for Microsoft accounts, not local accounts.",
        "If that option is absent, use Sign-in options to try the account password. After a successful sign-in, reset the PIN in Settings > Accounts > Sign-in options."
      ],
      "medicat": "A PIN problem alone does not call for Lockpick. The account password and the Windows Hello PIN are different credentials.",
      "stop": "If the password is also unknown, classify the underlying account as local, personal Microsoft, or work/school before choosing another path.",
      "verify": "The intended user signs in and can create and use a new PIN; any requested protected files still open.",
      "sources": [{"label":"Microsoft PIN reset","url":"https://support.microsoft.com/en-us/windows/security/change-or-reset-your-pin-in-windows"}]
    },
    {
      "id": "local-password",
      "label": "Local Windows password is forgotten",
      "clue": "Windows reaches a local user account's password screen; this is not a PIN, email-based account, or encryption-key prompt.",
      "first": "Use the local account's built-in recovery route before considering an offline credential change.",
      "steps": [
        "Confirm the device, Windows installation, exact user, authorization, and which files or settings must survive.",
        "At the password sign-in screen, check Reset password and answer the account's security questions if they were configured. Use an existing password-reset disk if one was created for this account.",
        "If another authorized administrator can sign in, use Microsoft's documented local-account reset route from that account, after checking the effect on protected material.",
        "If those routes fail, check BitLocker and EFS or other protected-data dependencies, preserve what can be verified, and only then evaluate the installed Lockpick component for this exact local account."
      ],
      "medicat": "The supplied Lockpick photo shows local-account recovery utilities including PCUnlocker v5.6 and ntpwedit v0.7. An offline local-account change is a later option, not a way to decrypt BitLocker or recover online accounts. The launcher labels are visible; executable builds, selected target, and real write behavior remain unverified.",
      "stop": "Stop before an offline change if the disk is encrypted and the key is unavailable, EFS files or saved credentials must survive but their recovery path is unknown, the account or installation is ambiguous, or the owner did not authorize a credential change.",
      "verify": "The intended account signs in after a normal boot, and the specific files, encrypted items, applications, and account services the owner requested still work. Record any item that was not tested.",
      "sources": [
        {"label":"Microsoft local-account recovery","url":"https://support.microsoft.com/en-us/windows/security/change-or-reset-your-local-account-password-in-windows"},
        {"label":"MediCat v21.12 historical Lockpick changelog","url":"https://docs.medicat.dev/usb/changelog/"}
      ]
    },
    {
      "id": "microsoft-account",
      "label": "Personal Microsoft account",
      "clue": "The Windows user signs in with a personal Microsoft email address or the Microsoft account itself is inaccessible.",
      "first": "Have the owner use Microsoft's password reset or sign-in helper from a trusted device or browser.",
      "steps": [
        "Confirm this is a personal Microsoft account, not a work or school identity or a local account with an email-like display name.",
        "Use I forgot my password at Windows sign-in when offered, or Microsoft's account recovery route from another trusted device.",
        "Complete account verification with the owner's approved recovery methods, then test the recovered account at the Windows sign-in screen."
      ],
      "medicat": "Lockpick cannot reset the Microsoft online account or replace its verification methods. Use the account recovery path first.",
      "stop": "If recovery methods are unavailable, do not promise a local password utility will recover the cloud account, OneDrive, or account-bound secrets. Keep the existing installation intact while the owner works through official recovery.",
      "verify": "The owner can sign in to the Microsoft account and the intended Windows profile, then access the requested synced data and services.",
      "sources": [{"label":"Microsoft account password recovery","url":"https://support.microsoft.com/en-us/accounts-billing/security/change-or-reset-your-microsoft-account-password-in-windows"}]
    },
    {
      "id": "managed-account",
      "label": "Work or school account",
      "clue": "The device or sign-in belongs to an employer, school, domain, or managed organization.",
      "first": "Use the organization's self-service reset if enabled, or contact its administrator with the exact device and account issue.",
      "steps": [
        "Identify the organization and whether the user is authorized to request recovery for this device and account.",
        "If the organization offers Microsoft work/school self-service reset, use its supported verification process.",
        "If self-service reset is unavailable or policy blocks it, involve the organization's administrator before any local credential or disk change."
      ],
      "medicat": "An offline local reset does not change the organization's online identity, domain policy, or recovery-key custody.",
      "stop": "Do not use Lockpick to bypass managed access or assume physical possession authorizes a policy change.",
      "verify": "The organization-approved sign-in works and required device policy, files, and services remain available.",
      "sources": [{"label":"Microsoft work or school password reset","url":"https://support.microsoft.com/en-us/accounts-billing/work-school/reset-your-microsoft-work-or-school-account-password-using-security-info"}]
    },
    {
      "id": "bitlocker",
      "label": "BitLocker recovery key requested",
      "clue": "Before normal Windows sign-in, the screen requests a 48-digit recovery key and shows a recovery-key ID.",
      "first": "Record the recovery-key ID and locate the matching key through the owner's account, organization, printout, or saved USB copy.",
      "steps": [
        "Read the key ID shown on the recovery screen; compare it with the ID on any saved recovery key.",
        "Check the owner's Microsoft account, work or school account, printed copy, or saved USB copy using Microsoft's official instructions.",
        "Use only the matching key to unlock the drive. Then identify why recovery was triggered before changing firmware, boot configuration, or the disk again."
      ],
      "medicat": "Lockpick and Windows local-password resets do not decrypt a BitLocker volume. Without the matching recovery key, the protected data remains unavailable.",
      "stop": "Do not format, reset, reinstall, or change credentials while the owner still needs the encrypted data and the key has not been found.",
      "verify": "The matching key unlocks the intended volume and the required files open after a normal boot.",
      "sources": [{"label":"Microsoft BitLocker recovery key","url":"https://support.microsoft.com/en-us/windows/security/encryption/find-your-bitlocker-recovery-key"}]
    },
    {
      "id": "firmware-password",
      "label": "Password appears before Windows",
      "clue": "A BIOS, UEFI, drive, or power-on password appears before the Windows sign-in screen.",
      "first": "Identify the manufacturer, exact model, prompt text, and ownership record. Use the manufacturer's authorized service process.",
      "steps": [
        "Record when the prompt appears and whether it identifies firmware setup, drive security, or Windows Boot Manager.",
        "Confirm the model and authorization with the owner or organization.",
        "Find that model's official recovery or service route before attempting changes."
      ],
      "medicat": "Windows password tools inside MediCat do not remove firmware or drive security passwords.",
      "stop": "Do not try generic board-clearing instructions or Windows password resets as a substitute for model-specific service guidance.",
      "verify": "The owner can boot through the formerly blocked stage, and the original disk and data remain accessible.",
      "sources": [{"label":"MediCat historical password-tool category","url":"https://docs.medicat.dev/usb/tools/"}]
    },
    {
      "id": "protected-data",
      "label": "Login works, but protected data does not",
      "clue": "The desktop opens, yet encrypted files, a password vault, saved credentials, or an account-linked service remain inaccessible.",
      "first": "Identify the specific protected item and its original account, key, certificate, or vault recovery requirement.",
      "steps": [
        "List the specific files or services that fail and the exact error. Identify whether BitLocker, EFS, a password manager, or an online account protects them.",
        "Check the owner's preserved recovery key, EFS certificate, vault recovery material, or account recovery method as appropriate.",
        "Verify access to a sample of the requested material before claiming the job is complete."
      ],
      "medicat": "Another password reset is unlikely to solve missing encryption keys or application secrets and can complicate recovery.",
      "stop": "Stop changing credentials until the protection layer and available recovery material are known.",
      "verify": "The exact protected items requested by the owner open from the intended account; untested items are explicitly listed.",
      "sources": [
        {"label":"Microsoft BitLocker recovery key","url":"https://support.microsoft.com/en-us/windows/security/encryption/find-your-bitlocker-recovery-key"},
        {"label":"Microsoft EFS file and certificate migration","url":"https://learn.microsoft.com/en-us/windows/deployment/usmt/usmt-migrate-efs-files-and-certificates"}
      ]
    },
    {
      "id": "unknown",
      "label": "I do not know which lock this is",
      "clue": "The prompt or account type is unclear, or more than one kind of access failure is present.",
      "first": "Record the exact screen wording and when it appears. Use those observations to choose one of the paths above.",
      "steps": [
        "Note whether the prompt appears before Windows starts, at the Windows user screen, or after the desktop opens.",
        "Record the words PIN, password, recovery key, work/school, or a manufacturer name if present. Do not record the secret itself.",
        "Check which account and Windows installation are selected, then return to the matching path."
      ],
      "medicat": "Do not start a password tool until the failed protection layer is identified.",
      "stop": "If the owner, target, or preservation requirement is unclear, pause before any credential or disk change.",
      "verify": "The prompt has been classified and a specific recovery path can be chosen without guessing.",
      "sources": [{"label":"Microsoft Windows account access overview","url":"https://support.microsoft.com/en-US/accounts-billing/security/user-account-access-in-windows"}]
    }
  ],
  "environment": [
    {
      "title": "Launcher and desktop",
      "text": "Lockpick boots to a Windows-like live recovery desktop. The MInstAll window is the password-tool launcher; the Start menu also contains ordinary WinPE utilities. The photos show a booted environment, not a Windows installation on the target disk."
    },
    {
      "title": "If the Windows drive is missing",
      "text": "The photographed Start > Accessories > Drivers_PE menu contains Device Manager, Driver All WinPE, Install_drv (7z,Cab,Wim), and LoadVgaDriver. These are environment support tools. First check whether Disk Management and Device Manager can see the target device; driver loading and controller-mode changes need model-specific evidence."
    },
    {
      "title": "Other system tools",
      "text": "The visible portion of Start > System Tools includes Computer Management, Disk Management, Registry Editor, Remote Registry Edit, BcdBootGui, BootSectGui, ChkDskGui, DismGui, and Install Windows. The menu is scrollable, so this is a partial list. Several entries can write to disks or Windows; their presence is not a recommendation to run them for a password job."
    }
  ],
  "programs": [
    {
      "id": "fastboot-detect",
      "name": "FastBoot Detect",
      "version": "1.0",
      "group": "Preparation",
      "evidence": "Visible as v1.0 at the top of the Windows Password Reset Tools group in the supplied Lockpick launcher photo. The photo does not show its own window or output.",
      "bestFor": "Checking whether the target Windows installation uses Fast Startup before an offline change. This purpose follows the menu label; the exact test and output remain unverified.",
      "changes": "Unknown for this bundled program. Do not assume a tool called Detect is read-only without inspecting its screen.",
      "walkthrough": [
        "In the Lockpick launcher, locate FastBoot Detect at the top of the Windows Password Reset Tools group.",
        "Before using it, identify the target Windows volume and preserve anything the owner needs. Open the program and record which installation it selects and what it says it will do.",
        "Treat any offered fix or write action as a separate decision. Capture the exact result and use it to decide whether the target disk can be worked on safely."
      ],
      "stop": "If the program selects an unexpected disk or proposes a change without describing it, stop and inspect the target by another method. Its internal behavior has not been verified."
    },
    {
      "id": "reset-hibernation",
      "name": "Reset Hibernation (Hybrid Sleep)",
      "version": "1.0",
      "group": "Preparation",
      "evidence": "Visible as v1.0 immediately below FastBoot Detect in the supplied Lockpick launcher photo. The program's own UI is not shown.",
      "bestFor": "A specifically diagnosed hibernation or hybrid-sleep state that blocks safe offline work, after the target and consequences are understood.",
      "changes": "The exact write effect is unverified. The word Reset suggests a state change; do not run it as a harmless inspection step.",
      "walkthrough": [
        "Find this entry below FastBoot Detect in the launcher. Identify the intended Windows installation before opening it.",
        "Read the program's own target and confirmation text. Record whether it will discard a saved hibernated session or alter a file.",
        "Proceed only if that effect is acceptable for this job; then verify Windows starts normally before returning to password work."
      ],
      "stop": "Do not use this just because it sits above the password tools. The bundled program's exact behavior has not yet been documented."
    },
    {
      "id": "windows-login-unlocker",
      "name": "Windows Login Unlocker",
      "version": "1.6",
      "group": "Windows account tools",
      "evidence": "Visible as v1.6 in the supplied launcher photo. The individual program window and write controls have not been inspected.",
      "bestFor": "A local-account case only after its actual account list and available actions have been inspected; the name alone does not establish which protections it can change.",
      "changes": "Unverified for this copy. The photo proves a launcher entry, not whether this program clears passwords, account locks, or other account flags.",
      "walkthrough": [
        "Open Windows Login Unlocker from the third entry in the Windows Password Reset Tools group.",
        "Read its About or Help screen and identify the selected Windows installation and account list before choosing an action.",
        "Record each offered operation and its warning. Compare the selected account with the authorized request, then use a documented program if its write effect is clearer."
      ],
      "stop": "Do not interpret 'unlock' as recovery of Microsoft, domain, BitLocker, EFS, or online credentials. No bundled-build procedure is verified."
    },
    {
      "id": "bypass-windows-password",
      "name": "Bypass Windows Password",
      "version": "2019… (truncated in photo)",
      "group": "Windows account tools",
      "evidence": "Visible below Windows Login Unlocker in the supplied launcher photo; the version begins with 2019 but is cut off by the menu column.",
      "bestFor": "Identification only until the executable, author, supported account type, and method are confirmed.",
      "changes": "Unknown. A 'bypass' may be temporary or may change files; the launcher label does not distinguish these possibilities.",
      "walkthrough": [
        "Locate Bypass Windows Password under Windows Login Unlocker; note the full version from its own About screen if available.",
        "Inspect the first screen for the Windows installation, account type, and whether it promises a temporary session or a permanent account change.",
        "Document its proposed effect before using it for a real repair."
      ],
      "stop": "Do not use a bypass entry when the method and data impact are unknown. The photo alone is insufficient for a button-level procedure."
    },
    {
      "id": "pcunlocker",
      "name": "PCUnlocker",
      "version": "5.6",
      "group": "Windows account tools",
      "evidence": "Visible as v5.6 in the supplied launcher photo; MediCat v21.12 release history also lists PCUnlocker 5.6. The executable itself has not been inspected.",
      "bestFor": "A confirmed local Windows account on the intended installation when built-in recovery failed and an offline password change is authorized.",
      "changes": "The vendor's local-account workflow selects a Windows SAM database, selects a user, and resets that local password to blank. This changes account credentials on the target disk.",
      "walkthrough": [
        "Boot the Lockpick WinPE only after confirming the physical target, authorization, preservation requirement, and BitLocker state. The exact Ventoy menu entry still needs verification on this USB.",
        "Open PCUnlocker and identify the Windows SAM file for the intended installation. Confirm the displayed account list belongs to the right Windows copy; multiple installations can expose more than one SAM.",
        "Choose only the authorized local user. The vendor labels the write action Reset Password and describes it as setting the local password to blank. Confirm the displayed target before invoking it.",
        "Restart without the recovery media, sign in to the intended Windows account, establish a new credential through Windows, and test the specific protected data the owner requested."
      ],
      "stop": "Do not use this local-SAM route for an online Microsoft account, a managed account, an unopened BitLocker volume, or a different Windows installation. Do not claim EFS or saved credentials survived solely because login works.",
      "source": "https://www.pcunlocker.com/reset-windows-password.html"
    },
    {
      "id": "windows-password-reset",
      "name": "Windows Password Reset",
      "version": "5.1",
      "group": "Windows account tools",
      "evidence": "Visible as v5.1 between PCUnlocker and Reset Windows Password in the supplied launcher photo. It is a separate entry; its maker has not been identified.",
      "bestFor": "Identification only until its maker and action can be distinguished from the similarly named Passcape program.",
      "changes": "Unknown for this launcher entry. Do not infer behavior from Passcape's separate Reset Windows Password manual.",
      "walkthrough": [
        "Find Windows Password Reset v5.1 immediately below PCUnlocker in the launcher.",
        "Open its About or Help screen to identify the publisher and full product name. Record its account types and whether it offers read-only inspection.",
        "Before a write, compare the selected Windows installation and user with the authorized job and find documentation for this exact product."
      ],
      "stop": "Do not follow Passcape instructions for this v5.1 entry; the screenshot shows two different products with reversed word order."
    },
    {
      "id": "passcape-rwp",
      "name": "Reset Windows Password",
      "version": "9.3.0… (truncated in photo)",
      "group": "Windows account tools",
      "evidence": "Visible as Reset Windows Password with a version beginning 9.3.0 in the supplied photo. MediCat's v20.12 changelog identifies the bundled product as Passcape; the trailing version digits are not readable.",
      "bestFor": "A more complex authorized account-recovery case after the exact installed Passcape edition and version are identified. Its modes include local accounts and other account types; they are not interchangeable.",
      "changes": "The vendor's local-account mode can reset or change the selected account credential and alter account state. Passcape warns that resetting can disrupt access to DPAPI-protected secrets and EFS files.",
      "walkthrough": [
        "Open Reset Windows Password from the photographed launcher and allow it to finish loading; MediCat's historical release note says this component can take longer than the other launchers.",
        "Choose the Local accounts mode for a local Windows user. The vendor's documented sequence identifies SAM and SYSTEM files, selects the intended account, then presents the reset action.",
        "Before any write, confirm the exact installation and account, the preservation plan, the program's backup or rollback option, and the effect on EFS and saved credentials.",
        "After an authorized change, reboot normally and verify both sign-in and the owner's requested protected material. Record any inaccessible DPAPI or EFS item."
      ],
      "stop": "Do not choose Active Directory, domain, cloud, or forensic modes just because they appear in a newer vendor manual. Their availability in this older bundled edition is unverified, and managed systems require the organization's approved process.",
      "source": "https://passcape.com/reset_windows_password_screenshots"
    },
    {
      "id": "active-password-changer",
      "name": "Active@ Password Changer",
      "version": "11.0",
      "group": "Windows account tools",
      "evidence": "Visible as v11.0 in the supplied launcher photo. MediCat's v20.12 changelog says the tool moved into Lockpick; its license state and executable build remain unverified.",
      "bestFor": "A confirmed local Windows account when the operator needs the program's SAM selection, account attributes, and SAM-backup workflow.",
      "changes": "The vendor documents clearing a selected local user's password and changing account flags. Its demo edition can inspect accounts but cannot perform the reset.",
      "walkthrough": [
        "In the program's wizard, choose the intended Windows installation rather than accepting the first SAM database found. The vendor documents both automatic search and explicit SAM selection.",
        "Select the authorized local user from the account list; verify the account name and administrator status against the job request.",
        "Choose a separate destination for the program's SAM backup before changing account parameters. The vendor documents a backup-folder option.",
        "If the installed licensed edition and screen match the vendor guide, review Clear this User's Password and every account-flag change, then apply only the authorized change. Reboot and verify sign-in and required protected data."
      ],
      "stop": "If the program opens in read-only/demo mode, cannot lock the SAM, shows the wrong Windows installation, or offers unexplained account-flag changes, stop. Do not assume the bundled license allows commercial service work.",
      "source": "https://www.password-changer.com/guide.htm"
    },
    {
      "id": "bluecon-usermanager",
      "name": "O&O BlueCon UserManager",
      "version": "1.0.1… (truncated in photo)",
      "group": "Windows account tools",
      "evidence": "Visible between Active@ Password Changer and ntpwedit. The launcher displays only the beginning of version 1.0.1.",
      "bestFor": "Local Windows user management when an authorized technician needs to set a new local password or review local account state.",
      "changes": "O&O documents changing local-user passwords and account properties. Its manual warns that changing a password can make EFS encrypted files inaccessible.",
      "walkthrough": [
        "Open O&O BlueCon UserManager from the Lockpick launcher and confirm the displayed local accounts belong to the intended Windows installation.",
        "Select the authorized account and inspect the Change Password action. O&O's documentation describes local accounts only; the bundled UI may differ.",
        "Before applying a new password, confirm EFS and saved-credential dependencies. After a normal reboot, test the new sign-in and requested encrypted files."
      ],
      "stop": "Do not use for an online or domain password. Stop if the selected installation is unclear or protected files depend on the old credential.",
      "source": "https://docs.oo-software.com/en/oobluecon-18/oo-usermanager-oobc18"
    },
    {
      "id": "ntpwedit",
      "name": "ntpwedit",
      "version": "0.7",
      "group": "Windows account tools",
      "evidence": "Visible as v0.7 in the supplied launcher photo. The exact bundled binary has not been matched to upstream source.",
      "bestFor": "A confirmed local SAM account when a small direct editor is specifically needed and its target file can be identified.",
      "changes": "The project describes editing a Windows SAM to change or remove a local password. It cannot recover the old password or change a Microsoft or domain account password.",
      "walkthrough": [
        "Open ntpwedit in the launcher and identify the SAM path for the intended Windows installation; WinPE drive letters may differ from normal Windows.",
        "Read the local account list and select only the authorized user. Record the original account state and confirm a recoverable backup before making a change.",
        "Apply only the intended local-account change, then reboot normally and verify sign-in plus the owner's requested protected data."
      ],
      "stop": "Stop if the SAM path or user is ambiguous, the disk is locked, or EFS and saved credentials must be preserved without a recovery plan.",
      "source": "https://github.com/linuixtux/NTPWEdit-version-0.7-GPL"
    },
    {
      "id": "pepasspass",
      "name": "PEPassPass",
      "version": "1.1.0",
      "group": "Windows account tools",
      "evidence": "Visible as v1.1.0 below ntpwedit in the supplied launcher photo. No verified primary manual or program screen is available yet.",
      "bestFor": "Identification and comparison only until this build's purpose and actions are confirmed.",
      "changes": "Unverified. The program name cannot establish whether it edits a password, account flags, or a login component.",
      "walkthrough": [
        "Locate PEPassPass below ntpwedit in the launcher and open its About or Help screen.",
        "Record its publisher, supported Windows versions, target selection, and any proposed file or account changes.",
        "Use a documented path for the repair until those details have been checked against this copy."
      ],
      "stop": "Do not apply an unexplained action on a customer's Windows installation."
    },
    {
      "id": "lazesoft-password-recovery",
      "name": "LazeSoft Windows Password Recovery",
      "version": "4.0.0.1",
      "group": "Windows account tools",
      "evidence": "Visible as v4.0.0.1 in the supplied launcher photo. The vendor's current instructions describe a newer release, so control names require comparison.",
      "bestFor": "A confirmed local Windows account, especially when the vendor's select-installation, select-user, Reset/Unlock sequence matches the bundled screen.",
      "changes": "Lazesoft documents blanking a selected local-account password and unlocking a locked account. This is a write to the target account state.",
      "walkthrough": [
        "Open the Lazesoft entry and select the intended Windows installation volume; do not rely on its WinPE drive letter alone.",
        "Select the authorized local user. The vendor guide calls the write action Reset/Unlock and says it blanks that account's password.",
        "If the bundled v4 screen matches, review the target and consequence before applying the change. Reboot without MediCat, sign in, and test the required data."
      ],
      "stop": "Stop if the target volume is absent, BitLocker is locked, the user is an online or managed identity, or preserving EFS and saved credentials is unresolved.",
      "source": "https://www.lazesoft.com/how-to-reset-windows-password.html"
    },
    {
      "id": "wbg",
      "name": "WBG Password Recovery",
      "version": "2.0.0.1",
      "group": "Windows account tools",
      "evidence": "Visible as WBG Password Recovery v2.0.0.1 in the supplied launcher photo. MediCat's v21.06 changelog used the earlier name WBG Windows Password Reset; the program UI remains uninspected.",
      "bestFor": "Inventory and comparison only until the actual program screen, version, supported account type, and write behavior are established.",
      "changes": "Unverified for this build. The program name alone is insufficient to describe its effect on the SAM, account attributes, or encrypted data.",
      "walkthrough": [
        "Open the photographed WBG Password Recovery entry and record its help/about screen without entering a password or changing an account.",
        "Record the available modes and whether the program distinguishes local, Microsoft, and managed accounts.",
        "Do not select a write action until its primary documentation and exact bundled behavior can be checked."
      ],
      "stop": "No button-level WBG reset procedure is verified. Use the documented PCUnlocker or an official recovery route when they fit the authorized job.",
      "source": "https://docs.medicat.dev/usb/changelog/"
    },
    {
      "id": "sql-server-password-changer",
      "name": "SQL Server Password Changer",
      "version": "1.9",
      "group": "SQL Server account tool",
      "evidence": "Visible as version 1.9 in a separate SQL Server Password Reset Tools group in the supplied launcher photo.",
      "bestFor": "A specifically authorized Microsoft SQL Server login recovery job, not a Windows sign-in problem.",
      "changes": "The product vendor describes changing SQL Server logins in an offline master database. Its demo edition lists accounts but cannot reset them; the bundled license and SQL Server compatibility are unverified.",
      "walkthrough": [
        "Confirm the request concerns a SQL Server login and identify the exact SQL Server instance and its master database. Preserve a restorable database backup and coordinate downtime with its owner.",
        "Open SQL Server Password Changer from its separate launcher group. Verify the database file and listed SQL login belong to the approved instance before selecting any change.",
        "If the bundled v1.9 edition supports the required action, follow its own prompts and then validate SQL Server startup, approved login, and application connections."
      ],
      "stop": "Do not use this for a Windows local, Microsoft, or domain login. Stop if instance ownership, a restorable backup, or the bundled edition's write capability is uncertain.",
      "source": "https://www.top-password.com/sql-server-password-recovery.html"
    }
  ]
};
