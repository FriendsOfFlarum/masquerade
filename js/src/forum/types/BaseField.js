import icon from 'flarum/helpers/icon';

/* global m */

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

    /**
     * Gets all Laravel validation rules split by rule
     * @returns {Array}
     */
    validationRules() {
        return this.readAttribute(this.field, 'validation').split('|');
    }

    /**
     * Gets a Laravel validation rule by name
     * @param {string} ruleName
     * @returns {string|null}
     */
    validationRule(ruleName) {
        let ruleContent = null;

        this.validationRules().forEach(rule => {
            const split = rule.split(':', 2);

            if (split[0] === ruleName) {
                ruleContent = split[1];
            }
        });

        return ruleContent;
    }

    editorField() {
        return m('fieldset.Field', [
            m('legend', [
                this.field.icon() ? [icon(this.field.icon()), ' '] : null,
                this.field.name(),
                this.field.required() ? ' *' : null,
            ]),
            m('.FormField', [
                this.field.prefix() ? m('.prefix', this.field.prefix()) : null,
                this.editorInput(),
                this.field.description() ? m('.helpText', this.field.description()) : null,
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
                iconName ? [icon(iconName), ' '] : null,
                this.readAttribute(this.field, 'name') + ': ',
            ]),
            m('span.Masquerade-Bio-Answer', this.answerContent()),
        ]);
    }

    answerContent() {
        return this.value();
    }

    static isNoOptionSelectedValue(value) {
        // The value can be null when coming from the API
        // The value can be '' when the field does not exist on the user (the empty string is set in ProfileConfigurePane)
        return value === null || value === '';
    }
}
