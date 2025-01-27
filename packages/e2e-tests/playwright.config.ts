import { PlaywrightTestConfig, devices } from "@playwright/test";
import { devices as replayDevices } from "@replayio/playwright";

const { CHROMIUM_ONLY, CI, SLOW_MO } = process.env;

let projects;
if (!CHROMIUM_ONLY) {
  if (CI) {
    projects = [
      {
        name: "replay-chromium",
        use: { ...(replayDevices["Replay Chromium"] as any) },
      },
      {
        name: "chromium",
        use: { ...devices["Desktop Chromium"] },
      },
    ];
  } else {
    projects = [
      {
        name: "chromium",
        use: { ...devices["Desktop Chromium"] },
      },
    ];
  }
}

const config: PlaywrightTestConfig = {
  use: {
    launchOptions: {
      slowMo: SLOW_MO ? parseInt(SLOW_MO, 10) : 0,
    },
    viewport: {
      width: 1280,
      height: 1024,
    },
    // Don't allow any one action to take more than 15s
    actionTimeout: 15_000,
  },

  // Retry failed tests on CI to account for some basic flakiness.
  retries: CI ? 5 : 0,

  // Give individual tests a while to complete instead of default 30s
  timeout: 120_000,

  // Limit the number of workers on CI, use default locally
  workers: CI ? 4 : undefined,
  projects,
};

export default config;
