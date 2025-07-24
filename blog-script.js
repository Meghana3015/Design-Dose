// Blog post functionality
let currentBlog = null;
let allBlogs = [];

// Load and display blog post
async function loadBlogPost() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const blogId = parseInt(urlParams.get('id'));
        
        if (!blogId) {
            window.location.href = '404.html';
            return;
        }
        
        // Load blogs data
        const response = await fetch('blogs.json');
        allBlogs = await response.json();
        
        // Find the current blog
        currentBlog = allBlogs.find(blog => blog.id === blogId);
        
        if (!currentBlog) {
            window.location.href = '404.html';
            return;
        }
        
        displayBlogPost();
        setupNavigation();
        setupRelatedPosts();
        setupShareButtons();
        
    } catch (error) {
        console.error('Error loading blog post:', error);
        // Fallback to sample data
        allBlogs = getSampleBlogs();
        const urlParams = new URLSearchParams(window.location.search);
        const blogId = parseInt(urlParams.get('id'));
        currentBlog = allBlogs.find(blog => blog.id === blogId);
        
        if (currentBlog) {
            displayBlogPost();
            setupNavigation();
            setupRelatedPosts();
            setupShareButtons();
        } else {
            window.location.href = '404.html';
        }
    }
}

// Sample blogs data (same as in script.js)
function getSampleBlogs() {
    return [
        {
            id: 1,
            title: "10 Essential Figma Plugins Every Designer Should Use",
            excerpt: "Discover the must-have Figma plugins that will supercharge your design workflow and boost productivity.",
            content: `
                <h2>Why Figma Plugins Matter</h2>
                <p>Figma plugins have revolutionized the way designers work, offering powerful tools to automate repetitive tasks and enhance creativity. In this comprehensive guide, we'll explore the top 10 plugins that every designer should have in their toolkit.</p>
                
                <h3>1. Auto Layout</h3>
                <p>Auto Layout is a game-changer for responsive design. It automatically adjusts spacing and sizing, making your designs more flexible and maintainable.</p>
                
                <blockquote>
                "Auto Layout has saved me countless hours in my design process. It's like having a smart assistant that knows exactly how to organize your elements." - Sarah, Senior UX Designer
                </blockquote>
                
                <h3>2. Content Reel</h3>
                <p>Generate realistic content for your designs with this powerful plugin. From profile pictures to product descriptions, Content Reel has everything you need.</p>
                
                <h3>3. Unsplash</h3>
                <p>Access millions of high-quality photos directly within Figma. Perfect for mockups, presentations, and design inspiration.</p>
                
                <h2>Advanced Workflow Tips</h2>
                <p>To get the most out of these plugins, consider creating a standardized workflow. Start with Auto Layout for your base components, then use Content Reel to populate with realistic data, and finally enhance with Unsplash imagery.</p>
                
                <pre><code>// Example Figma plugin code structure
figma.showUI(__html__, { width: 400, height: 300 });

figma.ui.onmessage = msg => {
  if (msg.type === 'create-shapes') {
    const nodes = [];
    
    for (let i = 0; i < msg.count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }
    
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }
};</code></pre>
                
                <h3>Key Takeaways</h3>
                <p>These plugins aren't just time-savers; they're creativity enhancers. By automating the mundane, they free you up to focus on what really matters: creating exceptional user experiences.</p>
            `,
            category: "tools",
            tags: ["figma", "design-system", "productivity"],
            date: "2025-01-15",
            readTime: "8 min read",
            image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800"
        },
        {
            id: 2,
            title: "Building Your First Design System: A Complete Guide",
            excerpt: "Learn how to create scalable design systems that grow with your product and team.",
            content: `
                <h2>What is a Design System?</h2>
                <p>A design system is more than just a style guide or component library. It's a collection of reusable components, guided by clear standards, that can be assembled together to build applications.</p>
                
                <h3>Core Components of a Design System</h3>
                <p>Every successful design system includes these fundamental elements:</p>
                
                <h4>1. Design Tokens</h4>
                <p>The smallest units of your design language. Colors, typography, spacing, and other visual properties that define your brand.</p>
                
                <h4>2. Component Library</h4>
                <p>Reusable UI components like buttons, forms, navigation elements, and more complex patterns.</p>
                
                <h4>3. Documentation</h4>
                <p>Clear guidelines on when and how to use each component, including do's and don'ts.</p>
                
                <blockquote>
                "A design system isn't a project, it's a product serving products." - Nathan Curtis
                </blockquote>
                
                <h2>Building Your Design System</h2>
                <p>Start small and grow organically. Begin with your most commonly used components and gradually expand based on team needs.</p>
                
                <h3>Step 1: Audit Your Current Designs</h3>
                <p>Take inventory of existing patterns and components across your product. Look for inconsistencies and opportunities for standardization.</p>
                
                <h3>Step 2: Define Your Design Tokens</h3>
                <p>Establish your foundational elements like color palettes, typography scales, spacing systems, and elevation levels.</p>
                
                <h3>Step 3: Create Core Components</h3>
                <p>Build your most essential components first: buttons, inputs, typography, and basic layout elements.</p>
                
                <h2>Tools and Best Practices</h2>
                <p>Popular tools for building design systems include Figma, Sketch, Adobe XD for design, and Storybook, Zeroheight for documentation.</p>
            `,
            category: "ux-design",
            tags: ["design-system", "figma", "user-research"],
            date: "2025-01-12",
            readTime: "12 min read",
            image: "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800"
        },
        {
            id: 3,
            title: "UX Research Methods Every Designer Should Know",
            excerpt: "Master the essential research techniques that will make your designs more user-centered and effective.",
            content: `
                <h2>The Foundation of Great Design</h2>
                <p>UX research is the backbone of user-centered design. It helps us understand user needs, validate design decisions, and create products that truly serve their intended audience.</p>
                
                <h3>Quantitative vs Qualitative Research</h3>
                <p>Understanding the difference between these two approaches is crucial for choosing the right method for your research goals.</p>
                
                <h4>Quantitative Research</h4>
                <p>Measures what users do. Methods include analytics, surveys, and A/B testing. Great for measuring usability and identifying patterns.</p>
                
                <h4>Qualitative Research</h4>
                <p>Explores why users behave in certain ways. Methods include interviews, usability testing, and field studies. Perfect for understanding motivations and emotions.</p>
                
                <h2>Essential Research Methods</h2>
                
                <h3>1. User Interviews</h3>
                <p>One-on-one conversations with users to understand their needs, goals, and pain points. Best conducted early in the design process.</p>
                
                <h3>2. Usability Testing</h3>
                <p>Observing users as they interact with your product to identify usability issues and areas for improvement.</p>
                
                <h3>3. Card Sorting</h3>
                <p>A method for understanding how users categorize information, perfect for designing navigation and information architecture.</p>
                
                <h3>4. A/B Testing</h3>
                <p>Comparing two versions of a design to see which performs better. Ideal for optimizing conversion rates and user engagement.</p>
                
                <blockquote>
                "Research is formalized curiosity. It is poking and prying with a purpose." - Zora Neale Hurston
                </blockquote>
                
                <h2>When to Use Each Method</h2>
                <p>Different research methods serve different purposes in the design process. Here's a guide to help you choose:</p>
                
                <h3>Discovery Phase</h3>
                <p>Use interviews, surveys, and field studies to understand user needs and market opportunities.</p>
                
                <h3>Design Phase</h3>
                <p>Employ card sorting, tree testing, and prototype testing to validate your design decisions.</p>
                
                <h3>Validation Phase</h3>
                <p>Conduct usability testing, A/B testing, and analytics review to measure success and identify improvements.</p>
            `,
            category: "ux-design",
            tags: ["user-research", "prototyping", "figma"],
            date: "2025-01-10",
            readTime: "10 min read",
            image: "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=800"
        },
        {
            id: 4,
            title: "Career Growth Tips for UX Designers in 2025",
            excerpt: "Navigate your design career with confidence. From junior to senior designer and beyond.",
            content: `
                <h2>The Evolving UX Landscape</h2>
                <p>The UX design field continues to evolve rapidly. New tools, methodologies, and career paths emerge regularly, creating both opportunities and challenges for designers at all levels.</p>
                
                <h3>Building a Strong Foundation</h3>
                <p>Whether you're just starting out or looking to level up, certain fundamentals remain constant in UX design.</p>
                
                <h4>Master the Basics</h4>
                <p>Solid understanding of design principles, user research methods, and prototyping tools is essential. Don't rush to advanced topics without mastering the fundamentals.</p>
                
                <h4>Develop Your Process</h4>
                <p>Having a repeatable, documented design process demonstrates professionalism and helps you work more efficiently.</p>
                
                <h2>Key Skills for Career Growth</h2>
                
                <h3>1. Systems Thinking</h3>
                <p>Learn to see the bigger picture. Understand how your designs fit into larger business goals and user journeys.</p>
                
                <h3>2. Communication</h3>
                <p>Your ability to articulate design decisions and present your work clearly is often more important than your design skills.</p>
                
                <h3>3. Business Acumen</h3>
                <p>Understand the business context of your designs. Learn to speak the language of stakeholders and tie your work to business metrics.</p>
                
                <h3>4. Collaboration</h3>
                <p>Modern design is a team sport. Develop strong collaboration skills with developers, product managers, and other stakeholders.</p>
                
                <blockquote>
                "The most successful designers I know are curious about everything - business, technology, people, and the world around them." - John Thackara
                </blockquote>
                
                <h2>Career Progression Paths</h2>
                
                <h3>Individual Contributor Track</h3>
                <p>Junior Designer → Mid-level Designer → Senior Designer → Principal Designer → Distinguished Designer</p>
                
                <h3>Management Track</h3>
                <p>Senior Designer → Design Team Lead → Design Manager → Design Director → VP of Design</p>
                
                <h3>Specialization Track</h3>
                <p>Focus on becoming an expert in specific areas like research, interaction design, or design systems.</p>
                
                <h2>Building Your Portfolio</h2>
                <p>Your portfolio is your most important career tool. Make sure it tells compelling stories about your design process and impact.</p>
                
                <h3>Portfolio Best Practices</h3>
                <p>Include 3-4 high-quality case studies that demonstrate your process, thinking, and results. Show the problem, your approach, and the measurable impact.</p>
            `,
            category: "career",
            tags: ["portfolio", "career", "design-system"],
            date: "2025-01-08",
            readTime: "15 min read",
            image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
        },
        {
            id: 5,
            title: "Productivity Hacks for Remote Designers",
            excerpt: "Stay focused and efficient while working from home with these proven strategies and tools.",
            content: `
                <h2>The Remote Design Challenge</h2>
                <p>Working remotely as a designer presents unique challenges. From staying motivated to collaborating effectively with team members, remote work requires intentional strategies and tools.</p>
                
                <h3>Setting Up Your Home Office</h3>
                <p>Your physical environment significantly impacts your productivity and creativity. Here's how to optimize your workspace:</p>
                
                <h4>Lighting</h4>
                <p>Natural light is best, but if that's not available, invest in a good desk lamp. Proper lighting reduces eye strain and improves focus.</p>
                
                <h4>Monitor Setup</h4>
                <p>A large, high-resolution monitor (or dual monitors) makes a huge difference in design work. Consider a 27" 4K monitor as your primary display.</p>
                
                <h4>Ergonomics</h4>
                <p>Invest in a good chair and ensure your monitor is at eye level. Your long-term health depends on proper ergonomics.</p>
                
                <h2>Time Management Strategies</h2>
                
                <h3>The Pomodoro Technique</h3>
                <p>Work in 25-minute focused intervals followed by 5-minute breaks. This technique helps maintain concentration and prevents burnout.</p>
                
                <h3>Time Blocking</h3>
                <p>Schedule specific blocks of time for different types of work: deep focus for design work, shorter blocks for meetings and communication.</p>
                
                <h3>The Two-Minute Rule</h3>
                <p>If a task takes less than two minutes, do it immediately rather than adding it to your to-do list.</p>
                
                <blockquote>
                "Productivity is never an accident. It is always the result of a commitment to excellence, intelligent planning, and focused effort." - Paul J. Meyer
                </blockquote>
                
                <h2>Essential Tools for Remote Designers</h2>
                
                <h3>Design Tools</h3>
                <p>Figma, Sketch, Adobe Creative Suite - choose tools that facilitate real-time collaboration with your team.</p>
                
                <h3>Communication Tools</h3>
                <p>Slack, Microsoft Teams, or Discord for quick communication. Zoom or Google Meet for video calls and screen sharing.</p>
                
                <h3>Project Management</h3>
                <p>Notion, Asana, or Trello to keep track of projects and deadlines. Choose tools that integrate well with your team's workflow.</p>
                
                <h3>Focus Apps</h3>
                <p>RescueTime, Freedom, or Cold Turkey to block distracting websites during work hours.</p>
                
                <h2>Maintaining Work-Life Balance</h2>
                <p>One of the biggest challenges of remote work is maintaining boundaries between work and personal life.</p>
                
                <h3>Create Rituals</h3>
                <p>Develop morning and evening routines that signal the start and end of your workday. This helps your brain transition between modes.</p>
                
                <h3>Take Regular Breaks</h3>
                <p>Step away from your screen regularly. Take a walk, do some stretches, or simply look out the window.</p>
                
                <h3>Set Boundaries</h3>
                <p>Have a dedicated workspace if possible, and avoid working from your bed or couch. Physical boundaries help maintain mental boundaries.</p>
            `,
            category: "productivity",
            tags: ["productivity", "tools", "career"],
            date: "2025-01-05",
            readTime: "11 min read",
            image: "https://images.pexels.com/photos/4050290/pexels-photo-4050290.jpeg?auto=compress&cs=tinysrgb&w=800"
        },
        {
            id: 6,
            title: "Design System Case Study: Scaling Design at TechCorp",
            excerpt: "How we built and scaled a design system across 15 product teams and 3 platforms.",
            content: `
                <h2>The Challenge</h2>
                <p>TechCorp was facing a common scaling problem. With 15 product teams working across web, mobile, and desktop platforms, design inconsistencies were everywhere. Each team had developed their own patterns, leading to a fragmented user experience.</p>
                
                <h3>Initial State Assessment</h3>
                <p>Before starting the design system project, we conducted a comprehensive audit:</p>
                
                <h4>Design Audit Findings</h4>
                <p>• 47 different button styles across products<br>
                • 23 different shades of blue being used as primary color<br>
                • No consistent spacing or typography system<br>
                • Development teams rebuilding similar components repeatedly</p>
                
                <h4>Impact on Business</h4>
                <p>• Slower development cycles<br>
                • Increased maintenance costs<br>
                • Poor user experience consistency<br>
                • Designer and developer frustration</p>
                
                <h2>Our Approach</h2>
                
                <h3>Phase 1: Foundation (Months 1-2)</h3>
                <p>We started by establishing design tokens - the atomic elements of our design language.</p>
                
                <h4>Color System</h4>
                <p>Created a comprehensive color palette with primary, secondary, and semantic colors. Each color included 9 shades for different use cases.</p>
                
                <h4>Typography</h4>
                <p>Defined a modular type scale using system fonts for optimal performance and accessibility.</p>
                
                <h4>Spacing System</h4>
                <p>Implemented an 8-point grid system for consistent spacing and layout.</p>
                
                <h3>Phase 2: Core Components (Months 3-4)</h3>
                <p>Built the most frequently used components first, focusing on quality over quantity.</p>
                
                <blockquote>
                "Start small, think big, move fast. We focused on getting 10 components right rather than 50 components mediocre." - Design System Team Lead
                </blockquote>
                
                <h4>Component Priority</h4>
                <p>1. Buttons and links<br>
                2. Form inputs and controls<br>
                3. Typography components<br>
                4. Layout and grid system<br>
                5. Navigation components</p>
                
                <h3>Phase 3: Documentation and Adoption (Months 5-6)</h3>
                <p>Created comprehensive documentation with usage guidelines, code examples, and design principles.</p>
                
                <h2>Implementation Strategy</h2>
                
                <h3>Gradual Rollout</h3>
                <p>Rather than forcing immediate adoption across all teams, we implemented a gradual rollout strategy:</p>
                
                <h4>Pilot Program</h4>
                <p>Started with 2 volunteer teams to test and refine our system. Their feedback was invaluable for improvement.</p>
                
                <h4>Training and Support</h4>
                <p>Conducted workshops for designers and developers, created video tutorials, and established office hours for questions.</p>
                
                <h4>Governance Model</h4>
                <p>Established a design system team with representatives from each product team to ensure ongoing maintenance and evolution.</p>
                
                <h2>Results and Impact</h2>
                
                <h3>Quantitative Results</h3>
                <p>• 40% reduction in design-to-development time<br>
                • 60% fewer design inconsistencies reported<br>
                • 25% faster onboarding for new team members<br>
                • 50% reduction in duplicate component development</p>
                
                <h3>Qualitative Feedback</h3>
                <p>"The design system has transformed how we work. No more reinventing the wheel - we can focus on solving user problems instead of debating button styles." - Product Designer</p>
                
                <h2>Lessons Learned</h2>
                
                <h3>Start with Why</h3>
                <p>Clearly communicate the benefits and get buy-in from leadership before starting. A design system is a long-term investment that requires ongoing support.</p>
                
                <h3>Involve Everyone</h3>
                <p>Include designers, developers, and product managers in the creation process. The best systems are built collaboratively.</p>
                
                <h3>Plan for Evolution</h3>
                <p>A design system is never "done." Plan for ongoing maintenance, updates, and evolution based on team needs and product changes.</p>
                
                <h2>Next Steps</h2>
                <p>We're now working on advanced components, animation guidelines, and expanding our system to support new platforms and use cases. The foundation we've built will serve us well as we continue to scale.</p>
            `,
            category: "case-studies",
            tags: ["design-system", "case-study", "scaling"],
            date: "2025-01-03",
            readTime: "18 min read",
            image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800"
        }
    ];
}

