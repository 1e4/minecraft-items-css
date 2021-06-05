const {items, sections} = require('./items');
const fs = require('fs');

let css = `
<style>
  .icon-32 {
    background-image: url('./mcsprite.png');
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

let html = ``;

for (const item in items) {
  const i = items[item];
  const row = (Math.floor(i.pos / 32)) - 1;
  const column = Math.floor(i.pos % 32) - 1;
  const className = item.toLowerCase().split(' ').join('-');
  css += `
    .${className} {
    --n:1; /* scale */
    
    /* coordinates of the image */
    --i:-${row + 1}; 
    --j:-${column}; 
    }
  `

  html += `<br>
<br>
${item} ${i.pos} ${row} ${column}
<div class="icon-32 ${className}"></div>
<div class="icon-32 icon-size-64 ${className}"></div>
<div class="icon-32 icon-size-128 ${className}"></div>
<div class="icon-32 icon-size-256 ${className}"></div>
<br><br><br><br>`
}

css += `</style>`

fs.writeFile("./test.html", css + html, (err) => {
  if (!err)
    console.log("File saved")
  else
    console.log(err)
})
