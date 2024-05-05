import {Scene} from "phaser";
import Sprite = Phaser.GameObjects.Sprite;
import Image = Phaser.GameObjects.Image;
import {EventBus} from "../EventBus.ts";
import TileSprite = Phaser.GameObjects.TileSprite;


interface Background {
    obj: Phaser.GameObjects.TileSprite;
    speed: number;
}

export class ForestScene extends Scene {
    private background1: TileSprite;
    private background2: TileSprite;
    private background3: TileSprite;
    private background4: TileSprite;
    private character: Phaser.GameObjects.Sprite;
    private ground: Sprite;
    private endX: number = 1300;

    camera: Phaser.Cameras.Scene2D.Camera;
    // ground: Phaser.GameObjects.Sprite;
    staticPlatforms: Phaser.Physics.Arcade.StaticGroup;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    platforms: Phaser.Physics.Arcade.Group;
    
    private backgroun1speed: number = 25;
    private backgroun2speed: number = 50;
    private backgroun3speed: number = 80;
    private backgroun4speed: number = 100;



    constructor ()
    {
        super('ForestScene');

    }

    calculateScale(obj: Sprite | Image| TileSprite ) {
        const scaleX = this.cameras.main.width / obj.width
        const scaleY = this.cameras.main.height / obj.height
        return [scaleX, scaleY]
    }

    init() {
        console.log('inited')

    }

    preload() {
        console.log('loaded')
        this.load.image('backgroundC1', '/assets/Forest/PNG/Backgrounds/background C layer1.png')
        this.load.image('backgroundC2', '/assets/Forest/PNG/Backgrounds/background C layer2.png')
        this.load.image('backgroundC3', '/assets/Forest/PNG/Backgrounds/background C layer3.png')
        this.load.image('backgroundC4', '/assets/Forest/PNG/Backgrounds/background C layer4.png')
        this.load.image('ground', '/assets/Forest/PNG/groundC.png')
        this.load.image('character', '/assets/Forest/PNG/boyWithBull.png')
        this.load.image('tile1', '/assets/Forest/Tiles/tile1.png')
    }

    private createGround() {
        // Create the ground sprite at the desired position
        this.ground = this.staticPlatforms.create(0, this.cameras.main.height - 30, 'ground');

        const scale = this.calculateScale(this.ground);
        this.ground.setScale(scale[0]*2, scale[1]/9);

        // Manually update the physics body to match the sprite's visual bounds
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.ground.body.updateFromGameObject();

        // Set the origin and scroll factor
        this.ground.setOrigin(0, 0).setScrollFactor(0);
    }

    private createBoy() {
        this.character = this.physics.add.sprite(20, this.camera.height - 400, 'character')
        const scale = this.calculateScale(this.character)
        const scalingNumber: number = 10
        this.character.setScale(scale[0]/scalingNumber, scale[0]/scalingNumber).setOrigin(0, 0).setScrollFactor(0)
    }
    
    private createBackgrounds() {
        const backgroundHeight = this.cameras.main.height * 0.59
        this.background1 = this.add.tileSprite(0, 0, this.cameras.main.width, backgroundHeight, 'backgroundC1')
        let scale = this.calculateScale(this.background1)
        this.background1.setScale(scale[0] , scale[1])
            // .setScrollFactor(0.2)   
            .setOrigin(0, 0)


        this.background2 = this.add.tileSprite(0, 0, this.cameras.main.width,  backgroundHeight, 'backgroundC2')
        scale = this.calculateScale(this.background2)
        this.background2.setScale(scale[0] , scale[1])
            .setOrigin(0, 0)
            // .setScrollFactor(0.4)

        this.background3 = this.add.tileSprite(0, 0,this.cameras.main.width, backgroundHeight,  'backgroundC3')
        scale = this.calculateScale(this.background3)
        this.background3.setScale(scale[0] , scale[1])
            .setOrigin(0, 0)
            // .setScrollFactor(0.6)

        this.background4 = this.add.tileSprite(0, 0,this.cameras.main.width , backgroundHeight,  'backgroundC4')
        scale = this.calculateScale(this.background4)
        this.background4.setScale(scale[0] , scale[1])
            .setOrigin(0, 0)
            // .setScrollFactor(0.8)
    }

