import BaseField from './BaseField';
export default class SelectField extends BaseField {
    editorInputAttrs(): {
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
        type: string;
        options: Record<string, string>;
        default: string;
    } | {
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
        type: string;
        options: Record<string, string>;
        default: string;
    } | {
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
        type: string;
        options: Record<string, string>;
        default: string;
    } | {
        icon?: string | boolean | Mithril.Children;
        noStyleOverride?: boolean;
        disabled?: boolean;
        loading?: boolean;
        'aria-label'?: string | Mithril.ChildArray;
        helperText?: Mithril.Children;
        name: string;
        routePath: string;
        value?: string | null | (() => string | null);
        url?: string | null | (() => string | null);
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
        type: string;
        options: Record<string, string>;
        default: string;
    } | {
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        multiple?: boolean;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
        type: string;
        options: Record<string, string>;
        default: string;
    } | {
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        textArea: {
            setting: string;
            [key: string]: unknown;
        };
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
        type: string;
        options: Record<string, string>;
        default: string;
    } | {
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
        type: string;
        options: Record<string, string>;
        default: string;
    } | {
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
        type: string;
        options: Record<string, string>;
        default: string;
    };
    options(): Record<string, string>;
}
