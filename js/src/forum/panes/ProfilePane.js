import app from 'flarum/forum/app';

import Component from 'flarum/common/Component';
import TypeFactory from './../types/TypeFactory';

export default class ProfilePane extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    this.loading = true;

    this.fields = [];
    this.answers = {};
    this.user = this.attrs.user;

    this.load(this.user);
  }

  view() {
    return (
      <div class="Masquerade-Bio">
        <div class="Fields">
          {this.fields
            .sort((a, b) => a.sort() - b.sort())
            .map((field) => {
              // UserID check must be done with == because userId() is number while id() is string
              this.answers[field.id()] = field.answer() && field.answer().userId() == this.user.id() ? field.answer().content() : null;

              return this.field(field);
            })}
        </div>
      </div>
    );
  }

  field(field) {
    const type = TypeFactory.typeForField({
      field,
      value: this.answers[field.id()],
    });

    return type.answerField();
  }

  load(user) {
    app
      .request({
        method: 'GET',
        url: app.forum.attribute('apiUrl') + '/masquerade/profile/' + user.id(),
      })
      .then(this.parseResponse.bind(this));
  }

  parseResponse(response) {
    this.answers = {};
    this.fields = app.store.pushPayload(response);

    this.loading = false;
    m.redraw();
  }
}
