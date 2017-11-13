/*
 * Copyright © 2017 by IC3 Dimensions.  MIT License.  See LICENSE.MD
 */

(function () {
  'use strict';

  var prevOutput = null;
  var output;
  var scrolls = 0;

  function scroll() {
    var triggerRect = scroll.args.triggerElem.getBoundingClientRect();

    if (triggerRect.bottom > 0 && triggerRect.top < (window.visualViewport ? window.visualViewport.height : window.innerHeight)) {
      output = 'Visible';
    } else {
      output = 'Not visible';
    }
    //if (output !== prevOutput) {
      scroll.args.outputElem.innerText = output;
      console.log(output + ' ' + scroll.args.scrolls);

      //prevOutput = output;
    //}

    scrolls = 0;
  }

  var rAFRateLimitedScroll = rAFRateLimit(scroll, 0);

  window.addEventListener('load', function () {

    var triggerElem = document.getElementById('trigger');
    var outputElem = document.getElementById('output');

    window.addEventListener('scroll', function () {
      rAFRateLimitedScroll({ triggerElem: triggerElem, outputElem: outputElem, scrolls: ++scrolls });
    }, false);

    outputElem.addEventListener('click', function () {

      for (var ii = 0; ii < 10000; ii++) {
        rAFRateLimitedScroll({ triggerElem: triggerElem, outputElem: outputElem, scrolls: ++scrolls });
      }
    }, false);
    
    rAFRateLimitedScroll({ triggerElem: triggerElem, outputElem: outputElem, scrolls: ++scrolls });
  }, false);
}());
