// AssetManager.ts
import { Scene } from 'phaser';

export class AssetManager {
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    preloadAssets() {
        
        this.loadCharacterFrames()
        this.scene.load.image('comb', '/assets/comb.png')
        this.scene.load.image('backgroundC1', '/assets/Forest/PNG/Backgrounds/background C layer1.png');
        this.scene.load.image('backgroundC2', '/assets/Forest/PNG/Backgrounds/background C layer2.png');
        this.scene.load.image('backgroundC3', '/assets/Forest/PNG/Backgrounds/background C layer3.png');
        this.scene.load.image('backgroundC4', '/assets/Forest/PNG/Backgrounds/background C layer4.png');
        this.scene.load.image('ground', '/assets/Forest/PNG/groundC.png');
        this.scene.load.image('character', '/assets/Forest/PNG/boyWithBull.png');
        this.scene.load.image('tile1', '/assets/Forest/Platforms/tile1.png');
        this.scene.load.image('tile2', '/assets/Forest/Platforms/tile2.png');
        this.scene.load.image('tile3', '/assets/Forest/Platforms/tile3.png');
        this.scene.load.image('tile4', '/assets/Forest/Platforms/tile4.png');
        this.scene.load.image('tile5', '/assets/Forest/Platforms/tile5.png');
        this.scene.load.image('tile6', '/assets/Forest/Platforms/tile6.png');
        this.scene.load.image('tile7', '/assets/Forest/Platforms/tile7.png');

        this.scene.load.image('heart', '/assets/heart.png')

        this.loadExplosion()
        this.loadBreathingBoy()
        this.loadSounds()
        // Add a callback to log when assets are done loading
        this.scene.load.on('complete', () => {
            console.log('All assets loaded');
        });
    }
    
    private loadBreathingBoy() {
        this.scene.load.image('boyBreathing1', 'assets/boy_breathing/boyWithBull-3_0000_Layer-6.png');
        this.scene.load.image('boyBreathing2', 'assets/boy_breathing/boyWithBull-3_0001_Layer-5.png');
        this.scene.load.image('boyBreathing3', 'assets/boy_breathing/boyWithBull-3_0002_Layer-4.png');
        this.scene.load.image('boyBreathing4', 'assets/boy_breathing/boyWithBull-3_0003_Layer-3.png');
        this.scene.load.image('boyBreathing5', 'assets/boy_breathing/boyWithBull-3_0004_Layer-2.png');
        this.scene.load.image('boyBreathing6', 'assets/boy_breathing/boyWithBull-3_0005_Layer-1.png');

    }
    
    private loadExplosion()  {
        for (let i = 1; i <= 8; i++) {
            this.scene.load.image(`explosion_frame_${i}`, `assets/explosion/explosion_frame_transparent_${i}.png`);
        }

    }
    private loadCharacterFrames() {
        this.scene.load.image('boyWithBull1', 'assets/character_frames/boyWithBull1.png');
        this.scene.load.image('boyWithBull2', 'assets/character_frames/boyWithBull2.png');
        this.scene.load.image('boyWithBull3', 'assets/character_frames/boyWithBull3.png');
        this.scene.load.image('boyWithBull4', 'assets/character_frames/boyWithBull4.png');
        this.scene.load.image('boyWithBull5', 'assets/character_frames/boyWithBull5.png');
        this.scene.load.image('boyWithBull6', 'assets/character_frames/boyWithBull6.png');
        this.scene.load.image('boyWithBull7', 'assets/character_frames/boyWithBull7.png');
    }
    
    private loadSounds() {
        this.scene.load.audio('backgroundMusic', '/audio/blue_skies.mp3');
        this.scene.load.audio('explosionAudio', '/audio/explosion.mp3')
        this.scene.load.audio('combTaking', '/audio/comb_taking.mp3')
    }
    
}
