// TODO(AR) can we further refine these types?
export type ID = string;
export type CDATA = string;
export type PCDATA = string;
export type NMTOKEN = string;

// TODO(AR) should these be union types, or should they be base interfaces which other interfaces like `ph` inherit from?
export type RefrenceContentScope = 'local' | 'peer' | 'external';
export type CommonInline = PCDATA | IntPh | IntXImage | IntData;
export type AllInline = CommonInline | XRef;

export class BaseElement {
    elementName = '';
}

export interface IntNamedElement {
    readonly elementName: string;
}

export type IntFilterAdds = {};

export interface IntFilters extends IntFilterAdds {
    props?: CDATA;
}

export interface IntReuse {
    id?: NMTOKEN;
    conref?: CDATA;
}

export interface IntReferenceContent {
    href?: CDATA;
    format?: CDATA;
    scope?: RefrenceContentScope;
}

export interface IntVariableContent {
    keyref?: CDATA;
}

export interface IntVariableLinks {
    keyref: CDATA;
}

export interface IntLocalization {
    dir?: CDATA;
    xml_lang?: CDATA;
    translate?: CDATA;
}

export interface IntTopic extends IntNamedElement, IntLocalization {
    id: ID;
    xmlns_ditaarch: CDATA;
    ditaarch_DITAArchVersion?: CDATA;
    domains?: CDATA;
    outputClass?: CDATA;
    className?: CDATA;

    //TODO(AR) how to ensure correct ordering of children here? also cannot have a shortdesc without a title! Need somelike like a HList
    children: {
        title?: Title;
        shortdesc?: Shortdesc;
        prolog?: Prolog;
        body?: Body;
    };
}
export class Topic extends BaseElement implements IntTopic {
    readonly elementName = 'topic';
    children = {};
    constructor(
        public id: ID,
        public xmlns_ditaarch: CDATA,
        public ditaarch_DITAArchVersion?: CDATA,
        public domains?: CDATA,
        public outputClass?: CDATA,
        public className?: CDATA,
    ) {
        super();
    }
}

export interface IntTitle extends IntLocalization {
    outputClass?: CDATA;
    className?: CDATA;
    children: Array<CommonInline>;
}
export class Title extends BaseElement implements IntTitle {
    readonly elementName = 'Title';
    children = [];
    constructor(
        public outputClass?: CDATA,
        public className?: CDATA,
    ) {
        super();
    }
}

export interface IntShortdesc extends IntFilters, IntLocalization, IntReuse {
    outputClass?: CDATA;
    className?: CDATA;
    children: Array<AllInline>;
}
export class Shortdesc extends BaseElement implements IntShortdesc {
    readonly elementName = 'shortdesc';
    children = [];
    constructor(
        public outputClass?: CDATA,
        public className?: CDATA,
    ) {
        super();
    }
}

export interface IntProlog extends IntFilters, IntLocalization {
    className?: CDATA;
    children: Array<Data>;
}
export class Prolog extends BaseElement implements IntProlog {
    readonly elementName = 'prolog'
    children = [];
    constructor(
        public outputClass?: CDATA,
    ) {
        super();
    }
}

export interface IntBody extends IntLocalization {
    outputClass?: CDATA;
    className?: CDATA;
    //TODO(AR) implement children
}
export class Body extends BaseElement implements IntBody {
    readonly elementName = 'body';
    children = [];
    constructor(
        public outputClass?: CDATA,
        public className?: CDATA,
    ) {
        super();
    }
}

export interface IntPh extends IntFilters, IntLocalization, IntVariableContent {
    outputClass?: CDATA;
    className?: CDATA;
    children: Array<AllInline>;
}
export class Ph extends BaseElement implements IntPh {
    readonly elementName = 'ph'
    children = [];
    constructor(
        public outputClass?: CDATA,
        public className?: CDATA,
    ) {
        super();
    }
}

export interface IntXImage extends IntFilters, IntLocalization, IntReferenceContent, IntVariableContent {
    height?: NMTOKEN;
    width?: NMTOKEN;
    outputClass?: CDATA;
    className?: CDATA;
    alt?: Alt;
}
export class XImage extends BaseElement implements IntXImage {
    readonly elementName = 'Ximage';
    constructor(
        public height?: NMTOKEN,
        public width?: NMTOKEN,
        public outputClass?: CDATA,
        public className?: CDATA,
        public alt?: Alt,
    ) {
        super();
    }
}

export interface IntAlt extends IntFilters, IntLocalization, IntVariableContent {
    outputClass?: CDATA;
    className?: CDATA;
    children: Array<PCDATA | Ph | Data>;
}
export class Alt extends BaseElement implements IntAlt {
    readonly elementName = 'alt';
    children = [];
    constructor(
        public outputClass?: CDATA,
        public className?: CDATA,
    ) {
        super();
    }
}

export interface IntData extends IntFilters, IntLocalization, IntReferenceContent, IntVariableContent {
    name?: CDATA;
    value?: CDATA;
    outputClass?: CDATA;
    className?: CDATA;
    children: Array<PCDATA | Data>;
}
export class Data extends BaseElement implements IntData {
    readonly elementName = 'data';
    children = [];
    constructor(
        public outputClass?: CDATA,
        public className?: CDATA,
    ) {
        super();
    }
}

export interface IntXRef extends IntFilters, IntLocalization, IntReferenceContent, IntVariableLinks {
    outputClass?: CDATA;
    className?: CDATA;
    children: Array<CommonInline>;
}
export class XRef extends BaseElement implements IntXRef {
    readonly elementName = 'xref';
    children = [];
    constructor(
        public keyref: CDATA,
        public outputClass?: CDATA,
        public className?: CDATA,
        public props?: CDATA,
        public dir?: CDATA,
        public xml_lang?: CDATA,
        public translate?: CDATA,
        public href?: CDATA,
        public format?: CDATA,
        public scope?: RefrenceContentScope,
    ) {
        super();
    }
}
