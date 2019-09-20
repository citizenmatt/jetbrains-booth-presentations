// Simple plugin to animate in each child element of a <section>
// author: Matt Ellis
//
// Heavily based on the Appearance plugin - https://github.com/Martinomagnifico/reveal.js-appearance
// Requires Animate.css - https://daneden.github.io/animate.css/


const Staggered = window.Staggered || (function(){

    let options = Reveal.getConfig().staggered || {};

    let defaultOptions = {
        baseclass: 'animated',
        visibleclass: 'in',
        effectclass: 'slideInRight',
        hideagain: true,
        delay: 100
    };

    const defaults = function(options, defaultOptions) {
        for (var i in defaultOptions) {
            if (!options.hasOwnProperty(i)) {
                options[i] = defaultOptions[i];
            }
        }
    };

    const showAppearances = function(container) {
        if (event.currentSlide.previousElementSibling === null) {
            return;
        }

        let appearances = Array.prototype.slice.call(container.children);
        let delay = 0;
        appearances.filter((element, i) => {
            let delayincrement = parseInt(element.dataset.delay ? element.dataset.delay : i > 0 ? options.delay : 0);
            delay += delayincrement;
            setTimeout((function() {
                element.classList.add(options.effectclass);
                element.classList.add(options.visibleclass);
            }), delay);
        });
    };

    const hideAppearances = function(container) {
        let disappearances = Array.prototype.slice.call(container.children);
        disappearances.filter(element => {
            element.classList.remove(options.visibleclass);
        });
    };

    const showHideSlide = function(event) {
        showAppearances(event.currentSlide);
		if (event.previousSlide && options.hideagain) {
			hideAppearances(event.previousSlide);
        }
    };

    const init = function() {
        defaults(options, defaultOptions);
        Reveal.addEventListener('slidechanged', showHideSlide, false);
        Reveal.addEventListener('ready', function(event) {
            let sections = document.querySelectorAll('.reveal > .slides > section');
            for (var i = 1; i < sections.length; i++) {
                let children = Array.prototype.slice.call(sections[i].children);
                for (var j = 0; j < children.length; j++) {
                    children[j].classList.add(options.baseclass);
                }
            }
        });
    };

    return {
        init: init
    };
})();

Reveal.registerPlugin('staggered', Staggered);
