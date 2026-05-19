export function initFaq() {
  const faqTriggers = document.querySelectorAll(".faq-item__trigger");

  faqTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const item = trigger.closest(".faq-item");

      if (!item) {
        return;
      }

      const isOpen = item.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", String(isOpen));
    });
  });
}
