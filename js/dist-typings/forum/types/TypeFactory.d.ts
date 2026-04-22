import Stream from 'flarum/common/utils/Stream';
import Field from '../../lib/models/Field';
import BaseField from './BaseField';
export default class TypeFactory {
    static typeForField({ field, stream }: {
        field: Field;
        stream: Stream<string>;
    }): BaseField;
    static types(): Record<string, typeof BaseField>;
    /** Identifies how to parse the field answer. */
    static identify(field: Field): null | string;
}
