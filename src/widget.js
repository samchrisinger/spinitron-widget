class SpinitronWidget {
    constructor(
        elementId,
        station,
        numTracks=5,
        reloadInterval=5,
        showTwitterLinks=false,
        showTimestamps=false,
        showLinks=true
    ) {
        this.element = document.getElementById(elementId);
        this.attrs = {
            station: station,
            num: numTracks,
            time: showTimestamps ? 1 : 0,
            nolinks: showLinks ? 0 : 1,
            tweets: showTwitterLinks ? 1 : 0
        };

        this.reload();
        window.setInterval(() => this.reload(), reloadInterval * 1000);
    }

    buildQuery() {
        let query = Object.keys(this.attrs).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(this.attrs[key]);
        });

        var fn = '_spinitron' + (Math.random().toString() + new Date().getTime()).slice(2, -1);
        window[fn] = (html) => {
            this.element.innerHTML = html;
            this.script.parentElement.removeChild(this.script);
            delete window[fn];
        };
        query.push('callback=' + fn);        
        return query;
        
    }

    reload() {
        this.script = document.createElement('script');
        var query = this.buildQuery();
        this.script.src = '//spinitron.com/radio/newestsong.php?' + query.join('&');
        document.getElementsByTagName('head')[0].appendChild(this.script);
    }
}
