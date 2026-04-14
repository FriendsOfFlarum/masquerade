import app from 'flarum/forum/app';
import Component, { type ComponentAttrs } from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import Link from 'flarum/common/components/Link';
import User from 'flarum/common/models/User';
import Form from 'flarum/common/components/Form';
import Alert from 'flarum/common/components/Alert';
import Stream from 'flarum/common/utils/Stream';
import type { Vnode } from 'mithril';
import TypeFactory from '../types/TypeFactory';
import Field from '../../lib/models/Field';
import Answer from '../../lib/models/Answer';
import sortFields from '../../common/utils/sortFields';

export interface ProfileConfigurePaneAttrs extends ComponentAttrs {
  user: User;
}

export default class ProfileConfigurePane extends Component<ProfileConfigurePaneAttrs> {
  protected loading = false;
  protected enforceProfileCompletion = app.forum.attribute<boolean>('masquerade.force-profile-completion') || false;
  // Show disabled state if everything is saved
  // Unless the profile isn't complete, in which case show enabled button, so it's obvious you will need to save
  protected profileCompleted = app.forum.attribute<boolean>('masquerade.profile-completed') || false;
  protected profileNowCompleted = false;
  protected answerStreams = new Map<string, Stream<string>>();
  protected dirty = !this.profileCompleted;

  oninit(vnode: Vnode) {
    super.oninit(vnode);
    this.load();
  }

  view() {
    return (
      <form class="ProfileConfigurePane" onsubmit={this.update.bind(this)}>
        <Form>
          {this.enforceProfileCompletion && !this.profileCompleted && (
            <Alert type="error" dismissible={false}>
              {app.translator.trans('fof-masquerade.forum.alerts.profile-completion-required')}
            </Alert>
          )}

          {sortFields(app.store.all<Field>('masquerade-fields')).map((field) => {
            return this.field(field);
          })}

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
        </Form>
      </form>
    );
  }

  field(field: Field) {
    if (!this.answerStreams.has(field.id()!)) return null;

    const type = TypeFactory.typeForField({
      field,
      stream: this.answerStreams.get(field.id()!),
    });

    return type.editorField();
  }

  async load() {
    let answers = this.attrs.user.masqueradeAnswers();

    if (answers === false) {
      this.loading = true;
      await app.store.find<User>('users', this.attrs.user.id()!, { include: 'masqueradeAnswers' });
      answers = this.attrs.user.masqueradeAnswers() as Answer[];
    }

    app.store.all<Field>('masquerade-fields').forEach((field) => {
      const answer = answers.find((answer) => answer.field()?.id() === field.id());
      this.answerStreams.set(field.id()!, Stream(answer ? answer.content() : ''));
    });

    this.loading = false;
    m.redraw();
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
      .then((res: any) => {
        this.dirty = false;
        app.store.pushPayload(res);

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
