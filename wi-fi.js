class WifiDetect {
  constructor() {
    this.lastPing = 0;
    this.startAutoPing();
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
        }
      ]
    };
  }

  isOnline() {
    return navigator.onLine;
  }

  async pingOnce() {
    const url = "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png?" + Math.random();
    const start = performance.now();
    try {
      await fetch(url, {cache: "no-store"});
      this.lastPing = Math.round(performance.now() - start);
    } catch (e) {
      this.lastPing = -1; // エラー時は-1
    }
  }

  startAutoPing() {
    // 1秒ごとにping
    setInterval(() => {
      this.pingOnce();
    }, 1000);
  }

  getPingMs() {
    return this.lastPing;
  }
}

Scratch.extensions.register(new WifiDetect());