    private createPlatforms() {
        const numIterations: number = 15
        const xCoordinate: number = 500
        const groundTop = this.ground.y - this.ground.displayHeight;

        console.log("ground.y " + this.ground.y + "   this.ground.displ " + this.ground.displayHeight)
        const maxPlatformHeight = this.camera.height - this.character.displayHeight;

        for (let i = 0; i < numIterations; i++) {
            console.log("ground.y " + this.ground.y + "   this.ground.displ " + this.ground.displayHeight)

            const randomNumber: number = Math.random()
            const height = this.textures.get("tile1").getSourceImage().height;
            const y = groundTop - randomNumber * (maxPlatformHeight - this.ground.displayHeight - height)
            // console.log("y: " + y + " height: " + height 
            // + "; height of screen: " + this.camera.height, 
            //     "  groundTop:" + groundTop)
            // console.log('groundTop ' + ( groundTop))
            const tilePlatform = this.platforms.create(300 + i * xCoordinate , y, 'tile1');
            tilePlatform.body.setAllowGravity(false);
            // when some touches, does not make it move.
            tilePlatform.body.setImmovable(true);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    create(_data: never) {
        this.camera = this.cameras.main;
        this.camera.setPosition(0, 0);
        this.camera.setBounds(0, 0, this.game.config.width as number, this.game.config.height as number);

        this.camera.setBackgroundColor(0x35ff00);

        this.staticPlatforms = this.physics.add.staticGroup()
        this.platforms = this.physics.add.group()
        
        this.createBackgrounds()
        this.createGround()
        this.createBoy()
        this.createPlatforms()
        this.physics.add.existing(this.character);
        this.camera.startFollow(this.character, true, 0.1, 0.0);


        this.physics.add.collider(this.character, this.staticPlatforms);
        this.physics.add.collider(this.character, this.platforms);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.cursors = this.input.keyboard.createCursorKeys();

        EventBus.emit('current-scene-ready', this);
    }
    
    private updateCharacterMovement() {
        const centerX = this.cameras.main.width / 4;
        this.handleCharacterYCoordinate()

        if (this.character.x < centerX || this.character.x > this.endX) {
            // Allow character to move until it reaches the center of the screen or the end
            this.handleCharacterXCoordinateMoving()
        } else {
            // Lock character's x position at the center
            this.character.x = centerX;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            this.character.body.velocity.x = 0; // Stop horizontal movement
        }
    }
    
    
    
    private handleCharacterYCoordinate() {
        if (this.cursors.up.isDown) {
            this.character.body?.setVelocityY(-330); // Jump up
        }
    }
    
    private handleCharacterXCoordinateMoving() {

        if (this.cursors.left.isDown) {
            if (this.character.x > 20) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                this.character.body?.setVelocityX(-160)
            }else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                this.character.body?.setVelocityX(0)
            }
        }else if (this.cursors.right.isDown) {
            if (this.character.x < this.camera.width - 10) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                this.character.body?.setVelocityX(160);
            }
        }else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            this.character.body?.setVelocityX(0)
        }
    }
    
    // private handleBackgroundMovement() {
    //     const moveCharacter = (velocity: number) => {
    //         if (this.character.x > 20 && this.character.x < this.camera.width - 10) {
    //             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //             // @ts-expect-error
    //             this.character.body?.setVelocityX(velocity);
    //         }
    //     };
    //
    //     if (this.cursors.left.isDown) {
    //         moveCharacter(-160);
    //     } else if (this.cursors.right.isDown) {
    //         moveCharacter(160);
    //     } else {
    //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //         // @ts-expect-error
    //         this.character.body?.setVelocityX(0);
    //     }
    // }


    
    private updatePlatformsPosition(delta: number) {
        if (this.platforms.children.entries.length > 0) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            this.platforms.children.each(platform => {
                if (platform instanceof Phaser.GameObjects.Sprite) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    platform.x -= this.character.body?.velocity.x /delta;
                }
            });
        }
    }

    private moveBackground(delta: number, forward: boolean) {
        const backgrounds: Background[] = [
            {obj: this.background1, speed: this.backgroun1speed},
            {obj: this.background2, speed: this.backgroun2speed},
            {obj: this.background3, speed: this.backgroun3speed},
            {obj: this.background4, speed: this.backgroun4speed}
        ];

        if (forward) {
            backgrounds.forEach((bg: Background) => {
                bg.obj.tilePositionX += bg.speed / delta;
            });
        } else {
            backgrounds.forEach((bg: Background) => {
                bg.obj.tilePositionX -= bg.speed / delta;
            });
        }
    }
    
    private updateBackgroundMovement(delta: number ) {
        if (this.cursors.left.isDown) {
            this.moveBackground(delta, false)
        } else if (this.cursors.right.isDown) {
            this.moveBackground(delta, true)
        }
    }
    
    update(_time: never, delta: number) {
        if (this.character.x >= this.endX) {
            this.finishGame();
            return;
        }
        
        this.updateCharacterMovement()
        this.updateBackgroundMovement(delta)
        // if (this.character.body?.velocity.x !== 0) {  // Assuming character body exists and has velocity
        //     this.updateBackgroundsPosition(delta)
        // }
        this.updatePlatformsPosition(delta)
    }

    private finishGame() {
        this.input.keyboard?.shutdown()
        this.character.body?.setVelocityX(0);
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Game Over', { fontSize: '40px', color: '#FFFFFF' }).setOrigin(0.5);
    }

    changeScene() {

    }
}