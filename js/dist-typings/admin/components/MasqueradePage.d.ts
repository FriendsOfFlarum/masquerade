import Stream from 'flarum/common/utils/Stream';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import type { Vnode } from 'mithril';
import Field from '../../lib/models/Field';
export default class MasqueradePage extends ExtensionPage {
    loading: Stream<boolean>;
    existing: Field[];
    enforceProfileCompletion: Stream<boolean>;
    newField: Field;
    oninit(vnode: Vnode): void;
    config(): void;
    oncreate(vnode: Vnode): void;
    onupdate(): void;
    content(): JSX.Element;
    updateSort(sorting: number[]): void;
    requestSuccess(): void;
    loadExisting(): Promise<void>;
    resetNew(): void;
}
