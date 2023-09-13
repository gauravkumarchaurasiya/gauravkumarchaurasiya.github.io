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

// document.addEventListener("DOMContentLoaded", function () {
//     // Get all the "Read More" buttons
//     const readMoreButtons = document.querySelectorAll(".read-more-btn");

//     // Add a click event listener to each "Read More" button
//     readMoreButtons.forEach((button) => {
//         button.addEventListener("click", function () {
//             // Toggle the visibility of the project description
//             const projectCard = this.parentElement;
//             const projectDescription = projectCard.querySelector(".project-description");

//             // Check if the description is hidden
//             if (projectDescription.style.display === "none" || projectDescription.style.display === "") {
//                 projectDescription.style.display = "block";
//                 this.style.display = "none"; // Hide "Read More" button
//                 projectCard.querySelector(".read-less-btn").style.display = "inline"; // Show "Read Less" button
//             }
//         });
//     });

//     // Get all the "Read Less" buttons
//     const readLessButtons = document.querySelectorAll(".read-less-btn");

//     // Add a click event listener to each "Read Less" button
//     readLessButtons.forEach((button) => {
//         button.addEventListener("click", function () {
//             // Toggle the visibility of the project description
//             const projectCard = this.parentElement;
//             const projectDescription = projectCard.querySelector(".project-description");

//             // Check if the description is visible
//             if (projectDescription.style.display === "block") {
//                 projectDescription.style.display = "none";
//                 this.style.display = "none"; // Hide "Read Less" button
//                 projectCard.querySelector(".read-more-btn").style.display = "inline"; // Show "Read More" button
//             }
//         });
//     });

//     // Get all project images for hover effect
//     const projectImages = document.querySelectorAll(".project-image");

//     // Add a mouseover event listener to each project image
//     projectImages.forEach((image) => {
//         // Create a GitHub icon and link
//         const githubIcon = document.createElement("a");
//         githubIcon.href = "#"; // Replace with your GitHub project URL
//         githubIcon.target = "_blank";
//         githubIcon.className = "github-icon";
        
//         // Create an image element for the GitHub icon
//         const githubImage = document.createElement("img");
//         githubImage.src = "github-icon.png"; // Replace with your GitHub icon image URL
//         githubImage.alt = "GitHub Icon";

//         // Append the GitHub icon image to the GitHub icon link
//         githubIcon.appendChild(githubImage);

//         // Add the GitHub icon to the project image on hover
//         image.addEventListener("mouseover", function () {
//             this.appendChild(githubIcon);
//         });

//         // Remove the GitHub icon on mouseout
//         image.addEventListener("mouseout", function () {
//             this.removeChild(githubIcon);
//         });
//     });
// });

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




// ##################################### Project Dynmacially added J###############
document.addEventListener("DOMContentLoaded", function () {
    const projectsSection = document.getElementById("projects");

    // Function to fetch and display all projects from projects.json
    function displayAllProjects() {
        fetch('projects.json')
            .then(response => response.json())
            .then(data => {
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
});
