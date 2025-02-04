
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ DOM fully loaded");

    // Dark mode toggle functionality
    const logo = document.querySelector('.logo');
    let isDarkMode = false;
    
    // Check for saved user preference, if any
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        isDarkMode = true;
    }
    
    // Toggle dark mode
    if (logo) {
        logo.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            if (isDarkMode) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
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

    // Work items data with local image paths
    const workItems = [
        {
            image: './images/gitops.png', // Update with your local image path
            category: 'cloud',
            title: 'Microservices Architecture on AWS',
            description: 'Cloud Architecture'
        },
        {
            image: './images/gitops.png', // Update with your local image path
            category: 'cicd',
            title: 'GitOps CI/CD Pipeline',
            description: 'CI/CD'
        },
        {
            image: './images/gitops.png', // Update with your local image path
            category: 'kubernetes',
            title: 'Multi-Cloud Kubernetes Cluster',
            description: 'Kubernetes'
        },
        {
            image: './images/gitops.png', // Update with your local image path
            category: 'automation',
            title: 'Infrastructure Automation Suite',
            description: 'Automation'
        },
        {
            image: './images/gitops.png', // Update with your local image path
            category: 'cloud',
            title: 'Serverless Data Pipeline',
            description: 'Cloud Architecture'
        },
        {
            image: './images/gitops.png', // Update with your local image path
            category: 'kubernetes',
            title: 'Service Mesh Implementation',
            description: 'Kubernetes'
        }
    ];

    // Function to create work elements with error handling
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

    // Initialize works grid with error handling
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

    // Filter works with smooth transitions
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');

            // Filter work items with fade effect
            document.querySelectorAll('.work-item').forEach(item => {
                item.style.opacity = '0';
                item.style.transition = 'opacity 0.3s ease';

                setTimeout(() => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // Form submission with validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic form validation
            const formInputs = contactForm.querySelectorAll('input, textarea');
            let isValid = true;
            
            formInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff0000';
                } else {
                    input.style.borderColor = '#ddd';
                }
            });

            if (isValid) {
                alert('Message sent successfully!');
                contactForm.reset();
            }
        });
    }

    // Initialize works when the page loads
    initializeWorks();
});
