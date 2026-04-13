import commonExtend from '../common/extend';
import Extend from 'flarum/common/extenders';
import User from 'flarum/common/models/User';
import Answer from '../lib/models/Answer';
import RootMasqueradePane from './panes/RootMasqueradePane';
import extend from 'flarum/common/extend';
import Application from 'flarum/common/Application';
import app from 'flarum/forum/app';
import m from 'mithril';

function checkProfile() {
  const user = app.session.user;
  if (!user) return;

  if (user.attribute('masqueradeProfileCompleted')) return;

  if (app.current.get('routeName') === 'fof-masquerade') return;

  m.route.set(app.route('fof-masquerade', { username: user.username() }));
}

function interceptApi(original: Function) {
  return function (this: Application, options: any) {
    const user = app.session.user;
    if (user && !user.attribute('masqueradeProfileCompleted')) {
      const method = (options.method || 'GET').toUpperCase();
      if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
        return Promise.reject(new Error('Profile completion required'));
      }
    }
    return original.call(this, options);
  };
}

extend(Application.prototype, 'mount', checkProfile);
extend(Application.prototype, 'request', interceptApi);

export default [
  ...commonExtend,

  new Extend.Routes() //
    .add('fof-masquerade', '/u/:username/masquerade', RootMasqueradePane),

  new Extend.Store() //
    .add('masquerade-answers', Answer),

  new Extend.Model(User) //
    .hasMany<Answer>('bioFields')
    .hasMany<Answer>('masqueradeAnswers')
    .attribute<boolean>('canEditMasqueradeProfile'),
];
