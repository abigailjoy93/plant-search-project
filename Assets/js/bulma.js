document.addEventListener("DOMContentLoaded", function () {
  const options = document.querySelectorAll(".dropdown");
  if (options.length > 0) {
    options.forEach(function (dropdown) {
      const dropdownTrigger = dropdown.querySelector(
        ".dropdown-trigger button"
      );
      const dropdownItems = dropdown.querySelectorAll(
        ".dropdown-content .dropdown-item"
      );

      dropdownTrigger.addEventListener("click", function (event) {
        event.stopPropagation();
        closeAllDropdowns();
        
        const isActive = dropdown.classList.contains("is-active");
        if (!isActive) {
          dropdown.classList.add("is-active");
        }
      });

      dropdownItems.forEach(function (item) {
        item.addEventListener("click", function (event) {
          event.stopPropagation();
          const selectedValue = item.textContent.trim();
          dropdownTrigger.textContent = selectedValue;
          dropdown.classList.remove("is-active");

          handleSelection(selectedValue);
        });
      });
    });

    document.addEventListener("click", function (event) {
      closeAllDropdowns();
    });
  }
});

function closeAllDropdowns() {
  const activeDropdowns = document.querySelectorAll(".dropdown.is-active");
  activeDropdowns.forEach(function (dropdown) {
    dropdown.classList.remove("is-active");
  });
}

function handleSelection(selectedValue) {
  console.log("Selected: " + selectedValue);
}
