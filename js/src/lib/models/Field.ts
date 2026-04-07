import Model from 'flarum/common/Model';
import Answer from './Answer';

export default class Field extends Model {
  name = Model.attribute<string>('name');
  description = Model.attribute<string>('description');
  type = Model.attribute<string | null>('type');
  validation = Model.attribute<string>('validation');
  required = Model.attribute<boolean>('required');
  icon = Model.attribute<string>('icon');
  sort = Model.attribute<number>('sort');
  deleted_at = Model.attribute('deleted_at', Model.transformDate);
  answer = Model.hasOne<Answer>('answer');
  on_bio = Model.attribute<boolean>('on_bio');

  apiEndpoint() {
    return '/masquerade-fields' + (this.exists ? `/${this.id()}` : '');
  }
}
