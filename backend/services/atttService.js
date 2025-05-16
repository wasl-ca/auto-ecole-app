const puppeteer = require("puppeteer");

const ATTT_URL = "https://www.attt.com.tn/autoecole.php";
const PROFILE_URL = "https://www.attt.com.tn/autoecole.php?code_menu=74";

async function loginAndFetchExams() {
    const browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined
      });
      
  const page = await browser.newPage();

  try {
    await page.goto(ATTT_URL, { waitUntil: "networkidle2" });

    // Fill the login form — adjust selectors as needed
    await page.type('input[name="login"]', process.env.ATTT_USERNAME);
    await page.type('input[name="password"]', process.env.ATTT_PASSWORD);
    await page.click('input[type="submit"]');

    await page.waitForNavigation({ waitUntil: "networkidle2" });

    // Go to exam list page
    await page.goto(PROFILE_URL, { waitUntil: "networkidle2" });

    // Scrape exam data
    const exams = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll("table tr"));
      return rows
        .slice(1)
        .map((row) => {
          const cols = row.querySelectorAll("td");
          return {
            date: cols[0]?.innerText.trim(),
            location: cols[1]?.innerText.trim(),
            availableSeats: cols[2]?.innerText.trim()
          };
        })
        .filter((exam) => exam.date);
    });

    await browser.close();
    return exams;
  } catch (err) {
    await browser.close();
    console.error("Puppeteer ATTT Error:", err.message);
    throw err;
  }
}

module.exports = {
  loginAndFetchExams
};
