// ------------------------- Tabs -------------------------

const getNodeList = (element, tagName) => {
  const nodeList = element.querySelectorAll(tagName);

  return nodeList;
};

// Remove the active class from all of the li's.
const removeClasses = (nodeList) => {
  nodeList.forEach((item) => {
    item.className = "";
  });
};

// Add the active class to a given tab.
const addActiveToContentTab = (nodeListContent, id) => {
  // Loop through all of the li's in the tabs content. Compare each li's id to the id of the clicked a element.
  nodeListContent.forEach((item) => {
    if (item.id === id) {
      item.classList.add("active");
    }
  });
};

// Make the clicked a-tag black, and show the black line under it.
const styleTabs = (nodeList) => {
  nodeList.forEach((element) => {
    const textUnderline = element.nextElementSibling;
    textUnderline.style.display = element.classList.contains("active")
      ? "block"
      : "none";
    textUnderline.style.backgroundColor = element.classList.contains("active")
      ? "black"
      : "grey";
    element.style.color = element.classList.contains("active")
      ? "black"
      : "grey";
  });
};

// If the content tab contains the active class, show it, if not hide it.
const styleContent = (nodeList) => {
  nodeList.forEach((item) => {
    item.style.display = item.classList.contains("active") ? "block" : "none";
  });
};

const popUpTabs = (e) => {
  // Get the nodeList's for the buttons, and the content.
  const nodeListTabs = getNodeList(tabs, "a");
  const nodeListContent = getNodeList(tabsContent, "li");

  // Remove the "active" class from the buttons and content.
  removeClasses(nodeListTabs);
  removeClasses(nodeListContent);

  // Add "active" class to the button and content.
  e.target.classList.add("active");
  const id = e.target.id;
  addActiveToContentTab(nodeListContent, id);

  // Style the button and content based on the class.
  styleTabs(nodeListTabs);
  styleContent(nodeListContent);
};

tabs.addEventListener("click", function (e) {
  if (e.target.tagName === "A") {
    popUpTabs(e);
  }
});
