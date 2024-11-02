import Model from 'flarum/common/Model';
import type Field from './Field';
export default class Answer extends Model {
    content: () => unknown;
    fieldId: () => unknown;
    field: () => Field;
    userId: () => unknown;
}
