import app from 'flarum/admin/app';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import Icon from 'flarum/common/components/Icon';
import Stream from 'flarum/common/utils/Stream';
import type { Vnode, VnodeDOM } from 'mithril';
import type Sortable from 'sortablejs';
import FormGroup from 'flarum/common/components/FormGroup';

export interface SelectFieldOptionEditorAttrs extends ComponentAttrs {
  value: string;
  onchange: (rules: string) => void;
}

export default class SelectFieldOptionEditor extends Component<SelectFieldOptionEditorAttrs> {
  protected newOption: Stream<string> = Stream('');
  protected items: {
    id: string;
    value: string;
  }[] = [];
  protected sortable?: Sortable;

  oninit(vnode: Vnode<SelectFieldOptionEditorAttrs, this>) {
    super.oninit(vnode);

    this.items = this.parseOptions().map((value) => ({
      // Generate stable IDs to ensure drag-and-drop sorting works correctly.
      id: crypto.randomUUID(),
      value,
    }));
  }

  view() {
    return (
      <div className="Form-group">
        <label>{app.translator.trans('fof-masquerade.admin.fields.options')}</label>

        <div
          className="MasqueradeSelectOptionsList"
          oncreate={(vnode: VnodeDOM) => this.createSortable(vnode.dom as HTMLElement)}
          onremove={() => this.sortable?.destroy()}
        >
          {this.items.map((item, index) => (
            <div key={item.id} data-id={item.id} className="MasqueradeSelectOptionItem">
              <Icon name="fas fa-grip-vertical" className="MasqueradeSelectOptionItem-handle" />
              <input
                type="text"
                className="FormControl"
                value={item.value}
                oninput={(event: InputEvent) => this.updateOption(index, (event.currentTarget as HTMLInputElement).value)}
              />
              <Button className="Button Button--danger Button--icon" icon="fas fa-times" onclick={() => this.deleteOption(index)} />
            </div>
          ))}
        </div>

        <div className="helpText">{app.translator.trans('fof-masquerade.admin.fields.option-comma-warning')}</div>

        <div className="MasqueradeSelectOptionNewItem">
          <FormGroup
            placeholder={app.translator.trans('fof-masquerade.admin.fields.option-new')}
            stream={this.newOption}
            onkeydown={(event: KeyboardEvent) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                this.addOption();
              }
            }}
          />
          <Button className="Button Button--icon" icon="fas fa-plus" onclick={() => this.addOption()} />
        </div>
      </div>
    );
  }

  async createSortable(element: HTMLElement) {
    const { default: sortableModule }: { default: typeof Sortable } = await import('flarum/admin/utils/loadSortable');
    if (!element.isConnected) return;

    this.sortable = sortableModule.create(element, {
      animation: 150,
      draggable: '.MasqueradeSelectOptionItem',
      handle: '.MasqueradeSelectOptionItem-handle',
      onEnd: ({ oldIndex, newIndex }) => {
        if (oldIndex == null || newIndex == null || oldIndex === newIndex) return;

        // Restore the DOM order so Mithril can reconcile the keyed items.
        this.sortable!.sort(this.items.map((item) => item.id));

        const [movedItem] = this.items.splice(oldIndex, 1);
        this.items.splice(newIndex, 0, movedItem);

        this.updateRules();
        m.redraw();
      },
    });
  }

  updateRules() {
    const options = this.items.map((item) => item.value);
    // We ignore other existing rules, they would probably be leftovers from another field type when changing types
    this.attrs.onchange('in:' + options.join(','));
  }

  parseOptions(): string[] {
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
    this.items[index].value = value;
    this.updateRules();
  }

  deleteOption(index: number) {
    this.items.splice(index, 1);
    this.updateRules();
  }

  addOption() {
    if (this.newOption() === '') {
      return;
    }

    this.items.push({
      id: crypto.randomUUID(),
      value: this.newOption(),
    });

    this.newOption('');
    this.updateRules();
  }
}
