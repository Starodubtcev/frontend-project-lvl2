#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';

const program = new Command();

program
    .version ('0')
    .description('Compares two configuration files and shows a difference.')
    .option('-V, --version', 'output the version number')
    .option('-h, --help', 'display help for command');

program.parse();
