document.addEventListener('DOMContentLoaded', function () {
  const toggleBar = document.getElementById('toggleBar');
  const measurementLabel = document.getElementById('measurement');
  let value = 0;
  const step = 5;

  function updateToggleBar() {
    const maxRight = toggleBar.parentElement.offsetWidth - toggleBar.offsetWidth;
    const ratio = value / 100;
    const right = maxRight * ratio;
    toggleBar.style.left = `${right}px`;
    measurementLabel.textContent = `${value} cm`;
  }

  function increaseValue() {
    value = Math.min(value + step, 100);
    updateToggleBar();
  }

  function decreaseValue() {
    value = Math.max(value - step, 0);
    updateToggleBar();
  }

  toggleBar.addEventListener('mousedown', (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startLeft = toggleBar.offsetLeft;
    const containerWidth = toggleBar.parentElement.offsetWidth - toggleBar.offsetWidth;

    function moveBar(e) {
      e.preventDefault(); // Prevent text selection while dragging
      const deltaX = e.clientX - startX;
      const newLeft = Math.min(Math.max(startLeft + deltaX, 0), containerWidth);
      const ratio = newLeft / containerWidth;
      value = Math.round(ratio * 100);
      updateToggleBar();
    }

    function stopMove() {
      document.removeEventListener('mousemove', moveBar);
      document.removeEventListener('mouseup', stopMove);
    }

    document.addEventListener('mousemove', moveBar);
    document.addEventListener('mouseup', stopMove);
  });

  toggleBar.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      increaseValue();
    } else {
      decreaseValue();
    }
  });

  updateToggleBar();
});