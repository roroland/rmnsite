"use strict";

const itemAnim = document.querySelectorAll('.animatable');
const imgAll = document.querySelectorAll('img');
const imgLazy = document.querySelectorAll('.lazy');
const showFeature = document.querySelector('.showFeature');
const itemGeneric = document.querySelectorAll('.generic');

let cover = '';
let coverActive = '';
let root = document.documentElement;
let initX = root.style.setProperty('--xpos', 150);
let initY = root.style.setProperty('--ypos', 350);
let imgSrc = '';

// More about
const more = document.querySelector('#more');
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
const itemNav = document.querySelectorAll('.itemNav > li > a');
itemNav.forEach(function (item) {
  let itemNavId = item.getAttribute('id');
  item.addEventListener('click', function (e) {
    e.preventDefault();
    itemNav.forEach(function (item) {
      item.classList.remove('is-active');
    });
    item.classList.toggle('is-active');
    console.log(itemNavId);
    getFeature(itemNavId);
  });
});

let uiAnim = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      entry.target.style.animation = `${entry.target.dataset.anim} .75s ${entry.target.dataset.delay} ease-out forwards`;
      if(entry.target.dataset.duration != null){
        entry.target.style.animation = `${entry.target.dataset.anim} ${entry.target.dataset.duration} ${entry.target.dataset.delay} ease-out forwards`;
      }
      uiAnim.unobserve(entry.target);
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


const navWrapper = document.querySelector('.intro');
const navWrapperDest = document.querySelector('.mainNav');

const options = {
  root: null, // sets the framing element to the viewport
  threshold: 0.5
}
function handleIntersection(entries) {

  entries.map((entry) => {
    if (entry.isIntersecting) {
      navWrapperDest.classList.add('is-top');
    } else {
      navWrapperDest.classList.remove('is-top');
    }
  });
}

const menuobserver = new IntersectionObserver(handleIntersection, options);
menuobserver.observe(navWrapper);
 

imgLazy.forEach(item => {
  imgObs.observe(item);
});

itemAnim.forEach(itm => {
  uiAnim.observe(itm)
});

itemGeneric.forEach(itmgen => {
  generic.observe(itmgen)
});


// Open feature
function getFeature(itemNavId) {
  const closeLink = document.querySelector('.close');
  if (itemNavId === 'layout') {
    fetch('./content/layout.html')
    .then(function (response) {
      console.log(response.ok);
      return response.text();
    })
    .then(function (data) {
      document.getElementById('templateLayout').innerHTML = data;
      featureUI(itemNavId, closeLink);
    })
  } else if (itemNavId === 'rwd') {
    fetch('./content/rwd.html')
    .then(function (response) {
      console.log(response.ok);
      return response.text();
    })
    .then(function (data) {
      document.getElementById('templateRwd').innerHTML = data;
      featureUI(itemNavId, closeLink);
    })
  } else if (itemNavId === 'css') {
    fetch('./content/css.html')
    .then(function (response) {
      console.log(response.ok);
      return response.text();
    })
    .then(function (data) {
      document.getElementById('templateCss').innerHTML = data;
      featureUI(itemNavId, closeLink);
    })
  } else if (itemNavId === 'music') {
    fetch('./content/music.html')
    .then(function (response) {
      console.log(response.ok);
      return response.text();
    })
    .then(function (data) {
      document.getElementById('templateMusic').innerHTML = data;
      featureUI(itemNavId, closeLink);
    })
  } else if (itemNavId === 'ui') {
    fetch('./content/ui.html')
    .then(function (response) {
      console.log(response.ok);
      return response.text();
    })
    .then(function (data) {
      document.getElementById('templateUi').innerHTML = data;
      featureUI(itemNavId, closeLink);
    })
  }
}

let featureUI = function (itemNavId, closeLink) {
  coverActive = true;
  showFeature.className = '';
  showFeature.classList.add('showFeature', 'show', 'show-' + itemNavId);
  showFeature.scrollIntoView({block: 'center'});
  cover = document.querySelector('.contentItem-' + itemNavId + ' .placeholder');
  closeLink.addEventListener('click', close);
  
  subRun();
  
  let time = setTimeout(() => {
    coverActive = false;
    if (cover !== null) {
      cover.classList.add('is-active');
    }
    if (coverActive == false) {
      clearTimeout(time);
      move(itemNavId);
      console.log('cleared');
    }
  }, 1000);
}

