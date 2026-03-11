const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(/bg-brand-green border-brand-green text-white/g, 'bg-brand-green border-brand-green text-bg-color');
fs.writeFileSync('src/App.tsx', content);
