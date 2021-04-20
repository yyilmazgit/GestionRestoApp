import React from 'react';
import Form from '../../layouts/Form';
import {ButtonGroup, Grid, InputAdornment, makeStyles, Button as MuiButton} from '@material-ui/core';
import {Input, Select, Button} from '../../controls/';
import {useState, useEffect} from 'react';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import ReorderIcon from '@material-ui/icons/Reorder';
import {createAPIEndpoint, ENDPOINTS} from '../../api'
import Popup from '../../layouts/Popup';
import CommandeListe from './CommandeListe';
import Notification from "../../layouts/Notification";
import { roundTo2DecimalPoint } from "../../utils";
const paimentMs=[
    {id: 'none', title: 'none'},
    {id: 'Especes', title: 'Especes'},
    {id: 'Carte', title: 'Carte Bancaire'},]

const useStyles = makeStyles(theme => ({
    designText: {
        '& .MuiTypography-root': {
            color: '#f3b33d',
            fontWeight: 'bolder',
            fontSize: '1.5em'
        }
    },
    appliquerButtonGroup: {
        backgroundColor: '#f3b33d',
        color: '#000',
        margin: theme.spacing(1),
        '& .MuiButton-label': {
            textTransform: 'none'
        },
        '&:hover': {
            backgroundColor: '#f3b33d',
        }
    },

    appliquerButton:{
        margin: theme.spacing(1),
    }
}))  

export default function CommandeForm (props) {

    const{values, setValues, errors, handleInputChange, setErrors, resetFormControls} = props;
    const classes = useStyles();
    const [listeClient, setListeClient] = useState([]);
    const [commandeListVisibility, setCommandeListVisibility] = useState(false);
    const [commandeId, setCommandeId] = useState(0);
    const [notify, setNotify] = useState({ isOpen: false })

    
    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.CLIENT).fetchAll()
            .then(res => {
                let listeClient = res.data.map(item => ({
                    id: item.clientID,
                    title: item.clientNom
                }));
                listeClient = [{ id: 0, title: 'Select' }].concat(listeClient);
                setListeClient(listeClient);
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        let fTotal = values.commandeDetails.reduce((tempTotal, item) => {
            return tempTotal + (item.quantite * item.nourriturePrix);
        }, 0);
        setValues({
            ...values,
            fTotal: roundTo2DecimalPoint(fTotal)
        })

    }, [JSON.stringify(values.commandeDetails)]);

    useEffect(() => {
        if (commandeId == 0) resetFormControls()
        else {
            createAPIEndpoint(ENDPOINTS.COMMANDE).fetchById(commandeId)
                .then(res => {
                    setValues(res.data);
                    setErrors({});
                })
                .catch(err => console.log(err))
        }
    }, [commandeId]);
    
    const validateForm = () => {
        let temp = {};
        temp.clientId = values.clientId !== 0 ? "" : "Champs requis.";
        temp.paimentM = values.pMethod !== "none" ? "" : "Champs requis.";
        temp.commandeDetails = values.commandeDetails.length !== 0 ? "" : "Champs requis.";
        setErrors({ ...temp });
        return Object.values(temp).every(x => x === "");
    }

    
    const resetForm = () => {
        resetFormControls();
        setCommandeId(0);
    }

    const submitCommande = e => {
        e.preventDefault();
        if (validateForm()) {
            if (values.commandeMId == 0) {
                createAPIEndpoint(ENDPOINTS.COMMANDE).create(values)
                    .then(res => {
                        resetFormControls();
                        setNotify({isOpen:true, message:'Nouvelle commande créée'});
                    })
                    .catch(err => console.log(err));
            }
            else {
                createAPIEndpoint(ENDPOINTS.COMMANDE).update(values.commandeMId, values)
                    .then(res => {
                        setCommandeId(0);
                        setNotify({isOpen:true, message:'Nouvelle commande créée'});
                    })
                    .catch(err => console.log(err));
            }
        }

    }
    const openListeCommandes = () => {
        setCommandeListVisibility(true);
    }
    return(
        <>
        <Form onSubmit={submitCommande}>
            <Grid container>
                <Grid item xs={6}>
                    <Input 
                    disabled = {true} 
                    label="Numéro de Commande" 
                    name="commandeNumber" 
                    value={values.commandeNumber}
                    InputProps={{
                        startAdornment :
                        <InputAdornment 
                        className={classes.designText}
                        position ="start">#</InputAdornment>}}
                    ></Input>
                <Select 
                    label="Client" 
                    name="clientId"
                    values ={values.clientId}
                    onChange = {handleInputChange}
                    options = {listeClient} 
                    error={errors.clientId}
                    />
                
                </Grid>

                <Grid item xs={6}>
                    <Input 
                    disabled = {true} 
                    label="Total" 
                    name="fTotal" 
                    value={values.fTotal} 
                    onChange = {handleInputChange}
                    InputProps={{startAdornment :<InputAdornment position ="start" className={classes.designText}
                    >€</InputAdornment>}}
                    ></Input>
                    <Select 
                    label="Méthode de Paiement" 
                    name="paimentM"
                    onChange = {handleInputChange} 
                    options = {paimentMs}
                    value={values.paimentM}
                    error={errors.paimentM}/>
                
                <ButtonGroup className = {classes.appliquerButtonGroup}>
                    <MuiButton 
                        size="large" 
                        type ="submit" 
                        endIcon={<RestaurantIcon/>}>Appliquer </MuiButton>
                    <MuiButton 
                        size="small" 
                        onClick={resetForm} 
                        startIcon={<RotateLeftIcon/>}/>
                </ButtonGroup>
                <Button 
                    size="large" 
                    onClick={openListeCommandes} 
                    startIcon={<ReorderIcon />}>Commandes</Button>
                </Grid>
            </Grid>
        </Form>
        <Popup
                title="Liste des commandes"
                openPopup={commandeListVisibility}
                setOpenPopup={setCommandeListVisibility}>
                <CommandeListe
                    {...{ setCommandeId, setCommandeListVisibility,resetFormControls,setNotify }} />
            </Popup>
            <Notification
                {...{ notify, setNotify }} />
        </>
        )


}