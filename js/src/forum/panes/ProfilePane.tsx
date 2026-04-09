import app from 'flarum/forum/app';
import type User from 'flarum/common/models/User';
import type Mithril from 'mithril';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import TypeFactory from '../types/TypeFactory';
import type Answer from '../../lib/models/Answer';
import type Field from '../../lib/models/Field';
import sortFields from '../../common/utils/sortFields';

export interface ProfilePaneAttrs extends ComponentAttrs {
  answers: Answer[];
  user: User;
  loading: boolean;
}

export default class ProfilePane extends Component<ProfilePaneAttrs> {
  protected answers: Answer[] = [];
  loading: boolean = false;

  oninit(vnode: Mithril.Vnode) {
    super.oninit(vnode);
    this.loading = true;
    this.load();
  }

  view() {
    return (
      <div class="Masquerade-Bio">
        <div class="Fields">
          {sortFields(app.store.all<Field>('masquerade-fields')).map((field) => {
            const answer = this.answers.find((a) => a.field()?.id() === field.id());

            return this.field(field, answer?.content() || null);
          })}
        </div>
      </div>
    );
  }

  field(field: Field, content: string | null) {
    const type = TypeFactory.typeForField({
      field,
      value: content,
    });

    return type.answerField();
  }

  async load() {
    const userId = this.attrs.user.id();
    if (!userId) return;

    const answers = this.attrs.user.masqueradeAnswers();
    if (answers) {
      this.answers = answers;
      return;
    }

    this.answers = [];
    app.store.find<User>('users', userId, { include: 'masqueradeAnswers' }).then(() => {
      this.answers = this.attrs.user.masqueradeAnswers() || [];
      m.redraw();
    });
  }
}
