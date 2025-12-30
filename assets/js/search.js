/**
 * Search Script
 * Handles search functionality across all content
 */

(function() {
  'use strict';
  
  // Search index - will be populated with all content
  let searchIndex = [];
  
  // ==================== Search Index Data ====================
  const searchData = [
    // Chapter 1
    { id: "1-1-1", chapter: 1, title: "داده، اطلاع و دانش", url: "../../chapters/chapter-1/1-1-1.html", keywords: ["داده", "اطلاع", "دانش", "Data", "Information", "Knowledge"] },
    { id: "1-1-2", chapter: 1, title: "سلسله مراتب داده", url: "../../chapters/chapter-1/1-1-2.html", keywords: ["Bit", "Byte", "Field", "Record", "File", "Database"] },
    { id: "1-1-3", chapter: 1, title: "داده مانا و عملیاتی", url: "../../chapters/chapter-1/1-1-3.html", keywords: ["Metadata", "Data", "Schema"] },
    { id: "1-2-1", chapter: 1, title: "نسل‌های DBMS", url: "../../chapters/chapter-1/1-2-1.html", keywords: ["File System", "Hierarchical", "Network", "Relational"] },
    { id: "1-2-2", chapter: 1, title: "مشکلات فایلینگ", url: "../../chapters/chapter-1/1-2-2.html", keywords: ["Data Redundancy", "Inconsistency", "DBMS"] },
    { id: "1-3-1", chapter: 1, title: "معماری متمرکز", url: "../../chapters/chapter-1/1-3-1.html", keywords: ["Centralized", "Client-Server", "Architecture"] },
    { id: "1-3-2", chapter: 1, title: "معماری توزیع‌شده", url: "../../chapters/chapter-1/1-3-2.html", keywords: ["Distributed", "Transparency", "Replication"] },
    
    // Chapter 2
    { id: "2-1-1", chapter: 2, title: "موجودیت‌ها", url: "../../chapters/chapter-2/2-1-1.html", keywords: ["Entity", "Strong", "Weak", "موجودیت"] },
    { id: "2-1-2", chapter: 2, title: "صفات و دامنه", url: "../../chapters/chapter-2/2-1-2.html", keywords: ["Attribute", "Domain", "Simple", "Composite"] },
    { id: "2-2-1", chapter: 2, title: "ارتباط و درجه", url: "../../chapters/chapter-2/2-2-1.html", keywords: ["Relationship", "Degree", "Binary", "Ternary"] },
    { id: "2-2-2", chapter: 2, title: "چندی", url: "../../chapters/chapter-2/2-2-2.html", keywords: ["Cardinality", "1:1", "1:N", "M:N"] },
    { id: "2-2-3", chapter: 2, title: "مشارکت", url: "../../chapters/chapter-2/2-2-3.html", keywords: ["Participation", "Total", "Partial"] },
    { id: "2-3-1", chapter: 2, title: "وراثت", url: "../../chapters/chapter-2/2-3-1.html", keywords: ["Inheritance", "Is-A", "Generalization"] },
    { id: "2-3-2", chapter: 2, title: "محدودیت‌های تخصیص", url: "../../chapters/chapter-2/2-3-2.html", keywords: ["Disjoint", "Overlapping", "Constraints"] },
    { id: "2-4-1", chapter: 2, title: "U-Type", url: "../../chapters/chapter-2/2-4-1.html", keywords: ["U-Type", "Union", "Category"] },
    { id: "2-4-2", chapter: 2, title: "Aggregation", url: "../../chapters/chapter-2/2-4-2.html", keywords: ["Aggregation", "Higher-order"] },
    
    // Chapter 3
    { id: "3-1", chapter: 3, title: "HDS", url: "../../chapters/chapter-3/3-1.html", keywords: ["HDS", "Hierarchical", "Tree"] },
    { id: "3-2", chapter: 3, title: "ANSI-SPARC", url: "../../chapters/chapter-3/3-2.html", keywords: ["ANSI-SPARC", "3-Schema", "External", "Conceptual"] },
    { id: "3-3", chapter: 3, title: "دیدها", url: "../../chapters/chapter-3/3-3.html", keywords: ["Views", "Virtual Tables", "Security"] },
    { id: "3-4", chapter: 3, title: "استقلال داده‌ای", url: "../../chapters/chapter-3/3-4.html", keywords: ["Data Independence", "Physical", "Logical"] },
    
    // Chapter 4
    { id: "4-1", chapter: 4, title: "تعریف ریاضی", url: "../../chapters/chapter-4/4-1.html", keywords: ["Relation", "Tuple", "Attribute", "Domain"] },
    { id: "4-2", chapter: 4, title: "کلیدها", url: "../../chapters/chapter-4/4-2.html", keywords: ["Key", "Primary", "Foreign", "Candidate"] },
    { id: "4-3-1", chapter: 4, title: "نگاشت - بخش ۱", url: "../../chapters/chapter-4/4-3-1.html", keywords: ["Mapping", "Strong Entity", "Weak Entity"] },
    { id: "4-3-2", chapter: 4, title: "نگاشت - بخش ۲", url: "../../chapters/chapter-4/4-3-2.html", keywords: ["Mapping", "1:N", "M:N"] },
    { id: "4-3-3", chapter: 4, title: "نگاشت - بخش ۳", url: "../../chapters/chapter-4/4-3-3.html", keywords: ["Mapping", "Inheritance", "U-Type"] },
    
    // Chapter 5
    { id: "5-1-2", chapter: 5, title: "جامعیت عام", url: "../../chapters/chapter-5/5-1-2.html", keywords: ["Domain", "Entity Integrity", "Referential"] },
    { id: "5-3", chapter: 5, title: "قیود خاص", url: "../../chapters/chapter-5/5-3.html", keywords: ["Business Rules", "Semantic", "Triggers"] },
    
    // Chapter 6
    { id: "6-1-1", chapter: 6, title: "جبر رابطه‌ای", url: "../../chapters/chapter-6/6-1-1.html", keywords: ["Relational Algebra", "Selection", "Projection", "Join"] },
    { id: "6-1-2", chapter: 6, title: "ادامه جبر", url: "../../chapters/chapter-6/6-1-2.html", keywords: ["Outer Join", "Division", "Aggregate"] },
    { id: "6-2", chapter: 6, title: "حساب رابطه‌ای", url: "../../chapters/chapter-6/6-2.html", keywords: ["Relational Calculus", "TRC", "DRC"] },
    
    // Chapter 7
    { id: "7-1", chapter: 7, title: "آنومالی و FD", url: "../../chapters/chapter-7/7-1.html", keywords: ["Anomaly", "FD", "Functional Dependency"] },
    { id: "7-2", chapter: 7, title: "1NF, 2NF, 3NF", url: "../../chapters/chapter-7/7-2.html", keywords: ["1NF", "2NF", "3NF", "Normal Forms"] },
    { id: "7-3", chapter: 7, title: "BCNF, 4NF, 5NF", url: "../../chapters/chapter-7/7-3.html", keywords: ["BCNF", "4NF", "5NF", "MVD"] }
  ];
  
  // ==================== Search Modal Setup ====================
  function setupSearchModal() {
    const searchToggle = document.getElementById('search-toggle');
    const searchModal = document.getElementById('search-modal');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');
    
    if (!searchToggle || !searchModal) return;
    
    // Open search
    searchToggle.addEventListener('click', function() {
      searchModal.classList.add('active');
      setTimeout(() => searchInput?.focus(), 100);
      document.body.style.overflow = 'hidden';
    });
    
    // Close search
    function closeSearch() {
      searchModal.classList.remove('active');
      document.body.style.overflow = '';
      if (searchInput) searchInput.value = '';
      clearResults();
    }
    
    if (searchClose) {
      searchClose.addEventListener('click', closeSearch);
    }
    
    // Close on escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && searchModal.classList.contains('active')) {
        closeSearch();
      }
    });
    
    // Close on backdrop click
    searchModal.addEventListener('click', function(e) {
      if (e.target === searchModal) {
        closeSearch();
      }
    });
    
    // Search input handler
    if (searchInput) {
      searchInput.addEventListener('input', debounce(function(e) {
        performSearch(e.target.value);
      }, 300));
    }
  }
  
  // ==================== Search Function ====================
  function performSearch(query) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;
    
    if (!query || query.trim().length < 2) {
      clearResults();
      return;
    }
    
    query = query.trim().toLowerCase();
    const results = [];
    
    // Search in data
    searchData.forEach(item => {
      let score = 0;
      
      // Title match (highest priority)
      if (item.title.toLowerCase().includes(query)) {
        score += 10;
      }
      
      // Keywords match
      item.keywords.forEach(keyword => {
        if (keyword.toLowerCase().includes(query)) {
          score += 5;
        }
      });
      
      // ID match
      if (item.id.includes(query)) {
        score += 3;
      }
      
      if (score > 0) {
        results.push({ ...item, score });
      }
    });
    
    // Sort by score
    results.sort((a, b) => b.score - a.score);
    
    displayResults(results, query);
  }
  
  // ==================== Display Results ====================
  function displayResults(results, query) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;
    
    if (results.length === 0) {
      resultsContainer.innerHTML = `
        <div class="search-no-results">
          <p>نتیجه‌ای یافت نشد برای: <strong>"${escapeHtml(query)}"</strong></p>
          <p class="search-hint">پیشنهاد: کلمات کلیدی مختلفی امتحان کنید</p>
        </div>
      `;
      return;
    }
    
    let html = `<div class="search-results-header">
      <p>${results.length} نتیجه برای: <strong>"${escapeHtml(query)}"</strong></p>
    </div>`;
    
    results.forEach(result => {
      const highlightedTitle = highlightText(result.title, query);
      html += `
        <a href="${result.url}" class="search-result-item">
          <div class="search-result-badge">فصل ${result.chapter}</div>
          <div class="search-result-content">
            <h4>${highlightedTitle}</h4>
            <p class="search-result-keywords">${result.keywords.slice(0, 3).join(' • ')}</p>
          </div>
          <div class="search-result-arrow">←</div>
        </a>
      `;
    });
    
    resultsContainer.innerHTML = html;
  }
  
  // ==================== Clear Results ====================
  function clearResults() {
    const resultsContainer = document.getElementById('search-results');
    if (resultsContainer) {
      resultsContainer.innerHTML = `
        <div class="search-empty">
          <p>💡 جستجو در تمام محتوای دوره</p>
          <p class="search-hint">مثال: "موجودیت"، "کلید"، "نرمال‌سازی"</p>
        </div>
      `;
    }
  }
  
  // ==================== Utility Functions ====================
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  function highlightText(text, query) {
    if (!query) return escapeHtml(text);
    
    const escapedText = escapeHtml(text);
    const regex = new RegExp(`(${escapeHtml(query)})`, 'gi');
    return escapedText.replace(regex, '<mark>$1</mark>');
  }
  
  // ==================== Initialize ====================
  function init() {
    setupSearchModal();
    clearResults();
  }
  
  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();

