// Scroll-triggered animations.
// Watches every element carrying one of the animation classes below
// and toggles "in-view" as it enters or leaves the viewport.
// Include this file with <script src="animations.js"></script>
// right before </body>, after the elements exist on the page.
//
// Classes handled: fade-in, fade-up, fade-down, fade-left, fade-right,
// fade-out, zoom-in, zoom-out, flip-up, flip-down, rotate-in, bounce-in.
// (Their look/behavior is defined in styles.css — this file only
// decides *when* to switch them on.)

document.addEventListener('DOMContentLoaded', () => {
  const animationClasses = [
    'fade-in', 'fade-up', 'fade-down', 'fade-left', 'fade-right', 'fade-out',
    'zoom-in', 'zoom-out', 'flip-up', 'flip-down', 'rotate-in', 'bounce-in'
  ];
  const selector = animationClasses.map(name => `.${name}`).join(', ');
  const targets = document.querySelectorAll(selector);

  // No IntersectionObserver support (very old browsers) — just show everything.
  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        // Remove the class so the animation replays next time it
        // scrolls into view. Delete this "else" block if you want
        // each element to animate once only, the first time it appears.
        entry.target.classList.remove('in-view');
      }
    });
  }, {
    threshold: 0.15,   // start animating once 15% of the element is visible
    rootMargin: '0px 0px -40px 0px'
  });

  targets.forEach(el => observer.observe(el));
});