/*
 * Copyright © 2017 by IC3 Dimensions.  MIT License.  See LICENSE.MD
 */

(function () {
  'use strict';

  var rAFId = null;
  var prevOutput = null;
  var output;

  function setInnerText(elem, str) {
     elem.innerText = str;
     console.log(str);
  }

  function throttle (func, ...args) {
    if (rAFId) {
      cancelAnimationFrame(rAFId);
    }

    rAFId = window.requestAnimationFrame(function () {
      func(...args);
      rAFId = null;
    });
  }

  window.addEventListener('load', function () {
    var triggerElem = document.getElementById("trigger");
    var outputElem = document.getElementById("output");

    var throttledOutput = throttle.bind(null, setInnerText, outputElem);

    function scroll() {
      var triggerRect = triggerElem.getBoundingClientRect();

      if (triggerRect.bottom > 0 && triggerRect.top < (window.visualViewport ? window.visualViewport.height : window.innerHeight)) {
        output = 'Visible';
  		} else {
        output = 'Not visible';
      }
      if (output !== prevOutput) {
        throttledOutput(output);
        prevOutput = output;
      }
    }

    window.addEventListener('scroll', scroll, false);

    scroll();
  }, false);
}());
