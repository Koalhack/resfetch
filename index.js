#!/usr/bin/env node

//NOTE: Import dependencies
import fs from 'fs';
import YAML from 'js-yaml';
import chalk from 'chalk';
import { Command } from 'commander';
//NOTE: Constante variables
const lineBreak = '\n';

//NOTE: Load Infos YAML file
const infosRaw = fs.readFileSync('Data/infos.yml');
const infos = YAML.load(infosRaw);

//NOTE: Load Logo YAML file
const logoRaw = fs.readFileSync('Data/logo.yml');
const logo = YAML.load(logoRaw);

//NOTE: Functions

//NOTE: get logos with correct colors
function logoColors(logoObject) {
  return logoObject.map(logoLine => {
    const { text, color } = logoLine;
    return color.map((_, index) => chalk[color[index]](text[index])).join('');
  });
}

//NOTE: Get the longuest line length
function logoMaxCharacterPerLine(logoObject) {
  return logoObject.reduce(
    (arr, logoLine) =>
      arr < logoLine?.text.join('').length
        ? (arr = logoLine?.text.join('').length)
        : arr,
    0
  );
}

function separator(size = 6) {
  return chalk.whiteBright('-'.repeat(size));
}

//NOTE: Basic Format and style for the infos structure
function componentsFormat(key, value) {
  if (Array.isArray(value)) {
    value = value.join(', ');
  }

  return `${chalk.cyanBright(String(key))}${chalk.whiteBright(
    `: ${String(value)}`
  )}`;
}

//NOTE: Get the list of all informations structured
function infosComponents(infosObject) {
  const keys = Object.keys(infosObject);
  const values = Object.values(infosObject);
  return keys.map((key, index) => componentsFormat(key, values[index]));
}

function addOffset(size) {
  return ' '.repeat(size);
}

//NOTE: get theme colors blocks
function colorBlocksList() {
  const blockStyle = '█';
  const blockSize = 3;
  const themeColors = [
    'black',
    'red',
    'green',
    'yellow',
    'blue',
    'magenta',
    'cyan',
    'white',
    'blackBright',
    'redBright',
    'greenBright',
    'yellowBright',
    'blueBright',
    'magentaBright',
    'cyanBright',
    'whiteBright'
  ];

  return themeColors.map(color => chalk[color](blockStyle.repeat(blockSize)));
}

function styledColorBlocks(offset) {
  const colorBlocks = colorBlocksList();
  let styledColorBlocks = addOffset(offset);
  colorBlocks.forEach((block, index) => {
    if (index === colorBlocks.length / 2) {
      styledColorBlocks += lineBreak + addOffset(offset);
    }

    styledColorBlocks += block;
  });

  return styledColorBlocks;
}

//NOTE: display neofetch like resume
function print(infos, logo) {
  logo = logo?.logo;
  const logoInformationsGap = 3;
  const infosComponentsList = infosComponents(infos);
  const logoColorsLines = logoColors(logo);
  const logoMax = logoMaxCharacterPerLine(logo);
  const maxHeight =
    logoColorsLines.length > infosComponentsList.length
      ? logoColorsLines.length
      : infosComponentsList.length;

  let structuredLogoInfos = '';
  for (let i = 0; i < maxHeight; i++) {
    const logoActiveLine = logo[i]?.text.join('');

    structuredLogoInfos += `${logoColorsLines[i] || ''}${' '.repeat(
      logoMax - (logoActiveLine?.length || 0)
    )}${' '.repeat(logoInformationsGap)}${
      infosComponentsList[i] || ''
    } ${lineBreak}`;
  }

  console.log(
    structuredLogoInfos +
      lineBreak +
      styledColorBlocks(logoMax + logoInformationsGap) +
      lineBreak
  );
}

print(infos, logo);
