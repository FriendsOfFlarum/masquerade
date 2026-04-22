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
    constructor({ field, stream }: BaseFieldAttrs);
    /** Gets all Laravel validation rules split by rule. */
    validationRules(): string[];
    /** Gets a Laravel validation rule by name. */
    validationRule(ruleName: string): string | null;
    editorField(): JSX.Element;
    editorInputAttrs(): FormGroup['attrs'];
    fieldLabel(isEditor: boolean): JSX.Element;
    answerField(): JSX.Element | null;
    answerContent(): any;
    hasAnswer(): boolean;
    static isNoOptionSelectedValue(value: string | null): value is "" | null;
}
export {};
