/*
 * Copyright © 2017 by IC3 Dimensions.  MIT License.  See LICENSE.MD
 */

(function () {
  'use strict';

  var prevOutput = null;
  var output;
  var scrolls = 0;

  function setInnerText(elem, str) {
    elem.innerText = str;
    console.log(str + ' ' + scrolls);
    scrolls = 0;
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
      //if (output !== prevOutput) {
        scrolls++;
        rAFRateLimitedOutput(output);
        prevOutput = output;
      //}
    }

    window.addEventListener('scroll', scroll, false);

    scroll();

    outputElem.addEventListener('click', function () {

      for (var ii = 0; ii < 100; ii++) {
        scroll();
      }
    }, false);
  }, false);
}());
