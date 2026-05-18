import { resolve } from 'node:path';
import { build } from 'vite';

const banner = {
  name: 'Pokéclicker',
  namespace: 'Pokéclicker',
  version: '1.0',
  author: 'Zhen',
  match: 'https://www.pokeclicker.com/',
  icon: 'https://www.google.com/s2/favicons?domain=pokeclicker.com',
};

build({
  build: {
    minify: false,
    cssMinify: false,
    cssCodeSplit: false,
    lib: {
      name: 'pokeclicker',
      fileName: 'pokeclicker',
      entry: resolve(import.meta.dirname, '../src/pokeclicker/index.ts'),
      formats: ['iife'],
    },
    rolldownOptions: {
      output: {
        format: 'iife',
        comments: false,
        postBanner: ['// ==UserScript==', ...Object.keys(banner).map(key => `// @${key} ${banner[key]}`), '// ==/UserScript==\n'].join('\n'),
      },
    },
  },
});
