document.addEventListener("DOMContentLoaded", () => {
  const toggleFiltersBtn = document.getElementById("toggleFiltersBtn");
  const filtersPanel = document.getElementById("filtersPanel");
  const filterArrow = document.getElementById("filterArrow");
  const filterForm = document.getElementById("filterForm");
  const clearBtn = document.getElementById("clearBtn");
  const cards = document.querySelectorAll(".vehicle-card");

  if (toggleFiltersBtn) {
    toggleFiltersBtn.addEventListener("click", () => {
      filtersPanel.classList.toggle("open");
      filterArrow.classList.toggle("rotate");
    });
  }

  if (filterForm) {
    filterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      filterForm.reset();
    });
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      
    });
  });
});