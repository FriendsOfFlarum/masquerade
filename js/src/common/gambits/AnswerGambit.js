import app from 'flarum/common/app';
import { KeyValueGambit } from 'flarum/common/query/IGambit';

export default class AnswerGambit extends KeyValueGambit {
  key() {
    return app.translator.trans('fof-masquerade.lib.gambits.answer.key', {}, true);
  }

  hint() {
    return app.translator.trans('fof-masquerade.lib.gambits.answer.hint', {}, true);
  }

  filterKey() {
    return 'answer';
  }
}
