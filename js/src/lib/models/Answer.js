import Model from 'flarum/common/Model';

export default class Answer extends Model {
  content = Model.attribute('content');
  field = Model.hasOne('field');
  userId = Model.attribute('user_id');

  apiEndpoint() {
    return '/masquerade/configure' + (this.exists ? '/' + this.data.id : '');
  }
}