// Display blog post
function displayBlogPost() {
    // Update page title
    document.title = `${currentBlog.title} - The Design Dose`;
    document.getElementById('blogTitle').textContent = currentBlog.title;
    
    // Update blog content
    document.getElementById('blogPostTitle').textContent = currentBlog.title;
    document.getElementById('blogDate').textContent = formatDate(currentBlog.date);
    document.getElementById('blogReadTime').textContent = currentBlog.readTime;
    document.getElementById('blogContent').innerHTML = currentBlog.content;
    
    // Update categories
    const categoriesContainer = document.getElementById('blogCategories');
    categoriesContainer.innerHTML = `<span class="blog-category">${currentBlog.category.replace('-', ' ').toUpperCase()}</span>`;
    
    // Update cover image
    const coverImage = document.getElementById('blogCoverImage');
    if (currentBlog.image) {
        coverImage.src = currentBlog.image;
        coverImage.alt = currentBlog.title;
    } else {
        coverImage.style.display = 'none';
    }
    
    // Update tags
    const tagsContainer = document.getElementById('blogTags');
    tagsContainer.innerHTML = `
        <h3>Tags</h3>
        <div class="blog-tags">
            ${currentBlog.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
        </div>
    `;
}

// Setup navigation
function setupNavigation() {
    const currentIndex = allBlogs.findIndex(blog => blog.id === currentBlog.id);
    
    // Previous post
    const prevPost = document.getElementById('prevPost');
    if (currentIndex > 0) {
        const prevBlog = allBlogs[currentIndex - 1];
        prevPost.innerHTML = `
            <span class="nav-label">Previous Post</span>
            <span class="nav-title">${prevBlog.title}</span>
        `;
        prevPost.addEventListener('click', () => {
            window.location.href = `blog.html?id=${prevBlog.id}`;
        });
    } else {
        prevPost.style.opacity = '0.5';
        prevPost.style.cursor = 'not-allowed';
        prevPost.innerHTML = `
            <span class="nav-label">Previous Post</span>
            <span class="nav-title">No previous post</span>
        `;
    }
    
    // Next post
    const nextPost = document.getElementById('nextPost');
    if (currentIndex < allBlogs.length - 1) {
        const nextBlog = allBlogs[currentIndex + 1];
        nextPost.innerHTML = `
            <span class="nav-label">Next Post</span>
            <span class="nav-title">${nextBlog.title}</span>
        `;
        nextPost.addEventListener('click', () => {
            window.location.href = `blog.html?id=${nextBlog.id}`;
        });
    } else {
        nextPost.style.opacity = '0.5';
        nextPost.style.cursor = 'not-allowed';
        nextPost.innerHTML = `
            <span class="nav-label">Next Post</span>
            <span class="nav-title">No next post</span>
        `;
    }
}