// Move placeholder
function move(itemNavId) {
  let wait = false;
  let placeholder = document.querySelector('.contentItem-' + itemNavId + ' .contentItem--wrapper .placeholder');
  let listener = placeholder.addEventListener(('mouseenter', 'mousemove'), e => {
    if (!wait) {
      wait = true;
        root.style.setProperty('--xpos', -e.clientX + (screen.width - placeholder.offsetWidth)  + "px");
        root.style.setProperty('--ypos', -e.clientY + (screen.height - placeholder.offsetHeight )  + "px");
      setTimeout(function () { wait = false; }, 25);
    }
  })
  placeholder.removeEventListener(('mouseout', 'mouseleave'), listener);
}

// Close feature modal
function close(e) {
  e.preventDefault();
  showFeature.classList = 'showFeature';
  e.itemNavId = '';
  if (cover !== null) {
    cover.classList.remove('is-active');
  }
  initX = root.style.setProperty('--xpos', 150);
  initY = root.style.setProperty('--ypos', 350);
  window.scrollBy(0, -window.innerHeight/2);
}

// Sub menu
function subRun() {
  let sub = document.querySelectorAll('.subMenu > li > a');
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

// Gsap interactions
const tlm = gsap.timeline({});
const usa = document.querySelector('.lines .usa');
const city = document.querySelector('.city');
const usa2 = document.querySelector('.lines .usa_2');
const spain = document.querySelector('.lines .spain');
tlm.pause();

tlm.to(".world", { duration: 3, opacity:1, translateX: 0, translateY: 0, scale:1, ease: 'power2.out'}, 0);
tlm.to(".worldVector", { duration: 4, scale:1, translateX: -910, ease: 'power1.out' }, 0);
tlm.to(city, { duration: 1, scale: 1, ease: 'power3.out' });
tlm.to(usa, { duration: 1, opacity: 1, strokeDashoffset: 0 });
tlm.to(usa2, { duration: 1, opacity: 1, strokeDashoffset: 0 });
tlm.to(spain, { duration: 1, opacity: 1, strokeDashoffset: 0 });

const introLm = gsap.timeline({});
const hero = document.querySelector('.heroText');
const subMask = document.querySelector('.submask');
const avatarImg = document.querySelector('.avatar-img');
const avatarLines = document.querySelector('.avatar--wrapper h3');
const avatarText = document.querySelector('.avatar--wrapper h4');
const mainNav = document.querySelector('.mainNav');

if (window.matchMedia("(min-width: 48em)").matches) {
  introLm.to(hero, { duration: 1, opacity: 1, translateY: 0, ease: 'power2.out' }, 0);
  introLm.to(hero, { duration: 1.5, translateY: -150, ease: 'power2.out' }, "+=4.75");
  introLm.to(avatarLines, { duration: 3, opacity: 1, ease: 'power2.out' }, "-=1");
  introLm.to(avatarImg, { duration: 3, opacity: 1, ease: 'power2.out' }, "-=2");
  introLm.to(avatarText, { duration: 3, opacity: 1, ease: 'power2.out' }, "-=2");
  introLm.to(mainNav, { duration: 3, opacity: 1, ease: 'power2.out' }, "-=2");
  introLm.to(hero, { duration: 1.5, translateY: -150, css: { borderColor: "#E5E5E5" }, ease: 'power2.out' }, "-=2");
} else {
  introLm.to(hero, { duration: 1, opacity: 1, translateY: 0, ease: 'power2.out' }, 0);
  introLm.to(hero, { duration: 1.5, translateY: 0, ease: 'power2.out' }, "+=4.75");
  introLm.to(avatarLines, { duration: 3, opacity: 1, ease: 'power2.out' }, "-=1");
  introLm.to(avatarImg, { duration: 3, opacity: 1, ease: 'power2.out' }, "-=2");
  introLm.to(avatarText, { duration: 3, opacity: 1, ease: 'power2.out' }, "-=2");
  introLm.to(mainNav, { duration: 3, opacity: 1, ease: 'power2.out' }, "-=2");
  introLm.to(hero, { duration: 1.5, translateY: 0, css: { borderColor: "#E5E5E5" }, ease: 'power2.out' }, "-=2");
}


