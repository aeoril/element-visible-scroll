// Copyright © 2019 by Xitalogy.  MIT License.  http://opensource.org/licenses/MIT

(() => {
  'use strict';

  let prevOutput = null;
  let output;
  let scrolls = 0;

  function scroll (triggerElem, outputElem, scrollsArg) {
    let triggerRect = triggerElem.getBoundingClientRect();

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

  window.addEventListener('load', () => {

    let triggerElem = document.getElementById('trigger');
    let outputElem = document.getElementById('output');

    let rAFRateLimitedScroll = rAFRateLimit(scroll.bind(null, triggerElem, outputElem));

    window.addEventListener('scroll', () => {
      rAFRateLimitedScroll(++scrolls);
    }, false);

    outputElem.addEventListener('click', () => {

      for (let ii = 0; ii < 10000; ii++) {
        rAFRateLimitedScroll(++scrolls);
      }
    }, false);

    rAFRateLimitedScroll(++scrolls);

    // let rAFRateLimitedError = rAFRateLimit();
  }, false);
})();
