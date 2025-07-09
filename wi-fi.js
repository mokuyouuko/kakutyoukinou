class WifiDetect {
  constructor() {
    this.lastPing = 0;
  }

  getInfo() {
    return {
      id: 'wifidetect',
      name: 'Wi-Fi検知',
      blocks: [
        {
          opcode: 'isOnline',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'Wi-Fi（ネット）に接続している？'
        },
        {
          opcode: 'getPingMs',
          blockType: Scratch.BlockType.REPORTER,
          text: 'msはいくつか？'
        },
        {
          opcode: 'updatePing',
          blockType: Scratch.BlockType.COMMAND,
          text: 'msを計測する'
        }
      ]
    };
  }

  isOnline() {
    return navigator.onLine;
  }

  async updatePing() {
    const url = "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png?" + Math.random();
    const start = performance.now();
    try {
      await fetch(url, {cache: "no-store"});
      this.lastPing = Math.round(performance.now() - start);
    } catch (e) {
      this.lastPing = -1; // エラー時は-1
    }
  }

  getPingMs() {
    return this.lastPing;
  }
}

Scratch.extensions.register(new WifiDetect());
