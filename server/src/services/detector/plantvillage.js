// How each class of the on-device model maps onto the Disease knowledge base.
// Value = knowledge-base slug, or null for "healthy". Several classes can share one entry
// (e.g. bacterial spot of tomato, pepper and peach all use "bacterial-spot").
export const CLASS_TO_CONDITION = {
  "Apple___Apple_scab": "apple-scab",
  "Apple___Black_rot": "apple-black-rot",
  "Apple___Cedar_apple_rust": "cedar-apple-rust",
  "Apple___healthy": null,
  "Blueberry___healthy": null,
  "Cherry_(including_sour)___Powdery_mildew": "powdery-mildew",
  "Cherry_(including_sour)___healthy": null,
  "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": "corn-gray-leaf-spot",
  "Corn_(maize)___Common_rust_": "corn-common-rust",
  "Corn_(maize)___Northern_Leaf_Blight": "northern-leaf-blight",
  "Corn_(maize)___healthy": null,
  "Grape___Black_rot": "grape-black-rot",
  "Grape___Esca_(Black_Measles)": "grape-esca",
  "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": "grape-leaf-blight",
  "Grape___healthy": null,
  "Orange___Haunglongbing_(Citrus_greening)": "citrus-greening",
  "Peach___Bacterial_spot": "bacterial-spot",
  "Peach___healthy": null,
  "Pepper,_bell___Bacterial_spot": "bacterial-spot",
  "Pepper,_bell___healthy": null,
  "Potato___Early_blight": "early-late-blight",
  "Potato___Late_blight": "early-late-blight",
  "Potato___healthy": null,
  "Raspberry___healthy": null,
  "Soybean___healthy": null,
  "Squash___Powdery_mildew": "powdery-mildew",
  "Strawberry___Leaf_scorch": "strawberry-leaf-scorch",
  "Strawberry___healthy": null,
  "Tomato___Bacterial_spot": "bacterial-spot",
  "Tomato___Early_blight": "early-late-blight",
  "Tomato___Late_blight": "early-late-blight",
  "Tomato___Leaf_Mold": "tomato-leaf-mold",
  "Tomato___Septoria_leaf_spot": "septoria-leaf-spot",
  "Tomato___Spider_mites Two-spotted_spider_mite": "spider-mites",
  "Tomato___Target_Spot": "target-spot",
  "Tomato___Tomato_Yellow_Leaf_Curl_Virus": "leaf-curl-virus",
  "Tomato___Tomato_mosaic_virus": "mosaic-virus",
  "Tomato___healthy": null,
};

const CROP_NAMES = { "Pepper,_bell": "Bell pepper", "Cherry_(including_sour)": "Cherry", "Corn_(maize)": "Corn" };

const tidy = (s) => s.replace(/_/g, " ").replace(/\s+/g, " ").trim();

// "Tomato___Late_blight" -> { plantName: "Tomato", condition: "Late blight", conditionSlug: "early-late-blight" }
export function describeClass(className) {
  if (!(className in CLASS_TO_CONDITION)) throw new Error(`Model class "${className}" has no knowledge-base mapping`);
  const [crop, condition] = className.split("___");
  return {
    plantName: CROP_NAMES[crop] ?? tidy(crop),
    condition: condition === "healthy" ? "healthy" : tidy(condition),
    conditionSlug: CLASS_TO_CONDITION[className],
  };
}
