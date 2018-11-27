import {override} from "flarum/extend";
import UserBio from "flarum/components/UserBio";
import TypeFactory from './types/TypeFactory';

export default function () {
    override(UserBio.prototype, 'view', function (view) {
        // Load the old user bio.
        let original = app.forum.attribute('masquerade.disable-user-bio') ? null : view();
        let answers = app.forum.attribute('canViewMasquerade') ? this.props.user.bioFields() || [] : [];

        return m('.Masquerade-Bio', [
            original,
            m('div', answers.map(answer => {
                const field = answer.attribute('field');
                const type = TypeFactory.typeForField({
                    field,
                    value() {
                        return answer.content();
                    },
                });

                return type.answerField();
            }))
        ]);
    });
}
