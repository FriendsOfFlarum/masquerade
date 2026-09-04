import BaseField from './BaseField';
export default class BooleanField extends BaseField {
    editorInputAttrs(): {
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
        type: string;
        options: {
            value: string;
            label: string;
        }[];
    } | {
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
        type: string;
        options: {
            value: string;
            label: string;
        }[];
    } | {
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
        type: string;
        options: {
            value: string;
            label: string;
        }[];
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
        options: {
            value: string;
            label: string;
        }[];
    } | {
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        default: string;
        multiple?: boolean;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
        type: string;
        options: {
            value: string;
            label: string;
        }[];
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
        options: {
            value: string;
            label: string;
        }[];
    } | {
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
        type: string;
        options: {
            value: string;
            label: string;
        }[];
    } | {
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
        type: string;
        options: {
            value: string;
            label: string;
        }[];
    };
    getRadioOptions(): {
        value: string;
        label: string;
    }[];
    answerContent(): JSX.Element | null;
}
