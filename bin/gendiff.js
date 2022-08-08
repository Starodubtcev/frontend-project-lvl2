#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .version('0.0.1', '-v, --version', 'Compares two configuration files and shows a difference.')
  .description('Compares two configuration files and shows a difference.');

program.parse();
