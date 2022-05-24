import * as PIXI from "pixi.js"
import fishImage from "./images/fish.png"
import bubbleImage from "./images/bubble.png"
import bgImage from "./images/water.jpg"

export class Game {

    pixi: PIXI.Application
    background:PIXI.Sprite
    fish:PIXI.Sprite
    anotherFish:PIXI.Sprite
    bubble:PIXI.Sprite
    anotherBubble:PIXI.Sprite
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
        
        this.background = new PIXI.Sprite(this.loader.resources["backgroundTexture"].texture!)
        this.pixi.stage.addChild(this.background)
        
        this.fish = new PIXI.Sprite(this.loader.resources["fishTexture"].texture!)
        this.fish.tint = Math.random() * 0xFFFFFF;
        this.fish.x = Math.random() * 900;
        this.fish.y = Math.random() * 500;
        this.pixi.stage.addChild(this.fish)

        this.anotherFish = new PIXI.Sprite(this.loader.resources["fishTexture"].texture!)
        this.anotherFish.tint = Math.random() * 0xFFFFFF;
        this.anotherFish.x = Math.random() * 900;
        this.anotherFish.y = Math.random() * 500;
        this.pixi.stage.addChild(this.anotherFish)
        
        this.bubble = new PIXI.Sprite(this.loader.resources["bubbleTexture"].texture!)
        this.bubble.x = Math.random() * 900;
        this.bubble.y = Math.random() * 500;
        this.pixi.stage.addChild(this.bubble)

        this.anotherBubble = new PIXI.Sprite(this.loader.resources["bubbleTexture"].texture!)
        this.anotherBubble.x = Math.random() * 900;
        this.anotherBubble.y = Math.random() * 500;
        this.pixi.stage.addChild(this.anotherBubble)

        this.pixi.ticker.add((delta) => this.update(delta))
    }

    update(delta : number) {
        if (this.fish.x <= 0) {
            this.fish.x = 900
        } else {
            this.moveFish()
        }
        
        if (this.anotherFish.x <= 0) {
            this.anotherFish.x = 900
        } else {
            this.moveAnotherFish()
        }

        if (this.bubble.y <= 0) {
            this.bubble.y = 500
        } else {
            this.moveBubble()
        }

        if (this.anotherBubble.y <= 0) {
            this.anotherBubble.y = 500
        } else {
            this.moveAnotherBubble()
        }
    }

    moveFish() {
        this.fish.x -= 2
    }

    moveAnotherFish() {
        this.anotherFish.x -= 3
    }

    moveBubble() {
        this.bubble.y -= 2
    }

    moveAnotherBubble() {
        this.anotherBubble.y -= 3
    }
}

new Game()