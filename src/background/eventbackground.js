//var baseURL = "http://localhost:8888/";
var baseURL = "http://ds-01.cs.columbia.edu:8888/";
var exp = "rodrigo-tests"

var userId = "";
getUserId();
chrome.runtime.onMessage.addListener(onMessageReceived);

/**
 * Handler for messages from the pages. Send the content to the server
 */
function onMessageReceived(request, sender, sendResponse) {
  console.log("userId "+userId);

  console.log(request);
  if (request.content == "targeted") {
    sendContent(JSON.stringify({"object": request, "userId": userId}), baseURL+"target");
  } else if (request.content == "private") {
    sendContent(JSON.stringify({"object": request, "userId": userId}), baseURL+"private");
  }
}

/**
 * Send content to the API.
 * @param {dataString} The data string to send to the API.
 * @param {urlString} The string PATH in the API to send the data to.
 */
function sendContent(dataString, urlString) {
  var xhr = new XMLHttpRequest();
  if (exp.length > 0)
      urlString = urlString+"?exp="+exp
  xhr.open("POST", urlString, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      console.log(xhr.responseText);
    }
  }
  xhr.send(dataString);
}

/**
 * Gets userID from storage (or creates a new one if not there).
 * It sets is to the global userId variable.
 */
function getUserId() {
  chrome.storage.local.get('userId', function(result) {
    var id = result.userId;
    if (!id) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST",baseURL+"user", true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          chrome.storage.local.set({'userId': xhr.responseText});
          userId = xhr.responseText;
        }
      }
      xhr.send("type=user");
    } else {
      userId = result.userId;
    }
  });
}
