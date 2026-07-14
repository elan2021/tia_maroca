const fs = require('fs');
const path = require('path');

const tailwindConfigPath = path.join(__dirname, 'tailwind.config.ts');
let tailwindConfig = fs.readFileSync(tailwindConfigPath, 'utf-8');

// Regex to extract colors from tailwind.config.ts
const colorsMatch = tailwindConfig.match(/colors:\s*{([\s\S]*?)},\s*fontFamily/);
if (!colorsMatch) throw new Error("Could not find colors in tailwind.config.ts");

const colorsBlock = colorsMatch[1];
const lines = colorsBlock.split('\n');

const mainColors = {};
for (const line of lines) {
  const match = line.match(/"?([a-zA-Z0-9-]+)"?:\s*"([^"]+)"/);
  if (match) {
    mainColors[match[1]] = match[2];
  }
}

// Colors from area de membros
const membrosColors = {
  "primary-fixed-dim": "#ffb4aa",
  "on-error-container": "#ffdad6",
  "error": "#ffb4ab",
  "primary-fixed": "#ffdad5",
  "on-surface": "#e5e2e1",
  "surface-dim": "#131313",
  "secondary-fixed-dim": "#c6c6c7",
  "tertiary-container": "#0072d7",
  "on-secondary-fixed": "#1a1c1c",
  "surface-container": "#201f1f",
  "primary": "#e50914",
  "on-surface-variant": "#e9bcb6",
  "on-primary-container": "#fff7f6",
  "surface": "#131313",
  "surface-container-highest": "#353534",
  "outline": "#af8782",
  "on-secondary": "#2f3131",
  "tertiary-fixed": "#d5e3ff",
  "surface-container-lowest": "#0e0e0e",
  "surface-variant": "#353534",
  "on-secondary-fixed-variant": "#454747",
  "tertiary": "#a7c8ff",
  "outline-variant": "#5e3f3b",
  "error-container": "#93000a",
  "inverse-primary": "#c0000c",
  "background": "#131313",
  "secondary-container": "#454747",
  "on-secondary-container": "#b4b5b5",
  "surface-bright": "#393939",
  "surface-tint": "#ffb4aa",
  "surface-container-high": "#2a2a2a",
  "inverse-surface": "#e5e2e1",
  "on-tertiary-container": "#f8f9ff",
  "primary-container": "#e50914",
  "on-tertiary-fixed": "#001b3c",
  "on-primary": "#690003",
  "secondary-fixed": "#e2e2e2",
  "on-primary-fixed": "#410001",
  "on-background": "#e5e2e1",
  "surface-container-low": "#1c1b1b",
  "on-tertiary": "#003061",
  "on-primary-fixed-variant": "#930007",
  "secondary": "#c6c6c7",
  "tertiary-fixed-dim": "#a7c8ff",
  "on-error": "#690005",
  "on-tertiary-fixed-variant": "#004689",
  "inverse-on-surface": "#313030"
};

// Generate CSS
let css = `:root {\n`;
for (const [key, value] of Object.entries(mainColors)) {
  css += `  --color-${key}: ${value};\n`;
}
css += `}\n\n.theme-membros {\n`;
for (const [key, value] of Object.entries(membrosColors)) {
  css += `  --color-${key}: ${value};\n`;
}
// Add typography for membros
css += `  --font-membros-display: 'Montserrat', sans-serif;\n`;
css += `  --font-membros-body: 'Inter', sans-serif;\n`;
css += `}\n`;

const globalsCssPath = path.join(__dirname, 'app', 'globals.css');
let globalsCss = fs.readFileSync(globalsCssPath, 'utf-8');

// Insert after imports if any, or at top
if (globalsCss.includes('@tailwind')) {
  globalsCss = globalsCss.replace(/@tailwind utilities;/, `@tailwind utilities;\n\n${css}`);
} else {
  globalsCss = css + "\n" + globalsCss;
}
fs.writeFileSync(globalsCssPath, globalsCss);

// Replace tailwind config colors with vars
let newColorsBlock = `colors: {\n`;
for (const key of Object.entries(mainColors)) {
  newColorsBlock += `        "${key[0]}": "var(--color-${key[0]})",\n`;
}
newColorsBlock += `      }`;

let newTailwindConfig = tailwindConfig.replace(/colors:\s*{([\s\S]*?)}(?=\s*,\s*fontFamily)/, newColorsBlock);

// Also we need to add the new font families to tailwind config and the new spacing/borderRadius from code.html
newTailwindConfig = newTailwindConfig.replace(
  /fontFamily: {/,
  `fontFamily: {
        "display-lg": ["var(--font-membros-display)", "sans-serif"],
        "headline-lg-mobile": ["var(--font-membros-display)", "sans-serif"],`
);

newTailwindConfig = newTailwindConfig.replace(
  /spacing: {/,
  `spacing: {
        section_gap: "40px",
        card_gap: "12px",
        sidebar_width: "260px",`
);

fs.writeFileSync(tailwindConfigPath, newTailwindConfig);

console.log('Refactoring complete.');
