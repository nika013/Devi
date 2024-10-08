import {ForestScene} from "./ForestScene.ts";
import {calculateScale} from "./utils.ts";
import {CHARACTER_VELOCITY_X, CHARACTER_VELOCITY_Y, INITIAL_CHARACTER_X} from "./constants"
export class CharacterManager {
    scene: ForestScene
    constructor(scene: ForestScene) {
        this.scene = scene
    }

    public createFrames() {
        // Define the animation
        this.scene.anims.create({
            key: 'boyRun',
            frames: [
                { key: 'boyWithBull1' },
                { key: 'boyWithBull2' },
                { key: 'boyWithBull3' },
                { key: 'boyWithBull4' },
                { key: 'boyWithBull5' },
                { key: 'boyWithBull6' },
                { key: 'boyWithBull7' }
            ],
            frameRate: 13, // Adjust this to change animation speed
            repeat: 4 // -1 for infinite looping
        });

        this.scene.anims.create({
            key: 'boyRunFlipped',
            frames: [
                { key: 'boyWithBull1' },
                { key: 'boyWithBull2' },
                { key: 'boyWithBull3' },
                { key: 'boyWithBull4' },
                { key: 'boyWithBull5' },
                { key: 'boyWithBull6' },
                { key: 'boyWithBull7' }
            ],
            frameRate: 13, // Adjust this to change animation speed
            repeat: 4 // 4 means it will repeat 4 times, set to -1 for infinite looping
        });

        this.scene.anims.create({
            key: 'boyBreathing',
            frames: [
                { key: 'boyBreathing1' },
                { key: 'boyBreathing2' },
                { key: 'boyBreathing3' },
                { key: 'boyBreathing4' },
                { key: 'boyBreathing5' },
                { key: 'boyBreathing6' },
                { key: 'boyBreathing5' },
                { key: 'boyBreathing4' },
                { key: 'boyBreathing3' },
                { key: 'boyBreathing2' },
                { key: 'boyBreathing1' },
            ],
            frameRate: 6, // Adjust this to control the speed of breathing
            repeat: 3 // Infinite loop
        })
    }

    createCharacter() {
        this.scene.character = this.scene.physics.add.sprite(INITIAL_CHARACTER_X, this.scene.camera.height - 400, 'boyWithBull1'); // Start with the first frame

        // this.scene.character = this.scene.physics.add.sprite(20, this.scene.camera.height - 400, 'character')
        const scale = calculateScale(this.scene.character, this.scene.cameras)
        const scalingNumber: number = 6
        this.scene.character.setScale(scale[0]/scalingNumber, scale[0]/scalingNumber).setOrigin(0, 0).setScrollFactor(0)

    }

    manageAnimation() {
        if(this.scene.characterIsMovingBackward) {
            this.scene.character.flipX = true;  // Flip to the left
        }else {
            this.scene.character.flipX = false  // Flip to the right
        }
        
        // if(!this.scene.characterIsMovingForward &&
        //     !this.scene.characterIsMovingBackward) {
        //     this.scene.character.play('boyBreathing')
        // }
    }

    updateCharacterMovement() {
        const centerX = this.scene.cameras.main.width / 4;
        this.handleCharacterYCoordinate()

        // @ts-ignore
        // @ts-ignore
        if (this.scene.character.x < centerX || this.scene.character.x > this.scene.endX) {
            this.handleCharacterXCoordinateMoving()
        } else {
            this.handleFlipingCharacter()
            // Lock character's x position at the center
            this.scene.character.x = centerX;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            this.scene.character.body.velocity.x = 0; // Stop horizontal movement
            
        }
        if (!this.scene.characterIsMovingForward) {
            this.scene.character.setVelocity(0, 0); // Stop all movement
        }

    }

    private handleCharacterYCoordinate() {
        if (this.scene.cursors.up.isDown && this.scene.character.body?.touching.down) {
            // if (this.scene.cursors.up.isDown && this.scene.character.y >  this.scene.character.displayHeight ) {
            this.scene.character.body?.setVelocityY(CHARACTER_VELOCITY_Y);
        }
    }

    private handleFlipingCharacter(){
        const moveAmount = this.scene.cursors.left.isDown ? -1*(CHARACTER_VELOCITY_X) : this.scene.cursors.right.isDown ? CHARACTER_VELOCITY_X : 0;
        moveAmount < 0 ? this.scene.character.flipX = true : this.scene.character.flipX = false
        if (moveAmount != 0) {
            this.scene.characterIsMovingForward = true
        }else {
            this.scene.characterIsMovingForward = false
        }
    }
    // CHARACTER_VELOCITY: number = 100
    private handleCharacterXCoordinateMoving() {
        this.scene.characterIsMovingForward = true
        const moveAmount = this.scene.cursors.left.isDown ? -1*(CHARACTER_VELOCITY_X): this.scene.cursors.right.isDown ? CHARACTER_VELOCITY_X : 0;
        const characterRightEdge = this.scene.character.x + this.scene.character.width;

        moveAmount < 0 ? this.scene.character.flipX = true : this.scene.character.flipX = false
        if (characterRightEdge < this.scene.camera.width && moveAmount > 0) {
            this.scene.character.setVelocityX(moveAmount);

        } else if (this.scene.character.x > 20 && moveAmount < 0) {
            this.scene.character.setVelocityX(moveAmount);
        }else {
            this.scene.character.setVelocityX(0);
            this.scene.characterIsMovingForward = false
        }
    }

    public makeCharacterTwinkle() {
        this.scene.tweens.add({
            targets: this.scene.character,
            alpha: { from: 1, to: 0 },
            ease: 'Cubic.easeInOut',
            duration: 100,
            repeat: 5,  // Number of times to twinkle
            yoyo: true,  // Go back to original alpha after each repeat
            onComplete: () => {
                this.scene.character.setAlpha(1);  // Reset to fully visible after twinkling
            }
        });
    }

}