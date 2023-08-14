require('dotenv').config();
const path = require('path');
const fs = require('fs/promises');

const dirPath = path.join(__dirname, '..', 'src', 'environments');
const filePath = path.join(dirPath, 'environments.ts');

const envFileContent = `
export const environments = {
  MAPBOX_KEY: '${process.env.MAPBOX_KEY}',
};
`;

(async () => {
  try {
    console.info('✨ Writing env...');

    await fs.mkdir(dirPath, { recursive: true });
    await fs.writeFile(filePath, envFileContent);
  } catch (error) {
    console.error(error);
  }
})();
