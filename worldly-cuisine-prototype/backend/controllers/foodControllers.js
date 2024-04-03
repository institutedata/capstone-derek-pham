const countries = require("i18n-iso-countries");
const countriesModule = require("../countriesList");
const countriesList = countriesModule.countriesList;
const foodOriginWikiService = require("../services/foodOriginWikiService");
const database = require("../services/database");
const mapboxGeocodingService = require("../services/mapboxGeocodingService");

const getFoodOrigin = async (req, res) => {
  const returnObj = {};

  const foodInput = await foodOriginWikiService.redirectCheck(
    capitalizeFirstLetter(req.params.food).replace(/_/g, " ")
  );

  const recordDuplicateCheck = await checkRecords(foodInput);
  if (recordDuplicateCheck) {
    console.log(`${foodInput} is present in foodDataRecords`);
    res.json(recordDuplicateCheck);
    return;
  }
  returnObj["name"] = foodInput;
  if (!foodInput) {
    res.status(400).json({ error: "No food item specified" });
    return;
  }
  // e.g. http://localhost:5000/api/getFoodOrigin?food=pizza
  console.log(`Food item is ${foodInput}`);
  try {
    const extracts = await getExtractFromArticle(foodInput);

    let matches = [];
    for (let i = 0; i < countriesList.length; i++) {
      let country = countriesList[i];

      const regex = new RegExp(`\\b${country}\\b`, "i");

      for (const key in extracts) {
        let findMatch = extracts[key].match(regex);
        if (findMatch) {
          matches.push(findMatch[0]);
        }
      }
    }
    console.log("Matched country:", matches);
    // Known issue: Extracted segments overlap resulting in false positive due to leniency of extracted segment size after matched phrase

    if (matches) {
      const placeOfOrigin = matches[0];
      console.log("Place of Origin:", placeOfOrigin);
      returnObj["origin"] = handleSpecialCase(placeOfOrigin);
      returnObj["coords"] = await mapboxGeocodingService.getCountryCoords(
        placeOfOrigin
      );
    } else {
      console.log("Place of Origin not found.");
    }

    const searchObj = await foodOriginWikiService.getWikiSearchObj(foodInput);
    // console.log(searchObj)

    let thumbnailURL = searchObj["pages"][0]["thumbnail"]["url"];
    let foodDescription = searchObj["pages"][0]["description"];
    thumbnailURL = thumbnailURL.replace("60px", "150px");
    console.log(thumbnailURL);
    returnObj["thumbnailURL"] = thumbnailURL;
    returnObj["foodDescription"] = foodDescription;
    returnObj["articleURL"] = `https://en.wikipedia.org/wiki/${foodInput}`;
    returnObj["isoCode"] = countries
      .getAlpha2Code(returnObj["origin"], "en")
      .toLowerCase();
    console.log(returnObj);

    res.json(returnObj);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

async function getExtractFromArticle(foodInput) {
  const wikiData = await foodOriginWikiService.getWikipediaArticle(foodInput);
  const htmlString = JSON.stringify(wikiData["parse"]["text"]["*"]);
  let extractedSegments = {};

  const phrasesToSearch = [
    "Place of origin",
    "Country of origin",
    "Region or state",
  ];
  const extractLength = 900;

  for (const phrase of phrasesToSearch) {
    const extract = findPhraseInHTMLString(htmlString, phrase, extractLength);
    if (extract) {
      console.log(`'${phrase}' phrase found.`);
      extractedSegments[phrase] = extract;
    }
  }

  if (extractedSegments) {
    console.log(extractedSegments);
    return extractedSegments;
  } else {
    console.log(
      "Wikipedia article does not contain the phrases 'Place of origin' or 'Region or state'"
    );
    return "Wikipedia article does not contain the necessary phrases";
  }
}

function findPhraseInHTMLString(htmlString, phrase, lengthAfterPhrase) {
  const startIndex = htmlString.indexOf(phrase);
  if (startIndex !== -1) {
    const endIndex = startIndex + phrase.length + lengthAfterPhrase;
    return htmlString.substring(startIndex, endIndex);
  }
  return null;
}

function handleSpecialCase(place) {
  switch (place) {
    case "Korea":
      return "South Korea";
      break;
    default:
      return place;
  }
}

function capitalizeFirstLetter(string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function checkRecords(foodName) {
  const db = database.getDb();
  const records = await db.collection("foodDataRecord").find({}).toArray();
  const isRecordDuplicate = records.some((item) => item.name === foodName);
  const item = await db
    .collection("foodDataRecord")
    .findOne({ name: foodName });

  if (isRecordDuplicate) {
    const item = await db
      .collection("foodDataRecord")
      .findOne({ name: foodName });
    return item;
  } else return null;
}

module.exports = {
  getFoodOrigin,
};
