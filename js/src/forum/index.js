import app from 'flarum/forum/app';
import User from 'flarum/common/models/User';
import Field from './../lib/models/Field';
import Answer from './../lib/models/Answer';
import Model from 'flarum/common/Model';

import addProfilePane from './addProfilePane';
import mutateUserHero from './mutateUserHero';

app.initializers.add('fof-masquerade', (app) => {
  app.store.models['masquerade-field'] = Field;
  app.store.models['masquerade-answer'] = Answer;

  User.prototype.bioFields = Model.hasMany('bioFields');

  addProfilePane();

  mutateUserHero();
});
