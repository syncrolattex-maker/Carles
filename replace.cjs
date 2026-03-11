const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Colors
content = content.replace(/brand-charcoal/g, 'bg-color');
content = content.replace(/brand-gray/g, 'bg-color');
content = content.replace(/brand-light-gray/g, 'gray-dark');
content = content.replace(/brand-orange/g, 'brand-green');
content = content.replace(/bg-orange-600/g, 'bg-brand-green/80');
content = content.replace(/text-orange-600/g, 'text-brand-green/80');
content = content.replace(/border-orange-600/g, 'border-brand-green/80');

// Typography and specific elements
content = content.replace(
  /<span className="font-bold text-lg tracking-tight uppercase italic ml-2">\s*Carles<span className="text-brand-green">Mecànica<\/span>\s*<\/span>/g,
  `<span className="logo text-2xl ml-2">\n              <span className="hover-letter-anim"><span>C</span><span>A</span><span>R</span><span>L</span><span>E</span><span>S</span></span><span className="text-brand-green ml-2 hover-letter-anim"><span>M</span><span>E</span><span>C</span><span>À</span><span>N</span><span>I</span><span>C</span><span>A</span></span>\n            </span>`
);

content = content.replace(
  /className="text-4xl md:text-6xl font-extrabold leading-tight mb-4"/g,
  'className="text-4xl md:text-6xl mb-4"'
);

content = content.replace(
  /<span className="text-brand-green italic">Picassent<\/span>/g,
  '<span className="text-brand-green">Picassent</span>'
);

// Buttons text color (green background should have black text)
content = content.replace(
  /bg-brand-green hover:bg-brand-green\/80 text-white/g,
  'bg-brand-green hover:bg-brand-green/80 text-bg-color'
);
content = content.replace(
  /bg-brand-green text-white font-bold py-3 px-8/g,
  'bg-brand-green text-bg-color font-bold py-3 px-8'
);
content = content.replace(
  /bg-green-500 rounded-full flex items-center justify-center shadow-2xl z-50 text-white/g,
  'bg-brand-green rounded-full flex items-center justify-center shadow-2xl z-50 text-bg-color'
);

// Wave borders
content = content.replace(
  /className="hero-gradient min-h-\[85vh\]/g,
  'className="hero-gradient wave-border min-h-[85vh]'
);
content = content.replace(
  /className="bg-bg-color py-6 px-4 border-y border-gray-dark"/g,
  'className="bg-bg-color py-6 px-4 border-y border-gray-dark wave-border"'
);
content = content.replace(
  /className="py-16 px-6 max-w-7xl mx-auto"/g,
  'className="py-16 px-6 max-w-7xl mx-auto wave-border"'
);
content = content.replace(
  /className="bg-bg-color py-16 px-6"/g,
  'className="bg-bg-color py-16 px-6 wave-border"'
);
content = content.replace(
  /className="py-16 px-6 max-w-4xl mx-auto overflow-hidden"/g,
  'className="py-16 px-6 max-w-4xl mx-auto overflow-hidden wave-border"'
);

// Headings
content = content.replace(
  /className="text-2xl font-bold mb-10 text-center"/g,
  'className="text-3xl mb-10 text-center"'
);
content = content.replace(
  /className="text-2xl font-bold mb-12 text-center text-brand-green"/g,
  'className="text-3xl mb-12 text-center text-brand-green"'
);

fs.writeFileSync('src/App.tsx', content);
console.log('Done');
