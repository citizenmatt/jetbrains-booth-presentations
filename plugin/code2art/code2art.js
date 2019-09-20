const Code2Art = window.Code2Art || (function() {

    let options = Reveal.getConfig().code2art || {};

    let defaultOptions = {
    };

    const defaults = function(options, defaultOptions) {
        for (var i in defaultOptions) {
            if (!options.hasOwnProperty(i)) {
                options[i] = defaultOptions[i];
            }
        }
    };

    const init = function() {
        defaults(options, defaultOptions);
        // TODO: Add a listener for slidechanged, find product, update presets?
        Reveal.addEventListener('ready', function(event) {
            if (window.runGenScene) {
                window.runGenScene();
            } else {
                console.error('Scene not found')
            }
        });
    };

    return {
        init: init
    }
})();

Reveal.registerPlugin('code2art', Code2Art);
