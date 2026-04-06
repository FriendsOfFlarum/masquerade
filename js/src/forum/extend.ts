import commonExtend from '../common/extend';
import Extend from 'flarum/common/extenders';
import User from 'flarum/common/models/User';
import Field from '../lib/models/Field';
import Answer from '../lib/models/Answer';
import RootMasqueradePane from './panes/RootMasqueradePane';

export default [
  ...commonExtend,

  new Extend.Routes() //
    .add('fof-masquerade', '/u/:username/masquerade', RootMasqueradePane),

  new Extend.Store() //
    .add('masquerade-answers', Answer),

  new Extend.Model(User) //
    .hasMany<Field>('bioFields')
    .hasMany<Answer>('masqueradeAnswers')
    .attribute<boolean>('canEditMasqueradeProfile'),
];
