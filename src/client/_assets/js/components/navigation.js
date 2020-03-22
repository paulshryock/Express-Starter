/**
  * The main navigation object
  */
const navigation = {}

/**
  * Initializes the main navigation object
  */
navigation.init = function () {
  navigation.addMobileNavigation()
}

/**
  * Adds mobile navigation menu toggle button
  */
navigation.addNavButton = function () {
  const nav = document.querySelector('.navigation')
  const menu = document.querySelector('.navigation ul')
  const button = document.createElement('button')
  const span = document.createElement('span')

  span.textContent = 'Menu'
  button.classList.add('navigation__toggle')
  button.appendChild(span)
  button.setAttribute('aria-expanded', 'false')
  nav.setAttribute('aria-expanded', 'false')

  nav.insertBefore(button, menu)
}

/**
  * Removes mobile navigation menu toggle button
  */
navigation.removeNavButton = function () {
  const nav = document.querySelector('.navigation')
  const button = nav.querySelector('button')

  if (button) {
    nav.removeChild(button)
  }
}

/**
  * Hides mobile navigation menu
  */
navigation.hideNavMenu = function () {
  const nav = document.querySelector('.navigation')
  const menu = nav.querySelector('ul')

  menu.setAttribute('hidden', '')
  menu.classList.remove('is-active')
  nav.setAttribute('aria-expanded', 'false')

  navigation.setNavButtonText('Menu')
}

/**
  * Shows mobile navigation menu
  */
navigation.showNavMenu = function () {
  const nav = document.querySelector('.navigation')
  const menu = nav.querySelector('ul')

  menu.removeAttribute('hidden')
  menu.classList.add('is-active')
  nav.setAttribute('aria-expanded', 'true')

  navigation.setNavButtonText('Close')
}

/**
  * Sets mobile navigation menu toggle button text
  */
navigation.setNavButtonText = function (text) {
  const button = document.querySelector('.navigation__toggle span')

  if (button) {
    button.textContent = text
  }
}

/**
  * Toggles navigation button and menu elements' states
  */
navigation.toggleNavElementsStates = function () {
  const menu = document.querySelector('.navigation ul')
  const links = menu.querySelectorAll('a')

  if (menu.classList.contains('is-active')) {
    this.setAttribute('aria-expanded', 'false')
    navigation.hideNavMenu()
  } else {
    this.setAttribute('aria-expanded', 'true')
    navigation.showNavMenu()
    links[0].focus()
  }
}

/**
  * Toggles navigation button and menu elements
  *
  * param {string} mediaQuery
  */
navigation.toggleNavElements = function (mediaQuery) {

  if (mediaQuery.matches) { // Tablet and up
    const button = document.querySelector('.navigation__toggle')
    if (button) {
      button.removeEventListener('click', navigation.toggleNavElementsStates, false)
    }
    navigation.removeNavButton()
    navigation.showNavMenu()
  } else { // Mobile
    navigation.addNavButton()
    navigation.hideNavMenu()
    const button = document.querySelector('.navigation__toggle')
    if (button) {
      button.addEventListener('click', navigation.toggleNavElementsStates, false)
    }
  }
}

/**
  * The media query for non-mobile navigation
  */
navigation.mediaQuery = '37.5rem'

/**
  * Adds mobile navigation
  */
navigation.addMobileNavigation = function () {
  const mediaQuery = window.matchMedia(`(min-width: ${navigation.mediaQuery})`)

  // Call listener function at run time
  navigation.toggleNavElements(mediaQuery)
  // Attach listener function on state changes
  mediaQuery.addListener(navigation.toggleNavElements)
}

/**
  * Initialize the main navigation object
  */
navigation.init()
