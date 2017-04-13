import fs from 'fs'
export async function read(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf-8', (err, buffer) => {
      if (err) return reject(err);
      resolve(buffer);
    });
  });
}
export async function save(filename, read) {
  return new Promise((resolve, reject) => {
    if (typeof read == 'string') {
      fs.writeFile(filename, read, err => {
        if (err) return reject(err);
        resolve(filename);
      });
    } else if (typeof read == 'function') {
      let writeStream = fs.createWriteStream(filename);
      writeStream.on('finish', () => {
        setTimeout(resolve, 100);
      });
      readStream.pipe(writeStream);
    }
  });
}