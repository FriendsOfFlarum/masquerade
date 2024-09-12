import Button from 'flarum/common/components/Button';
import FieldEdit from './FieldEdit';

export default class FieldList {
  view(vnode) {
    const { existing, new: newField, loading, onUpdate } = vnode.attrs;

    return m(
      'form.js-sortable-fields',
      existing.map((field) => {
        return m(FieldEdit, { field, loading, onUpdate });
      }),
      m(FieldEdit, { field: newField, loading, onUpdate })
    );
  }
}
