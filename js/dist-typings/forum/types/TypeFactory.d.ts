export default class TypeFactory {
    static typeForField({ field, set, value }: {
        field: any;
        set?: undefined;
        value: any;
    }): BaseField;
    static fieldAttribute(field: any, attribute: any): any;
    static types(): {
        boolean: typeof BooleanField;
        email: typeof EmailField;
        select: typeof SelectField;
        url: typeof UrlField;
    };
    /**
     * Identifies how to parse the field answer.
     * @returns {null|string}
     */
    static identify(field: any): null | string;
}
import BaseField from "./BaseField";
import BooleanField from "./BooleanField";
import EmailField from "./EmailField";
import SelectField from "./SelectField";
import UrlField from "./UrlField";
