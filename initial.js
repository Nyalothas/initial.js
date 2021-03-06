(function ($) {
    
        var unicode_charAt = function(string, index) {
            var first = string.charCodeAt(index);
            var second;
            if (first >= 0xD800 && first <= 0xDBFF && string.length > index + 1) {
                second = string.charCodeAt(index + 1);
                if (second >= 0xDC00 && second <= 0xDFFF) {
                    return string.substring(index, index + 2);
                }
            }
            if(string[index] === undefined) 
            {  
                return string[0];
            }
            return string[index];
        };
    
        var unicode_slice = function(string, start, end) {
            var accumulator = "";
            var character;
            var stringIndex = 0;
            var unicodeIndex = 0;
            var length = string.length;
    
        while (stringIndex < length) {
                character = unicode_charAt(string, stringIndex);
                if (unicodeIndex >= start && unicodeIndex < end) {
                    accumulator += character;
                }
                stringIndex += character.length;
                unicodeIndex += 1;
            }
            return accumulator;
        };
    
        /*
        var hasWords = function (name) {
            var values = name.split(' ');
            if (values.length > 1) {
                //two or more words
                return true;
            } else {
                return false;
            }
        };
        */
    
        var splitName = function (name) {
            var values = name.split(' ');
            return values[0][0] + values[1][0];
        };
    
        $.fn.initial = function (options) {
    
            // Defining Colors
            var colors = ["#1abc9c", "#16a085", "#f1c40f", "#f39c12", "#2ecc71", "#27ae60", "#e67e22", "#d35400", "#3498db", "#2980b9", "#e74c3c", "#c0392b", "#9b59b6", "#8e44ad", "#bdc3c7", "#34495e", "#2c3e50", "#95a5a6", "#7f8c8d", "#ec87bf", "#d870ad", "#f69785", "#9ba37e", "#b49255", "#b49255", "#a94136"];
            var finalColor;
    
            return this.each(function () {
    
                var e = $(this);
                var settings = $.extend({
                    // Default settings
                    name: 'Name',
                    color: null,
                    seed: 0,
                    charCount: 1,
                    textColor: '#ffffff',
                    height: 100,
                    width: 100,
                    fontSize: .60, // 60% of height
                    fontWeight: 400,
                    fontFamily: 'Source Sans Pro, Calibri, Candara, Arial, sans-serif',
                }, options);
    
                // overriding from data attributes
                settings = $.extend(settings, e.data());
    
                if (settings.fontSize < 1) {
                    // if font size < 1 presume that this is a percentage of height
                    // e.g. - settings.fontSize: .45
                    settings.fontSize = parseInt(settings.height * settings.fontSize);
                } else if (settings.fontSize.toString().indexOf("%") > 1) {
                    // if font size has % character calculate it from height
                    // e.g. - settings.fontSize: "45%"
                    settings.fontSize = parseInt(settings.height * (parseInt(settings.fontSize.replace("%", "")) / 100));
                }
    
                // making the text object
                var c = null;
                settings.name +='';
                settings.name = settings.name.trim();
                if (settings.name.indexOf(' ') != -1) {  //there is at least one space inside
                    c = splitName(settings.name).toUpperCase();
                } else {
                    c = unicode_slice(settings.name, 0, parseInt(settings.charCount) > parseInt(settings.name.length) ? settings.charCount : 1).toUpperCase();
            }
    
                var cobj = $('<text text-anchor="middle"></text>').attr({
                    'y': '50%',
                    'x': '50%',
                    'dy': '0.35em',
                    'pointer-events': 'auto',
                    'fill': settings.textColor,
                    'font-family': settings.fontFamily
                }).html(c).css({
                    'font-weight': settings.fontWeight,
                    'font-size': settings.fontSize + 'px'
                });
    
                if (settings.color === null) {
                    var colorIndex = Math.floor((c.charCodeAt(0) + settings.seed) % colors.length);
                    finalColor = colors[colorIndex];
                } else {
                    finalColor = settings.color;
                }
    
                var svg = $('<svg></svg>').attr({
                    'xmlns': 'http://www.w3.org/2000/svg',
                    'pointer-events': 'none',
                    'width': settings.width,
                    'height': settings.height
                }).css({
                    'background-color': finalColor,
                    'width': settings.width + 'px',
                    'height': settings.height + 'px'
                });
    
                svg.append(cobj);
                // svg.append(group);
                var svgHtml = window.btoa(unescape(encodeURIComponent($('<div>').append(svg.clone()).html())));
    
                e.attr("src", 'data:image/svg+xml;base64,' + svgHtml);
                
                // tests start here
                e.attr("testoutput",c); return c;
                // tests end here
            });
        };
    
    }(jQuery));
    