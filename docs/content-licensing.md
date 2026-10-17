# Librarie Content Licensing Policy

## 1. Software
The Librarie application source code is released under the MIT License unless a source file contains a different license notice.

## 2. Original Librarie books
Original manuscripts and other creative works created specifically for this repository are separate copyrighted works. They are not automatically covered by the software MIT License.

Unless a book's metadata or license file says otherwise, the default permission is:

- Librarie may store, index, display, and provide authorized reading access to the work as part of this library project.
- Redistribution, commercial reuse, adaptation, or republication of the manuscript requires permission from the applicable copyright holder.

## 3. Third-party material
Third-party books, images, metadata, fonts, libraries, trademarks, and other assets remain under their own licenses or copyright terms. Librarie does not relicense them under MIT.

Only public-domain, openly licensed, or otherwise authorized full text may be distributed as a complete digital book through Librarie.

## 4. Metadata
Metadata imported from external library services must preserve applicable attribution and licensing requirements. A metadata record does not grant rights to reproduce the underlying book.

## 5. Digital delivery
The `book_files` database records access level (`PUBLIC`, `MEMBER`, or `STAFF`). Application code must enforce that policy at the API boundary rather than relying on the GitHub Pages frontend.

## 6. Notices
If a work has a dedicated license, rights statement, attribution requirement, or takedown/contact instruction, place that information in the book package's `metadata.json` and/or `LICENSE` file.

## 7. Future licensing
A later release may publish selected original books under Creative Commons or another explicit open-content license. Such a grant must be stated in that book's metadata and license file; it is not implied by the software license.
