# Chromium-SHA1-Linker-Ext
A Chrome extension for Chromium developers that automatically links the sha1 hash on Gerrit to the corresponding image on Google Storage

Whenever a file diff is expanded or viewed on chromium-review.googlesource.com, the extension scans the DOM for `gr-diff-host` containers (including shadow roots) for 40-character SHA1 hexadecimal hashes.
If found, it converts the identified hashes into clickable links pointing to: https://storage.cloud.google.com/chromium-translation-screenshots/<SHA1>.

## Features
- High-performance DOM observer targeting `gr-diff-host` elements on `chromium-review.googlesource.com`.
- Safely parses shadow roots associated with expanded diffs.
- Identifies 40-character SHA1 hashes and converts them into clickable links pointing to:
  `https://storage.cloud.google.com/chromium-translation-screenshots/<SHA1>`

## Installation
1. Download or clone this repository.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** using the toggle switch in the top right corner.
4. Click **Load unpacked**.
5. Select the directory containing the extension files (`manifest.json`, `content.js`).
