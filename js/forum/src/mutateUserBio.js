import {override} from "flarum/extend";
import UserBio from "flarum/components/UserBio";
import icon from "flarum/helpers/icon";
import Mutate from "flagrow/masquerade/utils/Mutate";

export default function () {
    override(UserBio.prototype, 'view', function (view) {
        // Load the old user bio.
        let original = app.forum.attribute('masquerade.disable-user-bio') ? null : view();
        let answers = app.forum.attribute('canViewMasquerade') ? this.props.user.bioFields() || [] : [];

        return m('div', {className: 'Masquerade-Bio'}, [
            original,
            m('div', answers.map(answer => {
                let field = answer.attribute('field');
                let mutate = new Mutate(field.validation, answer.content());

                return m('div', {className: 'Masquerade-Bio-Set'}, [
                    m('span', {className: 'Masquerade-Bio-Field'}, [
                        field.icon ? icon(field.icon) : '',
                        field.name + ':'
                    ]),
                    m('span', {className: 'Masquerade-Bio-Answer'}, mutate.parse())
                ])
            }))
        ]);
    })
}
