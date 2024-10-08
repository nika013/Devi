// CombItem.ts
import { PlatformItem } from "./PlatformItem.ts";
import {ForestScene} from "../ForestScene.ts";

export class CombItem extends PlatformItem {
    private forestScene: ForestScene
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'comb');
        this.sprite.setScale(0.04);
        this.forestScene = this.scene as ForestScene
        this.addOverlap()
    }

    handleCollision(player: Phaser.Physics.Arcade.Sprite): void {
        this.forestScene.audioManager.takeCombSound()
        // Handle comb collection
        this.sprite.setVisible(false);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.sprite.body.enable = false;
        
        this.scene.events.emit('combCollected');
    }
    
    private addOverlap() {
        const forestScene = this.scene as ForestScene
        this.scene.physics.add.overlap(forestScene.character, this.sprite ,() => {
            forestScene.rewardManager.incrementRewardCount()
        });
    }
}
