import Button from 'flarum/components/Button';
import BaseField from './BaseField';

export default class EmailField extends BaseField {
    editorInputProps() {
        let props = super.editorInputProps();

        props.type = 'email';
        props.placeholder = 'you@example.com';

        return props;
    }

    answerContent() {
        const value = this.value();

        if (!value) {
            return null;
        }

        const email = value
            .split(/@|\./)
            .map(segment => {
                return segment.replace(/(.{2})./g, '$1*');
            })
            .join('*');

        return Button.component({
            onclick: () => this.mailTo(),
            className: 'Button Button--text',
            icon: 'far fa-envelope',
            children: email,
        });
    }

    mailTo() {
        window.location = 'mailto:' + this.value();
    }
}
