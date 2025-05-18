export interface Structure {
    acronym:        string;
    name:           string;
    primaryKeyType: string;
    allowGetAll:    boolean;
    fields:         Field[];
}

export interface Field {
    name:         string;
    type:         string;
    displayName:  string;
    isNullable:   boolean;
    isSearchable: boolean;
    isFilter:     boolean;
    isInternal:   boolean;
}
