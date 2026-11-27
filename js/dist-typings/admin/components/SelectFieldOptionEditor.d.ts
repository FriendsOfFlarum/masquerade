import Component, { ComponentAttrs } from 'flarum/common/Component';
import Stream from 'flarum/common/utils/Stream';
import type { Vnode } from 'mithril';
import type Sortable from 'sortablejs';
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
    protected sortable?: Sortable;
    oninit(vnode: Vnode<SelectFieldOptionEditorAttrs, this>): void;
    view(): JSX.Element;
    createSortable(element: HTMLElement): Promise<void>;
    updateRules(): void;
    parseOptions(): string[];
    updateOption(index: number, value: string): void;
    deleteOption(index: number): void;
    canAddOption(): boolean;
    addOption(): void;
}
