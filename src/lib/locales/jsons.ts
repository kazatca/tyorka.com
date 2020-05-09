import * as fs from 'fs';
import {flatten, unflatten} from 'flat';
import { LocaleJson } from './types';

export function loadJson(fileName: string): LocaleJson {
  return flatten(require(fileName));
}

export function saveJson(fileName: string, json: LocaleJson) {
  const unflattenJson = unflatten(json) as LocaleJson;
  fs.writeFileSync(
    fileName,
    JSON.stringify(unflattenJson, arrangeTokens(unflattenJson), '  '),
    'utf-8'
  );
}

export function arrangeTokens(json: LocaleJson) {
  const [empty, filled] = Object.keys(json).reduce(
    (result, token) => {
      if (typeof json[token] === 'object') {
        result[1] = result[1].concat(arrangeTokens(json[token] as LocaleJson));
      }
      result[json[token] ? 1: 0].push(token);
      return result;
    },
    [[], []] as [string[], string[]]
  );

  return [...empty.sort(), ...filled.sort()];
}