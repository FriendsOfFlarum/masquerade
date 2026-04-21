import Icon from 'flarum/common/components/Icon';
import FormGroup from 'flarum/common/components/FormGroup';
import Stream from 'flarum/common/utils/Stream';
import Field from '../../lib/models/Field';

interface BaseFieldAttrs {
  field: Field;
  stream: Stream<string>;
}

export default class BaseField {
  protected readonly field: BaseFieldAttrs['field'];
  protected readonly stream: BaseFieldAttrs['stream'];

  constructor({ field, stream }: BaseFieldAttrs) {
    this.field = field;
    this.stream = stream;
  }

  readAttribute<T extends object, K extends keyof T>(object: T, attribute: K) {
    if (typeof object[attribute] === 'function') {
      return object[attribute]();
    }

    return object[attribute];
  }

  /** Gets all Laravel validation rules split by rule. */
  validationRules(): string[] {
    return this.readAttribute(this.field, 'validation').split('|');
  }

  /** Gets a Laravel validation rule by name. */
  validationRule(ruleName: string): string | null {
    let ruleContent = null;

    this.validationRules().forEach((rule) => {
      const split = rule.split(':', 2);

      if (split[0] === ruleName) {
        ruleContent = split[1];
      }
    });

    return ruleContent;
  }

  editorField() {
    return <FormGroup stream={this.stream} {...this.editorInputAttrs()} />;
  }

  editorInputAttrs(): FormGroup['attrs'] {
    return {
      type: 'text',
      label: this.fieldLabel(true),
      help: this.field.description(),
      required: this.field.required(),
    };
  }

  fieldLabel(isEditor: boolean) {
    return (
      <>
        {this.field.icon() && (
          <>
            <Icon name={this.field.icon()} />{' '}
          </>
        )}
        {this.field.name()}
        {isEditor && this.field.required() ? '*' : null}
      </>
    );
  }

  answerField() {
    const iconName = this.readAttribute(this.field, 'icon');

    return (
      <div className={`Masquerade-Bio-Set${this.hasAnswer() ? '' : ' Masquerade-Bio-Set--empty'}`}>
        <span class="Masquerade-Bio-Field">
          {iconName && (
            <>
              {Icon.component({
                name: iconName,
              })}{' '}
            </>
          )}
          {this.readAttribute(this.field, 'name')}:{' '}
        </span>
        <span class="Masquerade-Bio-Answer">{this.answerContent()}</span>
      </div>
    );
  }

  answerContent() {
    return this.stream();
  }

  hasAnswer() {
    const answerContent = this.answerContent();

    if (answerContent === null) {
      return false;
    }

    if (typeof answerContent === 'object') {
      return !!Object.keys(answerContent).length;
    }

    return !!answerContent?.length;
  }

  static isNoOptionSelectedValue(value: string | null) {
    // The value can be null when coming from the API
    // The value can be '' when the field does not exist on the user (the empty string is set in ProfileConfigurePane)
    return value === null || value === '';
  }
}
