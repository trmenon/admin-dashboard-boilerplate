import React, {useState, useEffect} from "react";

// Legacy Imports
import Button from '@mui/material/Button';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';

// HOC Imports
import { CustomModal } from "../../components/modal/CustomModal";

// Models
import { OptionProps, NewUserTransportDataProps } from "../../../model/Types";
interface AddUserFeatureProps {
    onCreateUser: (data: NewUserTransportDataProps)=> void
}

// Constants
const roles_list: OptionProps[] = [
    {key: 'select-role-member-key', label: 'Member', value: 'member'},
    {key: 'select-role-admin-key', label: 'Admin', value: 'admin'},
]

export const AddUserFeature: React.FC<AddUserFeatureProps> = ({onCreateUser})=> {
    // States
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    // Effects
    useEffect(()=> {
        if(open === false) {
            setName('');
            setRole('');
            setEmail('');
        }
    }, [open])

    // Event Handlers
    const openModal = ()=> setOpen(true);
    const closeModal = ()=> setOpen(false);
    const transportData = ()=> {
        onCreateUser({name, email, role});
        setOpen(false);
    };

    // Renderer
    return(
        <React.Fragment>
            <Button 
                variant="outlined" 
                color='secondary'
                startIcon={<PersonAddOutlinedIcon />}
                onClick={openModal}
                sx={{borderRadius: '16px'}}
            >
                New User
            </Button>

            <CustomModal 
                open = {open}
                modalTitle = {'Add new user'}
                modalContent = {
                    <Stack spacing={'20px'} sx={{py: '16px'}}>
                        <TextField
                            label="Name" 
                            variant="outlined" 
                            value={name}
                            size={'medium'}
                            color={'secondary'}
                            onChange={(event: any)=> setName(event.target.value)}
                        />
                        <TextField
                            label="Email" 
                            variant="outlined" 
                            value={email}
                            size={'medium'}
                            color={'secondary'}
                            onChange={(event: any)=> setEmail(event.target.value)}
                        />
                        <TextField
                            label="Role" 
                            select
                            variant="outlined" 
                            value={role}
                            size={'medium'}
                            color={'secondary'}
                            onChange={(event: any)=> setRole(event.target.value)}
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
                modalActionPrimaryButtonLabel='Create'
                modalActionSecondaryButtonLabel='Cancel'
                onClose = {closeModal}
                onClickActionPrimaryButton = {transportData}
                onClickActionSecondaryButton = {closeModal}
            />
        </React.Fragment>
    )
}