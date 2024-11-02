import type { Vnode } from 'mithril';
import type Field from '../../lib/models/Field';
interface FieldListAttrs {
    existing: Field[];
    new: Field;
    loading: boolean;
    onUpdate: () => void;
}
export default class FieldList {
    view(vnode: Vnode<FieldListAttrs>): any;
}
export {};
