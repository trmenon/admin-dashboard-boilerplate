import React from "react";

// Legacy Imports
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

// Other Components Imports
import { BoardHeader, CustomCard } from "./components";

// Models
import { ResponseDataElementProps, OptionProps } from "../../../model/Types";

interface DataBoardProps {
    boardName: string;
    data: ResponseDataElementProps[];
    currentPage: number;
    totalPages: number;
    onNextPage: ()=> void;
    onPreviousPage: ()=> void;
    onFirstPage: ()=> void;
    onLastPage: ()=> void;
    searchQuery: string;
    onUpdateSearchQuery: (value: string)=> void;
    primaryLabelMappingKey: string;
    contentLabelMappingKeyList: string[];
}

export const DataBoard: React.FC<DataBoardProps> = ({
    boardName,
    data,
    currentPage,
    totalPages,
    onNextPage,
    onPreviousPage,
    onFirstPage,
    onLastPage,
    searchQuery,
    onUpdateSearchQuery,
    primaryLabelMappingKey,
    contentLabelMappingKeyList,
})=> {
    return(
        <React.Fragment>
            <Paper
                variant={'outlined'}
                sx={{
                    width: '95%',
                    borderRadius: '8px',
                }}
            >
                <BoardHeader
                    boardName="User board"
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onNextPage={onNextPage}
                    onPreviousPage={onPreviousPage}
                    onFirstPage={onFirstPage}
                    onLastPage={onLastPage}
                    searchQuery={searchQuery}
                    onUpdateSearchQuery={onUpdateSearchQuery}
                />    
                <Box
                    sx={{
                        mx: '32px',
                        my: '24px',
                        padding: '24px',
                        height: `calc(100vh - 272px)`,
                        overflow: 'scroll', 
                        scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': {display: 'none'},
                        borderRadius: '28px',
                        backgroundColor: '#e4e1e9'
                    }}
                >
                    <Grid container spacing={'24px'}>
                        {
                            data.map((data_item: any)=> {
                                console.log(Object.keys(data_item));
                                return(
                                    <Grid
                                        key={`grid-item-${data_item?.id}-key`} 
                                        item 
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        lg={3}
                                        xl={2}
                                    >
                                        <CustomCard
                                            primaryLabel={data_item[`${primaryLabelMappingKey}`]}
                                            avatarIcon={<PermIdentityOutlinedIcon/>}
                                            content={data_item}
                                            contentMappingKeys={contentLabelMappingKeyList}
                                        />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Box>
            </Paper>    
        </React.Fragment>
    )
}