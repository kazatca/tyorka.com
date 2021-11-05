import * as yargs from 'yargs';

const args = yargs
  .options({
    languages: {
      alias: 'l',
      describe: 'List of languages',
      default: 'en,ru'
    },
    tsconfig: {
      describe: 'Path to tsconfig.json file',
      default: './tsconfig.json'
    },
    localesPath: {
      describe: 'Folder of locale json files',
      default: './locales'
    }
  })

args.help();

export const argv = async () => await args.argv;
