import * as React from 'react';
import { Thanks } from '../components/Thanks';
import { useTranslate } from '../hooks/translate';

interface Props {
}
const SuccessPage: React.SFC<Props> = ({}) => {
  const { t } = useTranslate();
  return (
    <Thanks />
  );
}

export default SuccessPage