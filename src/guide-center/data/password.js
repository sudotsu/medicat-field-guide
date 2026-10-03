window.LEARN_MEDICAT_PASSWORD = {
  "title": "Password and access recovery",
  "summary": "Choose the screen that is asking for access. The guide will show the first useful step and whether Lockpick fits.",
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
      "sources": [
        {
          "label": "Microsoft PIN reset",
          "url": "https://support.microsoft.com/en-us/windows/security/change-or-reset-your-pin-in-windows"
        }
      ]
    },
    {
      "id": "local-password",
      "label": "Windows password for this computer",
      "clue": "Windows asks for a password for a user on this computer, not a PIN or a Microsoft, work, or school email account.",
      "first": "Try Windows’ own Reset password option before using Lockpick.",
      "steps": [
        "Check that you are working on the right computer and user account, and ask which files the owner needs to keep.",
        "At the Windows sign-in screen, choose Reset password if it appears. Answer the security questions, or use a password-reset disk if the owner already made one.",
        "If another administrator on this computer can sign in, ask them to reset this user’s password in Windows.",
        "If those options do not work, open the PCUnlocker lesson in Lockpick. Check for a BitLocker recovery-key prompt before changing anything."
      ],
      "medicat": "PCUnlocker can clear a forgotten password for a local account. It cannot change a Microsoft or work account password or unlock a drive that asks for a BitLocker recovery key.",
      "stop": "Pause if you cannot identify the right user or Windows copy, the drive asks for a recovery key you do not have, or the owner needs encrypted files that may depend on the old password.",
      "verify": "The right user signs in after a normal restart, and the files and apps the owner asked about still open.",
      "sources": [
        {
          "label": "Microsoft local-account recovery",
          "url": "https://support.microsoft.com/en-us/windows/security/change-or-reset-your-local-account-password-in-windows"
        },
        {
          "label": "MediCat v21.12 historical Lockpick changelog",
          "url": "https://docs.medicat.dev/usb/changelog/"
        }
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
      "sources": [
        {
          "label": "Microsoft account password recovery",
          "url": "https://support.microsoft.com/en-us/accounts-billing/security/change-or-reset-your-microsoft-account-password-in-windows"
        }
      ]
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
      "sources": [
        {
          "label": "Microsoft work or school password reset",
          "url": "https://support.microsoft.com/en-us/accounts-billing/work-school/reset-your-microsoft-work-or-school-account-password-using-security-info"
        }
      ]
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
      "sources": [
        {
          "label": "Microsoft BitLocker recovery key",
          "url": "https://support.microsoft.com/en-us/windows/security/encryption/find-your-bitlocker-recovery-key"
        }
      ]
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
      "sources": [
        {
          "label": "MediCat historical password-tool category",
          "url": "https://docs.medicat.dev/usb/tools/"
        }
      ]
    },
    {
      "id": "protected-data",
      "label": "Login works, but protected data does not",
      "clue": "The desktop opens, yet encrypted files, a password vault, saved credentials, or an account-linked service remain inaccessible.",
      "first": "Identify the specific protected item and its original account, key, certificate, or vault recovery requirement.",
      "steps": [
        "Write down which files, passwords, or apps do not open and the exact message you see.",
        "Find out whether those items need a drive recovery key, a Windows file-encryption certificate, a password-manager recovery method, or an online account.",
        "Use the matching recovery method, then test the exact items the owner asked to keep."
      ],
      "medicat": "Another Windows password reset is unlikely to restore a missing encryption key or saved app password. Changing the sign-in again may make recovery harder.",
      "stop": "Pause further password changes until you know what protects the missing item and whether its recovery key or account is available.",
      "verify": "The exact protected items requested by the owner open from the intended account; untested items are explicitly listed.",
      "sources": [
        {
          "label": "Microsoft BitLocker recovery key",
          "url": "https://support.microsoft.com/en-us/windows/security/encryption/find-your-bitlocker-recovery-key"
        },
        {
          "label": "Microsoft EFS file and certificate migration",
          "url": "https://learn.microsoft.com/en-us/windows/deployment/usmt/usmt-migrate-efs-files-and-certificates"
        }
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
      "sources": [
        {
          "label": "Microsoft Windows account access overview",
          "url": "https://support.microsoft.com/en-US/accounts-billing/security/user-account-access-in-windows"
        }
      ]
    }
  ],
  "environment": [
    {
      "title": "Where am I?",
      "text": "Lockpick starts a temporary Windows-like desktop from MediCat. The large Jayro’s Lockpick window lists password tools. Closing a tool does not install Windows or change a password by itself."
    },
    {
      "title": "The Windows drive is missing",
      "text": "Open the Start menu. System Tools includes Disk Management and Device Manager; the Drivers_PE folder contains driver helpers. First check whether the computer can see its internal drive. If it cannot, do not guess which drive to reset."
    },
    {
      "title": "Other Start-menu tools",
      "text": "The Start menu also has repair, disk, and installation programs. You do not need them for a normal forgotten-password job. The full menu has more tools than this guide currently covers."
    }
  ],
  "programs": [
    {
      "id": "fastboot-detect",
      "name": "FastBoot Detect",
      "version": "1.0",
      "group": "Preparation",
      "summary": "A helper labeled as a Fast Startup check. We have not seen its results screen.",
      "useWhen": "Only if Lockpick says Windows was not fully shut down or a drive seems locked.",
      "next": "For an ordinary forgotten password, skip this helper and start with PCUnlocker.",
      "evidence": "Visible as v1.0 at the top of the Windows Password Reset Tools group in the supplied Lockpick launcher photo. The photo does not show its own window or output."
    },
    {
      "id": "reset-hibernation",
      "name": "Reset Hibernation (Hybrid Sleep)",
      "version": "1.0",
      "group": "Preparation",
      "summary": "A helper for a Windows session left asleep or hibernating. Its exact action in this copy is unverified.",
      "useWhen": "Only if a tool says a saved sleep session is blocking the Windows drive.",
      "next": "Do not run it just because it appears first. It may discard what was open in Windows; check its own warning before continuing.",
      "evidence": "Visible as v1.0 immediately below FastBoot Detect in the supplied Lockpick launcher photo. The program's own UI is not shown."
    },
    {
      "id": "windows-login-unlocker",
      "name": "Windows Login Unlocker",
      "version": "1.6",
      "group": "Windows account tools",
      "summary": "Another Windows sign-in tool. We have not checked what this bundled copy changes.",
      "useWhen": "No recommended use yet; its own screen needs to be checked first.",
      "next": "For a forgotten password on a local Windows account, use the PCUnlocker lesson.",
      "evidence": "Visible as v1.6 in the supplied launcher photo. The individual program window and write controls have not been inspected."
    },
    {
      "id": "bypass-windows-password",
      "name": "Bypass Windows Password",
      "version": "2019… (last digits not shown)",
      "group": "Windows account tools",
      "summary": "The name suggests a way past Windows sign-in, but the launcher does not say how it works.",
      "useWhen": "No recommended use yet; it may change Windows or only provide temporary access.",
      "next": "Use a documented recovery route instead of guessing what this entry will do.",
      "evidence": "Visible below Windows Login Unlocker in the supplied launcher photo; the version begins with 2019 but is cut off by the menu column."
    },
    {
      "id": "pcunlocker",
      "name": "PCUnlocker",
      "version": "5.6",
      "group": "Windows account tools",
      "summary": "Clears a forgotten password for a Windows user who signs in only to this computer.",
      "useWhen": "The account belongs to this computer, Windows is asking for its password, and the normal recovery options did not work.",
      "steps": [
        "Open PCUnlocker in Jayro’s Lockpick.",
        "Check that the Windows installation and user shown are the ones you intend to change.",
        "Choose Reset Password. The vendor says this leaves that local account with a blank password.",
        "Restart without the MediCat USB. Sign in, set a new password in Windows, and check the files the owner needs."
      ],
      "stopPlain": "Stop if the drive asks for a BitLocker recovery key, the account uses a Microsoft or work email, or you must keep files encrypted with the old password.",
      "check": "The right user can sign in after a normal restart, and the files they need still open.",
      "evidence": "Visible as v5.6 in the supplied launcher photo; MediCat v21.12 release history also lists PCUnlocker 5.6. The executable itself has not been inspected.",
      "source": "https://www.pcunlocker.com/reset-windows-password.html"
    },
    {
      "id": "windows-password-reset",
      "name": "Windows Password Reset",
      "version": "5.1",
      "group": "Windows account tools",
      "summary": "A separate password program from the similarly named Reset Windows Password entry below it.",
      "useWhen": "No recommended use yet; we have not identified this v5.1 program or its controls.",
      "next": "Do not follow the steps for the other program. For a local Windows account, start with PCUnlocker.",
      "evidence": "Visible as v5.1 between PCUnlocker and Reset Windows Password in the supplied launcher photo. It is a separate entry; its maker has not been identified."
    },
    {
      "id": "passcape-rwp",
      "name": "Reset Windows Password",
      "version": "9.3.0… (last digits not shown)",
      "group": "Windows account tools",
      "summary": "A more advanced password recovery program with several modes. The local-account mode is the relevant one for a normal Windows account on this computer.",
      "useWhen": "PCUnlocker does not fit the job and you have checked that this program shows the right Windows installation and user.",
      "steps": [
        "Open Reset Windows Password and let it finish loading.",
        "Choose Local accounts for an account that signs in to this computer.",
        "Check the Windows installation and user before choosing a reset action.",
        "Restart normally and test both sign-in and the important files."
      ],
      "stopPlain": "Stop if the account belongs to a company or school, the drive is locked, or you are unsure what an extra mode would change.",
      "check": "The intended user signs in and the files they asked to keep still open.",
      "evidence": "Visible as Reset Windows Password with a version beginning 9.3.0 in the supplied photo. MediCat's v20.12 changelog identifies the bundled product as Passcape; the trailing version digits are not readable.",
      "source": "https://passcape.com/reset_windows_password_screenshots"
    },
    {
      "id": "active-password-changer",
      "name": "Active@ Password Changer",
      "version": "11.0",
      "group": "Windows account tools",
      "summary": "Clears a local Windows password and offers extra account settings and a backup option.",
      "useWhen": "You need its backup option before changing a local account, or PCUnlocker cannot show the account you need.",
      "steps": [
        "Open Active@ Password Changer and choose the Windows installation you want to work on.",
        "Select the right user. If the backup option is available, save it somewhere other than the drive you are changing.",
        "Review Clear this User’s Password and leave unrelated account settings alone. Apply the change only if this screen matches the vendor guide.",
        "Restart normally and check sign-in and important files."
      ],
      "stopPlain": "Stop if it says Demo, shows the wrong user, or offers changes you do not understand.",
      "check": "The correct account opens after restart and the requested files still work.",
      "evidence": "Visible as v11.0 in the supplied launcher photo. MediCat's v20.12 changelog says the tool moved into Lockpick; its license state and executable build remain unverified.",
      "source": "https://www.password-changer.com/guide.htm"
    },
    {
      "id": "bluecon-usermanager",
      "name": "O&O BlueCon UserManager",
      "version": "1.0.1… (last digits not shown)",
      "group": "Windows account tools",
      "summary": "Manages local Windows users. It can set a new password for one of those accounts.",
      "useWhen": "You need to give a local Windows user a new password rather than leaving it blank.",
      "steps": [
        "Open O&O BlueCon UserManager and find the intended local user.",
        "Choose Change Password only for that user, and check the program’s warning before saving.",
        "Restart and test the new sign-in and any encrypted files the owner needs."
      ],
      "stopPlain": "It does not change a Microsoft, company, or school password. Changing a local password can leave previously encrypted files unreadable.",
      "check": "The new password signs in to the correct account and the owner’s needed files open.",
      "evidence": "Visible between Active@ Password Changer and ntpwedit. The launcher displays only the beginning of version 1.0.1.",
      "source": "https://docs.oo-software.com/en/oobluecon-18/oo-usermanager-oobc18"
    },
    {
      "id": "ntpwedit",
      "name": "ntpwedit",
      "version": "0.7",
      "group": "Windows account tools",
      "summary": "A small tool that changes or removes a local Windows password directly.",
      "useWhen": "Only if the simpler PCUnlocker route does not fit and you can identify the right Windows installation.",
      "next": "Its bundled screens have not been checked. Use PCUnlocker for the usual local-account reset.",
      "evidence": "Visible as v0.7 in the supplied launcher photo. The exact bundled binary has not been matched to upstream source.",
      "source": "https://github.com/linuixtux/NTPWEdit-version-0.7-GPL"
    },
    {
      "id": "pepasspass",
      "name": "PEPassPass",
      "version": "1.1.0",
      "group": "Windows account tools",
      "summary": "A password-related program in the launcher. We have not verified what this copy actually changes.",
      "useWhen": "No recommended use yet; its own screen and instructions need to be checked.",
      "next": "For a local Windows password, use a documented tool such as PCUnlocker.",
      "evidence": "Visible as v1.1.0 below ntpwedit in the supplied launcher photo. No verified primary manual or program screen is available yet."
    },
    {
      "id": "lazesoft-password-recovery",
      "name": "LazeSoft Windows Password Recovery",
      "version": "4.0.0.1",
      "group": "Windows account tools",
      "summary": "Clears a local Windows password. The vendor also describes unlocking an account that Windows has locked or disabled.",
      "useWhen": "A local account is locked or disabled, or the PCUnlocker route does not fit.",
      "steps": [
        "Open LazeSoft Windows Password Recovery and choose the correct Windows installation.",
        "Select the intended user. The vendor calls the action Reset/Unlock and says it leaves the password blank.",
        "If the bundled screen matches, apply it, restart without MediCat, and test sign-in."
      ],
      "stopPlain": "Stop if the drive is locked, the account is tied to a Microsoft or work email, or the Windows installation shown is not the one you need.",
      "check": "The account signs in after restart and the owner’s needed files open.",
      "evidence": "Visible as v4.0.0.1 in the supplied launcher photo. The vendor's current instructions describe a newer release, so control names require comparison.",
      "source": "https://www.lazesoft.com/how-to-reset-windows-password.html"
    },
    {
      "id": "wbg",
      "name": "WBG Password Recovery",
      "version": "2.0.0.1",
      "group": "Windows account tools",
      "summary": "Another password recovery program listed in Lockpick. We have not seen its own screens.",
      "useWhen": "No recommended use yet; the exact actions in this copy are unknown.",
      "next": "For a confirmed local Windows account, use the PCUnlocker lesson.",
      "evidence": "Visible as WBG Password Recovery v2.0.0.1 in the supplied launcher photo. MediCat's v21.06 changelog used the earlier name WBG Windows Password Reset; the program UI remains uninspected.",
      "source": "https://docs.medicat.dev/usb/changelog/"
    },
    {
      "id": "sql-server-password-changer",
      "name": "SQL Server Password Changer",
      "version": "1.9",
      "group": "SQL Server account tool",
      "summary": "Changes a Microsoft SQL Server database login. It does not change the Windows sign-in password.",
      "useWhen": "Only if you manage a SQL Server database and its database login is the problem.",
      "steps": [
        "Confirm which SQL Server database and login you are authorized to change, and keep a restorable backup.",
        "Open SQL Server Password Changer and check that it shows the right database and login.",
        "If this copy allows the change, follow its prompts and then test that SQL Server and the affected application still connect."
      ],
      "stopPlain": "Stop if you are trying to recover an ordinary Windows account or cannot identify the database and login.",
      "check": "The intended SQL Server login works and the application can connect again.",
      "evidence": "Visible as version 1.9 in a separate SQL Server Password Reset Tools group in the supplied launcher photo.",
      "source": "https://www.top-password.com/sql-server-password-recovery.html"
    }
  ]
};
