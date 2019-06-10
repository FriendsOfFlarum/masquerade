import Button from 'flarum/components/Button';
import BaseField from './BaseField';

export default class UrlField extends BaseField {
    editorInputProps() {
        let props = super.editorInputProps();

        props.type = 'url';
        props.placeholder = 'https://example.com';

        return props;
    }

    answerContent() {
        const value = this.value();

        if (!value) {
            return null;
        }

        return Button.component({
            onclick: () => this.to(),
            className: 'Button Button--text',
            icon: 'fas fa-link',
            children: value.replace(/^https?:\/\//, ''),
        });
    }

    to() {
        const popup = window.open();
        popup.location = this.value();
    }
}
