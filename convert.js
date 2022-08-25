const {items, sections} = require('./items');
const fs = require('fs');

let css = `.icon-32 {
  background-image: url('./InvSprite.webp');
  image-rendering: crisp-edges;
  display:inline-block;
  height:calc(32px / var(--n));
  width:calc(32px / var(--n));
  background-position:calc(var(--j)/var(--n) * 32px) calc(var(--i)/var(--n) * 32px);
  background-size:calc(1024px / var(--n)) calc(3648px / var(--n));
}

.icon-size-64 {
  --n:0.5 !important;
}

.icon-size-128 {
  --n:0.25 !important;
}

.icon-size-256 {
  --n:0.125 !important;
}

.icon-size-512 {
  --n:0.0625 !important;
}
`;

let html = `<head><title>Demo of Minecraft Items as CSS</title><link rel="stylesheet" href="./minecraft-items-spritesheet.css"></head><body>`;

const remap = {
  '3d': '_3d',
  '???': 'qqq'
};

for (const item in items) {
  const i = items[item];
  const row = (Math.floor(i.pos / 32)) - 1;
  const column = Math.floor(i.pos % 32) - 1;
  let className = item.toLowerCase().split(' ').join('-').replace("'", '').replace("(", '').replace(")", '').replace(".", '');
  
  if (Object.keys(remap).includes(className)) {
    className = remap[className];
  }
  
  css += `.${className} {
  --n:1; /* scale */
  
  /* coordinates of the image */
  --i:-${row + 1}; 
  --j:-${column}; 
}
`

  html += `<br>
<br>
${item}
<div style="display: block">

<div class="icon-32 ${className}"></div>
<div class="icon-32 icon-size-64 ${className}"></div>
<div class="icon-32 icon-size-128 ${className}"></div>
<div class="icon-32 icon-size-256 ${className}"></div>
</div>
 .${className}
<br><br><br><br>`
}

html += `</body>`;

fs.writeFile("minecraft-items-spritesheet.css", css, (err) => {
  if(!err)
    console.log("Style written")
  else
    console.log(err)
})

fs.writeFile("index.html", html, (err) => {
  if (!err)
    console.log("File saved")
  else
    console.log(err)
})
