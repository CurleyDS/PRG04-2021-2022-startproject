import * as PIXI from 'pixi.js'
import fishImage from "./images/fish.png"
import bubbleImage from "./images/bubble.png"
import waterImage from "./images/water.jpg"

//
// STAP 1 - maak een pixi canvas
//
const pixi = new PIXI.Application({ width: 800, height: 450 })
document.body.appendChild(pixi.view)

let water: PIXI.Sprite;
let fish: PIXI.Sprite;

//
// STAP 2 - preload alle afbeeldingen
//
const loader = new PIXI.Loader()
loader.add('fishTexture', fishImage)
      .add('bubbleTexture', bubbleImage)
      .add('waterTexture', waterImage)
loader.load(()=>loadCompleted())

//
// STAP 3 - maak een sprite als de afbeeldingen zijn geladen
//
function loadCompleted() {
    water = new PIXI.Sprite(loader.resources["waterTexture"].texture!)
    pixi.stage.addChild(water)
    
    fish = new PIXI.Sprite(loader.resources["fishTexture"].texture!)
    fish.anchor.set(0)
    pixi.stage.addChild(fish)
    pixi.ticker.add((delta)=>update(delta));
}

function update(delta: number) {
    fish.x += delta * 1;
    fish.rotation += delta * 0.1;
}