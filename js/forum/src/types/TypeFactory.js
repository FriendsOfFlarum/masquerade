import BaseField from 'flagrow/masquerade/types/BaseField';
import BooleanField from 'flagrow/masquerade/types/BooleanField';
import EmailField from 'flagrow/masquerade/types/EmailField';
import SelectField from 'flagrow/masquerade/types/SelectField';
import UrlField from 'flagrow/masquerade/types/UrlField';

export default class TypeFactory {
    static typeForField({field, set, value}) {
        let className = BaseField;

        const type = this.identify(field);

        if (type) {
            className = this.types()[type];
        }

        return new className({
            field,
            set,
            value,
        });
    }

    static fieldAttribute(field, attribute) {
        if (typeof field[attribute] === 'function') {
            return field[attribute]();
        }

        return field[attribute];
    }

    static types() {
        return {
            boolean: BooleanField,
            email: EmailField,
            select: SelectField,
            url: UrlField,
        };
    }

    /**
     * Identifies how to parse the field answer.
     * @returns {null|string}
     */
    static identify(field) {
        const validation = this.fieldAttribute(field, 'validation').split(',');
        let identified = null;

        // If the field has a type we use it
        const fieldType = this.fieldAttribute(field, 'type');
        if (typeof this.types()[fieldType] !== 'undefined') {
            return fieldType;
        }

        // If it's an advanced field with no type we then guess the best type
        validation.forEach(rule => {
            rule = rule.trim();

            if (typeof this.types()[rule] !== 'undefined') {
                identified = rule;
            }
        });

        return identified;
    }
}
