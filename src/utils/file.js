import fs from 'fs';
import csv from 'csv-parser';

const save = (path, data) => {
  fs.writeFileSync(path, data, (err) => {
    if (err) throw err;
    console.log('save');
  });
};

const load = async (path) => {
  if (path === undefined) {
    return [];
  }
  const files = fs.readdirSync(path);
  let openData = [];
  for await (const file of files) {
    if (file === '.gitkeep') {
      continue;
    }
    const filename = `${path}/${file}`;
    const fileContents = await getFileContents(filename);
    fileContents.forEach((fileContent) => openData.push(fileContent));
  }
  return openData;

  function getFileContents(filename) {
    let results = [];
    const stream = fs
      .createReadStream(filename)
      .pipe(csv())
      .on('data', (data) => {
        if (!isEmpty(data)) {
          results.push(data);
        }
      });
    return new Promise((resolve, reject) => {
      stream.on('error', (err) => {
        console.error(err);
        resolve(reject);
      });

      stream.on('end', () => {
        console.log(`filename ${filename} done.`);
        resolve(results);
      });
    });

    function isEmpty(data) {
      const idKey = Object.keys(data)[0];
      return data[idKey] === '';
    }
  }
};

export { save, load };
