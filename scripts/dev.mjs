import { build, serve } from 'esbuild';
import config from './esbuild.config.mjs';

const result = await build({
  ...config,
  watch: true,
  write: false,
});

console.log(result);
