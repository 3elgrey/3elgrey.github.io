/**
 * HTML Structure and Validation Tests
 */

const fs = require('fs');
const path = require('path');

// Read the HTML file
const htmlPath = path.join(__dirname, '../index.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Create a DOM from the HTML
const { JSDOM } = require('jsdom');
const dom = new JSDOM(htmlContent);
const document = dom.window.document;

describe('HTML Structure Validation', () => {
  
  describe('Document Structure', () => {
    test('should have proper DOCTYPE', () => {
      expect(htmlContent.trim().startsWith('<!DOCTYPE html>')).toBe(true);
    });

    test('should have html element with lang attribute', () => {
      const htmlElement = document.querySelector('html');
      expect(htmlElement).toBeTruthy();
      expect(htmlElement.getAttribute('lang')).toBe('en');
    });

    test('should have head and body elements', () => {
      const head = document.querySelector('head');
      const body = document.querySelector('body');
      
      expect(head).toBeTruthy();
      expect(body).toBeTruthy();
    });
  });

  describe('Meta Information', () => {
    test('should have proper meta tags', () => {
      const charset = document.querySelector('meta[charset]');
      const viewport = document.querySelector('meta[name="viewport"]');
      
      expect(charset).toBeTruthy();
      expect(charset.getAttribute('charset')).toBe('UTF-8');
      expect(viewport).toBeTruthy();
    });

    test('should have a title', () => {
      const title = document.querySelector('title');
      expect(title).toBeTruthy();
      expect(title.textContent).toContain('Apurva Misra');
    });

    test('should link to CSS file', () => {
      const cssLink = document.querySelector('link[rel="stylesheet"]');
      expect(cssLink).toBeTruthy();
      expect(cssLink.getAttribute('href')).toBe('style.css');
    });
  });

  describe('Header and Navigation', () => {
    test('should have header with navigation', () => {
      const header = document.querySelector('header');
      const nav = document.querySelector('nav');
      
      expect(header).toBeTruthy();
      expect(nav).toBeTruthy();
    });

    test('should have logo link', () => {
      const logo = document.querySelector('.logo');
      expect(logo).toBeTruthy();
      expect(logo.textContent).toBe('Apurva Misra');
    });

    test('should have navigation menu with required links', () => {
      const navLinks = document.querySelectorAll('nav ul li a');
      const expectedLinks = ['#home', '#projects', '#skills', '#blog', '#about', '#contact'];
      
      expect(navLinks.length).toBeGreaterThanOrEqual(5);
      
      const actualLinks = Array.from(navLinks).map(link => link.getAttribute('href'));
      expectedLinks.forEach(expectedLink => {
        expect(actualLinks).toContain(expectedLink);
      });
    });
  });

  describe('Main Sections', () => {
    test('should have all required sections', () => {
      const requiredSections = ['home', 'projects', 'skills', 'blog', 'about', 'contact'];
      
      requiredSections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        expect(section).toBeTruthy();
      });
    });

    test('should have hero section with proper content', () => {
      const hero = document.querySelector('.hero');
      const heroH1 = hero.querySelector('h1');
      const heroH2 = hero.querySelector('h2');
      const heroButton = hero.querySelector('.button');
      
      expect(hero).toBeTruthy();
      expect(heroH1.textContent).toBe('Apurva Misra');
      expect(heroH2.textContent).toContain('Java');
      expect(heroButton).toBeTruthy();
    });

    test('should have projects section with project cards', () => {
      const projectsSection = document.getElementById('projects');
      const projectCards = document.querySelectorAll('.project-card');
      
      expect(projectsSection).toBeTruthy();
      expect(projectCards.length).toBeGreaterThan(0);
      
      // Check first project card structure
      const firstCard = projectCards[0];
      expect(firstCard.querySelector('h3')).toBeTruthy();
      expect(firstCard.querySelector('p')).toBeTruthy();
      expect(firstCard.querySelector('.tech-stack')).toBeTruthy();
    });

    test('should have skills section with skill categories', () => {
      const skillsSection = document.getElementById('skills');
      const skillCategories = document.querySelectorAll('.skill-category');
      
      expect(skillsSection).toBeTruthy();
      expect(skillCategories.length).toBeGreaterThan(0);
      
      // Check skills structure
      skillCategories.forEach(category => {
        expect(category.querySelector('h3')).toBeTruthy();
        expect(category.querySelector('ul')).toBeTruthy();
      });
    });
  });

  describe('Contact and Footer', () => {
    test('should have contact section with email', () => {
      const contactSection = document.getElementById('contact');
      const emailLink = contactSection.querySelector('a[href^="mailto:"]');
      
      expect(contactSection).toBeTruthy();
      expect(emailLink).toBeTruthy();
    });

    test('should have social links', () => {
      const socialLinks = document.querySelectorAll('.social-links a, .social-icons a');
      expect(socialLinks.length).toBeGreaterThan(0);
    });

    test('should have footer with copyright', () => {
      const footer = document.querySelector('footer');
      const copyright = footer.querySelector('p');
      const currentYearSpan = footer.querySelector('#current-year');
      
      expect(footer).toBeTruthy();
      expect(copyright).toBeTruthy();
      expect(currentYearSpan).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    test('should have alt attributes for images', () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        expect(img.getAttribute('alt')).toBeTruthy();
      });
    });

    test('should have proper heading hierarchy', () => {
      const h1 = document.querySelectorAll('h1');
      const h2 = document.querySelectorAll('h2');
      
      expect(h1.length).toBeGreaterThanOrEqual(1);
      expect(h2.length).toBeGreaterThan(0);
    });

    test('should have external links with target="_blank"', () => {
      const externalLinks = document.querySelectorAll('a[href^="https://"]');
      externalLinks.forEach(link => {
        expect(link.getAttribute('target')).toBe('_blank');
      });
    });
  });

  describe('JavaScript Integration', () => {
    test('should link to JavaScript file', () => {
      const scriptTag = document.querySelector('script[src="script.js"]');
      expect(scriptTag).toBeTruthy();
    });

    test('should have elements that JavaScript will interact with', () => {
      // Elements that script.js uses
      const currentYearElement = document.getElementById('current-year');
      const navLinks = document.querySelectorAll('nav ul li a');
      const sections = document.querySelectorAll('section');
      
      expect(currentYearElement).toBeTruthy();
      expect(navLinks.length).toBeGreaterThan(0);
      expect(sections.length).toBeGreaterThan(0);
    });
  });
});
