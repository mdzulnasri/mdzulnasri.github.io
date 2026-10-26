/*
===========================================================
ZULNASRI PORTFOLIO — PROJECTS
===========================================================
Every project card, filter button, and detail popup on the
site is generated from this list. To add a project:

1. Put a screenshot in assets/projects/ (e.g. my-project.jpg).
2. Copy the TEMPLATE at the bottom of this file.
3. Paste it as a new item inside the [ ] list below
   (remember the comma between items).
4. Fill in the details. Save. Refresh the browser.

You never need to edit index.html to add a project.
See README.md for a full explanation of every field.
===========================================================
*/

const projects = [
  {
    title: "Automotive Accessories Inventory System",
    subtitle: "Applying Just-In-Time (JIT) Principles",
    category: "Final Year Project",
    featured: true,
    description:
      "A role-based automotive accessories inventory system designed around Just-In-Time principles to improve stock monitoring, part requests, purchasing, supplier coordination, and reporting.",
    tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "JIT"],
    highlights: [
      "JIT stock alerts",
      "Part request workflow",
      "Supplier purchase orders",
      "Role-based dashboards",
      "Reports and analytics"
    ],
    image: "assets/projects/project1.png",
    github: "",
    demo: ""
  },

  {
    title: "Heart Disease Prediction",
    subtitle: "Operational Decision Support Using Predictive Modelling",
    category: "Data Analytics",
    description:
      "Developed predictive analysis and Power BI dashboards for heart disease prediction using Naive Bayes classification, making model results easier to interpret and act on.",
    tech: ["WEKA", "Excel", "Power BI", "RapidMiner", "Naive Bayes"],
    highlights: [
      "Heart disease prediction using Naive Bayes classification",
      "Power BI dashboard development",
      "Predictive modelling workflow",
      "Data preparation and analysis",
      "Decision-support focused presentation of results"
    ],
    image: "assets/projects/project2.jpg",
    github: "",
    demo: ""
  },

  {
    title: "Automotive Price Predictive Modelling",
    subtitle: "Predictive Analytics for Automotive Companies",
    category: "Predictive Analytics",
    description:
      "Built predictive analysis dashboards that transform operational automotive data into clear business insights for pricing decisions.",
    tech: ["Predictive Modelling", "Data Analytics", "Dashboarding", "Business Insights"],
    highlights: [
      "Automotive price prediction",
      "Operational data analysis",
      "Business-focused dashboard design",
      "Insight generation for decision-making"
    ],
    image: "assets/projects/project3.png",
    github: "",
    demo: ""
  },

  {
    title: "Linking Park — Smart Parking Prototype",
    subtitle: "Innovation PRIDE Showcase, 13th Edition",
    category: "Innovation",
    description:
      "A smart parking prototype presented at the Innovation PRIDE Showcase, where students exhibit creative innovations through working prototypes.",
    tech: ["Parking Management System", "Prototype", "Arduino Circuit & Coding"],
    highlights: [
      "Faster search for available parking spaces",
      "Navigation to the selected parking spot",
      "Seamless booking, navigation, and checkout process"
    ],
    image: "assets/projects/project4.jpg",
    github: "",
    demo: ""
  }

  /*
  =========================================================
  TEMPLATE — COPY EVERYTHING BETWEEN THE LINES BELOW
  (including the leading comma) AND PASTE IT ABOVE THIS
  COMMENT, right after the last project's closing }
  =========================================================

  ,
  {
    title: "Your Project Name",
    subtitle: "A short one-line tagline",
    category: "Data Analytics",
    featured: false,
    description:
      "Two or three sentences: the problem, what you built, and the result.",
    tech: ["Tool 1", "Tool 2", "Tool 3"],
    highlights: [
      "Key feature or result 1",
      "Key feature or result 2",
      "Key feature or result 3"
    ],
    image: "assets/projects/your-project-image.jpg",
    github: "",
    demo: ""
  }

  =========================================================
  */
];