// Setup related posts
function setupRelatedPosts() {
    const relatedPosts = allBlogs
        .filter(blog => blog.id !== currentBlog.id)
        .filter(blog => 
            blog.category === currentBlog.category || 
            blog.tags.some(tag => currentBlog.tags.includes(tag))
        )
        .slice(0, 3);
    
    const relatedContainer = document.getElementById('relatedPosts');
    relatedContainer.innerHTML = relatedPosts.map(blog => `
        <article class="blog-card" onclick="window.location.href='blog.html?id=${blog.id}'">
            <div class="blog-image">
                <i class="fas fa-${getCategoryIcon(blog.category)}"></i>
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="blog-category">${blog.category.replace('-', ' ').toUpperCase()}</span>
                    <span>•</span>
                    <span>${blog.readTime}</span>
                </div>
                <h3 class="blog-title">${blog.title}</h3>
                <p class="blog-excerpt">${blog.excerpt}</p>
            </div>
        </article>
    `).join('');
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

// Setup share buttons
function setupShareButtons() {
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
}

// Share functions
function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(currentBlog.title);
    const text = encodeURIComponent(currentBlog.excerpt);
    
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${text}`, '_blank');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${currentBlog.title} - ${currentBlog.excerpt}`);
    
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
}

function shareOnWhatsApp() {
    const text = encodeURIComponent(`${currentBlog.title} - ${currentBlog.excerpt} ${window.location.href}`);
    
    window.open(`https://wa.me/?text=${text}`, '_blank');
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link copied to clipboard!');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Link copied to clipboard!');
    });
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', loadBlogPost);