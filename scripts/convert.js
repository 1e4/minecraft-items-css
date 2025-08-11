const items = require('../data/wiki/ids.json');
const sections = require('../data/wiki/sections.json');
const fs = require('fs');

let css = `
.icon-size-16 {
  --n:2 !important;
}

.mc-icon {
  background-image: url('/minecraft-items-spritesheet.png');
  image-rendering: crisp-edges;
  display:inline-block;
  height:calc(32px / var(--n));
  width:calc(32px / var(--n));
  background-position:calc(var(--j)/var(--n) * 32px) calc(var(--i)/var(--n) * 32px);
  background-size:calc(1024px / var(--n)) calc(3648px / var(--n));
}

.icon-size-32 {
  --n:1 !important;
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

const remap = {
    '3d': '_3d',
    '???': 'qqq'
};

const itemMap = [];

for (const item in items) {
    const i = items[item];
    const row  = Math.floor((i.pos - 1) / 32);
    const column = (i.pos - 1) % 32;
    let className = item
        .toLowerCase()
        .split(' ')
        .join('-')
        .replace("'", '')
        .replace("(", '')
        .replace(")", '')
        .replace(".", '');

    if (remap[className]) {
        className = remap[className];
    }

    console.log(sections, i.section);

    const category_name = Object.keys(sections).find(sec => {
        return sections[sec] === i.section
    });

    itemMap.push({
        id: 1,
        css_class: className,
        row: row,
        column: column,
        real_name: item,
        category_id: i.section,
        category_name: category_name
    })

    css += `.${className} {
  /* coordinates of the image */
  --i:-${row}; 
  --j:-${column}; 
}
`;
}

fs.writeFile("src/minecraft-items-spritesheet.css", css, (err) => {
    if (!err)
        console.log("Style written")
    else
        console.log(err)

    fs.copyFile("src/minecraft-items-spritesheet.css", "demo/public/minecraft-items-spritesheet.css", (err) => {
    });
});

fs.copyFile("./InvSprite.png", "src/minecraft-items-spritesheet.png", (err) => {
});

fs.writeFile("data/wiki/itemMap.json", JSON.stringify(itemMap), (err) => {

})

fs.copyFile("./InvSprite.png", "demo/public/minecraft-items-spritesheet.png", (err) => {
});


