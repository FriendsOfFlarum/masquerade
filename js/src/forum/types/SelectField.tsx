import app from 'flarum/forum/app';
import BaseField from './BaseField';
import extractText from 'flarum/common/utils/extractText';

export default class SelectField extends BaseField {
  editorInputAttrs() {
    return { ...super.editorInputAttrs(), type: 'select', options: this.options(), default: '' };
  }

  options() {
    const options: Record<string, string> = {};
    const currentValue = this.stream();

    if (!this.readAttribute(this.field, 'required')) {
      options[''] = extractText(app.translator.trans('fof-masquerade.forum.fields.select.none-optional'));
    } else if (BaseField.isNoOptionSelectedValue(currentValue)) {
      options[''] = extractText(app.translator.trans('fof-masquerade.forum.fields.select.none-required'));
    }

    const validationIn = this.validationRule('in');

    if (validationIn) {
      validationIn.split(',').forEach((value) => {
        options[value] = value;
      });
    }

    if (!BaseField.isNoOptionSelectedValue(currentValue) && typeof options[currentValue] === 'undefined') {
      options[currentValue] = '(invalid) ' + currentValue;
    }

    return options;
  }
}
