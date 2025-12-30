/**
 * Navigation Script
 * Handles sidebar navigation, chapter toggling, and progress tracking
 */

(function() {
  'use strict';
  
  // Course structure
  const courseStructure = {
    chapters: [
      {
        id: 1,
        title: "فصل ۱: مفاهیم بنیادی",
        icon: "📚",
        sections: [
          { id: "1-1-1", title: "داده، اطلاع و دانش", file: "1-1-1.html" },
          { id: "1-1-2", title: "سلسله مراتب داده", file: "1-1-2.html" },
          { id: "1-1-3", title: "داده مانا و عملیاتی", file: "1-1-3.html" },
          { id: "1-2-1", title: "نسل‌های DBMS", file: "1-2-1.html" },
          { id: "1-2-2", title: "مشکلات فایلینگ", file: "1-2-2.html" },
          { id: "1-3-1", title: "معماری متمرکز", file: "1-3-1.html" },
          { id: "1-3-2", title: "معماری توزیع‌شده", file: "1-3-2.html" }
        ]
      },
      {
        id: 2,
        title: "فصل ۲: مدل‌سازی ER/EER",
        icon: "🎯",
        sections: [
          { id: "2-1-1", title: "موجودیت‌ها", file: "2-1-1.html" },
          { id: "2-1-2", title: "صفات و دامنه", file: "2-1-2.html" },
          { id: "2-2-1", title: "ارتباط و درجه", file: "2-2-1.html" },
          { id: "2-2-2", title: "چندی", file: "2-2-2.html" },
          { id: "2-2-3", title: "مشارکت", file: "2-2-3.html" },
          { id: "2-3-1", title: "وراثت", file: "2-3-1.html" },
          { id: "2-3-2", title: "محدودیت‌های تخصیص", file: "2-3-2.html" },
          { id: "2-4-1", title: "U-Type", file: "2-4-1.html" },
          { id: "2-4-2", title: "Aggregation", file: "2-4-2.html" }
        ]
      },
      {
        id: 3,
        title: "فصل ۳: معماری و دیدها",
        icon: "🏗️",
        sections: [
          { id: "3-1", title: "HDS", file: "3-1.html" },
          { id: "3-2", title: "ANSI-SPARC", file: "3-2.html" },
          { id: "3-3", title: "دیدها", file: "3-3.html" },
          { id: "3-4", title: "استقلال داده‌ای", file: "3-4.html" }
        ]
      },
      {
        id: 4,
        title: "فصل ۴: مدل رابطه‌ای",
        icon: "📊",
        sections: [
          { id: "4-1", title: "تعریف ریاضی", file: "4-1.html" },
          { id: "4-2", title: "کلیدها", file: "4-2.html" },
          { id: "4-3-1", title: "نگاشت - بخش ۱", file: "4-3-1.html" },
          { id: "4-3-2", title: "نگاشت - بخش ۲", file: "4-3-2.html" },
          { id: "4-3-3", title: "نگاشت - بخش ۳", file: "4-3-3.html" }
        ]
      },
      {
        id: 5,
        title: "فصل ۵: جامعیت",
        icon: "🔒",
        sections: [
          { id: "5-1-2", title: "جامعیت عام", file: "5-1-2.html" },
          { id: "5-3", title: "قیود خاص", file: "5-3.html" }
        ]
      },
      {
        id: 6,
        title: "فصل ۶: زبان‌های Query",
        icon: "💻",
        sections: [
          { id: "6-1-1", title: "جبر رابطه‌ای", file: "6-1-1.html" },
          { id: "6-1-2", title: "ادامه جبر", file: "6-1-2.html" },
          { id: "6-2", title: "حساب رابطه‌ای", file: "6-2.html" }
        ]
      },
      {
        id: 7,
        title: "فصل ۷: نرمال‌سازی",
        icon: "⚡",
        sections: [
          { id: "7-1", title: "آنومالی و FD", file: "7-1.html" },
          { id: "7-2", title: "1NF, 2NF, 3NF", file: "7-2.html" },
          { id: "7-3", title: "BCNF, 4NF, 5NF", file: "7-3.html" }
        ]
      }
    ]
  };
  
  // Get current section from URL
  function getCurrentSection() {
    const path = window.location.pathname;
    const match = path.match(/(\d+-\d+(?:-\d+)?).html/);
    return match ? match[1] : null;
  }
  
  // Find section info
  function findSection(sectionId) {
    for (const chapter of courseStructure.chapters) {
      const section = chapter.sections.find(s => s.id === sectionId);
      if (section) {
        return { chapter, section };
      }
    }
    return null;
  }
  
  // Calculate progress
  function calculateProgress(currentSectionId) {
    let totalSections = 0;
    let completedSections = 0;
    
    for (const chapter of courseStructure.chapters) {
      for (const section of chapter.sections) {
        totalSections++;
        if (section.id === currentSectionId) {
          completedSections++;
          break;
        }
        completedSections++;
      }
      if (chapter.sections.find(s => s.id === currentSectionId)) {
        break;
      }
    }
    
    return { completed: completedSections, total: totalSections };
  }
  
  // Generate navigation HTML
  function generateNavigation(currentSectionId) {
    const navContainer = document.getElementById('sidebar-nav');
    if (!navContainer) return;
    
    let html = '';
    
    courseStructure.chapters.forEach((chapter, chapterIndex) => {
      const isActive = chapter.sections.some(s => s.id === currentSectionId);
      
      html += `
        <div class="nav-chapter ${isActive ? 'active' : ''}">
          <button class="chapter-toggle" data-chapter="${chapter.id}">
            <span class="chapter-title">${chapter.icon} ${chapter.title}</span>
            <span class="toggle-icon">▼</span>
          </button>
          <ul class="chapter-sections">
      `;
      
      chapter.sections.forEach(section => {
        const activeClass = section.id === currentSectionId ? 'active' : '';
        html += `
          <li>
            <a href="../chapter-${chapter.id}/${section.file}" class="${activeClass}">
              ${section.title}
            </a>
          </li>
        `;
      });
      
      html += `
          </ul>
        </div>
      `;
    });
    
    navContainer.innerHTML = html;
    
    // Add event listeners to chapter toggles
    document.querySelectorAll('.chapter-toggle').forEach(button => {
      button.addEventListener('click', function() {
        const navChapter = this.closest('.nav-chapter');
        navChapter.classList.toggle('active');
        
        // Save state to localStorage
        const chapterId = this.dataset.chapter;
        const isActive = navChapter.classList.contains('active');
        localStorage.setItem(`chapter-${chapterId}-open`, isActive);
      });
    });
    
    // Restore chapter states from localStorage
    courseStructure.chapters.forEach(chapter => {
      const isOpen = localStorage.getItem(`chapter-${chapter.id}-open`);
      if (isOpen === 'true' || isActive) {
        const navChapter = document.querySelector(`[data-chapter="${chapter.id}"]`)?.closest('.nav-chapter');
        if (navChapter) {
          navChapter.classList.add('active');
        }
      }
    });
  }
  
  // Update progress bar
  function updateProgress(currentSectionId) {
    const progress = calculateProgress(currentSectionId);
    const percentage = (progress.completed / progress.total) * 100;
    
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    if (progressFill) {
      progressFill.style.width = `${percentage}%`;
    }
    
    if (progressText) {
      progressText.textContent = `پیشرفت: ${progress.completed} از ${progress.total} بخش`;
    }
  }
  
  // Sidebar toggle for mobile
  function setupSidebarToggle() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarClose = document.getElementById('sidebar-close');
    
    if (!sidebar || !sidebarToggle) return;
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
    
    // Toggle sidebar
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    
    // Close sidebar
    function closeSidebar() {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    if (sidebarClose) {
      sidebarClose.addEventListener('click', closeSidebar);
    }
    
    overlay.addEventListener('click', closeSidebar);
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        closeSidebar();
      }
    });
    
    // Close on section link click (mobile)
    document.querySelectorAll('.chapter-sections a').forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          closeSidebar();
        }
      });
    });
  }
  
  // Highlight active section in viewport
  function highlightActiveSection() {
    const sections = document.querySelectorAll('.article-content section[id]');
    const navLinks = document.querySelectorAll('.chapter-sections a');
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            if (link.getAttribute('href')?.includes(`#${id}`)) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { threshold: 0.5 });
    
    sections.forEach(section => observer.observe(section));
  }
  
  // Smooth scroll for internal links
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
  
  // Keyboard shortcuts
  function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
      // Ctrl/Cmd + K: Open search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('search-toggle')?.click();
      }
      
      // Ctrl/Cmd + B: Toggle sidebar
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        document.getElementById('sidebar-toggle')?.click();
      }
      
      // Arrow keys: Navigate between sections
      const currentSection = getCurrentSection();
      if (!currentSection) return;
      
      const info = findSection(currentSection);
      if (!info) return;
      
      const { chapter, section } = info;
      const sectionIndex = chapter.sections.findIndex(s => s.id === section.id);
      
      if (e.key === 'ArrowLeft' && sectionIndex < chapter.sections.length - 1) {
        // Next section
        const nextSection = chapter.sections[sectionIndex + 1];
        window.location.href = nextSection.file;
      } else if (e.key === 'ArrowRight' && sectionIndex > 0) {
        // Previous section
        const prevSection = chapter.sections[sectionIndex - 1];
        window.location.href = prevSection.file;
      }
    });
  }
  
  // Initialize on DOM ready
  function init() {
    const currentSection = getCurrentSection();
    
    if (currentSection) {
      generateNavigation(currentSection);
      updateProgress(currentSection);
    }
    
    setupSidebarToggle();
    highlightActiveSection();
    setupSmoothScroll();
    setupKeyboardShortcuts();
  }
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Export functions for external use
  window.updateProgress = updateProgress;
  window.courseStructure = courseStructure;
  
})();
