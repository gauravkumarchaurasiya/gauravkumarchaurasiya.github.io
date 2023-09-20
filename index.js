document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: "smooth",
    });
  });
});
// JavaScript code to load the sidebar content
document.addEventListener("DOMContentLoaded", function () {
  // Specify the URL of your sidebar HTML file
  const sidebarUrl = "sidebar.html";

  // Reference the sidebar container element
  const sidebarContainer = document.getElementById("sidebar-container");

  // Create an XMLHttpRequest object to fetch the sidebar HTML
  const xhr = new XMLHttpRequest();
  xhr.open("GET", sidebarUrl, true);

  // Define the callback function when the request is complete
  xhr.onload = function () {
    if (xhr.status === 200) {
      // If the request is successful, insert the HTML into the sidebar container
      sidebarContainer.innerHTML = xhr.responseText;
    } else {
      // Handle any errors that occur during the request
      console.error("Failed to load sidebar:", xhr.status, xhr.statusText);
    }
  };

  // Send the request
  xhr.send();
});

// ##################################### Project Dynamically added ###############
document.addEventListener("DOMContentLoaded", function () {
  const projectsSection = document.getElementById("projects");
  const searchInput = document.getElementById("searchInput");
  const viewAllTagsButton = document.getElementById("viewAllTags");

  let projectsData = []; // To store the original project data

  // Function to fetch and display all projects from projects.json
  function displayAllProjects() {
    fetch("projects.json")
      .then((response) => response.json())
      .then((data) => {
        projectsData = data.reverse();
        data.forEach((project) => {
          displayProject(project);
        });
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }

  // Display all existing projects when the page loads
  displayAllProjects();

  // Function to display a project
  function displayProject(project) {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");

    // Create a string containing all the tags
    const tagsString = project.tags.join(", ");

    projectItem.innerHTML = `
            <img src="${project.imageUrl}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.techUsed}</p>
            <p>${project.description}</p>
            <button class="blueBtn">Check it out</button>
        `;

    // Add the new project to the projects section
    projectsSection.appendChild(projectItem);
  }

  // Define the search filter function
  function filterProjects(searchTerm) {
    return projectsData.filter((project) => {
      return (
        project.title.toLowerCase().includes(searchTerm) ||
        project.techUsed.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    });
  }

  // Event listener for the search input
  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.trim().toLowerCase();

    // Filter projects based on the search term
    const filteredProjects = filterProjects(searchTerm);

    // Clear the projects section and display the filtered projects
    projectsSection.innerHTML = "";
    filteredProjects.forEach((project) => {
      displayProject(project);
    });
  });

  // Event listener for the "View All Tags" button
  viewAllTagsButton.addEventListener("click", function () {
    // Toggle the tag list display
    toggleTagList();
  });

  // Function to toggle the display of the tag list
  function toggleTagList() {
    // Get the tags container and list elements by their IDs
    const tagsContainer = document.getElementById("allTagsContainer");
    const ul = document.getElementById("allTagsList");

    // Check if the tag list is currently visible
    if (tagsContainer.style.display === "block") {
      // If visible, hide it
      tagsContainer.style.display = "none";
    } else {
      // If hidden, show it

      // Clear the search input
      searchInput.value = "";

      // Fetch data from projects.json
      fetch("projects.json")
        .then((response) => response.json())
        .then((data) => {
          // Collect all tags into a single array
          const allTags = [];
          data.forEach((project) => {
            project.tags.forEach((tag) => {
              allTags.push(tag);
            });
          });

          // Sort tags alphabetically
          allTags.sort();

          // Remove duplicates by converting the array to a Set and back to an array
          const uniqueTags = [...new Set(allTags)];

          // Clear existing list items
          ul.innerHTML = "";

          // Iterate through the unique, sorted tags and create list items
          uniqueTags.forEach((tag) => {
            const li = document.createElement("li");
            li.textContent = tag;
            li.addEventListener("click", function () {
              const searchTerm = tag.toLowerCase();

              // Filter projects based on the search term
              const filteredProjects = filterProjects(searchTerm);

              // Clear the projects section and display the filtered projects
              projectsSection.innerHTML = "";
              filteredProjects.forEach((project) => {
                displayProject(project);
              });
            //   console.log(tag);
            });
            ul.appendChild(li);
          });

          // Show the tags container
          tagsContainer.style.display = "block";
        })
        .catch((error) => {
          console.error("Error fetching projects:", error);
        });
    }
  }
});

// ######################Timeline ##################################

document.addEventListener("DOMContentLoaded", function () {
  const timelineList = document.getElementById("timeline-list");

  // Function to fetch and display timeline data from a JSON file
  function displayTimelineData() {
    fetch("timeline-data.json")
      .then((response) => response.json())
      .then((data) => {
        // Reverse the data array to display items in a "last in, first show" manner
        data = data.reverse();
        data.forEach((timelineItem) => {
          const timelineItemElement = document.createElement("li");
          timelineItemElement.innerHTML = `
                    <div class="timeline-content">
                    <div class="heading-tag">
                    <h3 class="date">${timelineItem.date}</h3>
                    <span style="background-color: ${timelineItem.color}">${timelineItem.tag}</span>
                    </div>
                    <p>${timelineItem.description}</p>
                    <a href="${timelineItem.link}" target="_blank" class="btn">${timelineItem.buttonContent}<img  class = "right-arrow" src = "images/right-arrow-black-triangle.png"></a>
                </div>
                    `;
          timelineList.appendChild(timelineItemElement);
        });
      })
      .catch((error) => {
        console.error("Error fetching timeline data:", error);
      });
  }

  // Call the function to display timeline data
  displayTimelineData();
});




// #################### BLogs ##########################
// Replace with your Blogger API key
// const apiKey = 'AIzaSyDGvSELrJY7S_bpKwDxyGXXX3rDPAejBWs';
// const blogListContainer = document.getElementById('blog-list');
// const blogContentContainer = document.getElementById('blog-content');

// // Fetch all posts from Blogger
// fetch(`https://www.googleapis.com/blogger/v3/blogs/7899995714058715349/posts?key=${apiKey}`)
//     .then(response => response.json())
//     .then(data => {
//         const blogPosts = data.items;
//         console.log(blogPosts);
//         // Loop through and display blog titles
//         blogPosts.forEach(post => {
//             const postId = post.id;
//             const postTitle = post.title;

//             const listItem = document.createElement('li');
//             listItem.textContent = postTitle;
//             listItem.addEventListener('click', () => {
//                 // When a title is clicked, fetch and display the blog content
//                 fetchBlogContent(postId);
//             });

//             blogListContainer.appendChild(listItem);
//         });
//     })
//     .catch(error => {
//         console.error('Error fetching Blogger posts:', error);
//     });

// // Function to fetch and display blog content by post ID
// function fetchBlogContent(postId) {
//     fetch(`https://www.googleapis.com/blogger/v3/blogs/7899995714058715349/posts/${postId}?key=${apiKey}`)
//         .then(response => response.json())
//         .then(data => {
//             const postTitle = data.title;
//             const postContent = data.content;

//             // Display the selected blog content
//             blogContentContainer.innerHTML = `
//                 <h2>${postTitle}</h2>
//                 <div>${postContent}</div>
//             `;
//         })
//         .catch(error => {
//             console.error('Error fetching blog content:', error);
//         });
// }


const YOUR_BLOG_ID = 7998938079177568848;

 // Fetch Blogger RSS feed
 fetch('https://www.blogger.com/feeds/${YOUR_BLOG_ID}/posts/default?alt=rss')
 .then(response => response.text())
 .then(data => {
     const parser = new DOMParser();
     const xmlDoc = parser.parseFromString(data, 'text/xml');
     const items = xmlDoc.querySelectorAll('item');

     const blogPosts = document.getElementById('blog-posts');

     items.forEach(item => {
         const title = item.querySelector('title').textContent;
         const link = item.querySelector('link').textContent;

         const listItem = document.createElement('li');
         listItem.innerHTML = `<a href="${link}">${title}</a>`;
         blogPosts.appendChild(listItem);
     });
 })
 .catch(error => console.error(error));