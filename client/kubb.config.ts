import { defineConfig } from "@kubb/core";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginTanstackQuery } from "@kubb/swagger-tanstack-query";
import { pluginTs } from "@kubb/swagger-ts";

export default defineConfig(() => {
  return [
    {
      root: ".",
      input: {
        path: "./api.json",
      },
      output: {
        path: "./src/api",
      },
      plugins: [pluginOas({}), pluginTs({}), pluginTanstackQuery({})],
    },
  ];
});
