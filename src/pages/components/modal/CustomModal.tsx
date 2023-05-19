import React from 'react';

// Legacy Imports
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

// Models
import { CustomModalProps } from '../../../model/Types';

export const CustomModal: React.FC<CustomModalProps> = ({
    open,
    modalTitle,
    headerButtonIcon,
    modalContent,
    modalActionPrimaryButtonLabel,
    modalActionSecondaryButtonLabel,
    disableActionButtons,
    onClose,
    onClickHeaderButton,
    onClickActionPrimaryButton,
    onClickActionSecondaryButton,
})=> {

    // Renderer
    return(
        <React.Fragment>
            <Dialog 
                open={open} 
                onClose={onClose}
                PaperProps={{
                    style: {
                        borderRadius: '56px',
                        boxShadow: 'none',
                        width: '75vw',
                        padding: 0,
                    },
                }}
            >
                <DialogContent>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            px: '24px',
                        }}
                    >
                        <DialogTitle>{modalTitle}</DialogTitle>
                        {
                            headerButtonIcon && (
                                <IconButton 
                                    color={'secondary'}
                                    size={'small'}
                                    onClick={onClickHeaderButton}
                                >
                                    {headerButtonIcon}
                                </IconButton>
                            )
                        }
                    </Box>
                    
                </DialogContent>
                <DialogContent dividers>
                    <Box 
                        sx={{
                            width: '100%',
                            px: '24px',
                            maxHeight: '60vh',
                            overflow: 'scroll', 
                            scrollbarWidth: 'none',
                            '&::-webkit-scrollbar': {display: 'none'}
                        }}
                    >
                        {modalContent}
                    </Box>
                </DialogContent>
                <DialogActions sx={{p: '24px'}}>
                    <Button
                        variant={'outlined'}
                        sx={{
                            borderRadius: '16px',
                            border: '1px solid #a9aeb3',
                            color: '#a9aeb3',
                            ':hover': {
                                backgroundColor: '#a9aeb3',
                                color: '#fff',
                                border: '1px solid #a9aeb3',
                            }
                        }}
                        disabled={disableActionButtons? disableActionButtons: false}
                        onClick={onClickActionSecondaryButton}
                    >
                        {modalActionSecondaryButtonLabel}
                    </Button>
                    <Button
                        variant={'outlined'}
                        sx={{
                            borderRadius: '16px',
                            border: '1px solid #b838c1',
                            color: '#b838c1',
                            ':hover': {
                                backgroundColor: '#b838c1',
                                color: '#fff',
                                border: '1px solid #b838c1',
                            }
                        }}
                        disabled={disableActionButtons? disableActionButtons: false}
                        onClick={onClickActionPrimaryButton}
                    >
                        {modalActionPrimaryButtonLabel}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}