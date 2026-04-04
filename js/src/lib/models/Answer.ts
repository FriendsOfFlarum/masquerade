import app from 'flarum/common/app';
import Model from 'flarum/common/Model';
import computed from 'flarum/common/utils/computed';

import type Field from './Field';

export default class Answer extends Model {
  content = Model.attribute<string>('content');
  fieldId = Model.attribute<string>('fieldId');
  field = computed<Field>('fieldId', (fieldId) => app.store.getById<Field>('masquerade-fields', fieldId as string)!);
  userId = Model.attribute<string>('user_id');
}
