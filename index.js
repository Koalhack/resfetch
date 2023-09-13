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

//NOTE: Functions

function logoColors(logoObject) {
  return logoObject.map(logoLine => {
    const { text, color } = logoLine;
    return color.map((_, index) => chalk[color[index]](text[index])).join('');
  });
}

function separator(size = 6) {
  return chalk.whiteBright('-'.repeat(size));
}

function componentsFormat(key, value) {
  if (Array.isArray(value)) {
    value = value.join(', ');
  }

  return `${chalk.cyanBright(String(key))}${chalk.whiteBright(
    `: ${String(value)}`
  )}`;
}

function infosComponents(infosObject) {
  const keys = Object.keys(infosObject);
  const values = Object.values(infosObject);
  return keys.map((key, index) =>
    key === 'separator' ? separator() : componentsFormat(key, values[index])
  );
}
