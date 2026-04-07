import app from 'flarum/forum/app';
import Component, { type ComponentAttrs } from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import Link from 'flarum/common/components/Link';
import User from 'flarum/common/models/User';
import type { Vnode } from 'mithril';
import TypeFactory from '../types/TypeFactory';
import Field from '../../lib/models/Field';
import Answer from '../../lib/models/Answer';

export interface ProfileConfigurePaneAttrs extends ComponentAttrs {
  user: User;
}

export default class ProfileConfigurePane extends Component<ProfileConfigurePaneAttrs> {
  protected loading = false;
  protected enforceProfileCompletion = app.forum.attribute<boolean>('masquerade.force-profile-completion') || false;
  // Show disabled state if everything is saved
  // Unless the profile isn't complete, in which case show enabled button, so it's obvious you will need to save
  protected profileCompleted = app.forum.attribute<boolean>('masquerade.profile-completed') || false;
  protected profileNowCompleted = false; // Show "after required" text
  protected answers: Answer[] = [];
  protected answerValues: Record<string, string> = {};
  protected dirty = !this.profileCompleted;

  oninit(vnode: Vnode) {
    super.oninit(vnode);
    this.loading = true;
    this.load();
  }

  view() {
    return (
      <form class="ProfileConfigurePane" onsubmit={this.update.bind(this)}>
        {this.enforceProfileCompletion && !this.profileCompleted && (
          <div class="Alert Alert--Error">{app.translator.trans('fof-masquerade.forum.alerts.profile-completion-required')}</div>
        )}

        <div class="Fields">
          {app.store
            .all<Field>('masquerade-fields')
            .sort((a, b) => a.sort() - b.sort())
            .map((field) => {
              return this.field(field);
            })}
        </div>

        <Button type="submit" className="Button Button--primary" loading={this.loading} disabled={!this.dirty}>
          {app.translator.trans('fof-masquerade.forum.buttons.save-profile')}
        </Button>

        {this.profileNowCompleted && (
          <span class="Masquerade-NowCompleted">
            {app.translator.trans('fof-masquerade.forum.alerts.profile-completed', {
              a: <Link href={app.route('index')} />,
            })}
          </span>
        )}
      </form>
    );
  }

  field(field: Field) {
    const type = TypeFactory.typeForField({
      field,
      // @ts-ignore
      set: this.set.bind(this, field),
      value: this.answerValues[field.id()!],
    });

    return type.editorField();
  }

  async load() {
    const answers = this.attrs.user.masqueradeAnswers();

    if (answers === false) {
      this.answers = [];
      await app.store.find<User>('users', this.attrs.user.id()!, { include: 'masqueradeAnswers' });
      this.answers = this.attrs.user.masqueradeAnswers() as Answer[];
      this.answerValues = {};
    } else {
      this.answers = answers;
    }

    app.store.all<Field>('masquerade-fields').forEach((field) => {
      const answer = this.answers.find((answer) => answer.field()?.id() === field.id());

      this.answerValues[field.id()!] = answer ? answer.content() : '';
    });

    this.loading = false;
    m.redraw();
  }

  set(field: Field, value: string) {
    this.answerValues[field.id()!] = value;
    this.dirty = true;
  }

  update(e: SubmitEvent) {
    e.preventDefault();
    this.loading = true;

    app
      .request({
        method: 'POST',
        url: app.forum.attribute('apiUrl') + '/masquerade-answers/configure/' + this.attrs.user.id(),
        body: this.answerValues,
      })
      .then(() => {
        this.dirty = false;

        if (!this.profileCompleted) {
          this.profileCompleted = true;
          this.profileNowCompleted = true;
        }
      })
      .finally(() => {
        this.loading = false;
        m.redraw();
      });
  }
}
