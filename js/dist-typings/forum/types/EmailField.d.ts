import BaseField from './BaseField';
export default class EmailField extends BaseField {
    editorInputAttrs(): {
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
        type: string;
        placeholder: string;
    } | {
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
        type: string;
        placeholder: string;
    } | {
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
        type: string;
        placeholder: string;
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
        placeholder: string;
    } | {
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        options: {
            [value: string]: Mithril.Children | {
                label: Mithril.Children;
                disabled?: boolean;
            };
        };
        default: string;
        multiple?: boolean;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
        type: string;
        placeholder: string;
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
        placeholder: string;
    } | {
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
        type: string;
        placeholder: string;
    } | {
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
        type: string;
        placeholder: string;
    };
    answerContent(): JSX.Element | null;
}
