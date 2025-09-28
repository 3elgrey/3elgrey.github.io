# Personal Developer Portfolio

A clean, modern, and responsive personal developer portfolio website built with HTML, CSS, and JavaScript. Designed to be easily customizable and hosted on GitHub Pages.

## Table of Contents
1.  [How to Use](#how-to-use)
2.  [Updating Content](#updating-content)
    *   [Home / Introduction](#home--introduction)
    *   [Projects Section](#projects-section)
    *   [Skills Section](#skills-section)
    *   [Blog / Daily Vlogs](#blog--daily-vlogs)
    *   [About Me](#about-me)
    *   [Contact Information](#contact-information)
3.  [Deployment on GitHub Pages](#deployment-on-github-pages)
4.  [Technologies Used](#technologies-used)
5.  [Customization](#customization)

---

## How to Use

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Customize the content:**
    Open `index.html` in a text editor and replace the placeholder text with your personal information. See the [Updating Content](#updating-content) section for details on each section.

3.  **Preview locally:**
    Open the `index.html` file in your web browser to see your changes locally before pushing to GitHub.

---

## Updating Content

All content can be updated by editing the `index.html` file.

### Home / Introduction

Locate the `<section id="home">` tag. Inside this section, you can edit:
*   **Name:** `<h1>Apurva Misra</h1>`
*   **Title:** `<h2>Java Developer</h2>`
*   **Introduction Paragraph:** The `<p>` tag content.

### Projects Section

Navigate to `<section id="projects">`. Each project is contained within a `div` with the class `project-card`. To add, remove, or edit projects:

*   **To add a new project:** Copy an existing `<div class="project-card">...</div>` block and paste it inside the `<div class="project-grid">`.
*   **To edit a project:**
    *   **Project Name:** `<h3>Project One</h3>`
    *   **Description:** The `<p>` tag content.
    *   **Tech Stack:** The content inside `<p class="tech-stack">`.
    *   **GitHub Link:** Update the `href="#"` in `<a href="#" class="button github">`.
    *   **Live Demo:** If you have a live demo, uncomment the `<a>` tag for "Live Demo" and update the `href`.

### Skills Section

Go to `<section id="skills">`. Skills are grouped into categories (`<div class="skill-category">`).

*   To add a new skill, add a new `<li>` element within the appropriate `<ul>`.
    *   Example: `<li>New Skill</li>`
*   To add a new category, copy an existing `<div class="skill-category">...</div>` block.

### Blog / Daily Vlogs

Find `<section id="blog">`. Blog posts are inside `<article class="blog-post-card">`.

*   **To add a new blog post:**
    1.  Copy an existing `<article class="blog-post-card">...</article>` block.
    2.  Update the title (`<h3>`), date (`<p class="post-meta">`), and summary (`<p>`).
    3.  For the full post, you can either create a separate HTML file (e.g., `post1.html`) and link to it in the "Read More" `<a>` tag, or simply replace the link with more content.

### About Me

In `<section id="about">`, you can edit the paragraphs (`<p>`) to provide a more detailed summary of your experience and interests.

### Contact Information

In `<section id="contact">`, update:
*   **Email:** The `mailto:` link and the display text.
*   **LinkedIn & GitHub:** The `href` attributes for the respective `<a>` tags.

---

## Deployment on GitHub Pages

1.  **Prerequisites:**
    *   Make sure you have [Git](https://git-scm.com/downloads) installed on your system.

2.  **Create a GitHub Repository:**
    *   If you haven't already, create a new repository on GitHub.
    *   For a personal portfolio, a good repository name is `your-username.github.io`.

3.  **Initialize Git and Make Your First Commit:**
    Open your terminal, navigate to your project folder, and run the following commands:
    ```bash
    # Initialize a new Git repository
    git init

    # Add all files to be tracked
    git add .

    # Commit the files with a message
    git commit -m "Initial commit"
    ```

4.  **Link Your Local Repository to GitHub:**
    ```bash
    # Replace the URL with your own repository's URL
    git remote add origin https://github.com/your-username/your-repo-name.git
    
    # Verify the remote URL
    git remote -v
    ```

5.  **Push Your Code to GitHub:**
    This command pushes your code and sets up a tracking connection between your local `main` branch and the remote `origin/main` branch.
    ```bash
    git push -u origin main
    ```

6.  **Enable GitHub Pages:**
    *   Go to your repository on GitHub.
    *   Click on the **Settings** tab.
    *   In the left sidebar, click on **Pages**.
    *   Under **Source**, select the `main` branch (or whichever branch you are using) and the `/root` folder.
    *   Click **Save**.

7.  **Access Your Site:**
    GitHub will provide you with a URL (e.g., `https://your-username.github.io/your-repo-name/`). It might take a few minutes for the site to become live.

### Troubleshooting

*   **`git` is not recognized...**: This means Git is not installed or not in your system's PATH. Re-install Git, making sure to select the option "Git from the command line and also from 3rd-party software" during installation.
*   **`src refspec main does not match any`**: This error occurs if you try to push before making any commits. Run `git add .` and `git commit -m "Initial commit"` first.
*   **`There is no tracking information for the current branch`**: This happens if you forget the `-u` flag on your first push. Run `git push -u origin main` to establish the tracking link.
*   **`fatal: refusing to merge unrelated histories`**: This can happen if you created the remote repository with a README or other files, and then tried to push a new local repository to it. Use the following command to merge the histories: `git pull origin main --allow-unrelated-histories`.

---

## Technologies Used

*   **HTML5**
*   **CSS3**
*   **JavaScript**

---

## Customization

*   **Colors & Fonts:** You can change the color scheme, fonts, and other visual styles by editing the `style.css` file.
*   **Background Image:** The hero section background image can be replaced by changing the URL in the `.hero` class in `style.css`.
*   **Social Media Icons:** In the `<footer>`, you can add or remove social media icons by editing the `<a>` tags inside `<div class="social-icons">`. You can find more icons from services like [Icons8](https://icons8.com/).
