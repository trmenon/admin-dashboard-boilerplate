import React from "react";

// Legacy Imports
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import IconButton from '@mui/material/IconButton';

// SVG Icons imports
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';


// Models
import { OptionProps } from "../../../../model/Types";
interface DatatableFooterWrapperProps {
    resultsPerPage: string;
    currentPage: number;
    totalPages: number;
    onNextPage: ()=> void;
    onPreviousPage: ()=> void;
    onFirstPage: ()=> void;
    onLastPage: ()=> void;
    onChangeResultsPerPage: (newValue: string)=> void;
}

// Constants
const resultsPerPageList: OptionProps[] = [
    {key: 'option-limit-8-key', value: '8', label: '8'},
    {key: 'option-limit-10-key', value: '10', label: '10'},
    {key: 'option-limit-12-key', value: '12', label: '12'},
]

export const DatatableFooterWrapper: React.FC<DatatableFooterWrapperProps> = ({
    resultsPerPage,
    currentPage,
    totalPages,
    onNextPage,
    onPreviousPage,
    onFirstPage,
    onLastPage,
    onChangeResultsPerPage,
})=> {
    // Event handlers
    const handleResultsPerPageSelection = (event: any) => {
        if(
            event?.target?.value === '8' ||
            event?.target?.value === '10' ||
            event?.target?.value === '12'
        ) {
            onChangeResultsPerPage(event.target.value);
        }
    }

    // Renderer
    return(
        <React.Fragment>
            <Box
                sx={{
                    width: '100%', 
                    mb: '16px', 
                    height: '68px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: '24px',
                    backgroundColor: '#f8f7fd'
                }}
            >
                <Stack 
                    spacing={'8px'} 
                    direction={'row'}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }}
                >
                    <Typography variant="body2">
                        Showing
                    </Typography>
                    <ToggleButtonGroup
                        color="secondary"
                        value={resultsPerPage}
                        exclusive
                        size={'small'}
                        onChange={handleResultsPerPageSelection}
                        aria-label="Platform"
                    >
                        {
                            resultsPerPageList.map((element: OptionProps)=> {
                                return(
                                    <ToggleButton 
                                        key={element?.key}
                                        value={element?.value}
                                        sx={{
                                            "&.Mui-selected, &.Mui-selected:hover": {
                                                color: "white",
                                                backgroundColor: '#bf00ab'
                                            }
                                        }}
                                    >
                                        {element?.label}
                                    </ToggleButton>
                                )
                            })
                        }
                    </ToggleButtonGroup>
                    <Typography variant="body2">
                        results per page
                    </Typography>
                </Stack>
                <Stack 
                    spacing={'8px'} 
                    sx={{
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'flex-end'
                    }}
                >
                    <Stack 
                        spacing={'4px'} 
                        direction={'row'}
                    >
                        <IconButton 
                            disabled={currentPage===1? true: false}
                            color={'secondary'}
                            size={'small'}
                            onClick={onFirstPage}
                        >
                            <FirstPageIcon />
                        </IconButton>
                        <IconButton 
                            disabled={currentPage<=1? true: false}
                            color={'secondary'}
                            size={'small'}
                            onClick={onPreviousPage}
                        >
                            <NavigateBeforeOutlinedIcon />
                        </IconButton>
                        <IconButton 
                            disabled={currentPage=== totalPages? true: false}
                            color={'secondary'}
                            size={'small'}
                            onClick={onNextPage}
                        >
                            <NavigateNextOutlinedIcon />
                        </IconButton>
                        <IconButton 
                            disabled={currentPage=== totalPages? true: false}
                            color={'secondary'}
                            size={'small'}
                            onClick={onLastPage}
                        >
                            <LastPageIcon />
                        </IconButton>
                    </Stack>
                    <Typography variant="body2" sx={{color: '#49464c'}}>
                        {`Displaying page ${currentPage} of ${totalPages} pages`}
                    </Typography>
                </Stack>
            </Box>
        </React.Fragment>
    )
}