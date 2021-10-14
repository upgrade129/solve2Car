import { FC } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

const IntlMessage: FC<any> = (props) => <FormattedMessage {...props} />;

export default injectIntl(IntlMessage);
