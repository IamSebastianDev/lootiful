import { createLanguageProvider } from "@vayjs/vay-react";
import { provider } from "../i18n/i18n.provider";

export const { LanguageProvider, useLanguage: use18n } = createLanguageProvider(provider);
