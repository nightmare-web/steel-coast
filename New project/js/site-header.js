export function initSiteHeader() {
  const siteHeader = document.querySelector(".site-header");
  const navToggle = document.querySelector(".site-header__toggle");
  const navOverlay = document.querySelector(".site-header__overlay");
  const siteNav = document.querySelector(".site-header__nav");
  const navLinks = document.querySelectorAll(".site-header__nav a");

  if (!siteHeader || !navToggle || !siteNav) {
    return;
  }

  let touchStartX = 0;
  let touchStartY = 0;
  let touchDeltaX = 0;
  let touchDeltaY = 0;
  let isTouchDraggingMenu = false;
  let isHorizontalSwipe = false;
  let suppressNavLinkClick = false;

  const syncMenuState = (isOpen) => {
    siteHeader.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("is-menu-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));

    if (!isOpen) {
      siteNav.style.transform = "";
      siteNav.style.transition = "";
    }
  };

  navToggle.addEventListener("click", () => {
    syncMenuState(!siteHeader.classList.contains("is-open"));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      if (suppressNavLinkClick) {
        event.preventDefault();
        suppressNavLinkClick = false;
        return;
      }

      syncMenuState(false);
    });
  });

  navOverlay?.addEventListener("click", () => {
    syncMenuState(false);
  });

  document.addEventListener("click", (event) => {
    if (!siteHeader.classList.contains("is-open")) {
      return;
    }

    const target = event.target;

    if (!(target instanceof Node)) {
      return;
    }

    if (siteNav.contains(target) || navToggle.contains(target)) {
      return;
    }

    syncMenuState(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      syncMenuState(false);
    }
  });

  siteNav.addEventListener(
    "touchstart",
    (event) => {
      if (!siteHeader.classList.contains("is-open")) {
        return;
      }

      const touch = event.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      touchDeltaX = 0;
      touchDeltaY = 0;
      isTouchDraggingMenu = true;
      isHorizontalSwipe = false;
      suppressNavLinkClick = false;
      siteNav.style.transition = "none";
    },
    { passive: true },
  );

  siteNav.addEventListener(
    "touchmove",
    (event) => {
      if (!isTouchDraggingMenu) {
        return;
      }

      const touch = event.touches[0];
      touchDeltaX = touch.clientX - touchStartX;
      touchDeltaY = touch.clientY - touchStartY;

      if (!isHorizontalSwipe) {
        if (
          Math.abs(touchDeltaX) > 14 &&
          Math.abs(touchDeltaX) > Math.abs(touchDeltaY)
        ) {
          isHorizontalSwipe = true;
          suppressNavLinkClick = true;
        } else if (Math.abs(touchDeltaY) > Math.abs(touchDeltaX)) {
          return;
        }
      }

      if (!isHorizontalSwipe) {
        return;
      }

      if (event.cancelable) {
        event.preventDefault();
      }

      siteNav.style.transform = `translateX(${Math.max(0, touchDeltaX)}px)`;
    },
    { passive: false },
  );

  siteNav.addEventListener("touchend", () => {
    if (!isTouchDraggingMenu) {
      return;
    }

    siteNav.style.transition = "";

    if (isHorizontalSwipe && touchDeltaX > 90) {
      isTouchDraggingMenu = false;
      isHorizontalSwipe = false;
      syncMenuState(false);
      return;
    }

    siteNav.style.transform = "";
    isTouchDraggingMenu = false;
    isHorizontalSwipe = false;
    touchDeltaX = 0;
    touchDeltaY = 0;

    window.setTimeout(() => {
      suppressNavLinkClick = false;
    }, 0);
  });

  siteNav.addEventListener("touchcancel", () => {
    siteNav.style.transform = "";
    siteNav.style.transition = "";
    isTouchDraggingMenu = false;
    isHorizontalSwipe = false;
    suppressNavLinkClick = false;
  });
}
