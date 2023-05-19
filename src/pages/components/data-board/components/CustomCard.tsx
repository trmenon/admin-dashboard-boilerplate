import React, {useState} from 'react';

// Legacy Imports
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { orange } from '@mui/material/colors';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// Models
import { OptionProps, ResponseDataElementProps } from '../../../../model/Types';
interface CustomCardProps {
    primaryLabel: String;
    secondaryLabel?: String;
    avatarIcon: React.ReactNode;
    content: any,
    contentMappingKeys: String[];
}

export const CustomCard: React.FC<CustomCardProps> = ({
    primaryLabel,
    secondaryLabel,
    avatarIcon,
    content,
    contentMappingKeys,
})=> {
    // State
    const [open, setOpen] = useState(false)

    // Event handlers
    const handleClick = ()=> setOpen(open === false)

    // Renderer
    return(
        <React.Fragment>
            <Card 
                sx={{ 
                    width: '100%', 
                    backgroundColor: '#FFF',
                    borderRadius: '32px' 
                }}
            >
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: orange[600] }}>
                            {avatarIcon}
                        </Avatar>
                    }
                    title={primaryLabel}
                    subheader={secondaryLabel || ''}
                    titleTypographyProps={{sx:{textAlign: 'left', color: '#1c232c', fontWeight: 600} }}
                />
                {
                    open && (
                        <CardContent sx={{borderTop: '1px solid #CCC', }}>
                            <Stack spacing={'12px'} >
                                {
                                    contentMappingKeys.map((element: String)=> {
                                        return(   
                                            <Chip 
                                                key={`card-content-detail-${element}-key`}
                                                label={content[`${element}`] || ''}
                                                icon={<InfoOutlinedIcon />}
                                                variant="outlined" 
                                                color={'warning'} 
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'flex-start'
                                                }}
                                            /> 
                                        )
                                    })
                                }
                            </Stack>
                        </CardContent>
                    )
                }
                <CardActions 
                    disableSpacing 
                    sx={{
                        borderTop: '1px solid #CCC', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'flex-end',
                        px: '24px'
                    }}
                >
                    <Button
                        variant={'text'}
                        color={'warning'}
                        size={'small'}
                        startIcon={open?<VisibilityOffOutlinedIcon/>:<VisibilityOutlinedIcon />}
                        onClick={handleClick}
                    >
                        {open?'Close':'Open'}
                    </Button>
                </CardActions>
            </Card>
        </React.Fragment>
    )
}