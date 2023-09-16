document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    });
});
// JavaScript code to load the sidebar content
document.addEventListener("DOMContentLoaded", function () {
    // Specify the URL of your sidebar HTML file
    const sidebarUrl = "../sidebar.html";
    
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


document.addEventListener("DOMContentLoaded", function () {
    // Get all project cards
    const projectCards = document.querySelectorAll(".project-card");

    // Add a click event listener to each project card
    projectCards.forEach((card) => {
        card.addEventListener("click", function () {
            // Handle card click here, e.g., open a link or perform an action
        });
    });
});


// ##################################### Project Dynamically added ###############
document.addEventListener("DOMContentLoaded", function () {
    const projectsSection = document.getElementById("projects");
    const searchInput = document.getElementById("searchInput");
    const viewAllTagsButton = document.getElementById("viewAllTags");

    let projectsData = []; // To store the original project data

    // Function to fetch and display all projects from projects.json
    function displayAllProjects() {
        fetch('projects.json')
            .then(response => response.json())
            .then(data => {
                projectsData = data; // Store the original project data
                data.forEach(project => {
                    displayProject(project);
                });
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
            });
    }

    // Display all existing projects when the page loads
    displayAllProjects();

    // Function to display a project
    function displayProject(project) {
        const projectItem = document.createElement("div");
        projectItem.classList.add("project-item");

        // Create a string containing all the tags
        const tagsString = project.tags.join(', ');

        projectItem.innerHTML = `
            <img src="${project.imageUrl}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.techUsed}</p>
            <p>${project.description}</p>
            <button class="blueBtn">Read More</button>
        `;

        // Add the new project to the projects section
        projectsSection.appendChild(projectItem);
    }

    // Event listener for the search input
    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.trim().toLowerCase();

        // Filter projects based on the search term
        const filteredProjects = projectsData.filter(project => {
            return (
                project.title.toLowerCase().includes(searchTerm) ||
                project.techUsed.toLowerCase().includes(searchTerm) ||
                project.description.toLowerCase().includes(searchTerm) ||
                project.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        });

        // Clear the projects section and display the filtered projects
        projectsSection.innerHTML = "";
        filteredProjects.forEach(project => {
            displayProject(project);
        });
    });

  // Event listener for the "View All Tags" button
viewAllTagsButton.addEventListener("click", function () {
    // Clear the search input
    searchInput.value = "";

    // Create a div element
    const tagsItems = document.createElement("div");
    const ul = document.createElement("ul");

    // Fetch data from projects.json
    fetch('projects.json')
        .then(response => response.json())
        .then(data => {
            // Collect all tags into a single array
            const allTags = [];
            data.forEach(project => {
                project.tags.forEach(tag => {
                    allTags.push(tag);
                });
            });

            // Sort tags alphabetically
            allTags.sort();

            // Remove duplicates by converting the array to a Set and back to an array
            const uniqueTags = [...new Set(allTags)];

            // Iterate through the unique, sorted tags
            uniqueTags.forEach(tag => {
                const li = document.createElement("li");
                li.textContent = tag;
                ul.appendChild(li);
            });

            // Append the unordered list to the div
            tagsItems.appendChild(ul);

            // Append the div to a specific element in your HTML (e.g., replace 'document.body' with your desired target element)
            // For example, if you have a 'tagsContainer' element in your HTML, you can do:
            // const tagsContainer = document.getElementById("tagsContainer");
            // tagsContainer.appendChild(tagsItems);
            // Or you can append it to the document body if that's your intention:
            document.body.appendChild(tagsItems);
        })
        .catch(error => {
            console.error('Error fetching projects:', error);
        });
});

// Append the div to the document (or any other element where you want to display it)
document.body.appendChild(tagsItems);


        // Display all projects
        projectsSection.innerHTML = "";
        projectsData.forEach(project => {
            displayProject(project);
        });
    });





















document.addEventListener("DOMContentLoaded", function () {
    const timelineList = document.getElementById("timeline-list");

    // Function to fetch and display timeline data from a JSON file
    function displayTimelineData() {
        fetch('timeline-data.json') // Replace with the path to your JSON file
            .then(response => response.json())
            .then(data => {
                data.forEach(timelineItem => {
                    const timelineItemElement = document.createElement("li");
                    timelineItemElement.innerHTML = `
                    <div class="timeline-content">
                    <div class="heading-tag">
                    <h3 class="date">${timelineItem.date}</h3>
                    <span style="background-color: ${timelineItem.color}">${timelineItem.tag}</span>
                    </div>
                    <p>${timelineItem.description}</p>
                    <button class="btn"> Check it out </button>
                </div>
                    `;
                    timelineList.appendChild(timelineItemElement);
                });
            })
            .catch(error => {
                console.error('Error fetching timeline data:', error);
            });
    }

    // Call the function to display timeline data
    displayTimelineData();
});
