class FPSCounter {
    constructor(runtime) {
        this.runtime = runtime;
        this.fps = 0;

        // 1秒ごとにFPSをセット
        setInterval(() => {
            // TurboWarpのVMオブジェクトからFPSを取得
            if (window.vm && window.vm.runtime) {
                // FPS = 1000 ÷ 1フレームの所要時間（ms）
                const stepTime = window.vm.runtime.currentStepTime || 16.67; // デフォルト60FPS
                this.fps = Math.round(1000 / stepTime);
            } else {
                this.fps = 0;
            }
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
        return this.fps;
    }
}

Scratch.extensions.register(new FPSCounter());
