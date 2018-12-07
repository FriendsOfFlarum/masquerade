import {extend} from "flarum/extend";
import UserCard from "flarum/components/UserCard";
import TypeFactory from './types/TypeFactory';

export default function () {
    extend(UserCard.prototype, 'infoItems', function (items) {
        let answers = app.forum.attribute('canViewMasquerade') ? this.props.user.bioFields() || [] : [];

        items.add('masquerade-bio', m('div', answers.map(answer => {
            const field = answer.attribute('field');
            const type = TypeFactory.typeForField({
                field,
                value() {
                    return answer.content();
                },
            });

            return type.answerField();
        })));
    });
}
