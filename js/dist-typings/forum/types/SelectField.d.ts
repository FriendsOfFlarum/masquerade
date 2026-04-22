import BaseField from './BaseField';
export default class SelectField extends BaseField {
    editorInputAttrs(): {
        type: string;
        options: Record<string, string>;
        default: string;
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
    } | {
        type: string;
        options: Record<string, string>;
        default: string;
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
    } | {
        type: string;
        options: Record<string, string>;
        default: string;
        multiple?: boolean;
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
    } | {
        type: string;
        options: Record<string, string>;
        default: string;
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
    } | {
        type: string;
        options: Record<string, string>;
        default: string;
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
    } | {
        type: string;
        options: Record<string, string>;
        default: string;
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        name: string;
        routePath: string;
        value?: string | null | (() => string | null);
        url?: string | null | (() => string | null);
        icon?: string | boolean | Mithril.Children;
        disabled?: boolean;
        loading?: boolean;
        'aria-label'?: string | Mithril.ChildArray;
        helperText?: Mithril.Children;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
    } | {
        type: string;
        options: Record<string, string>;
        default: string;
        textArea: {
            setting: string;
            [key: string]: unknown;
        };
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
    } | {
        type: string;
        options: Record<string, string>;
        default: string;
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
    };
    options(): Record<string, string>;
}
