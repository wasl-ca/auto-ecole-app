const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

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
      date: parseDateTime(exam.date),
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
function getLocation(location) {
  const locationMap = {
    Zarzis: "Zarzis",
    Medenine: "Medenine",
    Mednine: "Medenine",
    "Ben Guerdane": "Ben Guerdane",
    Jerba: "Jerba",
    "B.GUERDANE": "Ben Guerdane",
    Midoun: "Midoun",
    "Houmet Souk": "Houmet Souk",
    // Add more locations as needed
  };
  if (!location) return "";
  const keys = Object.keys(locationMap);
  const foundKey = keys.find((key) =>
    location.toLowerCase().includes(key.toLowerCase())
  );
  if (foundKey) return locationMap[foundKey];
  return locationMap[location] || location;
}
function getExamType(examType) {
  const examTypeMap = {
    code: "code",
    circulation: "circulation",
    manoeuvre: "manoeuvre",
    manoeuvres: "manoeuvre",
    extension: "extension",
    // Add more exam types as needed
  };
  if (!examType) return "";
  const keys = Object.keys(examTypeMap);
  const foundKey = keys.find((key) =>
    examType.toLowerCase().includes(key.toLowerCase())
  );
  if (foundKey) return examTypeMap[foundKey];
  return examTypeMap[examType] || examType;
}
function parseDateTime(str) {
  const [datePart, timePart] = str.split(" ");
  const [day, month, year] = datePart.split("/");
  return new Date(`${year}-${month}-${day}T${timePart}`);
}
module.exports = {
  loginAndFetchExams,
};
