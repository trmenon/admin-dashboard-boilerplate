import React, {useState} from 'react';

// Legacy Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// SVG Icons Imports
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

// Models
import { DataTableHeader } from '../../../../model/Types';
interface MenuProps {
    open: boolean;
    anchor: null | HTMLElement;
}
interface TableHeaderProps extends DataTableHeader {
    active: boolean;
}
interface DataTableHeaderWrapperProps {
    tableName: string;
    searchQuery: string;
    headers: TableHeaderProps[];
    onUpdateSearchQuery: (value: string)=> void;
    onToggleHeader: (newValue: TableHeaderProps[])=> void;
}

export const DataTableHeaderWrapper: React.FC<DataTableHeaderWrapperProps> = ({
    tableName,
    searchQuery,
    headers,
    onUpdateSearchQuery,
    onToggleHeader,
})=> {
    // States
    const [headerMenu, setHeaderMenu] = useState<MenuProps>({open: false, anchor: null});

    // State Handlers
    const openHeaderMenu = (event: React.MouseEvent<HTMLButtonElement>)=> {
        setHeaderMenu({open: true, anchor: event.currentTarget})
    }
    const closeHeaderMenu = ()=> setHeaderMenu({open: false, anchor: null})

    // Effects

    // Event Handlers
    const toggleHeaders = (key: string, value: boolean)=> {
        const currentHeaders = headers.map((current_head: TableHeaderProps)=> {
            if(current_head?.key === key) {
                return{
                    ...current_head,
                    active: value
                }                
            }
            return current_head;
        })
        onToggleHeader(currentHeaders);
    }

    // Renederer
    return(
        <React.Fragment>
            <Menu
                anchorEl={headerMenu?.anchor}
                open={headerMenu?.open}
                onClose={closeHeaderMenu}
                MenuListProps={{sx: {p: 0,width: '280px',display: {xs: 'none', md: 'block'}}}}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {width: 32,height: 32,ml: -0.5,mr: 1,},
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {
                    headers.map((head_item: TableHeaderProps, index: number)=> {
                        return (
                            <MenuItem key={head_item?.key}>
                                <FormControlLabel
                                    control={
                                        <Checkbox 
                                            checked={head_item?.active}
                                            color={'secondary'}
                                            size={'small'}
                                            onChange={
                                                (event: React.ChangeEvent<HTMLInputElement>)=> {
                                                    toggleHeaders(head_item?.key, event.target.checked);
                                                }
                                            }
                                        />
                                    }
                                    label={head_item?.label}
                                    labelPlacement="end"
                                />
                            </MenuItem>
                        )
                    })
                }
            </Menu>
            <Box 
                sx={{
                    width: '100%', 
                    mb: '16px', 
                    height: '68px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: '24px'
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
                    {tableName}
                </Typography>
                <Stack spacing={'12px'} direction={'row'} >
                    <TextField
                        value={searchQuery}
                        variant="outlined" 
                        size="small"
                        color={'secondary'}
                        placeholder="Search..."
                        fullWidth
                        sx={{fieldset :{borderRadius: '50px'},}}
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
                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=> 
                            onUpdateSearchQuery(event.target.value)
                        }
                    />
                    <Tooltip title="Customize headers in table">
                        <IconButton 
                            color={'secondary'}
                            size={'small'}
                            sx={{display: {xs: 'none', md: 'flex'}}}
                            onClick={openHeaderMenu}
                        >
                            <FilterAltOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Box>
        </React.Fragment>
    )
}