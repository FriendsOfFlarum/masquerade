import app from 'flarum/forum/app';
import addProfilePane from './addProfilePane';
import mutateUserHero from './mutateUserHero';
import enforceProfileCompletion from './enforceProfileCompletion';

export { default as extend } from './extend';

app.initializers.add('fof-masquerade', () => {
  addProfilePane();
  mutateUserHero();
  enforceProfileCompletion();
});
