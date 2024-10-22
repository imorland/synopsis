import app from 'flarum/admin/app';
import extractText from 'flarum/common/utils/extractText';

export default function () {
  let opts: { [key: string]: string } = {};
  opts = ['first', 'last'].reduce((o: { [key: string]: string }, key) => {
    o[key] = extractText(app.translator.trans(`ianm-synopsis.admin.settings.${key}-label`));

    return o;
  }, {});
  return opts;
}
