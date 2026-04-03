import ItemList from 'flarum/common/utils/ItemList';
import Component, { type ComponentAttrs } from 'flarum/common/Component';
import type { Vnode } from 'mithril';
import Field from '../../lib/models/Field';
export interface FieldEditAttrs extends ComponentAttrs {
    field: Field;
    loading: boolean;
    onUpdate: () => void;
}
export default class FieldEdit extends Component<FieldEditAttrs> {
    active: boolean;
    newField: Field;
    loading: boolean;
    view(vnode: Vnode<FieldEditAttrs, this>): JSX.Element;
    fieldItems(field: Field, onUpdate: FieldEditAttrs['onUpdate']): ItemList<unknown>;
    updateExistingFieldInput(what: keyof Field, field: Field, value: any): void;
    deleteField(field: Field, onUpdate: FieldEditAttrs['onUpdate']): void;
    toggleField(): void;
    submitAddField(field: Field, onUpdate: FieldEditAttrs['onUpdate'], e: MouseEvent): void;
    updateExistingField(field: Field, onUpdate: FieldEditAttrs['onUpdate']): void;
    resetNewField(): void;
    readyToAdd(field: Field): boolean;
    availableTypes(): {
        url: import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
        email: import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
        boolean: import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
        select: import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
        null: import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
    };
}
