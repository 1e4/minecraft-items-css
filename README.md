# minecraft-items-css
Minecraft items and blocks as css

Using Minecraft Wikis sprite and data returned [here](https://minecraft.fandom.com/wiki/Module:InvSprite) we can parse the sprite to get any item or block on the spritesheet. See demo below for output

[Demo, (ctrl+f to search)](https://1e4.github.io/minecraft-items-css/)

## Installation
Import the stylesheet provided

```css
@import "./minecraft-items-spritesheet.css"
```

Copy the spritesheet in the repository to the same place as the ``index.html` or you can override where the location is with

```css
.icon-32 {
    background-image: url('./mcsprite.png');
}
```

## Base usage

```html
<div class="icon-32 netherite-sword"></div>
```

## Scaling
Thanks to [Temani Afif](https://stackoverflow.com/a/50301296/3604087) for providing a way to scale spritesheets effectively.

Currently support 32x, 64x, 128x, 256x and 512x

```html
<div class="icon-32 icon-size-64 netherite-sword"></div>

<div class="icon-32 icon-size-128 netherite-sword"></div>

<div class="icon-32 icon-size-256 netherite-sword"></div>

<div class="icon-32 icon-size-512 netherite-sword"></div>
```

Should you need to change scaling, by using CSS variables you can pass in with your own custom scaling such as:

```html
<div class="icon-32 netherite-sword" style="--n:0.5"></div>
