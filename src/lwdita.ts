namespace LwDita {
    
    // TODO(AR) can we further refine these types?
    type ID = String
    type CDATA = String
    type PCDATA = String
    type NMTOKEN = String

    // TODO(AR) should these be union types, or should they be base interfaces which other interfaces like `ph` inherit from?
    type CommonInline = PCDATA | Ph | Image | Data
    type AllInline = PCDATA | Ph | Image | XRef | Data

    interface NamedElement {
        readonly elementName: String
    }

    interface FilterAdds {}

    interface Filters extends FilterAdds {
        "@props"?: CDATA
    }

    interface Reuse {
        "@id"?: NMTOKEN
        "conref"?: CDATA
    }

    interface ReferenceContent {
        "@href"?: CDATA
        "@format"?: CDATA
        "@scope"?: "local" | "peer" | "external"
    }

    interface VariableContent {
        "@keyref?": CDATA
    }

    interface VariableLinks {
        "@keyref": CDATA
    }

    interface Localization {
        "@dir"?: CDATA
        "@xml:lang"?: CDATA
        "translate"?: CDATA
    }

    interface Topic extends NamedElement, Localization {
        "@id": ID
        "@xmlns:ditaarch": CDATA
        "@ditaarch:DITAArchVersion"?: CDATA
        "@domains"?: CDATA
        "@outputClass"?: CDATA
        "@class"?: CDATA

        //TODO(AR) how to ensure correct ordering of children here? also cannot have a shortdesc without a title! Need somelike like a HList
        title: Title
        shortdesc?: Shortdesc
        prolog?: Prolog
        body?: Body
    }
    class Topic {
        readonly elementName = "topic"
    }

    interface Title extends Localization {
        "@outputClass"?: CDATA
        "@class"?: CDATA
        children: Array<CommonInline>
    }
    class Title {
        readonly elementName = "Title"
    }

    interface Shortdesc extends Filters, Localization, Reuse {
        "@outputClass"?: CDATA
        "@class"?: CDATA
        children: Array<AllInline>
    }
    class Shortdesc {
        readonly elementName = "shortdesc"
    }

    interface Prolog extends Filters, Localization {
        "@class"?: CDATA
        children: Array<Data>
    }
    class Prolog {
        readonly elementName = "prolog"
    }

    interface Body extends Localization {
        "@outputClass"?: CDATA
        "@class"?: CDATA
        //TODO(AR) implement children
    }
    class Body {
        readonly elementName = "body"
    }

    interface Ph extends Filters, Localization, VariableContent {
        "@outputClass"?: CDATA
        "@class"?: CDATA
        children: Array<AllInline>
    }
    class Ph {
        readonly elementName = "ph"
    }

    interface Image extends Filters, Localization, ReferenceContent, VariableContent {
        "@height"?: NMTOKEN
        "@with"?: NMTOKEN
        "@outputClass"?: CDATA
        "@class"?: CDATA
        alt?: Alt
    }
    class Image {
        readonly elementName = "image"
    }

    interface Alt extends Filters, Localization, VariableContent {
        "@outputClass"?: CDATA
        "@class"?: CDATA
        children: Array<PCDATA | Ph | Data>
    }
    class Alt {
        readonly elementName = "alt"
    }

    interface Data extends  Filters, Localization, ReferenceContent, VariableContent {
        "@name"?: CDATA
        "@value"?: CDATA
        "@outputClass"?: CDATA
        "@class"?: CDATA
        children: Array<PCDATA | Data>
    }
    class Data {
        readonly elementName = "data"
    }

    interface XRef extends Filters, Localization, ReferenceContent, VariableLinks {
        "@outputClass"?: CDATA
        "@class"?: CDATA
        children: Array<CommonInline>   
    }
    class XRef {
        readonly elementName = "xref"
    }
}