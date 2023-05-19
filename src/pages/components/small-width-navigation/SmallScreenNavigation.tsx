import React, {useState} from 'react';
// Constants
import { routes } from '../../../routes';

// Legacy Imports
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import FitbitIcon from '@mui/icons-material/Fitbit';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

// Interface
import { RouteProps } from '../../../model/Types';
interface SmallScreenNavigationProps {
    selected: string;
    onSelect: (newValue: string)=> void;
}


export const SmallScreenNavigation:React.FC<SmallScreenNavigationProps> = ({
    selected,
    onSelect
})=> {
    // States
    const [open, setOpen] = useState(false);

    // Event Handlers
    const openDrawer = ()=> setOpen(true);
    const closeDrawer = ()=> setOpen(false);
    const selectRoute = (value: string)=> {
        onSelect(value);
        closeDrawer();
    }

    // Renderer
    return(
        <React.Fragment>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={openDrawer}
                edge="start"
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                open={open}
                elevation={16}
                sx={{
                    display: {xs: 'flex', md: 'none'},
                    width: '75vw',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: '75vw',
                        boxSizing: 'border-box',
                    },
                }}
                anchor="left"
            >
                <Box 
                    sx={{
                        height: '72px', 
                        display: "flex", 
                        alignItems: 'center', 
                        justifyContent: 'flex-start',
                        px: '16px'
                    }}
                >
                    <FitbitIcon sx={{mr: '8px'}}/>
                    <Typography variant="h6">Company</Typography>
                </Box>
                <Divider/>
                <List>
                    {routes.map((route: RouteProps)=> {
                        return(
                            <ListItem 
                                key={route?.key} 
                                disablePadding
                                onClick = {()=> selectRoute(route?.value)}
                            >
                                <ListItemButton
                                    selected = {selected === route?.value}
                                    sx={{
                                        '&.Mui-selected': {
                                            color: "#beb5e7",
                                            backgroundColor: "#7e29cd",
                                            fontWeight: 600
                                        }
                                    }}
                                >                
                                    <ListItemText primary={route?.label} />
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </List>
                <Divider/>
                <Button variant="text" onClick={closeDrawer}>Close</Button>
            </Drawer>
        </React.Fragment>
    )
}

