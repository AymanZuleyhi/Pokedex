// ------------------------- Mobile menu -------------------------

const setButtonURL = (element) => {
  switch (element) {
    case "Home":
      homePage();
      break;
    case "Favorites":
      showFavourites();
      break;
    case "Filter":
      toggleSort();
      break;
    default:
      throw new Error("There's no match.");
  }
};

// Add a blue background to the clicked button/icon, if it has an "active" class;
const changeIconBackgroundColor = (nodeList) => {
  nodeList.forEach((item) => {
    const icon = item.children[0];
    icon.style.backgroundColor = item.classList.contains("active")
      ? "rgb(97, 157, 219, 0.7)"
      : "white";
  });
};

const setMobileMenuAttributes = (e) => {
  // Get all of the li's in the mobile menu and remove their classes.
  const nodeList = getNodeList(mobileMenu, "li");
  removeClasses(nodeList);

  // Get the clicked element's li.
  let clickedElement = e.target;
  while (clickedElement.tagName !== "LI") {
    clickedElement = clickedElement.parentNode;
  }

  // Add an active class to the clicked li.
  clickedElement.classList.add("active");
  const button = clickedElement.textContent.trim();

  // Add a blue background on the icon if the parent li has an active class.
  changeIconBackgroundColor(nodeList);
  // Give a function to the clicked li based on it's text content => Home, Favorites, etc.
  setButtonURL(button);
};

// Set the mobile menu to have Home as the default button.
const defaultMobileButton = () => {
  const nodeList = getNodeList(mobileMenu, "li");

  for (let i = 0; i < nodeList.length; i++) {
    if (i === 0) {
      nodeList[i].classList.add("active");
    }
  }

  changeIconBackgroundColor(nodeList);
};
defaultMobileButton();

// Event listener.
mobileMenu.addEventListener("click", function (e) {
  if (e.target.tagName !== "UL") {
    setMobileMenuAttributes(e);
  }
});
