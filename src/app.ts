import * as PIXI from "pixi.js"
import bonesImage from "./images/bones.png"

export class App {
    private pixiWidth = 800
    private pixiHeight = 450
    private pixi: PIXI.Application
    private loader:PIXI.Loader

    constructor() {
        this.pixi = new PIXI.Application({ width: this.pixiWidth, height: this.pixiHeight })
        this.pixi.stage.interactive = true
        this.pixi.stage.hitArea = this.pixi.renderer.screen
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader
            .add("deadTexture", bonesImage)

        this.loader.load(() => this.doneLoading())
    }
    
    doneLoading() {
        let bones = new PIXI.Sprite(this.loader.resources["deadTexture"].texture!)
        this.pixi.stage.addChild(bones)

        bones.interactive = true
        bones.buttonMode = true
        bones.on('pointerdown', this.onClick)
    }

    onClick() {
        window.location.href = "game.html"
    }
}

new App()