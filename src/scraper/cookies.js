function getCookies() {
    var cookies = document.cookie.split(';');
    var retVal = {};
    for (var i = 1 ; i <= cookies.length; i++) {
        var s = cookies[i-1].trim();
        var pattern = /(^[^=]*)=/i;
        var key = (pattern.exec(s))[1];

        var pattern_2 = /(^[^=]*)=(.*)/i;
        var value = (pattern_2.exec(s))[2];

        retVal[key] = value;
    }
    return retVal;
}

var url = document.URL;
console.log(url);

var cookies = getCookies();
console.log(cookies);

var result = {}
result["url"] = url;
result["cookies"] = cookies;
console.log(result);