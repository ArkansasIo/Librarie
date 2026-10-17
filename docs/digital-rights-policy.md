# Librarie Digital Rights Policy

**Version:** 1.0
**Effective date:** 2026-10-17

This policy defines how Librarie determines whether digital books and other copyrighted content may be stored, displayed, streamed, or downloaded.

## Rights classes

### PUBLIC_DOMAIN
The work is verified to be in the public domain in the jurisdiction in which Librarie is distributing it. The package must record the basis for the determination and its source.

### CC_LICENSED
The copyright holder has granted an applicable Creative Commons license. Librarie must preserve attribution, license URL, modification notices, and any applicable NC, ND, or SA conditions. Creative Commons recommends clearly marking the work and linking to the applicable license. citeturn0search0turn0search2

### ORIGINAL_LIBRARIE
The work was created for Librarie and the project has authority to distribute it. The individual work must carry its own rights statement. The software MIT license does not automatically apply to these works.

### DIRECT_PERMISSION
A copyright holder or authorized representative has granted Librarie written permission. The permission record must identify the work, rights granted, territory, duration, media, and any restrictions.

### COMMERCIAL_LICENSE
Librarie has acquired a commercial or institutional digital license. The license agreement controls access, copies, authentication, geographic restrictions, loan limits, and other conditions.

### THIRD_PARTY_RESTRICTED
Rights are unclear, incomplete, expired, disputed, or otherwise insufficient for full digital distribution. Librarie must not publish the full text until rights are cleared.

## Required rights record

Every digitally distributed title should have a rights record containing:

- `rights_status`
- `rights_holder`
- `license_name`
- `license_url`
- `permission_source`
- `permission_date`
- `territory`
- `allowed_actions`
- `restrictions`
- `attribution`
- `reviewed_by`
- `reviewed_at`
- `expiration_date` when applicable

## Allowed actions

Rights may independently authorize:

- catalog metadata display
- cover display
- preview
- browser reading
- temporary lending
- member-only reading
- download
- printing
- copying/quoting
- accessibility conversion
- preservation copy
- text search/indexing
- API delivery

A catalog record alone does not establish a right to distribute the full book.

## Digital access controls

The Librarie API must enforce rights server-side. GitHub Pages or other browser code must never be treated as the authority for access decisions.

Restricted files should remain outside publicly accessible static paths where practical. API delivery must authenticate users where required and enforce the title's rights policy.

## Canadian copyright considerations

Library and Archives Canada notes that collections can contain works still protected by copyright and that permission from the copyright owner may sometimes be required. citeturn0search14 Canada also recognizes collective licensing arrangements for certain reproduction and communication rights. citeturn0search13

This policy does not replace legal advice or a title-specific copyright determination.

## External metadata

Open Library states that its contributed catalog data is requested under CC0, while also noting that rights issues can exist for individual contributions and jurisdictions. Librarie may use appropriately licensed metadata, but must independently track rights to the underlying book and other protected assets. citeturn0search6turn0search11

## Default rule

If Librarie cannot document sufficient rights for a full digital copy, the system should default to **metadata-only discovery** and link users to an authorized source instead of hosting the full work.
