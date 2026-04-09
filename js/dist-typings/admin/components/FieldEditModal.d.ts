import FormModal, { type IFormModalAttrs } from 'flarum/common/components/FormModal';
import Stream from 'flarum/common/utils/Stream';
import { type Vnode } from 'mithril';
import Field from '../../lib/models/Field';
import ItemList from 'flarum/common/utils/ItemList';
interface FieldEditModalAttrs extends IFormModalAttrs {
    model?: Field;
}
export default class FieldEditModal extends FormModal<FieldEditModalAttrs> {
    field: Field;
    name: Stream<string>;
    description: Stream<string>;
    icon: Stream<string>;
    required: Stream<boolean>;
    on_bio: Stream<boolean>;
    type: Stream<string | null>;
    validation: Stream<string>;
    oninit(vnode: Vnode<FieldEditModalAttrs, this>): void;
    className(): string;
    title(): string | any[] | JSX.Element;
    content(): JSX.Element;
    fieldItems(): ItemList<unknown>;
    availableTypes(): {
        url: string | any[];
        email: string | any[];
        boolean: string | any[];
        select: string | any[];
        null: string | any[];
    };
    submitData(): {
        name: any;
        description: any;
        icon: any;
        required: any;
        on_bio: any;
        type: any;
        validation: any;
    };
    onsubmit(e: SubmitEvent): void;
    delete(): void;
}
export {};
