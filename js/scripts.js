/*
  File: A7/js/scripts.js
  91.461 Assignment 7: Creating a Single-Page Navigation Interface
  Name: Brian Chiang
  School: UMass Lowell, Computer Science
  Email: brian_chiang@student.uml.edu
  Created: November 6, 4:00 PM
  Purpose: This JavaScript file handles the navigation for the single page application.
*/

// The following code was supplied by and taken from Curran Kelleher's examples pages found at
// http://curran.github.io/screencasts/navigation/examples/viewer/#/22

$(document).ready(function() {
  // Stores the cached partial HTML pages. Keys correspond to fragment identifiers.
  // Values ar the text content of each loaded partial HTML file.

  var partialsCache = {}
    
  // Gets the appropriate content for the given fragment identifier.
  // This function implements a simple cache.
  function getContent(fragmentId, callback) {
    // If the page has been fetched before
    if(partialsCache[fragmentId]) {
      // Pass the previously fetched content to the callback
      callback(partialsCache[fragmentId]);
    } 
    else {
      // If the page has not been fetched before, fetch it.
      $.get(fragmentId + ".html", function (content) {
        // Store the fetched content in the cache
        partialsCache[fragmentId] = content;
        // Pass the newly fetched content to the callback
        callback(content);
      });
    }
  }
  // Updates dynamic content based on the fragment identifier
  function navigate() {
    // Isolate the fragment identifier using substr to get rid of the '#'
    var fragmentId = location.hash.substr(1);
    // Set the "content" div innerHTML based on the fragment
    getContent(fragmentId, function (content) {
      $("#content").html(content);
    });
  }
  // If no fragment identifier is provided default to #home
  if(!location.hash) {
    location.hash = "#home";
  }
  // Navigate once to the initial fragment identifier.
  navigate();
    
  // Navigate whenever the fragment identifier value changes.
  $(window).bind('hashchange', navigate);
});