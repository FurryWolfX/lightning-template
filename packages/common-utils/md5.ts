import { Buffer } from "buffer";
import * as crypto from "crypto";

function md5(data: string): string {
  const buf = Buffer.from(data);
  const str = buf.toString("binary");
  return crypto
    .createHash("md5")
    .update(str)
    .digest("hex");
}

export default md5;
