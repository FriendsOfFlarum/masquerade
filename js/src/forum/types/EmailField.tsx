import Button from 'flarum/common/components/Button';
import BaseField from './BaseField';

export default class EmailField extends BaseField {
  editorInputAttrs() {
    return { ...super.editorInputAttrs(), type: 'email', placeholder: 'you@example.com' };
  }

  answerContent() {
    const value = this.stream();
    if (!value) {
      return null;
    }

    const email = value
      .split(/[@.]/)
      .map((segment: string) => {
        return segment.replace(/(.{2})./g, '$1*');
      })
      .join('*');

    return Button.component(
      {
        onclick: () => this.mailTo(),
        className: 'Button Button--text',
        icon: 'far fa-envelope',
      },
      email
    );
  }

  mailTo() {
    // @ts-ignore
    window.location = 'mailto:' + this.stream();
  }
}
