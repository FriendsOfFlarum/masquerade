import UserPage from 'flarum/components/UserPage';
import icon from "flarum/helpers/icon";

export default class ProfileConfigurePane extends UserPage {
    init() {
        super.init();
        this.loading = true;

        this.fields = [];
        this.answers = {};

        this.loadUser(m.route.param('username'));

        this.load();
    }

    content() {
        return m('div', {
                className: 'ProfilePane'
            }, [
                m('div', {className: 'Fields'}, this.fields
                    .sort((a, b) => a.sort() - b.sort())
                    .map(field => {
                        if (!(field.id() in this.answers)) {
                            this.answers[field.id()] = field.answer() ? m.prop(field.answer().content()) : m.prop('')
                        }
                        return this.field(field);
                    })
                )
            ]
        );
    }

    field(field) {
        return m('fieldset', {className: 'Field'}, [
            m('legend', [
                field.icon() ? icon(field.icon()) : '',
                field.name()
            ]),
            m('div', {className: 'FormField'}, [
                field.prefix() ? m('div', {className: 'prefix'}, field.prefix()) : '',
                m('div', {
                    className: 'FormControl'
                }, this.answers[field.id()]())
            ])
        ]);
    }

    load() {
        app.request({
            method: 'GET',
            url: app.forum.attribute('apiUrl') + '/masquerade/profile/' + this.user.id(),
        }).then(
            this.parseResponse.bind(this)
        );
    }

    parseResponse(response) {
        this.fields = app.store.pushPayload(response);
        this.loading = false;
        m.redraw()
    }
}
