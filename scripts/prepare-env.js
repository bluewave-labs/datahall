const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const cliArg = process.argv.find((arg) => arg.startsWith('--env='));
const cliEnv = cliArg ? cliArg.split('=')[1] : null;

const DEPLOYMENT_ENV = cliEnv || process.env.DEPLOYMENT_ENVIRONMENT || 'local';

const rootDir = path.resolve(__dirname, '..');
const envDir = path.join(rootDir, 'env');
const outputEnvPath = path.join(rootDir, '.env');

function loadEnv(filePath) {
	if (!fs.existsSync(filePath)) return {};
	const result = dotenv.parse(fs.readFileSync(filePath));
	return result;
}

function mergeEnvs(...envObjects) {
	return Object.assign({}, ...envObjects);
}

function writeEnvFile(envObj, targetPath) {
	const contents = Object.entries(envObj)
		.map(([key, val]) => `${key}="${val.replace(/"/g, '\\"')}"`)
		.join('\n');
	fs.writeFileSync(targetPath, contents);
	console.log(`✅ Generated .env from DEPLOYMENT_ENVIRONMENT=${DEPLOYMENT_ENV}`);
}

function run() {
	let envConfig = {};

	switch (DEPLOYMENT_ENV) {
		case 'production':
			envConfig = loadEnv(path.join(envDir, '.env.production'));
			break;
		case 'development':
			envConfig = loadEnv(path.join(envDir, '.env.development'));
			break;
		case 'local':
		default:
			const dev = loadEnv(path.join(envDir, '.env.development'));
			const local = loadEnv(path.join(envDir, '.env.local'));
			envConfig = mergeEnvs(dev, local); // local overrides dev
			break;
	}

	writeEnvFile(envConfig, outputEnvPath);
}

run();
