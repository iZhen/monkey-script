import { resolve, dirname, parse } from 'path';
import fs from 'fs-extra';
import { globby } from 'globby';
import sass from 'sass';

const rootDir = process.cwd();
const srcDir = resolve(process.cwd(), 'src');
const distDir = resolve(process.cwd(), 'dist');

const paths = await globby([
  '**/scss/style.scss',
  '**/style.scss'
], {
  cwd: srcDir,
});

paths.forEach((path) => {
  const { dir } = parse(path);
  const [moduleName] = dir.split('/');
  const result = sass.compile(resolve(srcDir, path))
  const traget = `${moduleName}/${moduleName}.css`;

  fs.outputFile(
    resolve(distDir, traget),
    result.css,
    { encoding: 'utf-8' },
    () => { console.log(traget); },
  );
});

