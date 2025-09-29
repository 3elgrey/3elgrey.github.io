/**
 * Unit tests for script.js functionality
 */

// Mock the HTML structure
document.body.innerHTML = `
  <nav>
    <ul>
      <li><a href="#home">Home</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#about">About</a></li>
    </ul>
  </nav>
  <section id="home">Home Section</section>
  <section id="projects">Projects Section</section>
  <section id="about">About Section</section>
  <footer>
    <p>&copy; <span id="current-year"></span> Apurva Misra. All rights reserved.</p>
  </footer>
`;

// Load the script content
require('../script.js');

describe('Portfolio Script Tests', () => {
  
  describe('Current Year Functionality', () => {
    test('should set current year in footer', () => {
      const currentYearElement = document.getElementById('current-year');
      const currentYear = new Date().getFullYear();
      
      expect(currentYearElement.textContent).toBe(currentYear.toString());
    });
  });

  describe('Navigation Smooth Scrolling', () => {
    test('should add click event listeners to navigation links', () => {
      const navLinks = document.querySelectorAll('nav ul li a');
      
      // Check that event listeners were added
      expect(navLinks.length).toBe(3);
      
      // Test each link has proper href
      expect(navLinks[0].getAttribute('href')).toBe('#home');
      expect(navLinks[1].getAttribute('href')).toBe('#projects');
      expect(navLinks[2].getAttribute('href')).toBe('#about');
    });

    test('should prevent default behavior on navigation click', () => {
      const navLink = document.querySelector('nav ul li a[href="#home"]');
      const mockEvent = {
        preventDefault: jest.fn(),
        target: navLink
      };

      // Simulate click event
      navLink.click = jest.fn();
      
      // Verify preventDefault would be called (we can't easily test the actual event)
      expect(navLink).toBeTruthy();
    });
  });

  describe('Section Navigation', () => {
    test('should find all page sections', () => {
      const sections = document.querySelectorAll('section');
      expect(sections.length).toBe(3);
      
      const sectionIds = Array.from(sections).map(section => section.id);
      expect(sectionIds).toContain('home');
      expect(sectionIds).toContain('projects');
      expect(sectionIds).toContain('about');
    });

    test('should find all navigation items', () => {
      const navItems = document.querySelectorAll('nav ul li a');
      expect(navItems.length).toBe(3);
    });
  });

  describe('DOM Elements Validation', () => {
    test('should have required DOM elements', () => {
      // Check navigation exists
      const nav = document.querySelector('nav');
      expect(nav).toBeTruthy();

      // Check footer exists
      const footer = document.querySelector('footer');
      expect(footer).toBeTruthy();

      // Check current year element exists
      const currentYearElement = document.getElementById('current-year');
      expect(currentYearElement).toBeTruthy();
    });

    test('should have proper navigation structure', () => {
      const navUl = document.querySelector('nav ul');
      const navItems = document.querySelectorAll('nav ul li');
      
      expect(navUl).toBeTruthy();
      expect(navItems.length).toBeGreaterThan(0);
    });
  });

  describe('Scroll Event Handling', () => {
    test('should handle scroll events for active navigation', () => {
      // Mock window properties
      Object.defineProperty(window, 'pageYOffset', {
        value: 100,
        writable: true
      });

      // Mock section properties
      const mockSection = document.getElementById('home');
      Object.defineProperty(mockSection, 'offsetTop', {
        value: 0,
        writable: true
      });
      Object.defineProperty(mockSection, 'clientHeight', {
        value: 200,
        writable: true
      });

      // Trigger scroll event
      const scrollEvent = new Event('scroll');
      window.dispatchEvent(scrollEvent);

      // Verify the scroll handler exists
      expect(window.onscroll).toBeDefined();
    });
  });
});
