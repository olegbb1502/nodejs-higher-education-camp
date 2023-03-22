/**
 * Write a node.JS program with TypeScript that gets from the command line 
 * string parameter - path to JSON file, reads and parses its content. 
 * Then, program should create a folder “<JSON_filename>_pages”. 
 * For each link in the file get the HTML content of it and save it to 
 * the file in the created folder. JSON file contains an array of strings - links.
 */

import fs from 'fs';
import path from 'path';
import https from 'https';

interface Config {
  jsonFilePath: string;
}

interface Link {
  url: string;
  filename: string;
}

function readConfigFromCommandLineArgs(): Config {
  const [, , jsonFilePath] = process.argv;

  if (!jsonFilePath) {
    console.error('Provide a path to a JSON');
    process.exit(1);
  }

  return { jsonFilePath };
}

function readJsonFile<Type>(filePath: string): Type {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
}

function createDirectory(directoryPath: string): void {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
  }
}

function downloadHtml(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        resolve(data);
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

function saveHtmlToFile(html: string, filePath: string): void {
  fs.writeFileSync(filePath, html);
}

function createFilenameFromUrl(url: string): string {
  const urlObject = new URL(url);
  const { hostname, pathname } = urlObject;

  const filename = `${hostname}${pathname}`
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '');

  return `${filename}.html`;
}

function downloadAndSaveHtml(link: Link, directoryPath: string): Promise<void> {
  const { url, filename } = link;

  return downloadHtml(url).then((html) => {
    const filePath = path.join(directoryPath, filename);
    saveHtmlToFile(html, filePath);
  });
}

function downloadHtmlForLinks(jsonFilePath: string): void {
  const links = readJsonFile<string[]>(jsonFilePath).map((url) => ({
    url,
    filename: createFilenameFromUrl(url),
  }));

  const directoryPath = path.join(
    path.dirname(jsonFilePath),
    `${path.parse(jsonFilePath).name}_pages`
  );

  createDirectory(directoryPath);

  const downloadPromises = links.map((link) =>
    downloadAndSaveHtml(link, directoryPath)
  );

  Promise.all(downloadPromises).then(() => {
    console.log(`Downloaded ${links.length} pages to ${directoryPath}`);
  });
}

const { jsonFilePath } = readConfigFromCommandLineArgs();
downloadHtmlForLinks(jsonFilePath);