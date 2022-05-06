const fs = require('fs');

const fileName = './database/data.json';

const saveData = (data) => {
  fs.writeFileSync(fileName, JSON.stringify(data));
};

/**
 *
 * @returns {null} if not exist
 * @returns {data} from the file
 */
const getData = () => {
  if (!fs.existsSync(fileName)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(fileName, { encoding: 'utf-8' }));
};

module.exports = {
  saveData,
  getData,
};
