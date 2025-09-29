/**
 * CSS Structure and Validation Tests
 */

const fs = require('fs');
const path = require('path');

// Read the CSS file
const cssPath = path.join(__dirname, '../style.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

describe('CSS Structure Validation', () => {
  
  describe('Basic CSS Structure', () => {
    test('should contain body styles', () => {
      expect(cssContent).toMatch(/body\s*{/);
      expect(cssContent).toMatch(/font-family:/);
      expect(cssContent).toMatch(/background-color:/);
    });

    test('should contain container class', () => {
      expect(cssContent).toMatch(/\.container\s*{/);
      expect(cssContent).toMatch(/max-width:/);
    });

    test('should contain header styles', () => {
      expect(cssContent).toMatch(/header\s*{/);
      expect(cssContent).toMatch(/nav\s*{/);
    });
  });

  describe('Navigation Styles', () => {
    test('should contain logo styles', () => {
      expect(cssContent).toMatch(/\.logo\s*{/);
    });

    test('should contain navigation list styles', () => {
      expect(cssContent).toMatch(/nav ul\s*{/);
      expect(cssContent).toMatch(/nav ul li\s*{/);
      expect(cssContent).toMatch(/nav ul li a\s*{/);
    });

    test('should contain hover and active states', () => {
      expect(cssContent).toMatch(/:hover/);
      expect(cssContent).toMatch(/\.active/);
    });
  });

  describe('Section Styles', () => {
    test('should contain hero section styles', () => {
      expect(cssContent).toMatch(/\.hero\s*{/);
      expect(cssContent).toMatch(/linear-gradient/);
    });

    test('should contain button styles', () => {
      expect(cssContent).toMatch(/\.button\s*{/);
      expect(cssContent).toMatch(/\.button:hover\s*{/);
    });

    test('should contain section general styles', () => {
      expect(cssContent).toMatch(/section\s*{/);
      expect(cssContent).toMatch(/section h2\s*{/);
    });
  });

  describe('Grid Layouts', () => {
    test('should contain project grid styles', () => {
      expect(cssContent).toMatch(/\.project-grid\s*{/);
      expect(cssContent).toMatch(/grid-template-columns/);
      expect(cssContent).toMatch(/\.project-card\s*{/);
    });

    test('should contain skills grid styles', () => {
      expect(cssContent).toMatch(/\.skills-grid\s*{/);
      expect(cssContent).toMatch(/\.skill-category\s*{/);
    });

    test('should contain blog posts layout', () => {
      expect(cssContent).toMatch(/\.blog-posts\s*{/);
      expect(cssContent).toMatch(/\.blog-post-card\s*{/);
    });
  });

  describe('Responsive Design', () => {
    test('should contain media queries', () => {
      expect(cssContent).toMatch(/@media.*max-width.*768px/);
      expect(cssContent).toMatch(/@media.*max-width.*480px/);
    });

    test('should contain responsive grid changes', () => {
      expect(cssContent).toMatch(/grid-template-columns.*1fr/);
    });

    test('should contain responsive text sizing', () => {
      expect(cssContent).toMatch(/font-size.*rem/);
    });
  });

  describe('Interactive Elements', () => {
    test('should contain transition effects', () => {
      expect(cssContent).toMatch(/transition:/);
      expect(cssContent).toMatch(/transform:/);
    });

    test('should contain box shadows', () => {
      expect(cssContent).toMatch(/box-shadow:/);
    });

    test('should contain hover transformations', () => {
      expect(cssContent).toMatch(/translateY/);
    });
  });

  describe('Footer Styles', () => {
    test('should contain footer styles', () => {
      expect(cssContent).toMatch(/footer\s*{/);
      expect(cssContent).toMatch(/\.social-icons\s*{/);
    });

    test('should contain social media styles', () => {
      expect(cssContent).toMatch(/\.social-linkedin\s*{/);
      expect(cssContent).toMatch(/\.social-github\s*{/);
    });
  });

  describe('Color Scheme', () => {
    test('should use consistent color variables', () => {
      // Check for primary colors
      expect(cssContent).toMatch(/#2c3e50/); // Dark blue
      expect(cssContent).toMatch(/#1abc9c/); // Teal
      expect(cssContent).toMatch(/#fff/);    // White
    });

    test('should have readable contrast', () => {
      // Basic check for light text on dark backgrounds
      expect(cssContent).toMatch(/background.*#2c3e50[\s\S]*color.*#fff/);
    });
  });

  describe('CSS Best Practices', () => {
    test('should not contain deprecated properties', () => {
      // Check for modern CSS (no old browser hacks)
      expect(cssContent).not.toMatch(/filter.*alpha/);
      expect(cssContent).not.toMatch(/-ms-filter/);
    });

    test('should use modern layout methods', () => {
      expect(cssContent).toMatch(/display.*flex/);
      expect(cssContent).toMatch(/display.*grid/);
    });

    test('should have proper units', () => {
      expect(cssContent).toMatch(/rem|em|px|%|vh|vw/);
    });
  });
});
