import * as PIXI from "pixi.js"
import fishImage from "./images/fish.png"
import bgImage from "./images/water.jpg"

export class Game {

    pixi: PIXI.Application
    fish:PIXI.Sprite
    anotherFish:PIXI.Sprite
    loader:PIXI.Loader

    constructor() {
        this.pixi = new PIXI.Application({ width: 900, height: 500 })
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader
            .add("fishTexture", fishImage)
            .add("backgroundTexture", bgImage)

        this.loader.load(() => this.doneLoading())
    }

    doneLoading() {
        console.log("all textures loaded!")
        
        this.fish = new PIXI.Sprite(this.loader.resources["fishTexture"].texture!)
        this.fish.tint = Math.random() * 0xFFFFFF;
        this.fish.x = Math.random() * 800;
        this.fish.y = Math.random() * 450;
        this.pixi.stage.addChild(this.fish)

        this.anotherFish = new PIXI.Sprite(this.loader.resources["fishTexture"].texture!)
        this.anotherFish.tint = Math.random() * 0xFFFFFF;
        this.anotherFish.x = Math.random() * 800;
        this.anotherFish.y = Math.random() * 450;
        this.pixi.stage.addChild(this.anotherFish)

        this.pixi.ticker.add((delta) => this.update(delta))
    }

    update(delta : number) {
        this.fish.x -= 2
        this.anotherFish.x -= 3
    }
}

new Game()