import fs from 'fs';

const save = (filename, data) => {
  fs.writeFileSync(filename, data, (err) => {
    if (err) throw err;
    console.log('save');
  });
};

export { save };
