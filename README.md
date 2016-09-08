# spinitron-widget

> A simple auto-reloading Spinitron widget.

## Usage

The compiled JS lives in lib/widget.

```html
<head>
    ...
    <script src="lib/widget.js" type="text/javascript"></script>
    ...
</head>
<body>
    <div id="widget"></div>
    <script type="text/javascript">
        var elementId = 'widget';
        var station = <your_station>;
        var numTracks = 10; // optional; number of tracks to show
        var reloadInterval = 5; // optional; seconds between reloads
        var showTwitterLinks = false; // optional
        var showTimestamps = false; // optional
        var showLinks = true; // optional

        new SpinitronWidget(elementId, station, numTracks, reloadInterval, showTwitterLinks, showTimestamps, showLinks);
    </script>
<body>
```
