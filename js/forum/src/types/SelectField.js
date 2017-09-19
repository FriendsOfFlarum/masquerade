import Select from 'flarum/components/Select';
import BaseField from 'flagrow/masquerade/types/BaseField';

export default class EmailField extends BaseField {
    editorInput() {
        return Select.component({
            onchange: value => {
                if (value === 'null') {
                    value = null;
                }

                this.set(value);
            },
            value: this.value(),
            options: this.options(),
        });
    }

    options() {
        let options = {};

        if (!this.readAttribute(this.field, 'required')) {
            options.null = app.translator.trans('flagrow-masquerade.forum.fields.select-none');
        }

        const validationIn = this.validationRule('in');

        if (validationIn) {
            validationIn.split(',').forEach(value => {
                options[value] = value;
            });
        }

        if (typeof options[this.value()] === 'undefined') {
            options[this.value()] = '(invalid) ' + this.value();
        }

        return options;
    }
}
