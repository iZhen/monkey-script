import { build } from 'esbuild';
import chalk from 'chalk';
import config from './esbuild.config.mjs';

const banner_keys_order = ['name', 'namespace', 'version', 'description', 'author', 'match', 'icon', 'grant'];
const generateBanner = (meta) => {
  if (meta) {
    const banner = [];
    banner_keys_order.forEach((key) => {
      const item = meta[key];
      if (item) {
        if (typeof item === 'string') {
          banner.push(`// @${key.padEnd(10)} ${item}`);
        } else if (Array.isArray(item)) {
          item.forEach((value) => {
            banner.push(`// @${key.padEnd(11)} ${value}`);
          });
        }
      }
    });

    if (banner.length) {
      banner.unshift('// ==UserScript==');
      banner.push('// ==/UserScript==');
      return banner.join('\n');
    }
  }
  return '';
};

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
    banner: {
      js: generateBanner(meta),
    },
  });

  if (buildResult.errors.length === 0) {
    console.log(`[${chalk.yellow('script')}] ${outfile}`);
  }
});


