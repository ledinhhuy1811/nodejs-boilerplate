import Joi from "joi";
import "dotenv/config";

const envVarSchema = Joi.object()
  .keys({
    // environment
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(8000),

    // rpc
    ORAI_RPC_URL: Joi.string().optional().default("http://rpc.orai.io"),

    // mnemonic
    ENCRYPTED_MNEMONIC: Joi.string().required(),

    // password
    PASSWORD: Joi.string().required(),

    // database
    DATABASE_URL: Joi.string().required(),

    // api key
    API_KEY: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  // environment
  env: envVars.NODE_ENV,
  port: envVars.PORT,

  // rpc
  oraiRpcUrl: envVars.ORAI_RPC_URL,

  // mnemonic
  encryptedMnemonic: envVars.ENCRYPTED_MNEMONIC,

  // password
  password: envVars.PASSWORD,

  // database
  databaseUrl: envVars.DATABASE_URL,

  // api key
  apiKey: envVars.API_KEY,
};
