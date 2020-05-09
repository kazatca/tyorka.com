import * as React from 'react';
import * as b_ from 'b_';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../state/actions';
import { RootState } from '../../state/reducer';

import './index.scss';

const locales = ['en', 'ru'];

const b = b_.with('language-selector');

export const LanguageSelector: React.FC = () => {

  const actualLng = useSelector((state: RootState) => state.app.locale);

  const dispatch = useDispatch();

  const set = (lng: string) => dispatch(actions.changeLanguage(lng));

  return (
    <div className={b()}>
      {locales.map(lng => (
        <span
          className={b('lng', {active: lng === actualLng})}
          onClick={() => set(lng)}
        >
          {lng.toUpperCase()}
        </span>
      ))}
    </div>
  );
}