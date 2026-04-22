import BaseField from './BaseField';
export default class BooleanField extends BaseField {
    editorInputAttrs(): {
        type: string;
        options: {
            value: string;
            label: string;
        }[];
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
    } | {
        type: string;
        options: {
            value: string;
            label: string;
        }[];
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
    } | {
        type: string;
        options: {
            value: string;
            label: string;
        }[];
        default: string;
        multiple?: boolean;
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
    } | {
        type: string;
        options: {
            value: string;
            label: string;
        }[];
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
    } | {
        type: string;
        options: {
            value: string;
            label: string;
        }[];
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
    } | {
        type: string;
        options: {
            value: string;
            label: string;
        }[];
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
        options: {
            value: string;
            label: string;
        }[];
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
        options: {
            value: string;
            label: string;
        }[];
        label?: Mithril.Children;
        help?: Mithril.Children;
        className?: string;
        stream?: Stream<any>;
        getSetting?: (key: string) => Stream<any>;
    };
    getRadioOptions(): {
        value: string;
        label: string;
    }[];
    answerContent(): JSX.Element | null;
}
