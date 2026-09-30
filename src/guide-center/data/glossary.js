window.LEARN_MEDICAT_GLOSSARY = [
  {
    "term": "BCD",
    "aliases": ["Boot Configuration Data"],
    "definition": "Windows boot configuration that tells Windows Boot Manager which installation or recovery entry to start. It is not the partition table and not the firmware itself."
  },
  {
    "term": "BitLocker",
    "aliases": ["device encryption", "recovery key"],
    "definition": "Microsoft disk or volume encryption. An offline Windows-password change does not substitute for the required decryption or recovery key."
  },
  {
    "term": "Clone",
    "aliases": ["disk clone"],
    "definition": "A second disk made to reproduce another disk's layout or content. A clone is different from copying selected files and from storing an image file."
  },
  {
    "term": "Disk image",
    "aliases": ["image backup"],
    "definition": "A file or set of files representing disk sectors, partitions, or used regions for later analysis or restoration. It is not the same as an ISO installer."
  },
  {
    "term": "EFI System Partition",
    "aliases": ["ESP", "EFI partition"],
    "definition": "A small partition used by UEFI firmware to load boot files. Seeing the Windows partition does not prove the ESP is present or correct."
  },
  {
    "term": "EFS",
    "aliases": ["Encrypting File System"],
    "definition": "Windows file-level encryption tied to encryption certificates and keys. Changing an account password offline can leave EFS-protected files inaccessible."
  },
  {
    "term": "GPT",
    "aliases": ["GUID Partition Table"],
    "definition": "A modern disk partitioning scheme commonly paired with UEFI. GPT describes the disk layout; it is not a firmware mode."
  },
  {
    "term": "ISO",
    "aliases": ["ISO image"],
    "definition": "An optical-disc-style image container often used for installers and live environments. The contents—not the .iso extension—determine whether it installs, repairs, or only diagnoses."
  },
  {
    "term": "Legacy BIOS",
    "aliases": ["Legacy boot", "CSM"],
    "definition": "An older firmware boot path commonly associated with MBR boot code. It describes how the machine starts software, not how every disk must be partitioned."
  },
  {
    "term": "Live operating system",
    "aliases": ["live OS", "live Linux"],
    "definition": "An operating system that runs from removable media or memory without needing to install itself to the internal disk. Its tools can still modify internal disks."
  },
  {
    "term": "MBR",
    "aliases": ["Master Boot Record"],
    "definition": "An older disk partitioning scheme and boot-record format commonly paired with Legacy BIOS. Converting it can be destructive depending on the tool and layout."
  },
  {
    "term": "Passkey",
    "aliases": ["FIDO credential"],
    "definition": "A cryptographic sign-in credential that may sync through an account/password manager, remain device-bound, or live on an external security key. Verify another sign-in route before wiping its only holder."
  },
  {
    "term": "Recovery code",
    "aliases": ["backup code"],
    "definition": "A provider-issued fallback code used when the normal second factor is unavailable. Store it somewhere that will survive the device being repaired or erased."
  },
  {
    "term": "TOTP",
    "aliases": ["authenticator code", "time-based one-time password"],
    "definition": "A rotating code generated from a shared secret in an authenticator. Reinstalling the authenticator app does not automatically restore that secret."
  },
  {
    "term": "UEFI",
    "aliases": ["UEFI boot"],
    "definition": "Modern firmware that initializes hardware and starts boot files, usually from an EFI System Partition. UEFI is a boot method; GPT is a disk layout."
  },
  {
    "term": "VHD / VHDX",
    "aliases": ["virtual hard disk"],
    "definition": "A file that represents a virtual disk. It may contain an installed operating system, partitions, or data and is different from an ISO."
  },
  {
    "term": "WIM",
    "aliases": ["Windows Imaging Format"],
    "definition": "Microsoft's file-based Windows image format used for deployment and recovery. A WIM can contain WinPE or Windows installation images."
  },
  {
    "term": "WinPE",
    "aliases": ["Windows PE", "Windows Preinstallation Environment"],
    "definition": "A small Windows environment intended for installation, deployment, and recovery. Changes made inside a RAM-booted WinPE are normally lost at reboot unless written elsewhere."
  }
];
