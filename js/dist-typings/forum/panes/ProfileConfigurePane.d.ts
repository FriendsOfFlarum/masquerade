import Component, { type ComponentAttrs } from 'flarum/common/Component';
import User from 'flarum/common/models/User';
import type { Vnode } from 'mithril';
import Field from '../../lib/models/Field';
export interface ProfileConfigurePaneAttrs extends ComponentAttrs {
    user: User;
}
export default class ProfileConfigurePane extends Component<ProfileConfigurePaneAttrs> {
    protected loading: boolean;
    protected enforceProfileCompletion: boolean;
    protected profileCompleted: boolean;
    protected profileNowCompleted: boolean;
    protected answerStreams: Map<string, Stream<string>>;
    oninit(vnode: Vnode): void;
    view(): JSX.Element;
    field(field: Field): JSX.Element | null;
    isChanged(): boolean;
    load(): Promise<void>;
    update(e: SubmitEvent): void;
}
