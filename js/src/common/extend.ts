import Extend from 'flarum/common/extenders';
import Field from '../lib/models/Field';

export default [
  new Extend.Store() //
    .add('masquerade-field', Field),
];
