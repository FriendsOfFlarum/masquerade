import BaseField from './BaseField';
import LinkButton from 'flarum/common/components/LinkButton';

export default class UrlField extends BaseField {
  editorInputAttrs() {
    return { ...super.editorInputAttrs(), type: 'url', placeholder: 'https://example.com' };
  }

  answerContent() {
    const value = this.stream();
    if (!value) {
      return null;
    }

    return (
      <LinkButton className="Button Button--text" icon="fas fa-link" href={this.stream()} target="_blank" rel="noopener noreferrer nofollow ugc">
        {this.stream().replace(/^https?:\/\//, '')}
      </LinkButton>
    );
  }
}
