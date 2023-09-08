const app = require("./app");
const http = require("http");

const { DEFAULT_PORT } = require("./constants");

// parse the environment port or use the default one
const envPort = parseInt(process.env.PORT, 10);
let port = isNaN(envPort) ? DEFAULT_PORT : process.env.PORT;

const server = http.createServer(app);
server.listen(port, () => {
	console.log(`Listening on port ${server.address().port}`);
});
