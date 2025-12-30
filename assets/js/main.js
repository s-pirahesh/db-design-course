/**
 * Main Script
 * Handles theme switching, back-to-top, code copying, and other utilities
 */

(function() {
  'use strict';
  
  // ==================== Theme Switching ====================
  function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // Get saved theme or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Toggle theme
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
      
      // Add transition class
      document.body.classList.add('theme-transitioning');
      setTimeout(() => {
        document.body.classList.remove('theme-transitioning');
      }, 300);
    });
  }
  
  function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'تغییر به تم روشن' : 'تغییر به تم تاریک');
    }
  }
  
  // ==================== Back to Top Button ====================
  function setupBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    
    // Scroll to top on click
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // ==================== Copy Code Function ====================
  window.copyCode = function(button) {
    const codeBlock = button.closest('.code-block');
    const code = codeBlock.querySelector('code');
    
    if (!code) return;
    
    const text = code.textContent;
    
    navigator.clipboard.writeText(text).then(function() {
      // Change button text temporarily
      const originalText = button.innerHTML;
      button.innerHTML = '✓ کپی شد';
      button.classList.add('copied');
      
      setTimeout(function() {
        button.innerHTML = originalText;
        button.classList.remove('copied');
      }, 2000);
    }).catch(function(err) {
      console.error('خطا در کپی کردن:', err);
      alert('خطا در کپی کردن کد');
    });
  };
  
  // ==================== Share Link Function ====================
  window.shareLink = function() {
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: url
      }).catch(err => console.log('خطا در اشتراک‌گذاری:', err));
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(function() {
        alert('لینک کپی شد!');
      }).catch(function(err) {
        console.error('خطا در کپی لینک:', err);
      });
    } else {
      // Fallback
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      alert('لینک کپی شد!');
    }
  };
  
  // ==================== Table of Contents ====================
  function setupTableOfContents() {
    const toc = document.querySelector('.toc');
    if (!toc) return;
    
    const headings = document.querySelectorAll('.article-content h2[id], .article-content h3[id]');
    if (headings.length === 0) {
      toc.style.display = 'none';
      return;
    }
    
    const tocList = toc.querySelector('ul');
    if (!tocList) return;
    
    tocList.innerHTML = '';
    
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.substring(1));
      const id = heading.id || `heading-${index}`;
      heading.id = id;
      
      const li = document.createElement('li');
      li.style.paddingRight = level === 3 ? '1rem' : '0';
      
      const a = document.createElement('a');
      a.href = `#${id}`;
      a.textContent = heading.textContent;
      
      li.appendChild(a);
      tocList.appendChild(li);
    });
    
    // Smooth scroll for TOC links
    tocList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function(e) {
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
  
  // ==================== Print Page ====================
  function setupPrint() {
    // Add print button if needed
    const printBtn = document.querySelector('[data-print]');
    if (printBtn) {
      printBtn.addEventListener('click', function() {
        window.print();
      });
    }
    
    // Handle keyboard shortcut
    document.addEventListener('keydown', function(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        // Default print will work
      }
    });
  }
  
  // ==================== Reading Progress Bar ====================
  function setupReadingProgress() {
    const article = document.querySelector('.article');
    if (!article) return;
    
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
    document.body.insertBefore(progressBar, document.body.firstChild);
    
    const progressFill = progressBar.querySelector('.reading-progress-bar');
    
    window.addEventListener('scroll', function() {
      const articleRect = article.getBoundingClientRect();
      const articleHeight = article.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrolled = -articleRect.top;
      const maxScroll = articleHeight - windowHeight;
      
      if (scrolled > 0 && scrolled < maxScroll) {
        const progress = (scrolled / maxScroll) * 100;
        progressFill.style.width = `${progress}%`;
        progressBar.classList.add('visible');
      } else if (scrolled >= maxScroll) {
        progressFill.style.width = '100%';
      } else {
        progressBar.classList.remove('visible');
      }
    });
  }
  
  // ==================== Lazy Load Images ====================
  function setupLazyLoad() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });
      
      document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }
  
  // ==================== External Links ====================
  function setupExternalLinks() {
    document.querySelectorAll('a[href^="http"]').forEach(link => {
      if (!link.hostname.includes(window.location.hostname)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
        
        // Add external link icon
        if (!link.querySelector('.external-icon')) {
          const icon = document.createElement('span');
          icon.className = 'external-icon';
          icon.innerHTML = ' ↗';
          link.appendChild(icon);
        }
      }
    });
  }
  
  // ==================== Accessibility ====================
  function setupAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'پرش به محتوای اصلی';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Focus management for modal/sidebar
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
          const focusableElements = sidebar.querySelectorAll(
            'button, a, input, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];
          
          if (e.shiftKey && document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      });
    }
  }
  
  // ==================== Performance ====================
  function setupPerformance() {
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      scrollTimeout = setTimeout(function() {
        if (originalScrollHandler) {
          originalScrollHandler();
        }
      }, 10);
    };
  }
  
  // ==================== Error Handling ====================
  function setupErrorHandling() {
    window.addEventListener('error', function(e) {
      console.error('خطا:', e.error);
      // Optionally send to analytics
    });
    
    window.addEventListener('unhandledrejection', function(e) {
      console.error('Promise رد شده:', e.reason);
      // Optionally send to analytics
    });
  }
  
  // ==================== Analytics (Optional) ====================
  function trackPageView() {
    // Add analytics code here if needed
    if (window.gtag) {
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: window.location.pathname
      });
    }
  }
  
  // ==================== Service Worker (Optional) ====================
  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(
          function(registration) {
            console.log('Service Worker registered:', registration.scope);
          },
          function(err) {
            console.log('Service Worker registration failed:', err);
          }
        );
      });
    }
  }
  
  // ==================== Initialize All ====================
  function init() {
    setupThemeToggle();
    setupBackToTop();
    setupTableOfContents();
    setupPrint();
    // setupReadingProgress(); // Optional
    setupLazyLoad();
    setupExternalLinks();
    setupAccessibility();
    setupPerformance();
    setupErrorHandling();
    trackPageView();
    // registerServiceWorker(); // Optional
    
    // Add loaded class for animations
    document.body.classList.add('loaded');
  }
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();

// ==================== Additional CSS for features ====================
const additionalStyles = `
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--bg-tertiary);
  z-index: var(--z-tooltip);
  opacity: 0;
  transition: opacity 0.3s;
}

.reading-progress.visible {
  opacity: 1;
}

.reading-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  width: 0;
  transition: width 0.1s;
}

.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--primary-color);
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: 0 0 4px 0;
  z-index: var(--z-tooltip);
}

.skip-link:focus {
  top: 0;
}

.external-icon {
  font-size: 0.8em;
  opacity: 0.6;
}

body.theme-transitioning * {
  transition: background-color 0.3s, color 0.3s, border-color 0.3s !important;
}

img.lazy {
  opacity: 0;
  transition: opacity 0.3s;
}

img.lazy:not([src]) {
  background: var(--bg-tertiary);
}

.loaded {
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
