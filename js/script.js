const itemNav = document.querySelectorAll('.itemNav li a');
const showFeature = document.querySelector('.showFeature');
let itemNavId = '';
let closeFeature = '';
let cover = '';
let root = document.documentElement;
let initX = root.style.setProperty('--xpos', 150);
let initY = root.style.setProperty('--ypos', 350);

itemNav.forEach(function (item) {
  item.onclick = function (e) {
    e.preventDefault();
    if (itemNavId == '') {
      itemNavId = this.getAttribute('id');
      showFeature.scrollIntoView();
      getFeature();
    } else {
      itemNav.forEach(function (item) {
        item.classList.remove('is-active');
      });
      close(e);
      itemNavId = this.getAttribute('id');
      getFeature();
    }

    this.classList.toggle('is-active');

  }
});

function getFeature() {
  showFeature.classList.add('show', 'show-' + itemNavId);
  closeFeature = document.querySelector('.contentItem-' + itemNavId + ' .close');
  closeFeature.addEventListener('click', close);
  cover = document.querySelector('.contentItem-' + itemNavId + ' .placeholder');
  setTimeout(coverOut, 1500);
  move();
}

function move() {
  let placeholder = document.querySelector('.contentItem-' + itemNavId + ' .contentItem-text');
  let listener = placeholder.addEventListener(('touchstart', 'touchmove', 'mouseenter', 'mousemove'), e => {
    root.style.setProperty('--xpos', -e.clientX + (placeholder.offsetHeight / 2) + "px");
    root.style.setProperty('--ypos', -e.clientY + (placeholder.offsetHeight / 2) + "px");
  })
  placeholder.removeEventListener(('touchend', 'touchleave', 'mouseout', 'mouseleave'), listener);
}

function coverOut() {
  cover.classList.add('is-active');
}

function close(e) {
  e.preventDefault();
  showFeature.classList = 'showFeature';
  itemNavId = '';
  cover.classList.remove('is-active');
  initX = root.style.setProperty('--xpos', 150);
  initY = root.style.setProperty('--ypos', 350);
  clearTimeout(coverOut);
}
