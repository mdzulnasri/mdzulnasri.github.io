# Zulnasri Portfolio V3

Personal portfolio for **Muhamad Zulnasri Ahmad Faizal**, built with plain HTML, CSS, and JavaScript. There is no build step and no framework, so it runs on Laragon, on GitHub Pages, or by opening `index.html` directly.

## Features

- Dark and light themes. The site follows the visitor's system setting and remembers their choice.
- Animated hero with a typing headline, live stats, and a 3D-tilt profile card.
- Project cards generated from `projects.js`, with category filters, a featured project, and a detail popup. In the popup, use the ← / → arrow keys to move between projects.
- Scroll progress bar, active-section highlighting in the nav, and reveal-on-scroll animations.
- Experience timeline, a "copy email" button, and a mobile menu.
- Respects the "reduce motion" accessibility setting.

## Project structure

```
index.html          Page content (about, skills, experience, contact)
style.css           All styling and themes
script.js           Interactivity (rendering projects, filters, popup, theme, animations)
projects.js         ← Your project list. Edit this to add or change projects.
assets/
  images/profile.png            Profile photo
  projects/                     Project screenshots
  resume/Zulnasri_Resume.pdf    Resume (linked from the header and hero)
```

---

## How to add a new project

You only need to touch **two things**: a screenshot and `projects.js`. Leave `index.html` alone. The card, the filter button, the popup, and the hero "Projects" count all update automatically.

### Step 1: Add a screenshot

Put an image in `assets/projects/`, for example:

```
assets/projects/sales-dashboard.png
```

Tips:
- A **landscape** image (around 16:10, e.g. 1600×1000) looks best.
- Use lowercase names with dashes and no spaces: `sales-dashboard.png`, not `Sales Dashboard.png`.
- Keep each file under about 500 KB so the site loads quickly. Use JPG for photos and PNG for UI screenshots.
- If the image is missing, the card shows a "Project 05" placeholder instead of breaking.

### Step 2: Add the project to `projects.js`

Open `projects.js`. The file holds one list, `const projects = [ ... ];`, and each project is one `{ ... }` block.

Copy the template at the bottom of the file and paste it **after the last project's closing `}`**. Make sure there is a **comma** between the two projects:

```js
  {
    title: "Linking Park — Smart Parking Prototype",
    ...
    demo: ""
  },                                   // ← comma after the previous project
  {
    title: "Sales Performance Dashboard",
    subtitle: "Power BI Dashboard for Retail Sales",
    category: "Data Analytics",
    featured: false,
    description:
      "Built an interactive Power BI dashboard that tracks monthly sales, top products, and regional performance to support management decisions.",
    tech: ["Power BI", "Excel", "DAX"],
    highlights: [
      "Monthly sales trend analysis",
      "Top 10 product ranking",
      "Regional performance comparison"
    ],
    image: "assets/projects/sales-dashboard.png",
    github: "",
    demo: ""
  }
];
```

Save the file and refresh the browser.

### Field reference

| Field | Required | What it does |
|---|---|---|
| `title` | ✅ | Project name shown on the card and in the popup. |
| `subtitle` | optional | One-line tagline under the title. |
| `category` | ✅ | Groups the project into a filter button. **Reuse an existing category name exactly** (e.g. `"Data Analytics"`) to group projects together. A new name creates a new filter button. |
| `featured` | optional | `true` shows the project as a large, full-width card at the top of the "All" view. Mark **only one** project as featured. |
| `description` | ✅ | 2–3 sentences shown on the card and in the popup. |
| `tech` | ✅ | List of tools, shown as chips: `["Power BI", "SQL"]`. |
| `highlights` | optional | Key features or results, shown as a checklist in the popup. |
| `image` | ✅ | Path to the screenshot, e.g. `"assets/projects/sales-dashboard.png"`. |
| `github` | optional | Link to the code. Leave `""` to hide the button. |
| `demo` | optional | Link to a live demo or video. Leave `""` to hide the button. |

### Changing the order

Projects appear in the order they are listed in `projects.js`, except that the `featured` project always comes first in the "All" view. To reorder, cut and paste the blocks.

### Writing tips for a professional project entry

- **Description:** cover the *problem*, *what you built*, and the *result*. For example: "Reduced manual stock checks by building…".
- **Highlights:** start with a verb or a measurable result, e.g. "Automated low-stock alerts" or "Achieved 85% prediction accuracy".
- Keep `tech` to the 3–6 tools that matter most.

### If the projects disappear after an edit

That almost always means a syntax error in `projects.js`. Check for:

1. A **missing comma** between two `{ ... }` blocks.
2. A missing or extra **quote mark** `"`. If your text needs a quote, write `\"` or use a different word.
3. A missing `]` or `,` inside `tech` or `highlights`.

To see the exact error, open the browser console (press **F12**, then the **Console** tab). It shows the line number of the mistake.

---

## Updating other content

| To change… | Edit |
|---|---|
| Profile photo | Replace `assets/images/profile.png` (keep the same name). |
| Resume | Replace `assets/resume/Zulnasri_Resume.pdf` (keep the same name). |
| About, education, skills, experience, contact | Edit the text in `index.html`. Each section starts with a comment banner such as `<!-- ====== SKILLS ====== -->`. |
| Typing words in the hero | Edit the `rotatingWords` list near the middle of `script.js`. Keep each phrase short (under ~18 characters) so it fits on one line. |
| Tools in the scrolling strip | Edit the `<span>` items inside `marqueeTrack` in `index.html`. |
| Colours | Edit the variables at the top of `style.css` (`--accent`, `--accent-2`, …). The light theme has its own set below. |

**Hero stats** count automatically: projects from `projects.js`, skills from the chips in the Skills section, and experiences from the timeline items.

**Adding an experience:** copy one `<li class="timeline-item reveal">…</li>` block inside `<ol class="timeline">` in `index.html` and edit the text. To show dates, add `<span class="experience-date">2025</span>` next to the type label.

---

## Run locally with Laragon

1. Keep this folder in `C:\laragon\www\zulnasri_portfolio_v3\`.
2. Start Laragon.
3. Open `http://localhost/zulnasri_portfolio_v3/`.

You can also just double-click `index.html`.

## Publish on GitHub Pages

1. Push this folder to a GitHub repository.
2. On GitHub, go to **Settings → Pages**.
3. Under **Source**, choose **Deploy from a branch**, then pick `main` and `/ (root)`.
4. After a minute, the site is live at `https://<your-username>.github.io/<repo-name>/`.
