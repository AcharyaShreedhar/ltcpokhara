import { equals, isEmpty, isNil } from "ramda";

import { AssetsURL } from "./config";

const pkg = require("../../package.json");

/**
 * Author: Hiroki Moto
 * Usage: Get version number of Package.json
 * We update package.json version for QA/Production release.
 * Once we release the new version, the app should initialize all the stores.
 * That's why we get this version number
 */
function version() {
  return pkg.version;
}

function validateUrl(url) {
    const regExp = /(https?:\/\/.*(\.(?:png|jpg|mp4|PNG|JPG|MP4))?)/g
    return regExp.test(url)
  }

/**
 *
 * @param url : abbreviated image url
 * @param defaultImg : default image when url is empty
 * @return : full image url
 */
function convertUrl(url, defaultImg = "/images/no-image.jpg") {
  if (
    equals(url, "/images/no-image.jpg") ||
    equals(url, "/images/default.png") ||
    equals(url, "/images/default_company.svg")
  ) {
    return url;
  } else if (isEmpty(url) || isNil(url)) {
    return defaultImg;
  }

  return validateUrl(url) ? url : `${AssetsURL}${url}`;
}

export { version, convertUrl };
