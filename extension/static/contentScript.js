// This script has access to the DOM
console.log('Content script loaded');
// document.body.style.backgroundColor = 'yellow';  // Example of DOM manipulation

// Sending DOM data to your Svelte component
const domData = document.title;  // For example, getting the page title
const images = Array.from(document.getElementsByTagName('img')).map(img => img.src);
chrome.runtime.sendMessage({type: "IMG_DATA", payload: images});

chrome.runtime.sendMessage({type: "DOM_DATA", payload: domData});
