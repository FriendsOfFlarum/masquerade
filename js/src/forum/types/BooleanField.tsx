import app from 'flarum/forum/app';
import Icon from 'flarum/common/components/Icon';
import BaseField from './BaseField';

export default class BooleanField extends BaseField {
  editorInputAttrs() {
    return { ...super.editorInputAttrs(), type: 'radio', name: crypto.randomUUID(), options: this.getRadioOptions() };
  }

  getRadioOptions() {
    const options: { value: string; label: string }[] = [];
    if (!this.readAttribute(this.field, 'required')) {
      options.push({
        value: '',
        label: app.translator.trans('fof-masquerade.forum.fields.select.none-optional') as string,
      });
    }

    options.push({
      value: 'true',
      label: app.translator.trans('fof-masquerade.forum.fields.boolean.yes') as string,
    });

    options.push({
      value: 'false',
      label: app.translator.trans('fof-masquerade.forum.fields.boolean.no') as string,
    });

    return options;
  }

  answerContent() {
    const value = this.stream();

    if (!value) {
      return null;
    }

    const isYes = ['1', 'true', 'yes'].includes(value);

    return (
      <>
        <Icon name={isYes ? 'far fa-check-square' : 'far fa-square'} />{' '}
        {app.translator.trans(`fof-masquerade.forum.fields.boolean.${isYes ? 'yes' : 'no'}`)}
      </>
    );
  }
}
