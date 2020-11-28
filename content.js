var maxLinks = 3;

// Generates a random sample from an array
function getRandomSubarray(arr, size) {
    // EC5 doesn't have default parameters
    if (typeof size === "undefined") {
        size = maxLinks;
    }

    if (arr.length < size) {
        size = arr.length;
    }

    var shuffled = arr.slice(0), i = arr.length, min = i - size, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

// Extracts the host from a URL
// Based on
function getLocation(href) {
    var reURLInformation = new RegExp([
        '^(https?:)//', // protocol
        '(([^:/?#]*)(?::([0-9]+))?)', // host (hostname and port)
        '(/{0,1}[^?#]*)', // pathname
        '(\\?[^#]*|)', // search
        '(#.*|)$' // hash
    ].join(''));
    var match = href.match(reURLInformation);
    return match && {
        href: href,
        protocol: match[1],
        host: match[2],
        hostname: match[3],
        port: match[4],
        pathname: match[5],
        search: match[6],
        hash: match[7]
    }
}

window.addEventListener("load", function() {
    setTimeout(function() {
        var links = [];
        var aTags = document.getElementsByTagName("A");
        var localHostName = window.location.hostname;
        for (var i = 0; i < aTags.length; i++) {
            var aTag = aTags[i];
            try {
                var url = getLocation(aTag.href);
                // Only add links from the same domain
                if (url.hostname === localHostName) {
                    links.push(aTag.href);
                }
            } catch (e) {
                console.log("failed to generate URL");
            }
        }
        links = getRandomSubarray(links);

        // Remove the '#' character, it was causing errors and doesn't change the actual url
        for (var j = 0; j < links.length; j++) {
            links[j] = links[j].split("#")[0];
        }

        // Send message to background script to see if we should open the pages (based on depth)
        chrome.runtime.sendMessage({links: links}, function(response) {
            var link = response.link;
            if (link !== null) {
                window.location = link;
            }
        })
    }, 500)
}, false);