/// <reference types="flarum/@types/translator-icu-rich" />
export default class FieldEdit {
    view(vnode: any): JSX.Element;
    fieldItems(field: any, onUpdate: any): ItemList<any>;
    updateExistingFieldInput(what: any, field: any, value: any): void;
    deleteField(field: any, onUpdate: any): void;
    toggleField(e: any): void;
    submitAddField(field: any, onUpdate: any, e: any): void;
    updateExistingField(field: any, onUpdate: any): void;
    resetNewField(): void;
    newField: import("flarum/common/Model").default | undefined;
    readyToAdd(field: any): boolean;
    availableTypes(): {
        url: import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
        email: import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
        boolean: import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
        select: import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
        null: import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
    };
}
import ItemList from "flarum/common/utils/ItemList";
