import {override} from "flarum/extend";
import UserBio from "flarum/components/UserBio";

export default function () {
    override(UserBio.prototype, 'view', function (view) {
        console.log(this.props.user.bioFields(), app.session.user.bioFields());

        // Load the old user bio.
        let original = app.forum.attribute('masquerade.disable-user-bio') ? null : view();

        return m('div', {className: 'Masquerade-Bio'}, [
            original,
            m('div')
        ]);
    })
}
