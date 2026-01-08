import crypto from "crypto";

export const encrypt = (password: string, val: string) => {
  const hashedPassword = crypto.createHash("sha256").update(password).digest();
  const IV = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", hashedPassword, IV);

  return Buffer.concat([IV, cipher.update(val), cipher.final()]).toString(
    "base64"
  );
};

export const decrypt = (password: string, val: string) => {
  const hashedPassword = crypto.createHash("sha256").update(password).digest();
  const encryptedText = Buffer.from(val, "base64");
  const IV = encryptedText.subarray(0, 16);
  const encrypted = encryptedText.subarray(16);
  const decipher = crypto.createDecipheriv("aes-256-cbc", hashedPassword, IV);

  return Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]).toString();
};
