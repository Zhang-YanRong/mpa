const path = require('path');

const { NODE_ENV, BUNDLE_ANNALYZE } = process.env;
const isDevelopment = NODE_ENV === "development";
const isProduction = NODE_ENV === "production";
const shouldUseSourceMap = true
const PORT = process.env.port || 9001;
const PROTOCOL = process.env.HTTPS === 'true' ? 'https' : 'http';
const HOST = "127.0.0.1";
const appPath = path.join(process.cwd(), "./src");
const isBundleAnalyze = BUNDLE_ANNALYZE === "analyze";

module.exports = {
  NODE_ENV,
  BUNDLE_ANNALYZE,
  isDevelopment,
  isProduction,
  shouldUseSourceMap,
  PORT,
  PROTOCOL,
  HOST,
  appPath,
  isBundleAnalyze
}