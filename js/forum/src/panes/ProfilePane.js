import UserPage from 'flarum/components/UserPage';
import icon from "flarum/helpers/icon";
import Mutate from "flagrow/masquerade/utils/Mutate";

export default class ProfileConfigurePane extends UserPage {
    init() {
        super.init();
        this.loading = true;

        this.fields = [];
        this.answers = {};

        this.loadUser(m.route.param('username'));
    }

    content() {
        return m('div', {
                className: 'Masquerade-Bio'
            }, [
                m('div', {className: 'Fields'}, this.fields
                    .sort((a, b) => a.sort() - b.sort())
                    .map(field => {
                        this.answers[field.id()] = field.answer() && field.answer().userId() == this.user.id() ? field.answer().content() : null;

                        return this.field(field);
                    })
                )
            ]
        );
    }

    field(field) {
        const mutate = new Mutate(field.validation(), this.answers[field.id()]);

        return m('div', {className: 'Masquerade-Bio-Set'}, [
            m('span', {className: 'Masquerade-Bio-Field'}, [
                field.icon() ? icon(field.icon()) : '',
                field.name() + ':'
            ]),
            m('span', {className: 'Masquerade-Bio-Answer'}, mutate.parse())
        ])
    }

    load(user) {
        app.request({
            method: 'GET',
            url: app.forum.attribute('apiUrl') + '/m/profile/' + user.id(),
        }).then(
            this.parseResponse.bind(this)
        );
    }

    show(user) {
        this.load(user);

        super.show(user);
    }

    parseResponse(response) {
        this.answers = {};
        this.fields = app.store.pushPayload(response);

        this.loading = false;
        m.redraw()
    }
}
