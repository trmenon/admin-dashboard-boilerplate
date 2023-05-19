import React, {useState, useEffect} from 'react';

// Legacy Imports
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';

// SVG Icon Imports
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

// HOC Imports
import { CustomModal } from '../../modal/CustomModal';

// Models
import { 
    TableContainerProps, 
    TableHeaderProps, 
    NewUserRequestDataProps,
    OptionProps 
} from '../../../../model/Types';
interface WideScreenTableProps extends TableContainerProps {
    onUpdateItem: (newValue: any, id: string)=> void;
}

// Constants
const roles_list: OptionProps[] = [
    {key: 'select-role-member-key', label: 'Member', value: 'member'},
    {key: 'select-role-admin-key', label: 'Admin', value: 'admin'},
]

export const WideScreenTableContainer : React.FC <WideScreenTableProps> = ({
    tableHeader,
    tableData,
    selected,
    onUpdateSelection,
    onUpdateItem,
})=> {
    // State
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [selectedData, setSelectedData] = useState<NewUserRequestDataProps>({id: '', name: '', role: '', email: ''});


    // Event Handlers
    const closeModal = ()=> setOpen(false);
    const handleMasterSelectClick = ()=> {
        let selected_list: string[] = [];
        if(selected.length < tableData.length){
            selected_list = tableData.map((element:any )=> { return element?.id});
        }
        onUpdateSelection(selected_list);
    };
    const handleSelectRowClick = (id: string)=> {
        if(selected.includes(id)) {
            const updated_selected_list = selected.filter((selected_item: any)=> selected_item !== id);
            onUpdateSelection(updated_selected_list);
        }else {
            onUpdateSelection([...selected, id]);
        }
    }
    const selectItem= (data: NewUserRequestDataProps)=>  {setOpen(true);setSelectedData(data)};
    const handleDisabledClick = ()=> setDisabled(disabled === false);
    const handlePrimaryClick = ()=> {
        if(open) {
            const transportData: NewUserRequestDataProps = {
                id: selectedData['id'],
                name: selectedData['name'],
                email: selectedData['email'],
                role: selectedData['role']
            }
            onUpdateItem(transportData, transportData?.id);
            setOpen(false);
            setSelectedData({id: '', name: '', role: '', email: ''})            
        }
    }

    // Renderer
    return(
        <React.Fragment>
            <CustomModal 
                open = {open}
                modalTitle = {`${disabled? 'View': 'Update'} user`}
                headerButtonIcon={disabled? <EditOutlinedIcon/>: <VisibilityOutlinedIcon/>}
                modalContent={
                    <Stack spacing={'12px'} sx={{py: '12px'}}>
                        <TextField
                            label="Id" 
                            disabled={true}
                            variant="outlined" 
                            value={selectedData['id']}
                            size={'medium'}
                            color={'secondary'}
                        />
                        <TextField
                            label="Name" 
                            disabled={disabled}
                            variant="outlined" 
                            value={selectedData['name']}
                            size={'medium'}
                            color={'secondary'}
                            onChange={(event: any)=> setSelectedData({...selectedData, name: event.target.value})}
                        />
                        <TextField
                            label="Email" 
                            disabled={disabled}
                            variant="outlined" 
                            value={selectedData['email']}
                            size={'medium'}
                            color={'secondary'}
                            onChange={(event: any)=> setSelectedData({...selectedData, email: event.target.value})}
                        />
                        <TextField
                            label="Role" 
                            select
                            disabled={disabled}
                            variant="outlined" 
                            value={selectedData['role']}
                            size={'medium'}
                            color={'secondary'}
                            onChange={(event: any)=> setSelectedData({...selectedData, role: event.target.value})}
                        >
                            {
                                roles_list.map((item: OptionProps)=> {
                                    return (
                                        <MenuItem key={item.key} value={item.value}>
                                            {item.label}
                                        </MenuItem>
                                    )
                                })
                            }
                        </TextField>
                    </Stack>
                }
                modalActionPrimaryButtonLabel='Save'
                modalActionSecondaryButtonLabel='Cancel'
                disableActionButtons={disabled}
                onClose = {closeModal}
                onClickHeaderButton={handleDisabledClick}
                onClickActionPrimaryButton = {handlePrimaryClick}
                onClickActionSecondaryButton = {closeModal}
            />
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
                    <TableHead>
                        <TableRow sx={{"& th": {color: "#313134",backgroundColor: "#E3ddff"}}}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    icon={<CircleOutlinedIcon />}
                                    checkedIcon={<Brightness1Icon />}
                                    color="success"
                                    checked={selected.length === tableData.length}
                                    onChange={handleMasterSelectClick}
                                />
                            </TableCell>
                            {
                                tableHeader.filter((head: TableHeaderProps)=> head?.active === true)
                                .map((activehead: TableHeaderProps)=> {
                                    return(
                                        <TableCell
                                            key={activehead?.key} 
                                            align="left"
                                            sx={{fontWeight: 600,fontSize: '1.1em'}}
                                        >
                                            {activehead?.label}
                                        </TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody 
                        sx={{
                            maxHeight: `calc(100vh - 264px)`,
                            overflow: 'scroll',
                            backgroundColor: '#fdfdfd'
                        }}
                    >
                        {
                            tableData.map((list_item: any)=> {
                                return (
                                    <TableRow
                                        key={list_item.id}
                                        sx={{ 
                                            '&:last-child td, &:last-child th': { border: 0 },
                                            backgroundColor: selected.includes(list_item.id)? '#c0a7eb': 'inherit'
                                        }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                icon={<CircleOutlinedIcon />}
                                                checkedIcon={<Brightness1Icon />}
                                                color="success"
                                                checked={selected.includes(list_item.id)}
                                                onChange={()=> handleSelectRowClick(list_item.id)}
                                            />
                                        </TableCell>
                                        {
                                            tableHeader
                                            .filter((head: TableHeaderProps)=> head?.active === true)
                                            .map((activehead: TableHeaderProps)=> {
                                                return(
                                                    <TableCell
                                                        key={`data-${activehead?.key}`} 
                                                        align="left"
                                                        sx={{color: '#1c232c', '&:hover': {cursor: 'pointer'}}}
                                                        onClick = {()=> selectItem(list_item)}
                                                    >
                                                        {list_item[`${activehead?.value}`]}
                                                    </TableCell>
                                                )
                                            })
                                        }
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