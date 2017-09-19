import icon from 'flarum/helpers/icon';

export default class BaseField {
    constructor({field, set, value}) {
        this.field = field;
        this.set = set;
        this.value = value;
    }

    readAttribute(object, attribute) {
        if (typeof object[attribute] === 'function') {
            return object[attribute]();
        }

        return object[attribute];
    }

    editorField() {
        return m('fieldset', {className: 'Field'}, [
            m('legend', [
                this.field.icon() ? icon(this.field.icon()) : '',
                this.field.name(),
                this.field.required() ? ' *' : '',
            ]),
            m('div', {className: 'FormField'}, [
                this.field.prefix() ? m('div', {className: 'prefix'}, this.field.prefix()) : '',
                this.editorInput(),
                this.field.description() ? m('span', {className: 'helpText'}, this.field.description()) : '',
            ]),
        ]);
    }

    editorInput() {
        return m('input', this.editorInputProps());
    }

    editorInputProps() {
        return {
            className: 'FormControl',
            oninput: m.withAttr('value', this.set),
            value: this.value(),
            required: this.field.required(),
        };
    }

    answerField() {
        const iconName = this.readAttribute(this.field, 'icon');

        return m('.Masquerade-Bio-Set', [
            m('span.Masquerade-Bio-Field', [
                iconName ? icon(iconName) : '',
                this.readAttribute(this.field, 'name') + ':',
            ]),
            m('span.Masquerade-Bio-Answer', this.answerContent()),
        ]);
    }

    answerContent() {
        return this.value();
    }
}
