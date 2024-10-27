import FieldEdit from './FieldEdit';

import type { Vnode } from 'mithril';
import type Field from '../../lib/models/Field';

interface FieldListAttrs {
  existing: Field[];
  new: Field;
  loading: boolean;
  onUpdate: () => void;
}

export default class FieldList {
  view(vnode: Vnode<FieldListAttrs>) {
    const { existing, new: newField, loading, onUpdate } = vnode.attrs;

    return m(
      'form.js-sortable-fields',
      existing.map((field: Field) => {
        return m(FieldEdit, { field, loading, onUpdate });
      }),
      m(FieldEdit, { field: newField, loading, onUpdate })
    );
  }
}
