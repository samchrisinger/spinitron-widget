'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SpinitronWidget = function () {
    function SpinitronWidget(elementId, station, numTracks) {
        var reloadInterval = arguments.length <= 3 || arguments[3] === undefined ? 5 : arguments[3];
        var showTwitterLinks = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];

        var _this = this;

        var showTimestamps = arguments.length <= 5 || arguments[5] === undefined ? false : arguments[5];
        var showLinks = arguments.length <= 6 || arguments[6] === undefined ? true : arguments[6];

        _classCallCheck(this, SpinitronWidget);

        this.element = document.getElementById(elementId);
        this.attrs = {
            station: station,
            num: numTracks,
            time: showTimestamps ? 1 : 0,
            nolinks: showLinks ? 0 : 1,
            tweets: showTwitterLinks ? 1 : 0
        };

        this.reload();
        window.setInterval(function () {
            return _this.reload();
        }, reloadInterval * 1000);
    }

    _createClass(SpinitronWidget, [{
        key: 'buildQuery',
        value: function buildQuery() {
            var _this2 = this;

            var query = Object.keys(this.attrs).map(function (key) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(_this2.attrs[key]);
            });

            var fn = '_spinitron' + (Math.random().toString() + new Date().getTime()).slice(2, -1);
            window[fn] = function (html) {
                _this2.element.innerHTML = html;
                _this2.script.parentElement.removeChild(_this2.script);
                delete window[fn];
            };
            query.push('callback=' + fn);
            return query;
        }
    }, {
        key: 'reload',
        value: function reload() {
            this.script = document.createElement('script');
            var query = this.buildQuery();
            this.script.src = '//spinitron.com/radio/newestsong.php?' + query.join('&');
            document.getElementsByTagName('head')[0].appendChild(this.script);
        }
    }]);

    return SpinitronWidget;
}();

module.exports = SpinitronWidget;