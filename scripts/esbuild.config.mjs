import { resolve, dirname, parse } from 'path';
import { globby } from 'globby';

const rootDir = process.cwd();
const srcDir = resolve(process.cwd(), 'src');
const distDir = resolve(process.cwd(), 'dist');

const configPaths = await globby([
  '**/script.config.js',
], {
  cwd: srcDir,
});

const config = await Promise.all(configPaths.map(async (configPath) => {
  const module = dirname(configPath);
  const [scriptConfig, entryFiles] = await Promise.all([
    import(resolve(srcDir, configPath)),
    globby(`${module}/index.{ts,tsx}`, {
      cwd: srcDir,
    }),
  ]);

  const [entry] = entryFiles;

  return {
    module,
    entry,
    outfile: resolve(distDir, `${module}/${module}.js`),
    meta: scriptConfig.default,
  };
}));

export default config;
