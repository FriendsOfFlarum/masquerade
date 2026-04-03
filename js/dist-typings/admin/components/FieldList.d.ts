import Component from 'flarum/common/Component';
import type Field from '../../lib/models/Field';
interface FieldListAttrs {
    existing: Field[];
    new: Field;
    loading: boolean;
    onUpdate: () => void;
}
export default class FieldList extends Component<FieldListAttrs> {
    view(): JSX.Element;
}
export {};
