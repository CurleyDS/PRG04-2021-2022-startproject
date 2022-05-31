import * as PIXI from "pixi.js"
import fishImage from "./images/fish.png"
import bubbleImage from "./images/bubble.png"
import bgImage from "./images/water.jpg"

export class Game {

    pixi: PIXI.Application
    background:PIXI.TilingSprite
    fishes:PIXI.Sprite[] = []
    bubbles:PIXI.Sprite[] = []
    loader:PIXI.Loader

    constructor() {
        this.pixi = new PIXI.Application({ width: 900, height: 500 })
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader
            .add("fishTexture", fishImage)
            .add("bubbleTexture", bubbleImage)
            .add("backgroundTexture", bgImage)

        this.loader.load(() => this.doneLoading())
    }

    doneLoading() {
        console.log("all textures loaded!")
        
        this.background = new PIXI.TilingSprite(
            this.loader.resources["backgroundTexture"].texture!,
            this.pixi.screen.width,
            this.pixi.screen.height,
        )
        this.pixi.stage.addChild(this.background)
        
        for (let x = 0; x < 10; x++) {
            let fish = new PIXI.Sprite(this.loader.resources["fishTexture"].texture!)
            fish.x = Math.random() * 900;
            fish.y = Math.random() * 500;
    
            const myfilter = new PIXI.filters.ColorMatrixFilter()
            fish.filters = [myfilter]
            myfilter.hue(Math.random()*360, false)

            this.pixi.stage.addChild(fish)
            this.fishes.push(fish)
        }
        
        for (let x = 0; x < 10; x++) {
            let bubble = new PIXI.Sprite(this.loader.resources["bubbleTexture"].texture!)
            bubble.blendMode = PIXI.BLEND_MODES.ADD
            bubble.x = Math.random() * 900;
            bubble.y = Math.random() * 500;

            this.pixi.stage.addChild(bubble)
            this.bubbles.push(bubble)
        }
        
        this.pixi.ticker.add((delta) => this.update(delta))
    }

    update(delta:number) {
        this.background.tilePosition.x += 1;
        
        for (let fish of this.fishes) {
            if (fish.x <= 0) {
                fish.x = 900
            } else {
                fish.x -= 2 * delta
            }
        }

        for (let bubble of this.bubbles) {
            if (bubble.y <= 0) {
                bubble.y = 500
            } else {
                bubble.y -= 2
            }
        }
    }
}

new Game()