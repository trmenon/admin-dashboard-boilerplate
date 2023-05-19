import React from 'react';

// Legacy Imports
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import SearchIcon from '@mui/icons-material/Search';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';

// Models
interface DataBoardHeader {
    boardName: string;
    currentPage: number;
    totalPages: number;
    onNextPage: ()=> void;
    onPreviousPage: ()=> void;
    onFirstPage: ()=> void;
    onLastPage: ()=> void;
    searchQuery: string;
    onUpdateSearchQuery: (value: string)=> void;
}

export const BoardHeader: React.FC<DataBoardHeader> = ({
    boardName,
    currentPage,
    totalPages,
    onNextPage,
    onPreviousPage,
    onFirstPage,
    onLastPage,
    searchQuery,
    onUpdateSearchQuery,
})=> {
    // renderer
    return(
        <React.Fragment>
            <Stack spacing={'24px'} sx={{height: '60px'}}>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        px: '24px',
                    }}
                >
                    <Typography 
                        variant={'h6'}
                        sx={{
                            fontWeight: 700,
                            color: '#424035', 
                            fontSize: {xs: '0.75em', md: '1.1em'}
                        }}
                    >
                        {boardName}
                    </Typography>
                    <Box 
                        sx={{display: {xs: 'none', md: 'flex'}}}
                    >
                        <TextField
                            value={searchQuery}
                            variant="outlined" 
                            fullWidth
                            size="small"
                            color={'secondary'}
                            placeholder="Search..."
                            sx={{fieldset :{borderRadius: '50px'}}}
                            InputProps={{
                                startAdornment: 
                                    <InputAdornment position="start">
                                        <IconButton edge="end"><SearchIcon /></IconButton>
                                    </InputAdornment>,
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton 
                                            edge="end"
                                            color="error"
                                            onClick={()=> onUpdateSearchQuery('')}
                                        >
                                            <RemoveOutlinedIcon />
                                        </IconButton>
                                    </InputAdornment>                                  
                            }}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=> {
                                onUpdateSearchQuery(event.target.value)
                            }}
                        />
                    </Box>
                    <Stack spacing={'2px'} sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                        <Stack spacing={'12px'} direction={'row'}>
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
                        <Typography 
                            variant={'subtitle2'}
                            sx={{
                                color: '#424035', 
                                textAlign: 'end',
                                fontSize: '0.75em'
                            }}
                        >
                            {`Displaying page ${currentPage} of ${totalPages} pages`}
                        </Typography>
                    </Stack>
                </Box>
            </Stack>
        </React.Fragment>
    )
}