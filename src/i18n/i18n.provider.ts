import { createProvider } from "@vayjs/vay";
import { config } from "./i18n.config";
import enDict from "./en.dict";

export const provider = createProvider(config, enDict);
