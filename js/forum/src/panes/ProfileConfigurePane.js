import UserPage from 'flarum/components/UserPage';
import icon from "flarum/helpers/icon";
import Button from "flarum/components/Button";

export default class ProfileConfigurePane extends UserPage {
    init() {
        super.init();
        this.loading = true;

        this.loadUser(app.session.user.username());
        this.fields = [];
        this.answers = {};

        this.load();
    }

    content() {
        return m('form', {
                className: 'ProfileConfigurePane',
                onsubmit: this.update.bind(this)
            }, [
                m('div', {className: 'Fields'}, this.fields
                    .sort((a, b) => a.sort() - b.sort())
                    .map(field => {
                        if (!(field.id() in this.answers)) {
                            this.answers[field.id()] = field.answer() ? m.prop(field.answer().content()) : m.prop('')
                        }
                        return this.field(field);
                    })
                ),
                Button.component({
                    type: 'submit',
                    className: 'Button Button--primary',
                    children: app.translator.trans('flagrow-masquerade.forum.buttons.save-profile'),
                    loading: this.loading
                })
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
                field.prefix() ? m('span', {className: 'prefix'}, field.prefix()) : '',
                m('input', {
                    className: 'FormControl',
                    oninput: m.withAttr('value', this.set.bind(this, field)),
                    value: this.answers[field.id()]()
                }),
                field.description() ? m('span', {className: 'help-block'}, field.description()) : ''
            ])
        ]);
    }

    load() {
        app.request({
            method: 'GET',
            url: app.forum.attribute('apiUrl') + '/masquerade/configure',
        }).then(
            this.parseResponse.bind(this)
        );
    }

    set(field, value) {
        if (!(field.id() in this.answers)) {
            this.answers[field.id()] = m.prop(value);
        } else {
            this.answers[field.id()](value);
        }
    }

    update(e) {
        e.preventDefault();

        let data = this.answers;

        app.request({
            method: 'POST',
            url: app.forum.attribute('apiUrl') + '/masquerade/configure',
            data
        }).then(
            this.parseResponse.bind(this)
        )
    }

    parseResponse(response) {
        this.fields = app.store.pushPayload(response);
        this.loading = false;
        m.redraw()
    }
}
