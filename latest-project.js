document.addEventListener("DOMContentLoaded", function () {
  const recentProjectsContainer = document.getElementById("recent-projects-container");

  fetch("projects.json")
    .then((response) => response.json())
    .then((data) => {
      // Sort projects by date (latest first)
      const sortedProjects = data.sort((a, b) => {
        // Convert month-year strings to Date objects (assume first of the month)
        const dateA = new Date(a.date + " 1");
        const dateB = new Date(b.date + " 1");
        return dateB - dateA; // latest first
      });
      const latestProjects = sortedProjects.slice(0, 3);

      recentProjectsContainer.innerHTML = "";

      latestProjects.forEach((project) => displayRecentProject(project));
    })
    .catch((error) => console.error("Error fetching projects:", error));

  function displayRecentProject(project) {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-card");

    projectItem.innerHTML = `
      <img src="${project.imageUrl}" alt="${project.title}" class="project-img">
      <div class="project-info">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <p class="project-tech">${project.techUsed}</p>
      </div>
    `;

    projectItem.addEventListener("click", function (e) {
      if (!e.target.classList.contains("cta-button")) {
        window.location.href = `project.html?project=${project.id}`;
      }
    });

    recentProjectsContainer.appendChild(projectItem);
  }
});
