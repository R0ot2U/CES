//Context menu dodge function, after onload
chrome.runtime.sendMessage({ msg: "context_dodge" }, function () { });


//observer for main body load we'll want to check for the feed to be loaded before starting our next observer. 
function initialLoad () {
    var observer = new MutationObserver(function(mutations) {
        if ($("p").length) {
            console.log("Exist, lets do something");
            observer.disconnect(); 
            //We can disconnect observer once the element exist if we dont want observe more changes in the DOM
        }
    });

    // Start observing
    observer.observe(document.body, { //document.body is node target to observe
        childList: true, //This is a must have for the observer with subtree
        subtree: true //Set to true if changes must also be observed in descendants.
    });
    
    // not sure what this does....
    $(document).ready(function() {
        $("button").on("click", function() {
            $("p").remove();
            setTimeout(function() {
                $("#newContent").append("<p>New element</p>");
            }, 2000);
        });
    });
}

//function for tagging user posts, accepts an object of HTML elements
//TODO: test with more than just the standard chatter feed @ /lightning/page/chatter
function tagUsers(x) {

    Object.keys(x).forEach(key => {
        //filter by only user entity ids for now
        //also filter out the Avatar feed references in posts and comments as this will get messy otherwise
        if (x[key].dataset.id.slice(0,3) != '005' || x[key].parentNode.classList.contains('entityLinkFeedItemImageHover') || x[key].parentNode.classList.contains('cuf-commentAvatarWrapper')) {
            delete x[key];
        } else if (x[key].dataset.id.slice(0,3) === '005') {
            let tag = document.createElement("span");
            //hardcoded CCE tag for everyone currently but we'll need to pull this from stored variables based on userId
            //TODO: also consider for cross org linking looking up by email address and userId matches
            let text = document.createTextNode("CCE");
            tag.appendChild(text);
            tag.classList.add("userTag");

            //If post comment add userComment class for stylying
            if (x[key].parentNode.parentNode.classList.contains('cuf-commentNameLink')) {
                tag.classList.add("userComment");
            } else {
            //else add userPost class for stylign
                tag.classList.add("userPost");
            }
            x[key].parentNode.appendChild(tag)
            }
    });
}