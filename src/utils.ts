import { BasicValue, OrArray, ChildTypes, ChildType, ReferenceContentScope } from "./classes";

export function has<T>(array: Array<T>, value: T): boolean {
    return array.indexOf(value) >= 0;
}

export function isOrUndefined<T extends BasicValue>(check: (value?: BasicValue) => boolean, value?: BasicValue): value is T {
    return typeof value === 'undefined' || check(value);
}

export const isReferenceContentScope = (value?: BasicValue): value is ReferenceContentScope =>
    has(['local', 'peer', 'external'], value);
const phGroup = ['ph', 'b', 'i', 'u', 'sub', 'sup'];
const dataGroup = ['data'];
export const nodeGroups: Record<string, Array<string>> = {
    'ph': phGroup,
    'data': dataGroup,
    'common-inline': ['text', ...phGroup, 'image', ...dataGroup],
    'all-inline': ['text', ...phGroup, 'image', 'xref', ...dataGroup],
    'simple-blocks': ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'fn', 'note', ...dataGroup],
    'fn-blocks': ['p', 'ul', 'ol', 'dl', ...dataGroup],
    'all-blocks': ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'simpletable', 'fig', 'fn', 'note', ...dataGroup],
    'list-blocks': ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'simpletable', 'fig', 'note', ...dataGroup],
    'fig-blocks': ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'simpletable', ...dataGroup],
}

export function splitTypenames(value: string): string[] { 
    if (value[0] !== '(') {
        return value.split('|');
    }
    const last = value.slice(-1);
    return has(['+', '*', '?'], last)
        ? value.slice(1, -2).split('|').map(type => type + last)
        : value.slice(1, -1).split('|');
}

function childTypeToString(type: ChildType): string {
    return (type.isGroup
        ? nodeGroups[type.name].length === 1
            ? nodeGroups[type.name].join('|')
            : '(' + nodeGroups[type.name].join('|') + ')'
        : type.name
    ) + (type.single
        ? type.required ? '' : '?'
        : type.required ? '+' : '*');
}

export function childTypesToString(type: ChildTypes, topLevel = true): string {
    if (Array.isArray(type)) {
        const types = type.map(subType => childTypesToString(subType, false)).join('|');
        return topLevel || type.length === 1 ? types : '(' + types + ')';
    } else {
        return childTypeToString(type)
    }
}

export function stringToChildTypes(value: OrArray<string>, topLevel = true): ChildTypes[] {
    if (typeof value === 'string') {
        if (value === '') {
            return [];
        }
        if (value.indexOf('|') < 0) {
            const last = value.slice(-1);
            const result: ChildType = has(['+', '*', '?'], last)
            ? {
                name: value.slice(0, -1),
                single: last === '?',
                required: last === '+',
                isGroup: false,
            } : {
                name: value,
                single: true,
                required: true,
                isGroup: false,
            };
            if (result.name[0] === '%') {
                result.name = result.name.substr(1);
                result.isGroup = true;
            }
            return topLevel && !Array.isArray(result) ? [ result ] : result as unknown as ChildTypes[];
        } else {
            return stringToChildTypes(splitTypenames(value), false);
        }
    } else {
        return value.map(subType => stringToChildTypes(subType, false)).filter(type => !Array.isArray(type) || type.length > 0);
    }
}

export function acceptsNodeName(value: string, childType: ChildTypes): ChildType | undefined {
    if (Array.isArray(childType)) {
        let result: ChildType | undefined;
        childType.some(type => {
            result = acceptsNodeName(value, type);
            if (result) {
                return true;
            }
        });
        return result;
    } else {
        return !childType.isGroup
            ? (childType.name === value ? childType : undefined)
            : (has(nodeGroups[childType.name], value) ? childType : undefined);
    }
}

export function isChildTypeSingle(childType: string | ChildType | ChildTypes): boolean {
    if (Array.isArray(childType)) {
        let result = true;
        childType.some(type => {
            result = isChildTypeSingle(type);
            return !result;
        });
        return result;
    } else {
        if (typeof childType === 'string') {
            return isChildTypeSingle(stringToChildTypes(childType));
        }
        return !!childType.single;
    }
}
export function isChildTypeRequired(childType: string | ChildType | ChildTypes): boolean {
    console.log(childType);
    if (Array.isArray(childType)) {
        let result = true;
        childType.some(type => {
            result = !isChildTypeRequired(type);
            return !result;
        });
        return result;
    } else {
        if (typeof childType === 'string') {
            return isChildTypeRequired(stringToChildTypes(childType));
        }
        return !!childType.required;
    }
}

export function childTypesArray(childTypes: ChildTypes): ChildTypes[] {
    return Array.isArray(childTypes) ? childTypes : [childTypes];
}

export function areFieldsValid(fields: string[], value: Record<string, BasicValue>, ...validations: ((field: string, value: BasicValue) => boolean)[]): boolean {
    for (const field of fields) {
        let valid = false;
        for (const validation of validations) {
            if (validation(field, value[field])) {
                valid = true;
                break;
            }
        }
        if (!valid) {
            return false;
        }
    }
    return true;
}
