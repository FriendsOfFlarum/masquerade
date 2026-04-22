import app from 'flarum/forum/app';
import Icon from 'flarum/common/components/Icon';
import extractText from 'flarum/common/utils/extractText';
import BaseField from './BaseField';

export default class BooleanField extends BaseField {
  editorInputAttrs() {
    return { ...super.editorInputAttrs(), type: 'radio', options: this.getRadioOptions() };
  }

  getRadioOptions() {
    const options: { value: string; label: string }[] = [];
    if (!this.field.required()) {
      options.push({
        value: '',
        label: extractText(app.translator.trans('fof-masquerade.forum.fields.select.none-optional')),
      });
    }

    options.push({
      value: 'true',
      label: extractText(app.translator.trans('fof-masquerade.forum.fields.boolean.yes')),
    });

    options.push({
      value: 'false',
      label: extractText(app.translator.trans('fof-masquerade.forum.fields.boolean.no')),
    });

    return options;
  }

  answerContent() {
    const value = this.stream();
    if (!value) {
      return null;
    }

    const isYes = value === 'true';

    return (
      <>
        <Icon name={isYes ? 'far fa-check-square' : 'far fa-square'} />{' '}
        {app.translator.trans(`fof-masquerade.forum.fields.boolean.${isYes ? 'yes' : 'no'}`)}
      </>
    );
  }
}
