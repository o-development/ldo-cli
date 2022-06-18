#!/usr/bin/env node

import { program } from 'commander';

program
  .command('build')
  .option('-i, --input <inputPath>')
  .option('-o, --output <outputPath>');

program.parse();