// ==================== Search Modal Styles ====================
const searchStyles = `
.search-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  z-index: var(--z-modal);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 10vh;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
}

.search-modal.active {
  opacity: 1;
  visibility: visible;
}

.search-modal-content {
  background: var(--bg-color);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  width: 90%;
  max-width: 700px;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.search-header {
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  border-bottom: 2px solid var(--border-color);
  background: var(--bg-secondary);
}

#search-input {
  flex: 1;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  font-size: 1rem;
  font-family: var(--font-primary);
  background: var(--bg-color);
  color: var(--text-color);
  transition: border-color 0.2s;
}

#search-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.search-close {
  width: 40px;
  height: 40px;
  border: none;
  background: var(--bg-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 1.25rem;
  color: var(--text-color);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-close:hover {
  background: var(--border-color);
  transform: rotate(90deg);
}

.search-results {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-md);
}

.search-results::-webkit-scrollbar {
  width: 8px;
}

.search-results::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}

.search-results::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 4px;
}

.search-results-header {
  padding: var(--spacing-sm) 0 var(--spacing-md);
  border-bottom: 1px solid var(--border-light);
  margin-bottom: var(--spacing-md);
}

.search-results-header p {
  margin: 0;
  color: var(--text-light);
  font-size: 0.875rem;
}

.search-result-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  border: 2px solid transparent;
  text-decoration: none;
  color: var(--text-color);
  transition: all 0.2s;
}

.search-result-item:hover {
  border-color: var(--primary-color);
  transform: translateX(-4px);
  background: var(--bg-tertiary);
}

.search-result-badge {
  padding: 0.25rem 0.75rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}

.search-result-content {
  flex: 1;
}

.search-result-content h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  color: var(--text-color);
}

.search-result-content h4 mark {
  background: var(--accent-color);
  color: white;
  padding: 0.125rem 0.25rem;
  border-radius: 2px;
}

.search-result-keywords {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--text-lighter);
}

.search-result-arrow {
  font-size: 1.25rem;
  color: var(--primary-color);
}

.search-empty,
.search-no-results {
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--text-light);
}

.search-empty p:first-child,
.search-no-results p:first-child {
  font-size: 1.125rem;
  margin-bottom: var(--spacing-sm);
}

.search-hint {
  font-size: 0.875rem;
  color: var(--text-lighter);
  margin-top: var(--spacing-xs);
}

@media (max-width: 768px) {
  .search-modal {
    padding-top: 5vh;
  }
  
  .search-modal-content {
    width: 95%;
    max-height: 85vh;
  }
  
  .search-header {
    padding: var(--spacing-sm);
  }
  
  #search-input {
    font-size: 0.9375rem;
  }
  
  .search-result-item {
    padding: var(--spacing-sm);
    gap: var(--spacing-sm);
  }
  
  .search-result-badge {
    font-size: 0.6875rem;
    padding: 0.2rem 0.5rem;
  }
}
`;

// Inject search styles
const styleSheet = document.createElement('style');
styleSheet.textContent = searchStyles;
document.head.appendChild(styleSheet);
