import Component from "flarum/Component";
import saveSettings from "flarum/utils/saveSettings";
import Alert from "flarum/components/Alert";
import Switch from "flarum/components/Switch";
import FieldSet from "flarum/components/FieldSet";

export default class ProfileConfigurePane extends Component {

    init() {
        this.new = {
            'name': m.prop(''),
            'required': m.prop(false),
            'description': m.prop(''),
            'validation': m.prop('')
        };


    }

    view() {
        return m('div', {
            className: 'ProfileConfigurePane'
        }, [
            m('div', {className: 'container'}, [
                m('form', {onsubmit: this.onsubmit.bind(this)}, [
                    this.addField()
                ])
            ])
        ])
    }

    addField() {
        return FieldSet.component({
            label: app.translator.trans('flagrow-bian-lian.admin.fields.add'),
            children: [
                m('div', [
                    m('label', app.translator.trans('flagrow-bian-lian.admin.fields.name')),
                    m('input', {
                        className: 'FormControl',
                        oninput: m.withAttr('value', this.new.name)
                    })
                ]),
                m('div', [
                    m('label', app.translator.trans('flagrow-bian-lian.admin.fields.description')),
                    m('input', {
                        className: 'FormControl',
                        oninput: m.withAttr('value', this.new.description)
                    })
                ]),
                m('div', [
                    m('label', app.translator.trans('flagrow-bian-lian.admin.fields.required')),
                    Switch.component({
                        state: this.new.required(),
                        onchange: this.new.required
                    })
                ]),
                m('div', [
                    m('label', app.translator.trans('flagrow-bian-lian.admin.fields.validation')),
                    m('input', {
                        className: 'FormControl',
                        oninput: m.withAttr('value', this.new.validation)
                    }),
                    m('span', app.translator.trans('flagrow-bian-lian.admin.fields.validation-help', {
                        a: <a href="https://laravel.com/docs/5.2/validation#available-validation-rules" target="_blank"/>
                    }))
                ]),
            ]
        })
    }
    /**
     * Saves the settings to the database and redraw the page
     *
     * @param e
     */
    onsubmit(e) {

    }
}
