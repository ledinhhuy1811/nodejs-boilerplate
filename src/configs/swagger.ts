import path from "path";
import fs from "fs";
import yaml from "js-yaml";

// Load YAML documentation files
const indexYamlPath = path.join(__dirname, "../swaggers/index.yaml");
const indexYamlContent = fs.readFileSync(indexYamlPath, "utf8");
const indexYamlDoc = yaml.load(indexYamlContent) as any;

// Load User YAML documentation files
const userYamlPath = path.join(__dirname, "../swaggers/user.yaml");
const userYamlContent = fs.readFileSync(userYamlPath, "utf8");
const userYamlDoc = yaml.load(userYamlContent) as any;

// Merge YAML documentation
const yamlDoc = {
  ...indexYamlDoc,
  paths: {
    ...(indexYamlDoc.paths || {}),
    ...(userYamlDoc.paths || {}),
  },
  components: {
    schemas: {
      ...(indexYamlDoc.components?.schemas || {}),
      ...(userYamlDoc.components?.schemas || {}),
    },
    securitySchemes: {
      ...(indexYamlDoc.components?.securitySchemes || {}),
      ...(userYamlDoc.components?.securitySchemes || {}),
    },
  },
};

// Merge YAML documentation with base swagger definition
export const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Nodejs Boilerplate API",
      version: "1.0.0",
      description: "API documentation for Nodejs Boilerplate",
    },
    components: {
      schemas: {
        ...(yamlDoc.components?.schemas || {}),
      },
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "api-key",
          description: "API key for authentication",
        },
        ...(yamlDoc.components?.securitySchemes || {}),
      },
    },
    paths: {
      ...(yamlDoc.paths || {}),
    },
  },
  apis: [
    path.join(__dirname, "../routes/*.js"),
    path.join(__dirname, "../routes/*.ts"),
  ], // files containing annotations as above
};
