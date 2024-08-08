import type Field from '../lib/models/Field';
import type Answer from '../lib/models/Answer';

declare module 'flarum/common/models/User' {
  export default interface User {
    bioFields(): Field[];
    masqueradeAnswers(): Answer[];
    canEditMasqueradeProfile(): boolean;
  }
}
