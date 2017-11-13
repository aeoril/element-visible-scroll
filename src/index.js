/*
 * Copyright © 2017 by IC3 Dimensions.  MIT License.  See LICENSE.MD
 */

(function () {
  'use strict';

  var prevOutput = null;
  var output;
  var scrolls = 0;

  function scroll(triggerElem, outputElem, scrollsArg) {
    var triggerRect = triggerElem.getBoundingClientRect();

    if (triggerRect.bottom > 0 && triggerRect.top < (window.visualViewport ? window.visualViewport.height : window.innerHeight)) {
      output = 'Visible';
    } else {
      output = 'Not visible';
    }
    //if (output !== prevOutput) {
      outputElem.innerText = output;
      console.log(output + ' ' + scrollsArg);

      //prevOutput = output;
    //}

    scrolls = 0;
  }

  window.addEventListener('load', function () {

    var triggerElem = document.getElementById('trigger');
    var outputElem = document.getElementById('output');

    var rAFRateLimitedScroll = rAFRateLimit(scroll.bind(null, triggerElem, outputElem));

    window.addEventListener('scroll', function () {
      rAFRateLimitedScroll(++scrolls);
    }, false);

    outputElem.addEventListener('click', function () {

      for (var ii = 0; ii < 10000; ii++) {
        rAFRateLimitedScroll(++scrolls);
      }
    }, false);

    rAFRateLimitedScroll(++scrolls);
  }, false);
}());
