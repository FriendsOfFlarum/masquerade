import Extend from 'flarum/common/extenders';
import Field from '../common/models/Field';

export default [
  new Extend.Store() //
    .add('masquerade-field', Field),
];
