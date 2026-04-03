import Component from 'flarum/common/Component';
import type Field from '../../lib/models/Field';
import FieldEdit from './FieldEdit';

interface FieldListAttrs {
  existing: Field[];
  new: Field;
  loading: boolean;
  onUpdate: () => void;
}

export default class FieldList extends Component<FieldListAttrs> {
  view() {
    const { existing, new: newField, loading, onUpdate } = this.attrs;

    return (
      <form className="form js-sortable-fields">
        {existing.map((field) => (
          <FieldEdit field={field} loading={loading} onUpdate={onUpdate} />
        ))}
        <FieldEdit field={newField} loading={loading} onUpdate={onUpdate} />
      </form>
    );
  }
}
