// Layout of the main container is divided into Head and Body
// Head contains Button for adding new user (Viz: <AddUserFeature>)
// Head button also contains toggle-buttons to toggle between Board and Table Layout

import React, {useState, useEffect} from 'react';

// Utilitites
import axios from 'axios';

// Legacy Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';


// HOC Imports
import { DataTable } from '../components/data-table/DataTable';
import { DataBoard } from '../components/data-board/DataBoard';
import { AddUserFeature } from './components';

// models
import { 
    ResponseDataElementProps, 
    DataTableHeader,
    NewUserRequestDataProps,
    NewUserTransportDataProps, 
} from "../../model/Types";

// Constants
import { constants } from '../../constants';
const tableHeaders: DataTableHeader[] = [
    {key: 'table-header-id-key', label: 'Id', value: 'id'},
    {key: 'table-header-name-key', label: 'Name', value: 'name'},
    {key: 'table-header-email-key', label: 'Email', value: 'email'},
    {key: 'table-header-role-key', label: 'Role', value: 'role'},
]

export const ContentMount: React.FC = ()=> {
    // State
    const [data, setData] = useState<ResponseDataElementProps[]>([]);
    const [renderData, setRenderData] = useState<ResponseDataElementProps[]>([])
    const [table, setTable] = useState(false);
    const [limit, setLimit] = useState('');
    const [total, setTotal] = useState(0);
    const [current, setCurrent] = useState(1);
    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    // Effects
    useEffect(()=> {
        fetchData();
        setTable(true);
        setLimit('10');
    }, []);
    useEffect(()=> {makeRenderData()}, [data, search]);
    useEffect(()=> {
        let total_pages: number = Math.floor(renderData.length/Number(limit));
        if( renderData.length%Number(limit)> 0) {
            total_pages++;
        }
        setTotal(total_pages);
        if(total_pages<current) {
            setCurrent(1);
        }
    }, [renderData, limit]);

    // Trackers
    // useEffect(()=> {console.log(data)}, [data]);

    // API Call
    const fetchData = ()=> {
        try{
            axios.get(constants['baseurl'])
            .then((response)=> {
                if(
                    response &&
                    response?.status === 200 &&
                    response?.data && 
                    Array.isArray(response?.data)
                ) {
                    setData(response?.data)
                }
            }).catch((error)=> {
                console.log(error);
            })
        }catch(err) {
            console.log(err);
        }
    }

    // Event Handlers
    const openModal = ()=> setModalOpen(true);
    const closeModal = ()=> setModalOpen(false);
    const setView = (
        event: React.MouseEvent<HTMLElement>,
        newView: boolean,
    )=> setTable(newView);
    const changeResultsPerPage = (value: string)=> setLimit(value);
    const loadNextPage = ()=> {
        if(current < total) {
            setCurrent(current+1);
        }
    }
    const loadPreviousPage = ()=> {
        if(current>1) {
            setCurrent(current-1);
        }
    }
    const setFirstPage = ()=> setCurrent(1);
    const setLastPage = ()=> setCurrent(total);
    const updateSearch = (value: string) => setSearch(value);
    const makeRenderData = ()=> {
        if(search.length > 0) {
            const regEx_string = `^${search}`;
            const regexp = new RegExp(regEx_string);
            const refined_data =  data.filter((data_item: ResponseDataElementProps)=> 
                regexp.test(data_item.name)
            );
            setRenderData(refined_data);
        }else{
            setRenderData(data);
        }
    }
    const handleDelete = (rows: string[])=> {
        const updated_data = data.filter((data_item: ResponseDataElementProps) => {
            return rows.includes(data_item?.id) === false;
        });
        setData(updated_data);
    }
    const addNewUser = (modal_data: NewUserTransportDataProps)=> {
        const create_data: NewUserRequestDataProps = {
            ...modal_data,
            id: (data.length+1).toString(),
        };
        // Adding new user to data
        setData([...data, create_data]);
    }
    const updateUser = (value: NewUserRequestDataProps, id: string)=> {
        let req_data = data.findIndex((item: ResponseDataElementProps)=> item?.id === id);
        if(req_data >= 0) {
            const new_data_list = data.map((data_item: ResponseDataElementProps)=> {
                if(data_item?.id === id) {
                    return value;
                }
                return data_item;
            })
            setData(new_data_list);
        }
    }

    // Renderer
    return(
        <React.Fragment>
            
            <Box sx={{width: '100%'}}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        my: '12px',
                        px: '24px',
                    }}
                >
                    <ToggleButtonGroup
                        color="secondary"
                        value={table}
                        exclusive
                        size='small'
                        onChange={setView}
                        aria-label="Platform"
                    >
                        <ToggleButton value={true} sx={{borderRadius: '16px'}}>
                            <TableChartOutlinedIcon/>                          
                        </ToggleButton>
                        <ToggleButton value={false} sx={{borderRadius: '16px'}}>
                            <DashboardOutlinedIcon/>
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <AddUserFeature onCreateUser={addNewUser}/>
                </Box>
                <Box 
                    sx={{
                        mt: '0px', 
                        width: '100%',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center'
                    }}
                >
                    {
                        table?
                            <DataTable 
                                tableName={'User Listing'}
                                data={renderData.slice((current-1)*Number(limit), ((current-1)*Number(limit))+Number(limit))}
                                headers={tableHeaders}
                                resultsPerPage={limit}
                                onChangeResultsPerPage={changeResultsPerPage}
                                currentPage={current}
                                totalPages={total}
                                onNextPage={loadNextPage}
                                onPreviousPage={loadPreviousPage}
                                onFirstPage={setFirstPage}
                                onLastPage={setLastPage}
                                searchQuery={search}
                                onUpdateSearchQuery = {updateSearch}
                                onDeleteRows={handleDelete}
                                collapsableLabelMap='name'
                                collapsableAvatarMap='id'
                                collapsableDetailsMapList={['email', 'role']}
                                onUpdate={updateUser}
                            />
                            :
                            <DataBoard
                                boardName='User Board'
                                data={renderData.slice((current-1)*Number(limit), ((current-1)*Number(limit))+Number(limit))}
                                currentPage={current}
                                totalPages={total}
                                onNextPage={loadNextPage}
                                onPreviousPage={loadPreviousPage}
                                onFirstPage={setFirstPage}
                                onLastPage={setLastPage}
                                searchQuery={search}
                                onUpdateSearchQuery = {updateSearch}
                                primaryLabelMappingKey='name'
                                contentLabelMappingKeyList={['id','email', 'role']}
                            />
                    }
                    
                </Box>
            </Box>
        </React.Fragment>
    )
}