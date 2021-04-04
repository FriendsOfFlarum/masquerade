import { extend } from 'flarum/common/extend';
import UserCard from 'flarum/forum/components/UserCard';
import TypeFactory from './types/TypeFactory';

export default function () {
    extend(UserCard.prototype, 'infoItems', function (items) {
        let answers = app.forum.attribute('canViewMasquerade') ? this.attrs.user.bioFields() || [] : [];

        items.add(
            'masquerade-bio',
            m(
                'div',
                answers.map((answer) => {
                    const field = answer.attribute('field');
                    const type = TypeFactory.typeForField({
                        field,
                        value: answer.content(),
                    });

                    return type.answerField();
                })
            )
        );
    });
}
