import Component, { ComponentAttrs } from 'flarum/common/Component';
import Stream from 'flarum/common/utils/Stream';
import type { Vnode, VnodeDOM } from 'mithril';
import { DragDropManager } from '@dnd-kit/dom';
import { Sortable } from '@dnd-kit/dom/sortable';
export interface SelectFieldOptionEditorAttrs extends ComponentAttrs {
    value: string;
    onchange: (rules: string) => void;
}
export default class SelectFieldOptionEditor extends Component<SelectFieldOptionEditorAttrs> {
    protected newOption: Stream<string>;
    protected items: {
        id: string;
        value: string;
    }[];
    protected dragDropManager: DragDropManager;
    protected sortableInstances: Map<string, Sortable<import("@dnd-kit/abstract").Data>>;
    oninit(vnode: Vnode<SelectFieldOptionEditorAttrs, this>): void;
    view(): JSX.Element;
    initSortableItem(vnode: VnodeDOM<SelectFieldOptionEditorAttrs, this>, id: string, index: number): void;
    updateSortableItem(id: string, index: number): void;
    removeSortableItem(id: string): void;
    updateRules(): void;
    parseOptions(): string[];
    updateOption(index: number, value: string): void;
    deleteOption(index: number): void;
    addOption(): void;
}
