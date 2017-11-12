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

  window.addEventListener('load', function () {
    var triggerElem = document.getElementById('trigger');
    var outputElem = document.getElementById('output');

    var rAFRateLimitedOutput = rAFRateLimit(setInnerText.bind(null, outputElem), 0);

    function scroll() {
      var triggerRect = triggerElem.getBoundingClientRect();

      if (triggerRect.bottom > 0 && triggerRect.top < (window.visualViewport ? window.visualViewport.height : window.innerHeight)) {
        output = 'Visible';
      } else {
        output = 'Not visible';
      }
      if (output !== prevOutput) {
        rAFRateLimitedOutput(output);
        prevOutput = output;
      }
    }

    window.addEventListener('scroll', scroll, false);

    scroll();
  }, false);
}());
