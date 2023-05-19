import React from "react";

// Legacy Imports
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { deepPurple } from '@mui/material/colors';

// SVG Icon Imports
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// Models
import { TableContainerProps } from "../../../../model/Types";
interface SmallScreenTableContainerProps extends TableContainerProps {
    collapsableLabelMap: string;
    collapsableAvatarMap: string;
    collapsableDetailsMapList: string[];
}

export const SmallScreenTableContainer: React.FC<SmallScreenTableContainerProps> = ({
    tableHeader,
    tableData,
    selected,
    collapsableLabelMap,
    collapsableAvatarMap,
    collapsableDetailsMapList,
    onUpdateSelection,
})=> {

    // Event Handlers
    const handleSelectRowClick = (id: string)=> {
        if(selected.includes(id)) {
            const updated_selected_list = selected.filter((selected_item: any)=> selected_item !== id);
            onUpdateSelection(updated_selected_list);
        }else {
            onUpdateSelection([...selected, id]);
        }
    }

    // Renderer
    return(
        <React.Fragment>
            <Box 
                sx={{
                    width: '100%',
                    height: `calc(100vh - 320px)`,
                    overflow: 'scroll', 
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': {display: 'none'}
                }}
            >
                <Table 
                    sx={{ minWidth: '100%', }} 
                    size="small"
                    stickyHeader
                >
                    <TableBody 
                        sx={{
                            maxHeight: `calc(100vh - 264px)`,
                            overflow: 'scroll',
                            backgroundColor: '#fdfdfd'
                        }}
                    >
                        {
                            tableData.map((data_item: any)=> {
                                return (
                                    <TableRow
                                        key={data_item.id}
                                        sx={{ 
                                            '&:last-child td, &:last-child th': { border: 0 },
                                            backgroundColor: selected.includes(data_item.id)? '#c0a7eb': 'inherit' 
                                        }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                icon={<CircleOutlinedIcon />}
                                                checkedIcon={<Brightness1Icon />}
                                                color="success"
                                                checked={selected.includes(data_item.id)}
                                                onChange={()=> handleSelectRowClick(data_item.id)}
                                            />
                                        </TableCell>
                                        <TableCell align="left">
                                            <Accordion
                                                square
                                                sx={{
                                                    boxShadow: 'none',
                                                    border: `none`,
                                                    backgroundColor: selected.includes(data_item.id)? '#c0a7eb': 'inherit'
                                                }}
                                            >
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                    <Stack 
                                                        direction={'row'} 
                                                        spacing={'24px'}
                                                        sx={{
                                                            display: 'flex', 
                                                            alignitems: 'center', 
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        <Avatar 
                                                            sx={{ 
                                                                bgcolor: deepPurple[600], 
                                                                width: 24, 
                                                                height: 24,
                                                                fontSize: '0.8em',
                                                            }}
                                                        >
                                                            {data_item[`${collapsableAvatarMap}`]}
                                                        </Avatar>
                                                        <Typography sx={{ color: 'text.secondary' }}>
                                                            {data_item[`${collapsableLabelMap}`]}
                                                        </Typography>
                                                    </Stack> 
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Stack direction={'column'} spacing={'4px'}>
                                                        {
                                                            collapsableDetailsMapList.map((key: string)=> {
                                                                return(
                                                                    <Chip 
                                                                        key={`chip-key-${key}`}
                                                                        label={data_item[`${key}`] || ''}
                                                                        icon={<InfoOutlinedIcon />}
                                                                        variant="outlined" 
                                                                        color={'secondary'} 
                                                                        sx={{
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'flex-start',
                                                                            
                                                                        }}
                                                                    />
                                                                )
                                                            })
                                                        }
                                                    </Stack>
                                                </AccordionDetails>
                                            </Accordion>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </Box>
        </React.Fragment>
    )
}