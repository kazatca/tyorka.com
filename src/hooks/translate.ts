import en from '../../locales/en.json';
import ru from '../../locales/ru.json';

const lng = process.env.GATSBY_LNG || 'ru';

const locales: {[lng: string]: {[token: string]: string}} = {
  en, ru
};

export const useTranslate = () => {
  const t = (token: string) => lng in locales ? locales[lng][token] : token;

  return {
    t,
    lng
  }

}