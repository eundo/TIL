const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Define paths
const blogDir = path.join(__dirname, 'blog');
const sidebarsFile = path.join(__dirname, 'sidebars.js');

// Helper function to get all blog files
const getBlogFiles = () => {
  return fs.readdirSync(blogDir)
      .filter(file => file.endsWith('.md') || file.endsWith('.mdx'));
};

// Generate sidebar object
const generateSidebar = (blogFiles) => {
  return {
    blogSidebar: [
      {
        type: 'category',
        label: 'Blog',
        items: blogFiles.map(file => 'blog/' + path.basename(file, path.extname(file))),
      },
    ],
  };
};

// Update the sidebars.js file
const updateSidebars = () => {
  const blogFiles = getBlogFiles();
  const sidebarConfig = generateSidebar(blogFiles);
  const content = 'module.exports = ' + JSON.stringify(sidebarConfig, null, 2) + ';';
  fs.writeFileSync(sidebarsFile, content, 'utf8');
};

// Commit and push changes to Git
const commitAndPushChanges = () => {
  exec('git add . && git commit -m "Update sidebar" && git push', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
};

// Main function to update sidebars and commit changes
const main = () => {
  updateSidebars();
  commitAndPushChanges();
};

// Execute the main function
main();
