class FPSCounter {
    constructor(runtime) {
        this.runtime = runtime;
        this.frames = 0;
        this.fps = 0;

        // 毎秒FPSを計算
        setInterval(() => {
            this.fps = this.frames;
            this.frames = 0;
        }, 1000);

        // TurboWarpで1フレームごとにカウント
        if (runtime) {
            runtime.on('PROJECT_RUN_STEP', () => {
                this.frames++;
            });
        }
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
        return this.fps;
    }
}

// 拡張を登録
Scratch.extensions.register(new FPSCounter());
