// @ts-nocheck
import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);

const config = await jiti.import("./base.ts");
export const { baseConfig, restrictEnvAccess } = config;
