/**
 * Code for the Editor
 */

/**
 * The main Editor object
 *
 */
var editor = {};

editor.currentContent = "";
editor.unSavedContent = false;

/**
 * Initializes the VanillaPress app
 *
 */
editor.init = function() {
  editor.listenEditorToggle();
};

/**
 * Updates local storage for post or page
 *
 */
editor.saveContent = function(event) {
  event.preventDefault();
  model.updateContent(editor.currentContent);
  editor.unSavedContent = false;
};

/**
 * Update the title when changed in editor
 *
 */
editor.updateTitle = function() {
  var title = helpers.getEditorTitleEl().value;

  editor.currentContent.title = title;
  editor.unSavedContent = true;
  view.updateTitle(title);
};

/**
 * Update the content when changed in editor
 *
 */
editor.updateContent = function() {
  var content = helpers.getEditorContentEl().value;

  editor.currentContent.content = content;
  editor.unSavedContent = true;
  view.updateContent(content);
};

/**
 * Dynamically fills the edit form based on the url
 *
 */
editor.fillEditForm = function(contentObj) {
  var titleForm = helpers.getEditorTitleEl(),
    contentForm = helpers.getEditorContentEl();

  titleForm.value = contentObj.title;
  contentForm.value = contentObj.content;

  editor.addFormListeners();
};

/**
 * Adds event listeners for the title and content
 *
 */
editor.addFormListeners = function() {
  var titleForm = helpers.getEditorTitleEl(),
    contentForm = helpers.getEditorContentEl(),
    updateBtn = helpers.getEditorUpdateBtnEl(),
    links = helpers.getLinks();

  titleForm.addEventListener("input", editor.updateTitle, false);
  contentForm.addEventListener("input", editor.updateContent, false);
  updateBtn.addEventListener("click", editor.saveContent, false);

  links.forEach(function(link) {
    link.addEventListener("click", editor.protectUnsavedContent, false);
  });
};

/**
 * Adds alert if links are clicked with unsaved content
 *
 */
editor.protectUnsavedContent = function(event) {
  if (true === editor.unSavedContent) {
    var confirm = window.confirm("You have unsaved content");

    if (false === confirm) {
      event.preventDefault();
    } else {
      editor.unSavedContent = false;
    }
  }
};

/**
 * Listens for the editor toggle button
 *
 */
editor.listenEditorToggle = function() {
  var toggleEl = helpers.getEditorToggleLink();

  toggleEl.addEventListener(
    "click",
    function(event) {
      editor.toggle();
      event.preventDefault();
    },
    false
  );
};

/**
 * Controls the toggle for the editor
 *
 */
editor.toggle = function() {
  var editorEl = helpers.getEditorEl(),
    toggleEl = helpers.getEditorToggleEl();

  editor.currentContent = model.getCurrentContent();

  editorEl.classList.toggle("hidden");
  toggleEl.classList.toggle("hidden");

  if (false === toggleEl.classList.contains("hidden")) {
    editor.fillEditForm(editor.currentContent);
  } else {
    // Remove event listeners from editor
  }
};
