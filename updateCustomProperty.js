window.UpdateCustomProperty = (function () {
  function getCustomProperty(elem, prop) {
    return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0
  }

  function setCustomProperty(elem, prop, value) {
    elem.style.setProperty(prop, value)
  }

  function incrementCustomProperty(elem, prop, inc) {
    setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc)
  }

  return { getCustomProperty, setCustomProperty, incrementCustomProperty }
})()
