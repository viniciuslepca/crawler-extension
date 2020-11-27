const maxDepth = 5;
let tabs = {};
let curDepths = {};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const tabId = sender.tab.id;
    if (!tabs.hasOwnProperty(tabId)) {
        tabs[tabId] = new Queue();
        curDepths[tabId] = 0;
    }

    // Store the links one level deeper only if not at max depth
    if (curDepths[tabId] <= maxDepth) {
        const newDepth = curDepths[tabId] + 1;
        for (let link of request.links) {
            tabs[tabId].enqueue([link, newDepth])
        }
    }

    // Open next link in the queue and update current depth
    const [nextLink, nextDepth] = tabs[tabId].dequeue();
    curDepths[tabId] = nextDepth;

    console.log(tabs);
    console.log(curDepths);

    sendResponse({link: nextLink});
});