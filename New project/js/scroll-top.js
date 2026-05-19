export function initScrollTop() {
  const scrollTopButton = document.querySelector(".scroll-top");
  const heroSection = document.querySelector(".hero");

  if (!scrollTopButton || !heroSection) {
    return;
  }

  const toggleScrollTop = () => {
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    const shouldShow = window.scrollY > heroBottom - 80;

    scrollTopButton.classList.toggle("is-visible", shouldShow);
  };

  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("scroll", toggleScrollTop, { passive: true });
  window.addEventListener("resize", toggleScrollTop);

  toggleScrollTop();
}
