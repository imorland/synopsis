import app from 'flarum/forum/app';
import addSummaryExcerpt from './addSummaryExcerpt';
import addUserPreference from './addUserPreference';

export { default as extend } from './extend';

export * from './components';

app.initializers.add('ianm-synopsis', () => {
  addSummaryExcerpt();
  addUserPreference();
});
