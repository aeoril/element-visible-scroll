/*
 * Copyright © 2017 by IC3 Dimensions.  MIT License.  See LICENSE.MD
 */

(function () {
  'use strict';

  var prevOutput = null;
  var output;

  function setInnerText(elem, str) {
    elem.innerText = str;
    console.log(str);
  }

  function throttle (func, duration) {

    var rAFId = null;
    var prevNow = -1;

    return function (...args) {
      var now = performance.now();

      if (prevNow !== -1 && now - prevNow < duration) {
        return;
      }

      prevNow = now;

      if (rAFId) {
        window.cancelAnimationFrame(rAFId);
      }

      rAFId = window.requestAnimationFrame(function (timestamp) {
        func(...args, timestamp);
        rAFId = null;
      });
    };
  }

  window.addEventListener('load', function () {
    var triggerElem = document.getElementById("trigger");
    var outputElem = document.getElementById("output");

    var throttledOutput = throttle(setInnerText.bind(null, outputElem), 0);

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
