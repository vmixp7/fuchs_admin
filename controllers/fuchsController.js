
import puppeteer from 'puppeteer';

export const automotiveLubricants = async (req, res) => {

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


