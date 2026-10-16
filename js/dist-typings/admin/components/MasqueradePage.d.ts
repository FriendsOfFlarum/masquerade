import ExtensionPage, { ExtensionPageAttrs } from 'flarum/admin/components/ExtensionPage';
import type { Vnode, VnodeDOM } from 'mithril';
import Field from '../../lib/models/Field';
export default class MasqueradePage extends ExtensionPage {
    oninit(vnode: Vnode): void;
    loadTrash(): Promise<import("flarum/common/Store").ApiResponsePlural<Field>>;
    sections(vnode: VnodeDOM<ExtensionPageAttrs, this>): import("flarum/common/utils/ItemList").default<unknown>;
    fieldsSection(): JSX.Element;
}
