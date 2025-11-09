// @ts-nocheck
import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);

const config = await jiti.import("./react.ts");
export const { reactConfig } = config;
