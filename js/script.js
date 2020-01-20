const itemNav = document.querySelectorAll('.itemNav > li > a');
const itemAnim = document.querySelectorAll('.animatable');
const imgAll = document.querySelectorAll('img');
const imgLazy = document.querySelectorAll('.lazy');
const showFeature = document.querySelector('.showFeature');
const more = document.querySelector('#more');
const closeLink = document.querySelector('.close');

const tlm = gsap.timeline({});
const usa = document.querySelector('.lines #usa');
const usa2 = document.querySelector('.lines #usa_2');
const spain = document.querySelector('.lines #spain');
const itemGeneric = document.querySelectorAll('.generic');


let itemNavId = '';
let closeFeature = '';
let cover = '';
let root = document.documentElement;
let initX = root.style.setProperty('--xpos', 150);
let initY = root.style.setProperty('--ypos', 350);
let sub = document.querySelectorAll('.subMenu > li > a');

// More about
more.addEventListener('click', function (e) {
  e.preventDefault();
  let moreAbout = document.querySelector('.moreAbout');
  let timeline = document.querySelector('.timeline');
  moreAbout.classList.add('is-open');
  window.scrollTo({
    top: moreAbout.offsetTop * 2,
    behavior: 'smooth',
  })
  this.style.setProperty('display', 'none');
  setTimeout(timeline.classList.add('is-open'), 3000);
});

// Menu
itemNav.forEach(function (item) {
  item.onclick = function (e) {
    e.preventDefault();
    this.classList.toggle('is-active');
    if (itemNavId == '') {
      itemNavId = this.getAttribute('id');
      getFeature();
    } else if (itemNavId !== '') {
      itemNavId = this.getAttribute('id');
      getFeature();
      itemNav.forEach(function (item) {
        item.classList.remove('is-active');
      });
    }
  }
});

let observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      entry.target.style.animation = `${entry.target.dataset.anim} .75s ${entry.target.dataset.delay} ease-out forwards`;
      if(entry.target.dataset.duration != null){
        entry.target.style.animation = `${entry.target.dataset.anim} ${entry.target.dataset.duration} ${entry.target.dataset.delay} ease-out forwards`;
      }
      observer.unobserve(entry.target);
    }
     else {
      entry.target.style.animation = 'none';
    }
  })
});

let generic = new IntersectionObserver((genitems) => {
 genitems.forEach(genitem => {
    if (genitem.intersectionRatio > 0) {
      tlm.resume();
      generic.unobserve(genitem.target);
    }
  })
});

let imgObs = new IntersectionObserver((images) => {
  images.forEach(image => { 
    if (image.intersectionRatio > 0) {
      let obsSrc = image.target.dataset.source;
      image.target.src = obsSrc;
      imgSrc = obsSrc;
      image.target.classList.add('is-active');
      imgObs.unobserve(image.target);
    }
  })
})


imgLazy.forEach(item => {
  imgObs.observe(item);
});

itemAnim.forEach(itm => {
  observer.observe(itm)
});
itemGeneric.forEach(itmgen => {
 generic.observe(itmgen)
});

tlm.pause();


tlm.to(".planet--wrapper", { duration: 3, opacity:1, translateX: 0, translateY: 0, scale:1, ease: 'power2.out'}, 0);
tlm.to("#worldA", { duration: 4, scale:1, translateX: -910, ease: 'power1.out' }, 0);
tlm.to(city, { duration: 1, scale: 1, ease: 'power3.out' });
tlm.to(usa, { duration: 1, opacity: 1, strokeDashoffset: 0 });
tlm.to(usa2, { duration: 1, opacity: 1, strokeDashoffset: 0 });
tlm.to(spain, { duration: 1, opacity: 1, strokeDashoffset: 0 });

// Open feature
function getFeature() {
  coverActive = true;
  showFeature.className = '';
  showFeature.classList.add('showFeature', 'show', 'show-' + itemNavId);
  showFeature.scrollIntoView({block: 'center'});
  cover = document.querySelector('.contentItem-' + itemNavId + ' .placeholder');
  subRun();

    let time = setTimeout(() => {
      coverActive = false;
      if (cover !== null) {
        cover.classList.add('is-active');
      }
      if (coverActive == false) {
       clearTimeout(time);
       move();
       console.log('cleared');
     }
    }, 1000);
}

// Move placeholder
function move() {
  wait = false;
  let placeholder = document.querySelector('.contentItem-' + itemNavId + ' .contentItem--wrapper .contentItem-text');
  let listener = placeholder.addEventListener(('touchstart', 'touchmove', 'mouseenter', 'mousemove'), e => {
    if (!wait) {
      wait = true;
      root.style.setProperty('--xpos', -e.clientX + (placeholder.offsetWidth / 2) + "px");
      root.style.setProperty('--ypos', -e.clientY + (placeholder.offsetHeight / 2) + "px");

      setTimeout(function () { wait = false; }, 25);
    }
  })
  placeholder.removeEventListener(('touchend', 'touchleave', 'mouseout', 'mouseleave'), listener);
}




// Close feature modal
closeLink.addEventListener('click', close);
function close(e) {
  e.preventDefault();
  showFeature.classList = 'showFeature';
  itemNavId = '';
  if (cover !== null) {
    cover.classList.remove('is-active');
  }
  initX = root.style.setProperty('--xpos', 150);
  initY = root.style.setProperty('--ypos', 350);
}

// Sub menu
function subRun() {
  sub.forEach(event => {
    event.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      sub.forEach(anchor => {
        anchor.classList.remove('is-active');
      })
      e.target.classList.add('is-active');
      let ph = e.target.parentNode.parentNode.parentNode;
      ph.classList.toggle('placeholder2');
      ph.classList.toggle('placeholder1');
    }, true)
  })
}
