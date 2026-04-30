/**
 * Converts SHA1 hashes in on Chromium Gerrit into clickable links.
 */
const processedNodes = new WeakSet();
function isSha1(text) {
  return /^[a-f0-9]{40}$/i.test(text.trim());
}
function linkify(node) {
  if (processedNodes.has(node)) {
    return;
  }
  processedNodes.add(node);
  const sha1 = node.nodeValue.trim();
  const link = document.createElement('a');
  link.href = `https://storage.cloud.google.com/chromium-translation-screenshots/${sha1}`;
  link.target = '_blank';
  link.textContent = sha1;
  link.style.color = '#1a73e8';
  link.style.textDecoration = 'underline';
  if (node.parentNode) {
    node.parentNode.replaceChild(link, node);
  }
}
function processNode(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    if (node.parentElement && node.parentElement.tagName === 'A') {
      return;
    }
    if (isSha1(node.nodeValue)) {
      linkify(node);
    }
  } else if (node.childNodes) {
    node.childNodes.forEach(processNode);
  }
  if (node.shadowRoot) {
    processNode(node.shadowRoot);
  }
}
const observedRoots = new WeakSet();
function scanDom(root = document.body) {
  if (!observedRoots.has(root)) {
    observedRoots.add(root);
    const observer = new MutationObserver(() => scanDom());
    observer.observe(root, {
      childList: true,
      subtree: true
    });
  }
  const diffHosts = root.querySelectorAll ? root.querySelectorAll('gr-diff-host') : [];
  diffHosts.forEach(processNode);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
  while (walker.nextNode()) {
    const el = walker.currentNode;
    if (el.shadowRoot) {
      scanDom(el.shadowRoot);
    }
  }
}
// Initial run
scanDom();
