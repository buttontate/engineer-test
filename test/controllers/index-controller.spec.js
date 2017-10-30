const path = require('path');
const fs = require('fs');

const sinon = require('sinon');
const {expect} = require('chai');
const Chance = require('chance');
const proxyquire = require('proxyquire');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItTableOfContents = require('markdown-it-table-of-contents');

describe('index controller', () => {
    const chance = new Chance();

    let indexController,
        sandbox,
        markdownItStub,
        renderStub,
        useStub,
        replyStub;

    const importIndexController = () => proxyquire('../../src/controllers/index-controller', {
        'markdown-it': markdownItStub
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        renderStub = sandbox.stub();
        useStub = sandbox.stub();

        markdownItStub = sandbox.stub().returns({
            render: renderStub,
            use: useStub
        });

        replyStub = sandbox.stub();

        sandbox.stub(fs, 'readFile');

        indexController = importIndexController();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should define a route for GET /', () => {
        const indexRoute = indexController();

        expect(indexRoute.path).to.equal('/');
        expect(indexRoute.method).to.equal('GET');
    });

    it('should use the anchor and table of contents plugins for markdown-it', () => {
        sinon.assert.calledWithNew(markdownItStub);

        sinon.assert.calledWith(useStub, markdownItAnchor);
        sinon.assert.calledWith(useStub, markdownItTableOfContents);
    });

    it('should reply with the README.md file rendered in HTML', async () => {
        const indexRoute = indexController();
        const expectedPathToReadmeRelativeToThisTestFile = path.join(__dirname, '..', '..', 'README.md');
        const expectedReadmeFileContentsInMarkDown = chance.string();
        const expectedReadmeFileContentsInHTML = chance.string();

        fs.readFile.callsArgWith(1, undefined, {
            toString: sandbox.stub().returns(expectedReadmeFileContentsInMarkDown)
        });
        renderStub.returns(expectedReadmeFileContentsInHTML);

        await indexRoute.handler(undefined, replyStub);

        sinon.assert.calledOnce(fs.readFile);
        sinon.assert.calledWith(fs.readFile, expectedPathToReadmeRelativeToThisTestFile, sinon.match.func);

        sinon.assert.calledOnce(renderStub);
        sinon.assert.calledWith(renderStub, expectedReadmeFileContentsInMarkDown);

        sinon.assert.calledOnce(replyStub);
        sinon.assert.calledWith(replyStub, expectedReadmeFileContentsInHTML);
    });
});
