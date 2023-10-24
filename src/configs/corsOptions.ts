import { CorsOptions } from "cors";
import allowedOrigins from "./allowedOrigins.js";

const corsOptions: CorsOptions = {
  origin: (origin: any, callback: any) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  // optionSuccessStatus: 200,
};

export default corsOptions;
