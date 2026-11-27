import Model from 'flarum/common/Model';
import type Field from './Field';
export default class Answer extends Model {
    content: () => string;
    fieldId: () => string;
    field: () => Field;
    userId: () => string;
}
