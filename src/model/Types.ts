export interface ResponseDataElementProps {
    id: string;
    name: string;
    email:string;
    role: string;
} 

export interface RouteProps {
    key: string;
    label: string;
    value: string;
}

export interface DataTableHeader {
    key: string;
    label: string;
    value: string;
}

export interface OptionProps {
    key: string;
    label: string;
    value: string;
}

export interface SearchQueryProps {
    key: string;
    value: string;
    active: boolean;
    label: string;
}
export interface TableHeaderProps extends DataTableHeader {
    active: boolean;
}
export interface TableContainerProps {
    tableHeader: TableHeaderProps[];
    tableData: ResponseDataElementProps[];
    selected: string[];
    onUpdateSelection: (newValue: string[])=> void;    
}

export interface CustomModalProps {
    open: boolean;
    modalTitle: string;
    headerButtonIcon?: React.ReactNode;    
    modalContent: React.ReactNode;
    modalActionPrimaryButtonLabel: string;
    modalActionSecondaryButtonLabel: string;
    disableActionButtons?: boolean;
    onClose: ()=> void;
    onClickHeaderButton?: ()=> void;
    onClickActionPrimaryButton: ()=> void;
    onClickActionSecondaryButton: ()=> void;
}

export interface NewUserTransportDataProps {
    name: string;
    role: string;
    email: string;
}

export interface NewUserRequestDataProps extends NewUserTransportDataProps {
    id: string;
}