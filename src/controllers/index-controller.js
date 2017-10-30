const fs = require('fs');
const path = require('path');

const MarkdownIt = require('markdown-it');

const markdownRenderer = new MarkdownIt();

const getFileContents = (filePath) => new Promise((resolve) => {
    fs.readFile(filePath, (error, data) => {
        resolve(data.toString());
    });
});

const indexController = () => ({
    handler: async (request, reply) => {
        const pathToReadmeFile = path.join(__dirname, '..', '..', 'README.md');
        const readmeFileContentsInMarkdown = await getFileContents(pathToReadmeFile);
        const readmeFileContentsInHTML = markdownRenderer.render(readmeFileContentsInMarkdown);

        reply(readmeFileContentsInHTML);
    },
    method: 'GET',
    path: '/'
});

module.exports = indexController;
