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
      return { datePart: new Date(`${year}-${month}-${day}`), timePart: timePart };
  }

  module.exports = { getLocation, getExamType, parseDateTime };