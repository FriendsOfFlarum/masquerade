import UserPage from 'flarum/components/UserPage';

export default class ProfileConfigurePane extends UserPage {
    init() {
        super.init();

        this.loadUser(app.session.user.username());
    }
    content() {
        return m('div', {
            className: 'ProfileConfigurePane'
        });
    }
}
