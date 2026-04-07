export default class BooleanField extends BaseField {
    editorInput(): any[];
    options(): ({
        selected: {};
        key: null;
        label: string | any[];
    } | {
        selected: {};
        key: string;
        label: string | any[];
    } | {
        selected: () => boolean;
        key: any;
        label: string;
    })[];
    answerContent(): "" | any[];
}
import BaseField from './BaseField';
