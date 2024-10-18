const fs = require('fs');
const path = require('path');

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
};

const folders = [
  '/api/uploads/banner/webinar',
  '/api/uploads/banner/workshop',
  '/api/uploads/banner/training',
  '/dist/api/uploads/banner/webinar',
  '/dist/api/uploads/banner/workshop',
  '/dist/api/uploads/banner/training'
];

function createFolder(folderPath) {
  const fullPath = path.join(__dirname, folderPath);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Folder created: ${fullPath}`);
  } else {
    console.log(`Folder already exists: ${fullPath}`);
  }
}

folders.forEach(folder => {
  createFolder(folder);
});

console.log(`${colors.red}Ignore if folder already exists${colors.reset}`);
console.log(`${colors.green}init.js executed successfully${colors.reset}`);