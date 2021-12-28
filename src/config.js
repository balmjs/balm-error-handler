class BalmErrorConfig {
  isProd = false;

  set({ isProd }) {
    this.isProd = isProd;
  }
}

const config = new BalmErrorConfig();

export default config;
