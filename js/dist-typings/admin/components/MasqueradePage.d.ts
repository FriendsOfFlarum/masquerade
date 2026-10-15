import ExtensionPage, { ExtensionPageAttrs } from 'flarum/admin/components/ExtensionPage';
import type { Vnode, VnodeDOM } from 'mithril';
import type Sortable from 'sortablejs';
export default class MasqueradePage extends ExtensionPage {
    protected sortable?: Sortable;
    oninit(vnode: Vnode): void;
    sections(vnode: VnodeDOM<ExtensionPageAttrs, this>): import("flarum/common/utils/ItemList").default<unknown>;
    fieldsSection(): JSX.Element;
    createSortable(element: HTMLElement): Promise<void>;
    updateSort(sorting: number[]): void;
}
