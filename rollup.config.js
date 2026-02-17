import fs from 'fs';
import path from 'path';
import { execSync } from 'node:child_process';

import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import virtual from '@rollup/plugin-virtual';
import { defineConfig } from 'rollup';
import serve from 'rollup-plugin-serve';

const dev = !!process.env.ROLLUP_WATCH;

const outputFile = 'dist/flight-card-pro.js';

const lastCommitHash = getGitValue('git rev-parse HEAD') ?? 'main';
const githubRepoPath = getGitHubRepoPath();
const ghCommitRepositoryUrl = `https://raw.githubusercontent.com/${githubRepoPath}/${lastCommitHash}`;

export default defineConfig(() => ({
  input: 'src/index.ts',
  output: {
    file: outputFile,
    format: 'es',
    inlineDynamicImports: true,
  },
  plugins,
  watch: {
    clearScreen: false,
  },
}));

const airlineLogos = fs
  .readdirSync('./public/flightaware_logos')
  .filter((f) => f.endsWith('.png'))
  .map((f) => path.basename(f, '.png'));

const plugins = [
  replace({
    __LOGOS_URL__: dev
      ? 'http://localhost:4000/flightaware_logos'
      : `${ghCommitRepositoryUrl}/public/flightaware_logos`,
    include: 'src/**/*.ts',
    preventAssignment: true,
  }),
  virtual({
    'virtual:airline-logos': `export const AIRLINE_LOGOS = ${JSON.stringify(airlineLogos)};`,
  }),
  resolve({ browser: true }),
  commonjs(),
  json(),
  typescript(),
  serveOrTerse(),
];

/**
 * @returns {import('rollup').Plugin}
 */
function serveOrTerse() {
  if (dev) {
    return serve({
      contentBase: ['./dist', './public'],
      host: '0.0.0.0',
      port: 4000,
      allowCrossOrigin: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  return [
    terser({
      format: {
        comments: false,
      },
    }),
    outputBundleSize(),
  ];
}

/**
 * @returns {import('rollup').Plugin}
 */
function outputBundleSize() {
  return {
    name: 'bundle-size',
    closeBundle() {
      const file = outputFile;
      const size = fs.statSync(file).size;
      const kb = (size / 1024).toFixed(2);
      console.log(`\n📦 Bundle size: ${kb} KB`);
    },
  };
}

function getGitValue(cmd) {
  try {
    return execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    return null;
  }
}

function getGitHubRepoPath() {
  const originUrl = getGitValue('git remote get-url origin');
  if (!originUrl) return 'plckr/flight-card-pro';

  const sshMatch = originUrl.match(/github\.com:(.+?)(?:\.git)?$/);
  if (sshMatch?.[1]) return sshMatch[1];

  const httpsMatch = originUrl.match(/github\.com\/(.+?)(?:\.git)?$/);
  if (httpsMatch?.[1]) return httpsMatch[1];

  return 'plckr/flight-card-pro';
}
