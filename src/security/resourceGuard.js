const DEVTOOLS_THRESHOLD = 160;

function isBlockedShortcut(event) {
  const key = event.key.toLowerCase();
  const ctrl = event.ctrlKey || event.metaKey;

  if (key === "f12") {
    return true;
  }

  if (ctrl && key === "u") {
    return true;
  }

  if (ctrl && key === "s") {
    return true;
  }

  if (ctrl && event.shiftKey && ["i", "j", "c", "k"].includes(key)) {
    return true;
  }

  return false;
}

function markProtectedResources(root) {
  const selector = "img, video, audio, canvas, source, iframe, embed, object";
  const nodes = root.querySelectorAll(selector);

  nodes.forEach((node) => {
    node.classList.add("guarded-resource");

    if ("draggable" in node) {
      node.draggable = false;
    }

    node.addEventListener("dragstart", (event) => {
      event.preventDefault();
    });
  });

  root.querySelectorAll("a[download]").forEach((link) => {
    link.removeAttribute("download");
  });
}

function mountSecurityOverlay() {
  if (document.getElementById("security-overlay")) {
    return;
  }

  const overlay = document.createElement("div");
  overlay.id = "security-overlay";
  overlay.setAttribute("aria-live", "polite");
  overlay.innerHTML =
    "<div><strong>Protected Content</strong><p>Resource inspection is restricted on this website.</p></div>";
  document.body.appendChild(overlay);
}

export function initResourceGuard() {
  if (!import.meta.env.PROD) {
    return;
  }

  markProtectedResources(document);
  mountSecurityOverlay();

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          markProtectedResources(node);
        }
      });
    });
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  document.addEventListener("keydown", (event) => {
    if (isBlockedShortcut(event)) {
      event.preventDefault();
      event.stopPropagation();
    }
  });

  document.addEventListener("dragstart", (event) => {
    if (event.target instanceof HTMLElement) {
      event.preventDefault();
    }
  });

  const checkDevtools = () => {
    const widthGap = window.outerWidth - window.innerWidth > DEVTOOLS_THRESHOLD;
    const heightGap = window.outerHeight - window.innerHeight > DEVTOOLS_THRESHOLD;
    const overlay = document.getElementById("security-overlay");

    if (overlay) {
      overlay.style.display = widthGap || heightGap ? "grid" : "none";
    }
  };

  setInterval(checkDevtools, 1000);
}
