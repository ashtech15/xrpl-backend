import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "",
    description: "",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "../../src/swagger/swagger-output.json";
const endpointsFiles = ["../../src/index.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
