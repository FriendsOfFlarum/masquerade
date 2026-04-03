import Component, { ComponentAttrs } from 'flarum/common/Component';
import { Vnode } from 'mithril';
export interface SelectFieldOptionEditorAttrs extends ComponentAttrs {
    value: string;
    onchange: (rules: string) => void;
}
export default class SelectFieldOptionEditor extends Component<SelectFieldOptionEditorAttrs> {
    protected newOption: string;
    oninit(vnode: Vnode<SelectFieldOptionEditorAttrs, this>): void;
    view(): JSX.Element;
    updateRules(options: string[]): void;
    options(): string[];
    updateOption(index: number, value: string): void;
    moveOption(index: number, moveIndex: number): void;
    deleteOption(index: number): void;
    addOption(): void;
}
