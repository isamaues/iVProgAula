import * as Messages from './message.csv';
import * as UI from './ui.csv';
import * as Errors from './error.csv';

type Dict =  {[id: string]: unknown};

const MessagesObj = Messages as Dict;
const UIObj = UI as Dict;
const ErrorsObj = Errors as Dict;
const i18n_data = {} as Dict;

for (const key in UIObj) {
  const data = {} as Dict;
  data['error'] = ErrorsObj[key];
  data['message'] = MessagesObj[key];
  data['ui'] = UIObj[key];
  i18n_data[key] = data;
}

export default i18n_data;
