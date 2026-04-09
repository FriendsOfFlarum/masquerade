import Field from '../../lib/models/Field';

export default function sortFields(fields: Field[]) {
  return fields.sort((a, b) => a.sort() - b.sort());
}
