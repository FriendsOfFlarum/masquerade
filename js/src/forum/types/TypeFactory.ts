import Stream from 'flarum/common/utils/Stream';
import Field from '../../lib/models/Field';
import BaseField from './BaseField';
import BooleanField from './BooleanField';
import EmailField from './EmailField';
import SelectField from './SelectField';
import UrlField from './UrlField';

export default class TypeFactory {
  static typeForField({ field, stream }: { field: Field; stream: Stream<string> }) {
    let className = BaseField;

    const type = this.identify(field);

    if (type) {
      className = this.types()[type];
    }

    return new className({
      field,
      stream,
    });
  }

  static types(): Record<string, typeof BaseField> {
    return {
      boolean: BooleanField,
      email: EmailField,
      select: SelectField,
      url: UrlField,
    };
  }

  /** Identifies how to parse the field answer. */
  static identify(field: Field): null | string {
    const validation = (field.validation() || '').split(',');
    let identified = null;

    // If the field has a type, we use it
    const fieldType = field.type() ?? '';
    if (typeof this.types()[fieldType] !== 'undefined') {
      return fieldType;
    }

    // If it's an advanced field with no type, we then guess the best type
    validation.forEach((rule: string) => {
      rule = rule.trim();

      if (typeof this.types()[rule] !== 'undefined') {
        identified = rule;
      }
    });

    return identified;
  }
}
