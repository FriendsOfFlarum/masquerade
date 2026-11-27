import Component, { type ComponentAttrs } from 'flarum/common/Component';
import type Sortable from 'sortablejs';
import Field from '../../lib/models/Field';
export interface FieldListAttrs extends ComponentAttrs {
    fields: Field[];
    trashed?: boolean;
    ondelete?: () => Promise<unknown>;
}
export default class FieldList extends Component<FieldListAttrs> {
    protected sortable?: Sortable;
    protected loading: Set<string>;
    view(): JSX.Element;
    restore(field: Field): Promise<void>;
    deletePermanently(field: Field): Promise<void> | undefined;
    protected performAction(field: Field, action: () => Promise<unknown>): Promise<void>;
    createSortable(element: HTMLElement): Promise<void>;
    updateSort(sorting: number[]): Promise<unknown>;
}
