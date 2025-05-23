const puppeteer = require("puppeteer-extra");

const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

const { getLocation, getExamType, parseDateTime } = require("../utils/formatter");

const ATTT_URL = "https://www.attt.com.tn/autoecole.php";
const PROFILE_URL = "https://www.attt.com.tn/autoecole.php?code_menu=74";

async function loginAndFetchExams() {
  const browser = await puppeteer.launch({
    headless: "false",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-cache"],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
  });

  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    if (["image", "stylesheet", "font"].includes(request.resourceType())) {
      request.abort();
    } else {
      request.continue();
    }
  });

  try {
    await page.goto(ATTT_URL, { waitUntil: "domcontentloaded" });

    // Fill the login form — adjust selectors as needed
    await page.type('input[name="user"]', process.env.ATTT_USERNAME);
    await page.type('input[name="mdp"]', process.env.ATTT_PASSWORD);
    const loginButton = await page.$(
      'a[onclick="document.form_identification.submit();"]'
    );
    if (!loginButton) {
      throw new Error("Login button not found");
    }
    await loginButton.click();

    await page.waitForNavigation({ waitUntil: "networkidle2" });

    // Go to exam list page
    await page.goto(PROFILE_URL, { waitUntil: "networkidle2" });

    // Scrape exam data
    const exams = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll("table tr"));
      return rows.slice(1).map((row) => {
        const cols = row.querySelectorAll("td");
        return {
          location: cols[0]?.innerText.trim(),
          date: cols[1]?.innerText.trim(),
        };
      });
    });

    await browser.close();
    // format the field to match the model exam
    const formattedExams = exams.map((exam) => ({
      date: parseDateTime(exam.date).datePart,
      time: parseDateTime(exam.date).timePart,
      location: getLocation(exam.location),
      examType: getExamType(exam.location),
      examStatus: "available",
      registeredStudents: [],
    }));
    return formattedExams;
  } catch (err) {
    await browser.close();
    console.error("Puppeteer ATTT Error:", err.message);
    throw err;
  }
}

module.exports = {
  loginAndFetchExams,
};
