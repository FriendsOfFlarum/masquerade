import 'flarum/common/models/User';
import type Answer from '../lib/models/Answer';

declare module 'flarum/common/models/User' {
  export default interface User {
    bioFields(): Answer[];
    masqueradeAnswers(): Answer[];
    canEditMasqueradeProfile(): boolean;
  }
}
