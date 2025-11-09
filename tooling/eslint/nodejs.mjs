// @ts-nocheck
import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);

const config = await jiti.import("./nodejs.ts");
export const { nodejsConfig } = config;
