import AnswerGambit from './gambits/AnswerGambit';
import Extend from 'flarum/common/extenders';
import Field from '../lib/models/Field';

export default [
  new Extend.Store() //
    .add('masquerade-fields', Field),
  new Extend.Search().gambit('users', AnswerGambit),
];
