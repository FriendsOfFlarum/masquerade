import Button from 'flarum/components/Button';
import BaseField from 'flagrow/masquerade/types/BaseField';

export default class UrlField extends BaseField {
    editorInputProps() {
        let props = super.editorInputProps();

        props.type = 'url';
        props.placeholder = 'https://example.com';

        return props;
    }

    answerContent() {
        return Button.component({
            onclick: () => this.to(),
            className: 'Button Button--text',
            icon: 'link',
            children: this.value().replace(/^https?:\/\//, ''),
        });
    }

    to() {
        const popup = window.open();
        popup.location = this.value();
    }
}
