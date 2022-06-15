import { resolve, dirname } from 'path';
import { platform } from 'os';
import { globby } from 'globby';

const rootDir = process.cwd();
const srcDir = resolve(rootDir, 'src');
const distDir = resolve(rootDir, 'dist');

const configPaths = await globby([
  '**/script.config.js',
], {
  cwd: srcDir,
});

const config = await Promise.all(configPaths.map(async (configPath) => {
  const module = dirname(configPath);
  const [scriptConfig, entryFiles] = await Promise.all([
    import(`${platform() === 'win32' ? '/' : ''}${resolve(srcDir, configPath)}`),
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
