import app from 'flarum/forum/app';

import addProfilePane from './addProfilePane';
import mutateUserHero from './mutateUserHero';

// Exports
import ProfileConfigurePane from './panes/ProfileConfigurePane';
import ProfilePane from './panes/ProfilePane';
import RootMasqueradePane from './panes/RootMasqueradePane';
import BaseField from './types/BaseField';
import BooleanField from './types/BooleanField';
import EmailField from './types/EmailField';
import SelectField from './types/SelectField';
import TypeFactory from './types/TypeFactory';
import UrlField from './types/UrlField';

app.initializers.add('fof-masquerade', () => {
  addProfilePane();
  mutateUserHero();
});

const components = {
  ProfileConfigurePane,
  ProfilePane,
  RootMasqueradePane,
};

const types = {
  BaseField,
  BooleanField,
  EmailField,
  SelectField,
  TypeFactory,
  UrlField,
};

export { default as extend } from './extend';
export { components, types };
