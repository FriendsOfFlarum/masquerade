export default class Field extends Model {
    name: () => any;
    description: () => any;
    type: () => any;
    validation: () => any;
    required: () => any;
    prefix: () => any;
    icon: () => any;
    sort: () => any;
    deleted_at: () => Date | null | undefined;
    answer: () => false | Model;
    on_bio: () => any;
}
import Model from "flarum/common/Model";
