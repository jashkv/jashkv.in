document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ DOM fully loaded");

    // Create and configure video background
    const video = document.createElement('video');
    video.id = 'background-video';
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.style.position = 'fixed';
    video.style.top = '0';
    video.style.left = '0';
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'cover';
    video.style.zIndex = '-1';
    document.body.prepend(video);

    // Create a main content wrapper if it doesn't exist
    let mainContent = document.querySelector('.main-content');
    if (!mainContent) {
        mainContent = document.createElement('div');
        mainContent.className = 'main-content';
        // Move all body children (except video) into main content
        Array.from(document.body.children).forEach(child => {
            if (child !== video) {
                mainContent.appendChild(child);
            }
        });
        document.body.appendChild(mainContent);
    }

    // Add necessary styles for scrolling
    const style = document.createElement('style');
    style.textContent = `
        body {
            margin: 0;
            padding: 0;
            min-height: 100vh;
        }
        .main-content {
            position: relative;
            z-index: 1;
            background: transparent;
        }
        #background-video {
            position: fixed;
            right: 0;
            bottom: 0;
            min-width: 100%;
            min-height: 100%;
            z-index: -1;
            object-fit: cover;
        }
    `;
    document.head.appendChild(style);

    // Theme switching function
    function setTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            video.src = 'images/video1.mp4';
        } else {
            document.documentElement.removeAttribute('data-theme');
            video.src = 'images/video2.mp4';
        }
        
        video.onloadeddata = () => {
            video.style.display = 'block';
        };
        video.onerror = () => {
            video.style.display = 'none';
            console.error('Error loading video');
        };
    }

    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Logo click handler for theme toggle
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Smooth scrolling for navigation with offset
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            if (section) {
                const headerOffset = 60; // Adjust this value based on your header height
                const elementPosition = section.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu functionality
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Work items data
    const workItems = [
        {
            image: './images/gitops.png',
            category: 'cloud',
            title: 'Microservices Architecture on AWS',
            description: 'Cloud Architecture'
        },
        {
            image: './images/gitops.png',
            category: 'cicd',
            title: 'GitOps CI/CD Pipeline',
            description: 'CI/CD'
        },
        {
            image: './images/gitops.png',
            category: 'kubernetes',
            title: 'Multi-Cloud Kubernetes Cluster',
            description: 'Kubernetes'
        },
        {
            image: './images/gitops.png',
            category: 'automation',
            title: 'Infrastructure Automation Suite',
            description: 'Automation'
        },
        {
            image: './images/gitops.png',
            category: 'cloud',
            title: 'Serverless Data Pipeline',
            description: 'Cloud Architecture'
        },
        {
            image: './images/gitops.png',
            category: 'kubernetes',
            title: 'Service Mesh Implementation',
            description: 'Kubernetes'
        }
    ];

    // Function to create work elements
    function createWorkElement(item) {
        const div = document.createElement("div");
        div.className = `work-item ${item.category}`;
        div.innerHTML = `
            <div class="work-image">
                <img src="${item.image}" alt="${item.title}" 
                     onerror="this.src='./images/placeholder.jpg'">
            </div>
            <div class="work-info">
                <p class="category">${item.description}</p>
                <h3>${item.title}</h3>
            </div>
        `;
        return div;
    }

    // Initialize works grid
    function initializeWorks() {
        const worksGrid = document.querySelector(".works-grid");
        if (!worksGrid) {
            console.error("❌ Error: .works-grid not found in the HTML.");
            return;
        }

        worksGrid.innerHTML = ""; // Clear existing items
        workItems.forEach((item) => {
            const workElement = createWorkElement(item);
            worksGrid.appendChild(workElement);
        });
        console.log("✅ Work items loaded successfully.");
    }

    // Initialize works
    initializeWorks();
});