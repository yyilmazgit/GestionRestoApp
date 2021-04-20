import React, {useState, useEffect} from 'react';
import {createAPIEndpoint,ENDPOINTS} from "../../api";
import { List, ListItem, ListItemText, Paper, InputBase, IconButton, makeStyles, ListItemSecondaryAction } from '@material-ui/core';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ExposurePlus1Icon from '@material-ui/icons/ExposurePlus1';

const useStyles = makeStyles(theme => ({
    searchPaper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    searchInput: {
        marginLeft: theme.spacing(1.5),
        flex: 1,
    },
    listRoot: {
        marginTop: theme.spacing(1),
        maxHeight: 450,
        overflow: 'auto',
        '& li:hover': {
            cursor: 'pointer',
            backgroundColor: '#E3E3E3'
        },
        '& li:hover .MuiButtonBase-root': {
            display: 'block',
            color: '#000',
        },
        '& .MuiButtonBase-root': {
            display: 'none'
        },
        '& .MuiButtonBase-root:hover': {
            backgroundColor: 'transparent'
        }
    }
}))

export default function SearchNourriture(props) {
    let {values, setValues} = props;
    let commandeNourriture = values.commandeDetails;
    const[searchList, setSearchList]= useState([]);
    const[nourritures, setNourritures] = useState([]);
    const[searchKey, setSearchKey] = useState('');
    const classes = useStyles();
    useEffect(()=>{
        createAPIEndpoint(ENDPOINTS.NOURRITURE).fetchAll()
        .then(res => {
            setNourritures(res.data)
            setSearchList(res.data)
        })
        .catch(err=>console.log(err))
    },[])

    useEffect(() => {
        let x = [...nourritures];
        x = x.filter(y => {
            return y.nourritureNom.toLowerCase().includes(searchKey.toLocaleLowerCase())
                && commandeNourriture.every(item => item.nourritureId != y.nourritureId)
        });
        setSearchList(x);
    }, [searchKey, commandeNourriture])
    const addNourriture = nourriture => {
        let x = {
            commandeMid: values.commandeMid,
            commandeDetailId: 0,
            nourritureId: nourriture.nourritureId,
            quantite: 1,
            nourriturePrix: nourriture.prix,
            nourritureNom: nourriture.nourritureNom
        }
        setValues({
            ...values,
            commandeDetails: [...values.commandeDetails, x]
        })
    }
        return (
            <>
            <Paper className={classes.searchPaper}>
                <InputBase className={classes.searchInput} value={searchKey} onChange={e=> setSearchKey(e.target.value)} placeholder ="Rechercher des plats"/>
                <IconButton>
                    <SearchTwoToneIcon/>
                </IconButton>
            </Paper>
            <List className={classes.listRoot}>
            {
                searchList.map((item,idx)=>(
                    <ListItem key={idx}>
                        <ListItemText 
                        primary={item.nourritureNom}
                        secondary={item.prix + '€'}/>
                        <ListItemSecondaryAction>
                            <IconButton onClick ={e=>addNourriture(item)}>
                                <ExposurePlus1Icon/>
                                <ArrowForwardIosIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                        
                    </ListItem>
                ))
            }
            </List>
            </>
            
        )
    }