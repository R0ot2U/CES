//Context menu dodge function, after onload
chrome.runtime.sendMessage({ msg: "context_dodge" }, function () { });