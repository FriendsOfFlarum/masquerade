import Model from 'flarum/common/Model';
import Answer from './Answer';
export default class Field extends Model {
    name: () => string;
    description: () => string;
    type: () => string | null;
    validation: () => string;
    required: () => boolean;
    prefix: () => string;
    icon: () => string;
    sort: () => number;
    deleted_at: () => Date | null | undefined;
    answer: () => false | Answer;
    on_bio: () => boolean;
    apiEndpoint(): string;
}
