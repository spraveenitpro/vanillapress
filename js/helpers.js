/**
 * Helper file for extra helper functions
 */

/**
 * Main helper object
 */
var helpers = {};

/**
 * Creates a list item with link inside for menus
 */

helpers.createMenuItem = function(contentObj) {
  var menuItemEl = document.createElement("li");
  menuItemEl.appendChild(helpers.createLink(contentObj));
  return menuItemEl;
};

/**
 * Creates link
 */

helpers.createLink = function(contentObj) {
  var linkEl = document.createElement("a"),
    linkTitle = document.createTextNode(contentObj.title);
  linkEl.appendChild(linkTitle);

  if ("home" === contentObj.slug) {
    linkEl.href = "#";
  } else {
    linkEl.href = "#" + contentObj.slug;
  }
  return linkEl;
};

/**
 * Gets page title from the DOM
 * @return {Object} Main page title DOM object
 */
helpers.getPageTitleEl = function() {
  return document.getElementById("pageTitle");
};

/**
 * Gets page content from the DOM
 * @return {Object} Main content DOM object
 */
helpers.getPageContentEl = function() {
  return document.getElementById("pageContent");
};

/**
 * Gets main menu from the DOM
 * @return {Object} Main page title DOM object
 */
helpers.getMainMenuEl = function() {
  return document.querySelector("#mainNav ul ");
};
