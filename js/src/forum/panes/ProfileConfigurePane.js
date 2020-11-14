import app from 'flarum/app';
import UserPage from 'flarum/components/UserPage';
import Button from 'flarum/components/Button';
import TypeFactory from './../types/TypeFactory';

/* global m */

export default class ProfileConfigurePane extends UserPage {
    oninit(vnode) {
        super.oninit(vnode);
        this.loading = true;

        this.loadUser(app.session.user.username());
        this.enforceProfileCompletion = app.forum.attribute('masquerade.force-profile-completion') || false;
        this.profileCompleted = app.forum.attribute('masquerade.profile-completed') || false;
        this.fields = [];
        this.answers = {};
        this.load();
    }

    content() {
        return m(
            'form.ProfileConfigurePane',
            {
                onsubmit: this.update.bind(this),
            },
            [
                this.enforceProfileCompletion && !this.profileCompleted
                    ? m('.Alert.Alert--Error', app.translator.trans('fof-masquerade.forum.alerts.profile-completion-required'))
                    : null,
                m(
                    '.Fields',
                    this.fields
                        .sort((a, b) => a.sort() - b.sort())
                        .map((field) => {
                            if (!this.answers.hasOwnProperty(field.id())) {
                                this.answers[field.id()] = field.answer() ? field.answer().content() : '';
                            }

                            return this.field(field);
                        })
                ),
                Button.component(
                    {
                        type: 'submit',
                        className: 'Button Button--primary',
                        loading: this.loading,
                    },
                    app.translator.trans('fof-masquerade.forum.buttons.save-profile')
                ),
            ]
        );
    }

    field(field) {
        const type = TypeFactory.typeForField({
            field,
            set: this.set.bind(this, field),
            value: this.answers[field.id()],
        });

        return type.editorField();
    }

    load() {
        app.request({
            method: 'GET',
            url: app.forum.attribute('apiUrl') + '/masquerade/configure',
        }).then(this.parseResponse.bind(this));
    }

    set(field, value) {
        this.answers[field.id()] = value;
    }

    update(e) {
        e.preventDefault();

        this.loading = true;

        app.request({
            method: 'POST',
            url: app.forum.attribute('apiUrl') + '/masquerade/configure',
            body: this.answers,
        })
            .then(this.parseResponse.bind(this))
            .catch(() => {
                this.loading = false;
                m.redraw();
            });
    }

    parseResponse(response) {
        this.fields = app.store.pushPayload(response);
        this.loading = false;
        m.redraw();
    }
}
