import BigNumber from "bignumber.js";
import Url from "./url";
import Config from "./config";
import Storage from "./storage";
import Keys from "./keys";
import Language from "./language";

const storage = new Storage();
const keys = new Keys();
const config = new Config();
const url = new Url();
const lang = new Language();

const baseDecimal = new BigNumber(10).pow(new BigNumber(18));

export {
    storage, keys, config, url, baseDecimal, lang
}