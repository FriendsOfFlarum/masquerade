import Extend from 'flarum/common/extenders';
import User from 'flarum/common/models/User';
import Field from '../common/models/Field';
import Answer from '../common/models/Answer';

import { default as commonExtend } from '../common/extend';

export default [
  ...commonExtend,

  new Extend.Store() //
    .add('masquerade-answer', Answer),

  new Extend.Model(User) //
    .hasMany<Field>('bioFields')
    .hasMany<Answer>('masqueradeAnswers')
    .attribute<boolean>('canEditMasqueradeProfile'),
];
