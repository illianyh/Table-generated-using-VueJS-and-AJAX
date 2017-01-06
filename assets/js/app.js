var vm = new Vue({ // Create Instace
    el: '#myApp',  // Decide Application Scope or Element In which Our Code Execute
    data: { // Default Variable or Array Init.
        tableTd: [],
        totalPrice: 0,
        timeInterval: true,
        myUrl: window.location.href+'/ajax.php', // File Name where Ajax Fire
        
    },
    ready: function () { // Execute When Page Loading successed
        this.getAjaxData();
    },
    methods: { // Define Methods 

        /**
         * This Method used to get data from backend
        */
        getAjaxData: function () {
            var self = this; // Take Current Variable or Vue Instace
            var _url = this.myUrl; // Get Url From current Instace

            // This is Ajax Code Where I used " vue-resource " Component provide by github
            // Check this link for more information https://github.com/pagekit/vue-resource/
            // it provide us way to fire ajax within vue components
            
            this.$http.get(_url)
            .success(function (result) { // If result get success then this code execute
                if (result != '' && result.hasOwnProperty('data')) { // Check result is empty and result have 'data' property
                    this.pushValueData(result); // Method Call
                }
            }).error(function (err) { // Execute if any error rise
                self.tableTd = [];
                clearInterval(self.timeInterval); // If Any error rise then automatic interval stop
                alert('Error !!!' + err);
            });
        },
        /**
         * This Method used to add new items to array.
        */
        pushValueData: function (result) {
            var self = this; // Take Current Variable or Vue Instace
            var sum = 0;
            this.tableTd = []; //  All time remove existing records
            $.each(result.data, function (index, value) { // Loop becaouse we get result in json object or multple rows
                var date = new Date(value.date * 1000).format("yyyy-mm-dd H:mm"); // Convert Time stamp to readable formate
                sum += parseFloat(value.price); // Sum of price
                var row = { date: date, title: value.title, price: parseFloat(value.price).toFixed(2) }; // we have three properties so create single object with three properties
                self.tableTd.push(row); // add into vue js existing Instace so directly print in table.
                self.totalPrice = parseFloat(sum).toFixed(2); // For total price
            });
        }
    },
    created: function () {
        var self = this;
        self.timeInterval = setInterval(function () { // Function used to create new request every 60 second
            self.getAjaxData();
        }, 60000)
    }
});


// This is Time Formate Function For Good reference Check Below Link
// http://stackoverflow.com/questions/23946698/changing-date-time-format-using-jquery-javascript#answer-23948956
var dateFormat = function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        timezoneClip = /[^-+\dA-Z]/g,
        pad = function (val, len) {
            val = String(val);
            len = len || 2;
            while (val.length < len) val = "0" + val;
            return val;
        };

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var _ = utc ? "getUTC" : "get",
            d = date[_ + "Date"](),
            D = date[_ + "Day"](),
            m = date[_ + "Month"](),
            y = date[_ + "FullYear"](),
            H = date[_ + "Hours"](),
            M = date[_ + "Minutes"](),
            s = date[_ + "Seconds"](),
            L = date[_ + "Milliseconds"](),
            o = utc ? 0 : date.getTimezoneOffset(),
            flags = {
                d: d,
                dd: pad(d),
                ddd: dF.i18n.dayNames[D],
                dddd: dF.i18n.dayNames[D + 7],
                m: m + 1,
                mm: pad(m + 1),
                mmm: dF.i18n.monthNames[m],
                mmmm: dF.i18n.monthNames[m + 12],
                yy: String(y).slice(2),
                yyyy: y,
                h: H % 12 || 12,
                hh: pad(H % 12 || 12),
                H: H,
                HH: pad(H),
                M: M,
                MM: pad(M),
                s: s,
                ss: pad(s),
                l: pad(L, 3),
                L: pad(L > 99 ? Math.round(L / 10) : L),
                t: H < 12 ? "a" : "p",
                tt: H < 12 ? "am" : "pm",
                T: H < 12 ? "A" : "P",
                TT: H < 12 ? "AM" : "PM",
                Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
            };

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
} ();

// Some common format strings
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    monthNames: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
};

// For convenience...
// Simple Method Inject in Date Class
Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};
