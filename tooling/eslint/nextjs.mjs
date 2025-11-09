// @ts-nocheck
import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);

const config = await jiti.import("./nextjs.ts");
export const { nextjsConfig } = config;
