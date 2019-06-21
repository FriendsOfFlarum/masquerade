import UserPage from 'flarum/components/UserPage';
import TypeFactory from './../types/TypeFactory';

/* global m */

export default class ProfileConfigurePane extends UserPage {
    init() {
        super.init();
        this.loading = true;

        this.fields = [];
        this.answers = {};

        this.loadUser(m.route.param('username'));
    }

    content() {
        return m('.Masquerade-Bio', [
            m('.Fields', this.fields
                .sort((a, b) => a.sort() - b.sort())
                .map(field => {
                    // UserID check must be done with == because userId() is number while id() is string
                    this.answers[field.id()] = field.answer() && field.answer().userId() == this.user.id() ? field.answer().content() : null;

                    return this.field(field);
                })
            ),
        ]);
    }

    field(field) {
        const type = TypeFactory.typeForField({
            field,
            value: m.prop(this.answers[field.id()]),
        });

        return type.answerField();
    }

    load(user) {
        app.request({
            method: 'GET',
            url: app.forum.attribute('apiUrl') + '/masquerade/profile/' + user.id(),
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
        m.redraw();
    }
}
