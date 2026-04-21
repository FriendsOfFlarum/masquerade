import BaseField from './BaseField';
import LinkButton from 'flarum/common/components/LinkButton';

export default class EmailField extends BaseField {
  editorInputAttrs() {
    return { ...super.editorInputAttrs(), type: 'email', placeholder: 'you@example.com' };
  }

  answerContent() {
    const value = this.stream();
    if (!value) {
      return null;
    }

    return (
      <LinkButton className="Button Button--text" icon="far fa-envelope" href={`mailto:${value}`} external={true}>
        {value}
      </LinkButton>
    );
  }
}
