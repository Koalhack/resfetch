#!/usr/bin/env node

//NOTE: Import dependencies
import fs from 'fs';
import YAML from 'js-yaml';
import chalk from 'chalk';
import { Command } from 'commander';

//NOTE: Load Infos YAML file
const infosRaw = fs.readFileSync('Data/infos.yml');
const infos = YAML.load(infosRaw);

//NOTE: Load Logo YAML file
const logoRaw = fs.readFileSync('Data/logo.yml');
const logo = YAML.load(logoRaw);

console.log(infos);
logo?.logo.map(logoLine => console.log(logoLine?.text));
