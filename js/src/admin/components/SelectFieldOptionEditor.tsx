import app from 'flarum/admin/app';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import { Vnode } from 'mithril';

export interface SelectFieldOptionEditorAttrs extends ComponentAttrs {
  value: string;
  onchange: (rules: string) => void;
}

export default class SelectFieldOptionEditor extends Component<SelectFieldOptionEditorAttrs> {
  protected newOption: string = '';

  oninit(vnode: Vnode<SelectFieldOptionEditorAttrs, this>) {
    super.oninit(vnode);
  }

  view() {
    return (
      <div className="Form-group">
        <label>{app.translator.trans('fof-masquerade.admin.fields.options')}</label>
        <table>
          <tbody>
            {this.options().map((option, optionIndex) => (
              <tr>
                <td>
                  <input
                    type="text"
                    className="FormControl"
                    value={option}
                    oninput={(event: InputEvent) => this.updateOption(optionIndex, (event.currentTarget as HTMLInputElement).value)}
                  />
                </td>
                <td>
                  <Button
                    className="Button Button--icon"
                    icon="fas fa-chevron-up"
                    onclick={() => {
                      this.moveOption(optionIndex, -1);
                    }}
                  />
                </td>
                <td>
                  <Button
                    className="Button Button--icon"
                    icon="fas fa-chevron-down"
                    onclick={() => {
                      this.moveOption(optionIndex, 1);
                    }}
                  />
                </td>
                <td>
                  <Button
                    className="Button Button--danger Button--icon"
                    icon="fas fa-times"
                    onclick={() => {
                      this.deleteOption(optionIndex);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="helpText">{app.translator.trans('fof-masquerade.admin.fields.option-comma-warning')}</div>
        <table>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  className="FormControl"
                  placeholder={app.translator.trans('fof-masquerade.admin.fields.option-new')}
                  value={this.newOption}
                  onchange={(event: InputEvent) => {
                    this.newOption = (event.target as HTMLInputElement).value;
                  }}
                />
              </td>
              <td>
                <Button className="Button Button--primary Button--icon" icon="fas fa-plus" onclick={() => this.addOption()} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  updateRules(options: string[]) {
    // We ignore other existing rules, they would probably be leftovers from another field type when changing types
    this.attrs.onchange('in:' + options.join(','));
  }

  options() {
    const rules = this.attrs.value.split('|');

    let options: string[] = [];

    rules.forEach((rule) => {
      const parts = rule.split(':', 2);

      if (parts[0] === 'in') {
        options = parts[1].split(',');
      }
    });

    return options;
  }

  updateOption(index: number, value: string) {
    let options = this.options();

    options[index] = value;

    this.updateRules(options);
  }

  moveOption(index: number, moveIndex: number) {
    let options = this.options();

    const newIndex = index + moveIndex;

    if (newIndex < 0 || newIndex > options.length - 1) {
      return;
    }

    const move = options.splice(index, 1);

    options.splice(newIndex, 0, move[0]);

    this.updateRules(options);
  }

  deleteOption(index: number) {
    let options = this.options();

    options.splice(index, 1);

    this.updateRules(options);
  }

  addOption() {
    if (this.newOption === '') {
      return;
    }

    let options = this.options();

    options.push(this.newOption);

    this.newOption = '';

    this.updateRules(options);
  }
}
