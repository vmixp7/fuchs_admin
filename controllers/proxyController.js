
import puppeteer from 'puppeteer';
import proxy from 'express-http-proxy';

export const proxyAutomotive = async (req, res) => {

    const url = "https://www.fuchs.com/sea/tw/products/product-program/automotive-lubricants/";

    let browser;
    try {
        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
        );

        await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });

        // 抓取完整渲染後的 HTML
        // const html = await page.content();

        const html = await page.evaluate(() => {

            // 獲取您需要的內容
            const container = document.querySelector("#c398050");
            if (!container) return "<p>找不到內容</p>";

            // 使用屬性值包含選擇器 ([src*="..."]) 來移除所有 vhs-assets- 開頭的腳本
            // 這是正確的選擇器語法，避免了逗號的問題。
            const scriptSelector = 'script[src*="/typo3temp/assets/vhs/vhs-assets-"]';
            const scriptsToRemove = document.querySelectorAll(scriptSelector);

            // 移除所有 <form> 標籤及其內容 <--- 新增的邏輯
            document.querySelectorAll('form').forEach(form => {
                if (form.parentNode) {
                    form.parentNode.removeChild(form);
                }
            });

            // 取代localhost字串為www.fuchs.com
            document.querySelectorAll('a[href*="localhost:3000"]').forEach(link => {
                link.href = link.href.replace("localhost:3000", "www.fuchs.com");
            });

            scriptsToRemove.forEach(script => {
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }
            });

            // 抓取完整 head
            let head = document.querySelector("head").innerHTML;

            // 組合最終 HTML
            return `
            <html>
            <head>${head}</head>
            <body>
                <div class="page-content">
                ${container.outerHTML}
                </div>
            </body>
            </html>`;
        });

        res.setHeader("Content-Type", "text/html");
        res.send(html);
    } catch (err) {
        console.error(err);
        res.status(500).send("抓取失敗: " + err.message);
    } finally {
        if (browser) await browser.close();
    }
};



export const fuchs = async (req, res) => {
    console.log("---start---");

    const targetUrl = 'https://www.fuchs.com/sea/tw/products/product-program/automotive-lubricants/';
    // 注意：express-http-proxy 建議將目標設定為根網址，然後用 path 處理子路徑

    const fuchsProxy = proxy(targetUrl, {

        // // 核心修正：目標路徑處理
        // proxyReqPathResolver: (req) => {
        //     // 這是一個簡單的範例，將所有請求導向特定的子頁面
        //     return '/sea/tw/products/product-program/automotive-lubricants/' + (req.url === '/' ? '' : req.url);
        //     // 💡 提示：如果您的上層路由是 app.use('/proxy/fuchs', fuchs)
        //     // 則這裡的 req.url 是 /proxy/fuchs 之後的路徑。
        // },

        // 修正名稱
        preserveHostHeader: true,

        // proxyReqOptDecorator: 可用，但名稱不建議改動
        proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
            // 🔸 可在這裡調整 request header
            proxyReqOpts.headers['User-Agent'] = 'Mozilla/5.0';
            // 處理 SSL 憑證忽略
            proxyReqOpts.rejectUnauthorized = false;
            return proxyReqOpts;
        },

        userResHeaderDecorator: (headers, userReq, userRes, proxyReq, proxyRes) => {
            // 🔹 移除阻擋 iframe 的 header
            delete headers['x-frame-options'];
            delete headers['content-security-policy'];

            // 🔹 允許跨域嵌入
            headers['Access-Control-Allow-Origin'] = '*';
            headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
            headers['Access-Control-Allow-Headers'] = '*';

            return headers;
        },

        // 修正錯誤處理名稱
        errorCallback: (err, res) => {
            console.error('Proxy error:', err.message);
            res.status(500).send('Proxy failed: ' + err.message);
        }
    });

    fuchsProxy(req, res);
};


