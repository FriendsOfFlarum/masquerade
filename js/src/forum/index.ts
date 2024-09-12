import app from 'flarum/forum/app';
import addProfilePane from './addProfilePane';
import mutateUserHero from './mutateUserHero';

app.initializers.add('fof-masquerade', () => {
  addProfilePane();
  mutateUserHero();
});

export { default as extend } from './extend';
export * from './panes';
export * from './types';
