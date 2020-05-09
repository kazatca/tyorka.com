import { useSelector } from 'react-redux';
import { RootState } from '../state/reducer';

import en from '../../locales/en.json';
import ru from '../../locales/ru.json';

const locales: {[lng: string]: {[token: string]: string}} = {
  en, ru
};

export const useTranslate = () => {
  const lng = useSelector((state: RootState) => state.app.locale);

  const t = (token: string) => lng in locales ? locales[lng][token] : token;

  return {
    t,
    lng
  }

}