/**
 * Course Data and State Management
 * Handles all course, module, and quiz data structures
 */

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number; // percentage
  diamondsReward: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  quiz: Quiz;
  completed: boolean;
  score?: number;
}

export interface CourseData {
  id: string;
  name: string;
  icon: string;
  level: "beginner" | "intermediate" | "advanced";
  requiredDiamonds: number;
  modules: Module[];
  unlocked: boolean;
  progress: number;
  color: string;
}

export interface UserProgress {
  diamonds: number;
  coursesUnlocked: string[]; // course IDs
  modulesCompleted: Record<string, string[]>; // courseId -> moduleIds
  quizScores: Record<string, Record<string, number>>; // courseId -> moduleId -> score
  totalDiamondsEarned: number;
}

// Initial course data
export const initialCourses: CourseData[] = [
  {
    id: "html",
    name: "HTML",
    icon: "🏗️",
    level: "beginner",
    requiredDiamonds: 0,
    unlocked: true,
    progress: 0,
    color: "from-cyan-500 to-blue-500",
    modules: [
      {
        id: "html-1",
        title: "HTML Basics",
        description: "Learn the fundamentals of HTML structure",
        content: `HTML (HyperText Markup Language) is the standard markup language for creating web pages. It provides the structure and content of websites.

Key concepts:
- Tags and elements
- Document structure
- Semantic HTML
- Attributes and values

HTML uses a system of tags enclosed in angle brackets to tell browsers how to display content. Every HTML document starts with a DOCTYPE declaration and contains head and body sections.`,
        videoUrl: "https://example.com/html-basics",
        quiz: {
          id: "html-1-quiz",
          title: "HTML Basics Quiz",
          description: "Test your understanding of HTML fundamentals",
          passingScore: 70,
          diamondsReward: 5,
          questions: [
            {
              id: "q1",
              question: "What does HTML stand for?",
              options: [
                "Hyper Text Markup Language",
                "High Tech Modern Language",
                "Home Tool Markup Language",
                "Hyperlinks and Text Markup Language",
              ],
              correctAnswer: 0,
              explanation: "HTML stands for HyperText Markup Language, the standard markup language for web pages.",
            },
            {
              id: "q2",
              question: "Which tag is used to define the main heading of a page?",
              options: ["<heading>", "<h1>", "<head>", "<header>"],
              correctAnswer: 1,
              explanation: "The <h1> tag is used to define the most important heading on a page.",
            },
            {
              id: "q3",
              question: "What is the correct structure of an HTML document?",
              options: [
                "<!DOCTYPE html><html><head></head><body></body></html>",
                "<html><body></body></html>",
                "<!DOCTYPE><head></head><body></body>",
                "<html><head></head></html>",
              ],
              correctAnswer: 0,
              explanation: "A proper HTML document starts with <!DOCTYPE html>, followed by <html>, <head>, and <body> tags.",
            },
            {
              id: "q4",
              question: "Which tag is used to create a hyperlink?",
              options: ["<link>", "<a>", "<href>", "<url>"],
              correctAnswer: 1,
              explanation: "The <a> tag is used to create hyperlinks in HTML.",
            },
            {
              id: "q5",
              question: "What does the <meta> tag do?",
              options: [
                "Creates metadata about the HTML document",
                "Defines the main content",
                "Creates a menu",
                "Links external resources",
              ],
              correctAnswer: 0,
              explanation: "The <meta> tag provides metadata about the HTML document, such as character encoding and viewport settings.",
            },
          ],
        },
        completed: false,
      },
      {
        id: "html-2",
        title: "HTML Forms",
        description: "Master HTML form elements and input types",
        content: `HTML forms are used to collect user input. They contain form elements like text inputs, checkboxes, radio buttons, and submit buttons.

Key form elements:
- <form> - container for form elements
- <input> - single line text input
- <textarea> - multi-line text input
- <select> - dropdown list
- <button> - clickable button
- <label> - label for form elements

Forms use the action attribute to specify where to send the form data, and the method attribute to specify how to send it (GET or POST).`,
        videoUrl: "https://example.com/html-forms",
        quiz: {
          id: "html-2-quiz",
          title: "HTML Forms Quiz",
          description: "Test your knowledge of HTML forms",
          passingScore: 70,
          diamondsReward: 5,
          questions: [
            {
              id: "q1",
              question: "Which attribute specifies where to send form data?",
              options: ["method", "action", "target", "submit"],
              correctAnswer: 1,
              explanation: "The action attribute specifies the URL where the form data should be sent.",
            },
            {
              id: "q2",
              question: "What is the difference between GET and POST methods?",
              options: [
                "GET sends data in URL, POST sends in request body",
                "POST is faster than GET",
                "GET is more secure than POST",
                "There is no difference",
              ],
              correctAnswer: 0,
              explanation: "GET appends form data to the URL, while POST sends it in the request body.",
            },
            {
              id: "q3",
              question: "Which input type is used for passwords?",
              options: ['<input type="text">', '<input type="password">', '<input type="secret">', '<input type="hidden">'],
              correctAnswer: 1,
              explanation: 'The <input type="password"> creates a password field that masks the input.',
            },
            {
              id: "q4",
              question: "What does the <label> tag do?",
              options: [
                "Creates a label for form elements",
                "Adds a title to the form",
                "Validates form input",
                "Submits the form",
              ],
              correctAnswer: 0,
              explanation: "The <label> tag associates text with form elements, improving accessibility and usability.",
            },
            {
              id: "q5",
              question: "Which attribute is used to make a form field required?",
              options: ["required", "mandatory", "needed", "validate"],
              correctAnswer: 0,
              explanation: 'The required attribute makes a form field mandatory before submission.',
            },
          ],
        },
        completed: false,
      },
      {
        id: "html-3",
        title: "Semantic HTML",
        description: "Learn semantic HTML for better structure",
        content: `Semantic HTML uses meaningful tags that clearly describe the content they contain. This improves accessibility, SEO, and code readability.

Semantic elements:
- <header> - introductory content
- <nav> - navigation links
- <main> - main content
- <article> - independent content
- <section> - thematic grouping
- <aside> - sidebar content
- <footer> - footer content
- <figure> - self-contained illustration
- <figcaption> - caption for figure

Using semantic HTML makes your code more maintainable and helps screen readers understand the structure better.`,
        videoUrl: "https://example.com/semantic-html",
        quiz: {
          id: "html-3-quiz",
          title: "Semantic HTML Quiz",
          description: "Test your understanding of semantic HTML",
          passingScore: 70,
          diamondsReward: 5,
          questions: [
            {
              id: "q1",
              question: "What is the purpose of semantic HTML?",
              options: [
                "To make code more meaningful and accessible",
                "To make pages load faster",
                "To add colors to elements",
                "To create animations",
              ],
              correctAnswer: 0,
              explanation: "Semantic HTML makes code more meaningful and improves accessibility for screen readers and SEO.",
            },
            {
              id: "q2",
              question: "Which tag should be used for the main content of a page?",
              options: ["<content>", "<main>", "<body>", "<section>"],
              correctAnswer: 1,
              explanation: "The <main> tag should contain the main content of the page.",
            },
            {
              id: "q3",
              question: "What is the difference between <section> and <article>?",
              options: [
                "<section> groups related content, <article> is independent content",
                "<article> is for blog posts only",
                "They are the same",
                "<section> is for sidebars",
              ],
              correctAnswer: 0,
              explanation: "<section> groups thematically related content, while <article> represents independent, self-contained content.",
            },
            {
              id: "q4",
              question: "Which tag is used for navigation links?",
              options: ["<menu>", "<nav>", "<links>", "<navigation>"],
              correctAnswer: 1,
              explanation: "The <nav> tag is used to define navigation links.",
            },
            {
              id: "q5",
              question: "What should go in the <header> tag?",
              options: [
                "Meta information about the page",
                "Introductory content or navigation",
                "The page title only",
                "CSS styles",
              ],
              correctAnswer: 1,
              explanation: "The <header> tag contains introductory content, logos, and navigation for a section or page.",
            },
          ],
        },
        completed: false,
      },
      {
        id: "html-4",
        title: "HTML5 Features",
        description: "Explore modern HTML5 features",
        content: `HTML5 introduced many new features and improvements to the HTML standard. These include new semantic elements, media support, and APIs.

HTML5 features:
- Video and audio elements
- Canvas for drawing
- SVG support
- Geolocation API
- Local storage
- Web workers
- New input types
- Improved form validation

HTML5 has become the standard for modern web development and provides powerful tools for creating rich web applications.`,
        videoUrl: "https://example.com/html5-features",
        quiz: {
          id: "html-4-quiz",
          title: "HTML5 Features Quiz",
          description: "Test your knowledge of HTML5",
          passingScore: 70,
          diamondsReward: 5,
          questions: [
            {
              id: "q1",
              question: "Which tag is used to embed video in HTML5?",
              options: ["<movie>", "<video>", "<media>", "<embed>"],
              correctAnswer: 1,
              explanation: "The <video> tag is used to embed video content in HTML5.",
            },
            {
              id: "q2",
              question: "What is the Canvas element used for?",
              options: [
                "Drawing graphics with JavaScript",
                "Creating forms",
                "Embedding videos",
                "Adding backgrounds",
              ],
              correctAnswer: 0,
              explanation: "The <canvas> element is used for drawing graphics dynamically with JavaScript.",
            },
            {
              id: "q3",
              question: "Which HTML5 API is used for storing data on the client?",
              options: ["Session API", "Local Storage", "Cookie Storage", "Web Storage API"],
              correctAnswer: 1,
              explanation: "Local Storage is an HTML5 API for storing data on the client side.",
            },
            {
              id: "q4",
              question: "What is the purpose of the <svg> tag?",
              options: [
                "Embed scalable vector graphics",
                "Create animations",
                "Add audio",
                "Define styles",
              ],
              correctAnswer: 0,
              explanation: "The <svg> tag is used to embed scalable vector graphics in HTML.",
            },
            {
              id: "q5",
              question: "Which new input type was introduced in HTML5 for email validation?",
              options: ['type="text"', 'type="email"', 'type="mail"', 'type="validate"'],
              correctAnswer: 1,
              explanation: 'The type="email" input type provides built-in email validation in HTML5.',
            },
          ],
        },
        completed: false,
      },
      {
        id: "html-5",
        title: "HTML Best Practices",
        description: "Learn HTML best practices and standards",
        content: `Following best practices ensures your HTML code is clean, maintainable, and accessible.

Best practices:
- Use semantic HTML elements
- Keep HTML structure clean and organized
- Use meaningful class and id names
- Validate your HTML
- Use proper indentation
- Include alt text for images
- Use proper heading hierarchy
- Minimize inline styles
- Keep your code DRY (Don't Repeat Yourself)
- Test for accessibility

Good HTML practices lead to better SEO, accessibility, and maintainability of your code.`,
        videoUrl: "https://example.com/html-best-practices",
        quiz: {
          id: "html-5-quiz",
          title: "HTML Best Practices Quiz",
          description: "Test your knowledge of HTML best practices",
          passingScore: 70,
          diamondsReward: 5,
          questions: [
            {
              id: "q1",
              question: "Why is it important to use semantic HTML?",
              options: [
                "It makes code more readable and accessible",
                "It makes pages load faster",
                "It adds styling automatically",
                "It's not important",
              ],
              correctAnswer: 0,
              explanation: "Semantic HTML improves code readability, accessibility, and SEO.",
            },
            {
              id: "q2",
              question: "What should you always include for images?",
              options: ["Width and height", "Alt text", "CSS classes", "JavaScript handlers"],
              correctAnswer: 1,
              explanation: "Alt text is important for accessibility and SEO for images.",
            },
            {
              id: "q3",
              question: "How should heading hierarchy be used?",
              options: [
                "Use any heading tag randomly",
                "Start with <h1> and go sequentially",
                "Use <h1> multiple times",
                "Heading hierarchy doesn't matter",
              ],
              correctAnswer: 1,
              explanation: "Heading hierarchy should start with <h1> and go sequentially for proper document structure.",
            },
            {
              id: "q4",
              question: "What is the purpose of HTML validation?",
              options: [
                "To check for syntax errors and standards compliance",
                "To improve performance",
                "To add features",
                "To change styling",
              ],
              correctAnswer: 0,
              explanation: "HTML validation checks for syntax errors and ensures compliance with HTML standards.",
            },
            {
              id: "q5",
              question: "Should inline styles be used?",
              options: [
                "Yes, always",
                "No, use external stylesheets",
                "Only for quick testing",
                "It doesn't matter",
              ],
              correctAnswer: 1,
              explanation: "Inline styles should be avoided; use external stylesheets for better maintainability.",
            },
          ],
        },
        completed: false,
      },
    ],
  },
  {
    id: "css",
    name: "CSS",
    icon: "🎨",
    level: "beginner",
    requiredDiamonds: 5,
    unlocked: true,
    progress: 0,
    color: "from-purple-500 to-pink-500",
    modules: [
      {
        id: "css-1",
        title: "CSS Basics",
        description: "Learn CSS fundamentals and selectors",
        content: `CSS (Cascading Style Sheets) is used to style HTML elements. It controls colors, fonts, spacing, and layout.

CSS fundamentals:
- Selectors (element, class, id)
- Properties and values
- Cascading and inheritance
- Specificity
- Box model

CSS uses selectors to target HTML elements and apply styles to them. Understanding selectors is crucial for effective CSS development.`,
        videoUrl: "https://example.com/css-basics",
        quiz: {
          id: "css-1-quiz",
          title: "CSS Basics Quiz",
          description: "Test your understanding of CSS fundamentals",
          passingScore: 70,
          diamondsReward: 5,
          questions: [
            {
              id: "q1",
              question: "What does CSS stand for?",
              options: [
                "Computer Style Sheets",
                "Cascading Style Sheets",
                "Creative Style System",
                "Coded Style Sheets",
              ],
              correctAnswer: 1,
              explanation: "CSS stands for Cascading Style Sheets.",
            },
            {
              id: "q2",
              question: "Which selector targets elements by class?",
              options: [".classname", "#classname", "classname", "[classname]"],
              correctAnswer: 0,
              explanation: "Class selectors use a dot (.) followed by the class name.",
            },
            {
              id: "q3",
              question: "What is the CSS Box Model?",
              options: [
                "A model for organizing CSS files",
                "Content, padding, border, and margin",
                "A tool for designing layouts",
                "A CSS framework",
              ],
              correctAnswer: 1,
              explanation: "The Box Model consists of content, padding, border, and margin.",
            },
            {
              id: "q4",
              question: "Which property is used to change text color?",
              options: ["text-color", "color", "font-color", "foreground"],
              correctAnswer: 1,
              explanation: "The color property changes text color in CSS.",
            },
            {
              id: "q5",
              question: "What does specificity mean in CSS?",
              options: [
                "How specific a selector is in targeting elements",
                "The speed of CSS processing",
                "The size of CSS files",
                "The number of CSS rules",
              ],
              correctAnswer: 0,
              explanation: "Specificity determines which CSS rule is applied when multiple rules target the same element.",
            },
          ],
        },
        completed: false,
      },
    ],
  },
  {
    id: "js",
    name: "JavaScript",
    icon: "⚡",
    level: "intermediate",
    requiredDiamonds: 15,
    unlocked: true,
    progress: 0,
    color: "from-yellow-400 to-orange-500",
    modules: [
      {
        id: "js-1",
        title: "JavaScript Basics",
        description: "Learn JavaScript fundamentals",
        content: `JavaScript is a programming language that makes web pages interactive. It runs in the browser and can manipulate HTML and CSS.

JavaScript fundamentals:
- Variables and data types
- Operators and expressions
- Control flow (if/else, loops)
- Functions
- Objects and arrays

JavaScript is essential for modern web development and enables dynamic, interactive user experiences.`,
        videoUrl: "https://example.com/js-basics",
        quiz: {
          id: "js-1-quiz",
          title: "JavaScript Basics Quiz",
          description: "Test your understanding of JavaScript fundamentals",
          passingScore: 70,
          diamondsReward: 5,
          questions: [
            {
              id: "q1",
              question: "Which keyword is used to declare a variable in JavaScript?",
              options: ["var", "let", "const", "All of the above"],
              correctAnswer: 3,
              explanation: "var, let, and const are all used to declare variables in JavaScript.",
            },
            {
              id: "q2",
              question: "What is the correct syntax for a function in JavaScript?",
              options: [
                "function myFunc() {}",
                "def myFunc() {}",
                "func myFunc() {}",
                "function: myFunc() {}",
              ],
              correctAnswer: 0,
              explanation: "Functions in JavaScript are declared using the function keyword.",
            },
            {
              id: "q3",
              question: "What is an array in JavaScript?",
              options: [
                "A single value",
                "A collection of values",
                "A function",
                "A CSS property",
              ],
              correctAnswer: 1,
              explanation: "An array is a collection of values stored in a single variable.",
            },
            {
              id: "q4",
              question: "How do you add an element to an array?",
              options: ["array.add()", "array.push()", "array.append()", "array.insert()"],
              correctAnswer: 1,
              explanation: "The push() method adds an element to the end of an array.",
            },
            {
              id: "q5",
              question: "What is the difference between == and ===?",
              options: [
                "There is no difference",
                "== compares values, === compares values and types",
                "=== is faster",
                "== is for strings, === is for numbers",
              ],
              correctAnswer: 1,
              explanation: "== compares values only, while === compares both values and types.",
            },
          ],
        },
        completed: false,
      },
    ],
  },
  {
    id: "java",
    name: "Java",
    icon: "☕",
    level: "intermediate",
    requiredDiamonds: 30,
    unlocked: false,
    progress: 0,
    color: "from-red-500 to-pink-500",
    modules: [],
  },
  {
    id: "kotlin",
    name: "Kotlin",
    icon: "🎯",
    level: "advanced",
    requiredDiamonds: 50,
    unlocked: false,
    progress: 0,
    color: "from-green-400 to-emerald-500",
    modules: [],
  },
  {
    id: "cpp",
    name: "C++",
    icon: "⚙️",
    level: "advanced",
    requiredDiamonds: 50,
    unlocked: false,
    progress: 0,
    color: "from-blue-600 to-cyan-400",
    modules: [],
  },
];

export const initialUserProgress: UserProgress = {
  diamonds: 25,
  coursesUnlocked: ["html", "css", "js"],
  modulesCompleted: {},
  quizScores: {},
  totalDiamondsEarned: 0,
};
