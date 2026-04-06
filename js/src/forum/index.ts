import app from 'flarum/forum/app';
import addProfilePane from './addProfilePane';
import mutateUserHero from './mutateUserHero';

export { default as extend } from './extend';

app.initializers.add('fof-masquerade', () => {
  addProfilePane();
  mutateUserHero();
});
