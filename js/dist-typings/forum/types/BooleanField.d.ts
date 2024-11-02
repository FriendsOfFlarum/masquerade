export default class BooleanField extends BaseField {
    editorInput(): any[];
    options(): ({
        selected: {};
        key: null;
        label: any;
    } | {
        selected: {};
        key: string;
        label: any;
    } | {
        selected: () => boolean;
        key: any;
        label: string;
    })[];
    answerContent(): any[] | "";
}
import BaseField from "./BaseField";
