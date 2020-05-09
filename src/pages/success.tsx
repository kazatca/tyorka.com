import * as React from 'react';
import { useTranslate } from '../hooks/translate';

interface Props {
}
const SuccessPage: React.SFC<Props> = ({}) => {
  const { t } = useTranslate();
  return (
    <div>
      {t('Your order recieved Thanks')}
    </div>
  );
}

export default SuccessPage