// DataTable is a Higher order component used to visualize data in tabulated form
// It is compartmentailized into HeaderWrapper, Table and FooterWrapper
// Responsive to screen width Table is renderered using 2 components
// SmallScreenTableContainer for small screen
// WideScreenTableContainer for wider screen

import React, {useState, useEffect} from "react";

// Legacy Imports
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

// Local Components Imports
import { 
    DataTableHeaderWrapper, 
    DatatableFooterWrapper,
    WideScreenTableContainer,
    SmallScreenTableContainer 
} from "./components";


// models
import { 
    ResponseDataElementProps, 
    DataTableHeader, 
    OptionProps,
    NewUserRequestDataProps
} from "../../../model/Types";

interface DataModelProps {
    tableName: string;
    data: ResponseDataElementProps[];
    headers: DataTableHeader[];
    resultsPerPage: string;
    onChangeResultsPerPage: (newValue: string)=> void;
    currentPage: number;
    totalPages: number;
    onNextPage: ()=> void;
    onPreviousPage: ()=> void;
    onFirstPage: ()=> void;
    onLastPage: ()=> void;
    searchQuery: string;
    onUpdateSearchQuery: (value: string)=> void;
    onDeleteRows: (rows: string[])=> void;
    collapsableLabelMap: string;
    collapsableAvatarMap: string;
    collapsableDetailsMapList: string[];
    onUpdate: (value: NewUserRequestDataProps, id: string)=> void;
};
interface TableHeaderProps extends DataTableHeader {
    active: boolean;
}

export const DataTable: React.FC <DataModelProps> = ({
    tableName,
    data,
    headers,
    resultsPerPage,
    onChangeResultsPerPage,
    currentPage,
    totalPages,
    onNextPage,
    onPreviousPage,
    onFirstPage,
    onLastPage,
    searchQuery,
    onUpdateSearchQuery,
    onDeleteRows,
    collapsableLabelMap,
    collapsableAvatarMap,
    collapsableDetailsMapList,
    onUpdate
})=> {
    // States
    const [tableHeader, setTableHeader] = useState<TableHeaderProps[]>([]);
    const [selected, setSelected] = useState<string[]>([]);  

    // Effects
    useEffect(()=> {
        const headerData = headers.map((element: DataTableHeader)=> {
            return {
                ...element,
                active: true
            }
        });
        setTableHeader(headerData);
    }, []);
    useEffect(()=> {
        setSelected([]);
    }, [data]);

    // Trackers
    // useEffect(()=> {console.log(tableHeader)}, [tableHeader]);

    // Event Handlers
    const updateHeaderVisibility = (newValue: TableHeaderProps[])=> setTableHeader(newValue);
    const updateSelection = (newValue: string[])=> setSelected(newValue);

    // Renderer
    return(
        <React.Fragment>
             <Snackbar
                open={selected.length>0}
                message={`Delete ${selected.length} users?`}
                action={
                    <Button 
                        color={'warning'}
                        size={'small'}
                        onClick={()=> onDeleteRows(selected)}
                    >
                        Confirm
                    </Button>
                }
                ContentProps={{sx:{backgroundColor: '#E3ddff', color: '#313134'}}}
            />
            
            
            <Paper
                variant={'outlined'}
                sx={{width: '95%',borderRadius: '8px'}}
            >
                <DataTableHeaderWrapper
                    tableName = {tableName}
                    searchQuery = {searchQuery}
                    headers={tableHeader}
                    onUpdateSearchQuery = {onUpdateSearchQuery}
                    onToggleHeader={updateHeaderVisibility}
                />
                <Box sx={{width: '100%',display: {xs: 'none', md: 'block'},}}>
                    <WideScreenTableContainer
                        tableHeader = {tableHeader}
                        tableData = {data}
                        selected = {selected}
                        onUpdateSelection ={updateSelection}
                        onUpdateItem={onUpdate}
                    />
                </Box>
                <Box sx={{width: '100%',display: {xs: 'block', md: 'none'},}}>
                    <SmallScreenTableContainer
                        tableHeader = {tableHeader}
                        tableData = {data}
                        selected = {selected}
                        collapsableLabelMap = {collapsableLabelMap}
                        collapsableAvatarMap = {collapsableAvatarMap}
                        collapsableDetailsMapList = {collapsableDetailsMapList}
                        onUpdateSelection ={updateSelection}
                    />
                </Box>
                <DatatableFooterWrapper 
                    resultsPerPage = {resultsPerPage}
                    currentPage = {currentPage}
                    totalPages = {totalPages}
                    onNextPage = {onNextPage}
                    onPreviousPage = {onPreviousPage}
                    onFirstPage = {onFirstPage}
                    onLastPage = {onLastPage}
                    onChangeResultsPerPage = {onChangeResultsPerPage}
                />
            </Paper>
        </React.Fragment>
    )
}