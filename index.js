// ##################### Mouse Trail Effect #####################
const numDots = 12;
const trails = [];

// Create trail elements
for (let i = 0; i < numDots; i++) {
  const trail = document.createElement("div");
  trail.classList.add("trail");
  document.body.appendChild(trail);
  trails.push(trail);
}

let index = 0;
document.addEventListener("mousemove", (e) => {
  const trail = trails[index];
  trail.style.left = `${e.pageX}px`;
  trail.style.top = `${e.pageY}px`;

  // Reset animation for smooth pulsing effect
  trail.style.animation = "none";
  void trail.offsetWidth;
  trail.style.animation = "pulse 1.2s infinite ease-out";

  index = (index + 1) % numDots;
});

// ##################### Smooth Scrolling for Internal Links #####################
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetElement = document.getElementById(this.getAttribute("href").substring(1));

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "instant",
      });
    }
  });
});

// ##################### Load Sidebar Content #####################
document.addEventListener("DOMContentLoaded", function () {
  const sidebarContainer = document.getElementById("sidebar-container");
  fetch("sidebar.html")
    .then((response) => response.text())
    .then((html) => (sidebarContainer.innerHTML = html))
    .catch((error) => console.error("Failed to load sidebar:", error));
});

// ##################### Project Filtering & Display #####################
document.addEventListener("DOMContentLoaded", function () {
  const projectsSection = document.getElementById("project-container");
  const searchInput = document.getElementById("searchInput");
  const viewAllTagsButton = document.getElementById("viewAllTags");
  const viewModeSelect = document.getElementById("viewMode");

  let projectsData = [];

  // Fetch and display projects
  fetch("projects.json")
    .then((response) => response.json())
    .then((data) => {
      projectsData = data.reverse(); // Latest projects first
      displayProjects();
    })
    .catch((error) => console.error("Error fetching projects:", error));

  function displayProjects() {
    projectsSection.innerHTML = "";
    const selectedMode = viewModeSelect.value;

    if (selectedMode === "grouped") {
      const categories = groupByCategory(projectsData);
      Object.keys(categories).forEach((category) => displayCategory(category, categories[category]));
    } else {
      projectsData.forEach(displayProject);
    }
  }

  function groupByCategory(projects) {
    return projects.reduce((acc, project) => {
      const category = project.category || "Other";
      (acc[category] ||= []).push(project);
      return acc;
    }, {});
  }

  function displayCategory(category, projects) {
    const categoryHeader = document.createElement("h2");
    categoryHeader.textContent = category;
    projectsSection.appendChild(categoryHeader);
    projects.forEach(displayProject);
  }

  function displayProject(project) {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-card");

    projectItem.innerHTML = `
      <img src="${project.imageUrl}" alt="${project.title}">
      <div class="project-description">${project.description}</div>
      <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.techUsed}</p>
          <a href="${project.link}" class="project-link" target="_blank">View Project</a>
      </div>
    `;

    projectItem.addEventListener("click", () => window.open(project.link, "_blank"));
    projectsSection.appendChild(projectItem);
  }

  viewModeSelect.addEventListener("change", displayProjects);

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredProjects = projectsData.filter(
      (project) =>
        project.title.toLowerCase().includes(searchTerm) ||
        project.techUsed.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
    );
    
    projectsSection.innerHTML = "";
    Object.entries(groupByCategory(filteredProjects)).forEach(([category, projects]) => displayCategory(category, projects));
  });

  viewAllTagsButton.addEventListener("click", toggleTagList);

  function toggleTagList() {
    const tagsContainer = document.getElementById("allTagsContainer");
    const ul = document.getElementById("allTagsList");

    if (tagsContainer.style.display === "block") {
      tagsContainer.style.display = "none";
    } else {
      searchInput.value = "";
      fetch("projects.json")
        .then((response) => response.json())
        .then((data) => {
          const uniqueTags = [...new Set(data.flatMap((project) => project.tags).sort())];
          ul.innerHTML = uniqueTags
            .map((tag) => `<li>${tag}</li>`)
            .join("");

          ul.querySelectorAll("li").forEach((li) =>
            li.addEventListener("click", function () {
              const searchTerm = li.textContent.toLowerCase();
              const filteredProjects = projectsData.filter((project) =>
                project.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
              );

              projectsSection.innerHTML = "";
              Object.entries(groupByCategory(filteredProjects)).forEach(([category, projects]) => displayCategory(category, projects));
            })
          );

          tagsContainer.style.display = "block";
        })
        .catch((error) => console.error("Error fetching projects:", error));
    }
  }
});

// ##################### Timeline Display #####################
document.addEventListener("DOMContentLoaded", function () {
  const timelineList = document.getElementById("timeline-list");

  fetch("timeline-data.json")
    .then((response) => response.json())
    .then((data) => {
      data.reverse().forEach((timelineItem) => {
        const timelineItemElement = document.createElement("li");
        timelineItemElement.innerHTML = `
          <div class="timeline-content">
            <div class="heading-tag">
              <h3 class="date">${timelineItem.date}</h3>
              <span style="background-color: ${timelineItem.color}">${timelineItem.tag}</span>
            </div>
            <p>${timelineItem.description}</p>
            <a href="${timelineItem.link}" target="_blank" class="btn">${timelineItem.buttonContent}
              <img class="right-arrow" src="images/right-arrow-black-triangle.png">
            </a>
          </div>
        `;
        timelineList.appendChild(timelineItemElement);
      });
    })
    .catch((error) => console.error("Error fetching timeline data:", error));
});

// ##################### Hamburger Menu #####################
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerContainer = document.getElementById("hamburgerContainer");

  fetch("hamburger.html")
    .then((response) => response.text())
    .then((html) => (hamburgerContainer.innerHTML = html))
    .catch((error) => console.error("Failed to load hamburger menu:", error));
});


// #################### BLOGS ########################
document.addEventListener("DOMContentLoaded", function () {
  const blogList = document.getElementById("blogList");
  const mediumRSS = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@gauravkumarchaurasiya";

  fetch(mediumRSS)
      .then((response) => response.json())
      .then((data) => {
          const posts = data.items;

          posts.forEach(post => {
              const blogItem = document.createElement("div");
              blogItem.classList.add("blog-item");

              // Make the whole blog card clickable
              blogItem.onclick = function () {
                  window.open(post.link, "_blank");
              };

              blogItem.innerHTML = `
                  <h3 class="blog-title">${post.title}</h3>
                  <p class="blog-date">${new Date(post.pubDate).toDateString()}</p>
                  <p class="blog-description">${post.description.split("</p>")[0].replace(/<[^>]*>/g, "")}</p>
              `;

              blogList.appendChild(blogItem);
          });
      })
      .catch(error => console.error("Error fetching Medium RSS Feed:", error));
});
