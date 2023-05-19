import React, {useState, useEffect} from "react";

// HOC Imports
import { SmallScreenNavigation } from "./components/small-width-navigation/SmallScreenNavigation";
import { ContentMount } from "./content/Content";

// models
import { RouteProps } from "../model/Types";

// Legacy Imports
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import FitbitIcon from '@mui/icons-material/Fitbit';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';



// Constants
import { constants } from "../constants";
import { routes } from "../routes";


export const MainPage: React.FC = ()=> {
    // states
    const [selectedRoute, setSelectedRoute] = useState('');

    // Effects
    useEffect(()=> {
        setSelectedRoute('users');
    }, []);

    // Event handlers
    const selectRoute = (value: string)=> setSelectedRoute(value);

    // Renderer
    return(
        <React.Fragment>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    color="transparent"
                    elevation={0}
                    sx={{ 
                        width: {xs: '100vw', sm: `calc(100% - ${constants.drawerWidth}px)`} , 
                        ml: {xs: '0px', sm: `${constants.drawerWidth}px`},
                        borderBottom: '1px solid #ccc' 
                    }}
                >
                    <Toolbar>
                        <Box sx={{display: {xs: 'flex', sm: 'none'}}}>
                            <SmallScreenNavigation
                                selected = {selectedRoute}
                                onSelect= {(newValue: string)=> selectRoute(newValue)}
                            />
                        </Box>
                        <Typography variant="h6" noWrap component="div">
                            Admin Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        display: {xs: 'none', sm: 'flex'},
                        width: constants.drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: constants.drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Box 
                        sx={{
                            height: '64px', 
                            display: "flex", 
                            alignItems: 'center', 
                            justifyContent: 'flex-start',
                            px: '16px',
                        }}
                    >
                        <FitbitIcon sx={{mr: '8px'}}/>
                        <Typography variant="h6">Company</Typography>
                    </Box>
                    <Divider/>
                    <List sx={{my: 0, py: 0}}>
                        {routes.map((route: RouteProps)=> {
                            return(
                                <ListItem 
                                    key={route?.key} 
                                    disablePadding
                                    onClick = {()=> selectRoute(route?.value)}
                                    sx={{
                                        my: 0, 
                                        py: 0,
                                    }}
                                >
                                    <ListItemButton
                                        selected = {selectedRoute === route?.value}
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
                </Drawer>
                <Box 
                    sx={{
                        flexGrow: 1, 
                        backgroundColor: '#fafafa', 
                        width: `calc(100vw - ${constants.drawerWidth}px)`
                    }}
                >
                    <Toolbar />
                    <ContentMount/>
                </Box>
            </Box>
        </React.Fragment>
    )
}