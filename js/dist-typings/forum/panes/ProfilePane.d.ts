import type User from 'flarum/common/models/User';
import type Mithril from 'mithril';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import type Answer from '../../lib/models/Answer';
import type Field from '../../lib/models/Field';
export interface ProfilePaneAttrs extends ComponentAttrs {
    answers: Answer[];
    user: User;
}
export default class ProfilePane extends Component<ProfilePaneAttrs> {
    protected answers: Answer[];
    oninit(vnode: Mithril.Vnode): void;
    view(): JSX.Element;
    field(field: Field, content: string | null): JSX.Element | null;
    load(): Promise<void>;
}
