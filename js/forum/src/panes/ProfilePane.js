import UserPage from 'flarum/components/UserPage';
import icon from "flarum/helpers/icon";

export default class ProfileConfigurePane extends UserPage {
    init() {
        super.init();
        this.loading = true;

        this.fields = [];
        this.answers = {};
console.log(m.route.param('username'));
        this.loadUser(m.route.param('username'));
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
        this.fields = app.store.pushPayload(response);
        this.loading = false;
        m.redraw()
    }
}
