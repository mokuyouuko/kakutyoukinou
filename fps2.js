class FPSCounter {
    constructor() {
        this.count = 0;
        this.fps = 0;
        setInterval(() => {
            this.fps = this.count;
            this.count = 0;
        }, 1000);
    }

    getInfo() {
        return {
            id: 'fpscounter',
            name: 'FPS Counter',
            blocks: [
                {
                    opcode: 'getFPS',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'FPS'
                }
            ]
        };
    }

    getFPS() {
        this.count++;
        return this.fps;
    }
}

Scratch.extensions.register(new FPSCounter());
