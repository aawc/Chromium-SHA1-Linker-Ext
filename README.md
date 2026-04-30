# Chromium-SHA1-Linker-Ext
A Chrome extension for Chromium developers that automatically links the sha1 hash on Gerrit to the corresponding image on Google Storage

Whenever a file diff is expanded or viewed on chromium-review.googlesource.com, the extension scans the DOM for `gr-diff-host` containers (including shadow roots) for 40-character SHA1 hexadecimal hashes.
If found, it converts the identified hashes into clickable links pointing to: https://storage.cloud.google.com/chromium-translation-screenshots/<SHA1>.

