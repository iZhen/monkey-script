import { build } from 'esbuild';
import config from './esbuild.config.mjs';

config.forEach(async ({
  module,
  entry,
  outfile,
  meta,
}) => {
  const buildResult = await build({
    entryPoints: [`src/${entry}`],
    outfile,
    bundle: true,
    platform: 'browser',
    target: 'es6',
    treeShaking: true,
    minify: false,
    legalComments: 'none',
  });

  if (buildResult.errors.length === 0) {
    console.log(`[build] ${outfile}`);
  }
});


