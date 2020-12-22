import puppeteer from 'puppeteer';
import yargs from 'yargs';
import fs from 'fs';
import path from 'path';

// parse command line options
const args = yargs(process.argv.slice(2))
	.option('out', {
		alias: 'o',
		description: 'Location of output PDF file',
		type: 'string',
	})
	.demandOption('out')
	.help()
	.alias('help', 'h')
	.argv;

if (fs.existsSync(args.out)) {
	console.error(`svg-pdf-stitcher: error: file ${args.out} already exists`);
	process.exit(1);
}


const output = path.resolve(args.out);

// check that all input files exist
const inputs = args._.map(file => fs.existsSync(file) ? path.resolve(file) : Error(`svg-pdf-stitcher: error: input file ${file} does not exist`));
const maybeError = inputs.find(file => typeof file === 'object');
if (maybeError) {
	console.error(maybeError);
	process.exit(1);
}

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	// for safety, make the viewport ratio A4 as well
	await page.setViewport({
		width: 2970,
		height: 2100
	});

	// navigate to wrapper
	await page.goto(`file://${path.resolve('./wrapper.html')}`);
	const container = await page.$('div#container');

	console.log(await page.content());

	// place all images
	await Promise.all(inputs.map(async input => {
		console.log(`  processing: ${input}`);
		const retval = await container.evaluateHandle((container, source) => {
			const template = container.querySelector('#imgtempl');
			const newImg = template.content.cloneNode(true);
			const imgTag = newImg.querySelector('img');
			imgTag.src = source;
			container.appendChild(newImg);
			return imgTag;
		}, input);
		// console.log(retval);
		// console.log(await page.content());
	}));
	
	console.log('  printing pdf...');
	await page.pdf({
		path: output,
		format: 'A4',
	});
	
	await browser.close();
})();
