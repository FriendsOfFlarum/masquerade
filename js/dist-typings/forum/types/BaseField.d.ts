export default class BaseField {
    static isNoOptionSelectedValue(value: any): boolean;
    constructor({ field, set, value }: {
        field: any;
        set: any;
        value: any;
    });
    field: any;
    set: any;
    value: any;
    readAttribute(object: any, attribute: any): any;
    /**
     * Gets all Laravel validation rules split by rule
     * @returns {Array}
     */
    validationRules(): any[];
    /**
     * Gets a Laravel validation rule by name
     * @param {string} ruleName
     * @returns {string|null}
     */
    validationRule(ruleName: string): string | null;
    editorField(): JSX.Element;
    editorInput(): JSX.Element;
    editorInputAttrs(): {
        className: string;
        oninput: (event: any) => void;
        value: any;
        required: any;
    };
    answerField(): JSX.Element;
    answerContent(): any;
    hasAnswer(): boolean;
}
