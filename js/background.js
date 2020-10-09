chrome.contextMenus.create({
	title: "Tag All",
	contexts: ["page"],
	id: "tagAll"
});

let sid = null;

function onClickHandler(info, tab) {
    if (info.menuItemId == "tagAll") {
        tagAll(info, tab);
    } else if (info.menuItemId == "checkbox1" || info.menuItemId == "checkbox2") {

    } else {

    }
  };

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	// Don't confuse this with the context dodge listener
	if (typeof request.msg !== 'undefined') {
		//console.log('request msg: '+request.msg);
      if (request.msg === "context_dodge") {
            //console.log("Context Menu Dodge Received!");    
            chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
                let url = tabs[0].url;
                var urlPart = url.match(/[^https:\/\/].?[^\.]*/i);
                chrome.cookies.get({ "url": "https://"+urlPart+".my.salesforce.com", "name": "sid" }, function (f) {
                    sid = f.value;
                });
            });      
		}
		else {
			console.log('We\'ve got an error over here');
		}
  }
});

function tagAll(info, tab) {
}
