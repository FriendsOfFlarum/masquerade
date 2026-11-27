import UserPage from 'flarum/forum/components/UserPage';
import type User from 'flarum/common/models/User';
import type Mithril from 'mithril';
export default class RootMasqueradePane extends UserPage {
    loading: boolean;
    oninit(vnode: Mithril.Vnode): void;
    pageContentComponent(): JSX.Element | null;
    show(user: User): void;
    content(): JSX.Element;
}
