import ExtensionPage, { ExtensionPageAttrs } from 'flarum/admin/components/ExtensionPage';
import type { Vnode, VnodeDOM } from 'mithril';
import { DragDropManager } from '@dnd-kit/dom';
import { Sortable } from '@dnd-kit/dom/sortable';
export default class MasqueradePage extends ExtensionPage {
    protected dragDropManager: DragDropManager;
    protected sortableInstances: Map<string, Sortable<import("@dnd-kit/abstract").Data>>;
    oninit(vnode: Vnode): void;
    sections(vnode: VnodeDOM<ExtensionPageAttrs, this>): import("flarum/common/utils/ItemList").default<unknown>;
    fieldsSection(): JSX.Element;
    initSortableItem(vnode: VnodeDOM, id: string, index: number): void;
    updateSortableItem(id: string, index: number): void;
    removeSortableItem(id: string): void;
    updateSort(sorting: number[]): void;
}
