export default class MasqueradePage extends ExtensionPage<import("flarum/admin/components/ExtensionPage").ExtensionPageAttrs> {
    constructor();
    oninit(vnode: any): void;
    existing: any[] | import("flarum/common/Model").default[] | undefined;
    enforceProfileCompletion: string | boolean | undefined;
    config(): void;
    oncreate(vnode: any): void;
    onupdate(): void;
    content(): any;
    updateSort(sorting: any): void;
    requestSuccess(): void;
    loadExisting(): Promise<void>;
    resetNew(): void;
    newField: import("flarum/common/Model").default | undefined;
}
import ExtensionPage from "flarum/admin/components/ExtensionPage";
