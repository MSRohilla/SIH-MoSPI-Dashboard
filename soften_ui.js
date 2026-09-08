import fs from 'fs';
import path from 'path';

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Make cards rounder and softer
  content = content.replace(/rounded-lg/g, 'rounded-2xl');
  content = content.replace(/rounded-xl/g, 'rounded-2xl');
  content = content.replace(/border border-gray-200/g, 'border border-blue-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]');
  
  // Specific fixes for specific class sets so we don't blindly mess up tailwind parsing
  content = content.replace(/rounded /g, 'rounded-full ');
  content = content.replace(/rounded"/g, 'rounded-full"');
  
  // Remove shadow-sm where we are injecting the nice shadow
  content = content.replace(/shadow-sm border border-blue-50/g, 'border border-blue-50');

  fs.writeFileSync(filePath, content);
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      replaceInFile(fullPath);
    }
  }
}

processDirectory('src/components');
console.log('Successfully made UI less boxy.');
