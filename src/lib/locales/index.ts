import * as glob from 'glob'
import * as path from 'path'
import { parseFiles } from './parseFile'
import { LocaleJson } from './types'
import { loadJson, saveJson } from './jsons'
import { argv } from './args'

function merge(localeJson: LocaleJson, tokens: string[]) {
  const newTokens = tokens.filter(token => !(token in localeJson))
  const unusedJson = Object.keys(localeJson)
    .filter(token => !tokens.includes(token))
    .reduce((result, key) => ({ ...result, [key]: localeJson[key] }), {})
  return {
    actualJson: {
      ...Object.keys(localeJson)
        .filter(key => !(key in unusedJson))
        .reduce((result, key) => ({ ...result, [key]: localeJson[key] }), {}),

      ...newTokens.reduce((result, token) => ({ ...result, [token]: '' }), {}),
    },
    unusedJson,
  }
}

async function main() {
  const { tsconfig, localesPath, languages } = await argv()
  const locales = languages
    .split(',')
    .map((lng: string) => lng.trim().toLowerCase())
  const files = glob.sync('src/**/*.{ts,tsx}')

  const tokens = parseFiles(files, tsconfig)

  const pwd = process.cwd()

  const localeJsons = locales.reduce(
    (result, locale) => ({
      ...result,
      [locale]: loadJson(path.join(pwd, localesPath, `${locale}.json`)),
    }),
    {} as { [lng: string]: LocaleJson }
  )

  Object.keys(localeJsons).forEach(locale => {
    const { actualJson, unusedJson } = merge(localeJsons[locale], tokens)

    if (Object.keys(unusedJson).length) {
      saveJson(path.join('locales', `${locale}_unused.json`), unusedJson)
    }

    // console.log(unflatten(actualJson));
    saveJson(path.join('locales', `${locale}.json`), actualJson)
  })
}

main();
