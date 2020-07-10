

const {
  appPath,
} =  require("../.env");

const path = require('path');
const glob = require('glob');

function getEntry () {
  let entry = {};
  glob.sync(path.resolve(appPath, "pages/**/**.js"))
    .forEach(function (fileDir) {
      let pathObj = path.parse(fileDir);
      // 用文件夹名字作为入口名。
      let entryName = pathObj.dir.match(/\/\w+$/g)[0].split("/")[1];
      entry[entryName] = fileDir;
    });
  return entry;
};

const entry = getEntry();

module.exports = entry
