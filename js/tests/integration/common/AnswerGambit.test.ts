import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import extend from '../../../src/common/extend';

beforeAll(() => {
  bootstrapForum();
  app.bootExtensions({ 'fof-masquerade': { extend } });
  app.boot();
  app.translator.addTranslations({
    'fof-masquerade.lib.gambits.answer.key': 'ответ',
  });
});

it('turns the translated gambit into the answer filter', () => {
  expect(app.search.gambits.apply('users', { q: 'ответ:blue' })).toStrictEqual({ q: '', answer: 'blue' });
});

it('still turns the English answer: into the answer filter on a translated forum', () => {
  expect(app.search.gambits.apply('users', { q: 'answer:blue' })).toStrictEqual({ q: '', answer: 'blue' });
});

it('still turns the negated English -answer: into the negated filter on a translated forum', () => {
  expect(app.search.gambits.apply('users', { q: '-answer:blue' })).toStrictEqual({ q: '', '-answer': 'blue' });
});
