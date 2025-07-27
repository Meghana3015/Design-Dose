// Blog data and functionality
let blogsData = [
    {
        id: 1,
        title: "Designing for Developers: My Take as a Developer-Designer",
        excerpt: "Bridging the gap between design and development through real-world collaboration.",
        category: "tools",
        tags: ["figma", "design-system", "productivity"],
        date: "2025-01-15",
        readTime: "8 min read",
        image: "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800",
        url: "blogs/blog-1.html"
    },
    {
        id: 2,
        title: "What I Learned from Designing Real Projects",
        excerpt: "Insights from working on live college and client projects that shaped my UI/UX journey.",
        category: "ux-design",
        tags: ["design-system", "figma", "user-research"],
        date: "2025-01-12",
        readTime: "12 min read",
        image: "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800",
        url: "blogs/blog-2.html"
    },
    {
        id: 3,
        title: "My Favorite Free Tools for UI/UX Design (as a Student Designer)",
        excerpt: "The essential tools every beginner designer should explore — all free and beginner-friendly.",
        category: "ux-design",
        tags: ["user-research", "prototyping", "figma"],
        date: "2025-01-10",
        readTime: "10 min read",
        image: "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=800",
        url: "blogs/blog-3.html"
    },
    // {
    //     id: 4,
    //     title: "Career Growth Tips for UX Designers in 2025",
    //     excerpt: "Navigate your design career with confidence. From junior to senior designer and beyond.",
    //     category: "career",
    //     tags: ["portfolio", "career", "design-system"],
    //     date: "2025-01-08",
    //     readTime: "15 min read",
    //     image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
    //     url: "blogs/blog-4.html"
    // },
    // {
    //     id: 5,
    //     title: "Productivity Hacks for Remote Designers",
    //     excerpt: "Stay focused and efficient while working from home with these proven strategies and tools.",
    //     category: "productivity",
    //     tags: ["productivity", "tools", "career"],
    //     date: "2025-01-05",
    //     readTime: "11 min read",
    //     image: "https://images.pexels.com/photos/4050290/pexels-photo-4050290.jpeg?auto=compress&cs=tinysrgb&w=800",
    //     url: "blogs/blog-5.html"
    // },
    // {
    //     id: 6,
    //     title: "Design System Case Study: Scaling Design at TechCorp",
    //     excerpt: "How we built and scaled a design system across 15 product teams and 3 platforms.",
    //     category: "case-studies",
    //     tags: ["design-system", "case-study", "scaling"],
    //     date: "2025-01-03",
    //     readTime: "18 min read",
    //     image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800",
    //     url: "blogs/blog-6.html"
    // }
];
let filteredBlogs = [...blogsData];
let currentlyDisplayed = 6;
let activeCategory = 'all';
let activeTags = [];
let searchQuery = '';

// Load blogs data
function loadBlogs() {
    displayBlogs();
    setupEventListeners();
}

// Display blogs
function displayBlogs() {
    const blogGrid = document.getElementById('blogGrid');
    const blogsToShow = filteredBlogs.slice(0, currentlyDisplayed);
    
    blogGrid.innerHTML = blogsToShow.map(blog => `
        <article class="blog-card" onclick="window.location.href='${blog.url}'">
            <div class="blog-image">
                <img src="${blog.image}" alt="${blog.title}" />
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="blog-category">${blog.category.replace('-', ' ').toUpperCase()}</span>
                    <span>•</span>
                    <span>${blog.date}</span>
                    <span>•</span>
                    <span>${blog.readTime}</span>
                </div>
                <h3 class="blog-title">${blog.title}</h3>
                <p class="blog-excerpt">${blog.excerpt}</p>
                <div class="blog-tags">
                    ${blog.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                </div>
                <a href="#" class="read-more">
                    Read More <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </article>
    `).join('');
    
    // Update load more button visibility
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (currentlyDisplayed >= filteredBlogs.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

// Get category icon
function getCategoryIcon(category) {
    const icons = {
        'ux-design': 'user',
        'tools': 'tools',
        'case-studies': 'chart-line',
        'career': 'briefcase',
        'productivity': 'clock'
    };
    return icons[category] || 'book';
}

// Filter blogs
function filterBlogs() {
    filteredBlogs = blogsData.filter(blog => {
        const matchesCategory = activeCategory === 'all' || blog.category === activeCategory;
        const matchesTags = activeTags.length === 0 || activeTags.some(tag => blog.tags.includes(tag));
        const matchesSearch = searchQuery === '' || 
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        
        return matchesCategory && matchesTags && matchesSearch;
    });
    
    currentlyDisplayed = 6;
    displayBlogs();
}

// Scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            filterBlogs();
        });
    }
    
    // Category filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.dataset.category;
            filterBlogs();
        });
    });
    
    // Tag filters
    const tagBtns = document.querySelectorAll('.tag-btn');
    tagBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tag = btn.dataset.tag;
            if (activeTags.includes(tag)) {
                activeTags = activeTags.filter(t => t !== tag);
                btn.classList.remove('active');
            } else {
                activeTags.push(tag);
                btn.classList.add('active');
            }
            filterBlogs();
        });
    });
    
    // Load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            currentlyDisplayed += 6;
            displayBlogs();
        });
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = e.target.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with email: ${email}`);
            e.target.reset();
        });
    }
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I\'ll get back to you soon.');
            e.target.reset();
        });
    }
    
    // Mobile navigation
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Handle URL search parameters
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam && searchInput) {
        searchInput.value = searchParam;
        searchQuery = searchParam;
        filterBlogs();
    }
}

// Smooth scrolling for navigation links
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', loadBlogs);


let blogGrid = document.getElementById("blogGrid");

blogsData.forEach(blog => {
  blogGrid.innerHTML += `
    <div class="blog-card">
      <div class="blog-image">
        <img src="${blog.image}" alt="${blog.title}">
      </div>
      <div class="blog-content">
        <h3>${blog.title}</h3>
        <p>${blog.excerpt}</p>
        <span>${blog.readTime} • ${blog.date}</span>
        <a href="${blog.url}" class="read-more">Read More</a>
      </div>
    </div>
  `;
});