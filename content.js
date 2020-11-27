const maxLinks = 10;

// Generates a random sample from an array
function getRandomSubarray(arr, size = maxLinks) {
    if (arr.length < size) {
        size = arr.length;
    }

    let shuffled = arr.slice(0), i = arr.length, min = i - size, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

window.addEventListener("load", () => {
    setTimeout(() => {
        let links = [];
        const aTags = document.getElementsByTagName("A");
        const localHostName = window.location.hostname;
        for (let aTag of aTags) {
            try {
                let url = new URL(aTag.href);
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
        for (let i = 0; i < links.length; i++) {
            links[i] = links[i].split("#")[0];
        }

        // Send message to background script to see if we should open the pages (based on depth)
        chrome.runtime.sendMessage({links: links}, (response) => {
            const link = response.link;
            if (link !== null) {
                window.location = link;
            }
        })
    }, 500)
}, false);