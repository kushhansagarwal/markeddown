// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === "DOM_DATA") {
      console.log('Received data from content script:', message.payload);
      // Process the DOM data here or store it in Svelte's store
    }
  });
  