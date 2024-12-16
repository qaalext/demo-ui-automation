import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
    timeout: 10000,
    retries: 0,
    testDir: "tests/api",
    use: {
        headless: true,
        viewport: { width: 1280, height: 720},
        actionTimeout: 10000,
        ignoreHTTPSErrors: true,
        video: "off",
        screenshot: "off",
    },

    
    projects: [
        {
            name: "Chromium",
            use: { 
                browserName: "chromium", 
                viewport: null,
                launchOptions: {
                    args: ["--start-maximized"]
            }}
        },
        {
            name: "FireFox",
            use: { browserName: "firefox"}
        },
        {
            name: "Webkit",
            use: { browserName: "webkit"}
        },
    ]

}
export default config;