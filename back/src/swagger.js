const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');

const options = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			title: "Cardano API",
			version: "1.0.0",
			description: "description",
		},
		basePath: "/",
	},
	apis: ['./controllers/*.js']

};

const specs = swaggereJsdoc(options);

module.exports = {
	swaggerUi,
	specs
};