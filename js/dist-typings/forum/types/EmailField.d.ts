import BaseField from './BaseField';
export default class EmailField extends BaseField {
    editorInputAttrs(): {
        type: string;
        placeholder: string;
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
    } | {
        type: string;
        placeholder: string;
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
    } | {
        type: string;
        placeholder: string;
        options: {
            [value: string]: Mithril.Children | {
                label: Mithril.Children;
                disabled?: boolean;
            };
        };
        default: string;
        multiple?: boolean;
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
    } | {
        type: string;
        placeholder: string;
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
    } | {
        type: string;
        placeholder: string;
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
    } | {
        type: string;
        placeholder: string;
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
        placeholder: string;
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
        placeholder: string;
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
    };
    answerContent(): JSX.Element | null;
}
