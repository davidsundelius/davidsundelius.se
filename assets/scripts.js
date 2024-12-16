window.onload = () => {
  document.onscroll = () => {
    let navbar = document.getElementById('navbar');
    if(document.documentElement.scrollTop > 60 && navbar.className.indexOf('opaque') === -1) {
      navbar.classList.add('opaque');
    } else if(document.documentElement.scrollTop < 60 && navbar.className.indexOf('opaque') > -1) {
      navbar.classList.remove('opaque');
    }
  };

  document.getElementById('menuToggler').onclick = () => {
    document.getElementById('submenu').classList.toggle('d-block');
  };
};
