import Component, { type ComponentAttrs } from 'flarum/common/Component';
import User from 'flarum/common/models/User';
import type { Vnode } from 'mithril';
import Field from '../../lib/models/Field';
import Answer from '../../lib/models/Answer';
export interface ProfileConfigurePaneAttrs extends ComponentAttrs {
    user: User;
}
export default class ProfileConfigurePane extends Component<ProfileConfigurePaneAttrs> {
    protected loading: boolean;
    protected enforceProfileCompletion: boolean;
    protected profileCompleted: boolean;
    protected profileNowCompleted: boolean;
    protected answers: Answer[];
    protected answerValues: Record<string, string>;
    protected dirty: boolean;
    oninit(vnode: Vnode): void;
    view(): JSX.Element;
    field(field: Field): JSX.Element;
    load(): Promise<void>;
    set(field: Field, value: string): void;
    update(e: SubmitEvent): void;
}
