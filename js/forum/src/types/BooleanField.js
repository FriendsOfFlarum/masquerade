import icon from 'flarum/helpers/icon';
import BaseField from 'flagrow/masquerade/types/BaseField';

export default class BooleanField extends BaseField {
    editorInput() {
        return this.options().map(option => m('div', m('label', [
            m('input[type=radio]', {
                checked: this.value() === option.key || option.other_keys && option.other_keys.indexOf(this.value()) !== -1,
                onclick: () => {
                    this.set(option.key);
                },
            }),
            ' ' + option.label,
        ])));
    }

    options() {
        let options = [];

        if (!this.readAttribute(this.field, 'required')) {
            options.push({
                key: null,
                label: app.translator.trans('flagrow-masquerade.forum.fields.select.none'),
            });
        }

        options.push({
            key: 'true',
            other_keys: ['1', 1, true, 'yes'],
            label: app.translator.trans('flagrow-masquerade.forum.fields.boolean.yes'),
        });

        options.push({
            key: 'false',
            other_keys: ['0', 0, false, 'no'],
            label: app.translator.trans('flagrow-masquerade.forum.fields.boolean.no'),
        });

        // This is probably overkill because it looks like the backend casts the value anyway
        if ([null, 'true', '1', 1, true, 'yes', 'false', '0', 0, false, 'no'].indexOf(this.value()) === -1) {
            options.push({
                key: this.value(),
                label: '(invalid) ' + this.value(),
            });
        }

        return options;
    }

    answerContent() {
        return [1, '1', true, 'true', 'yes'].indexOf(this.value()) !== -1 ?
            icon('check-square-o') :
            icon('square-o');
    }
}
