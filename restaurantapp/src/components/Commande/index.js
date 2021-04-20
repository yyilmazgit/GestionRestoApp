import React from 'react';
import CommandeForm from './CommandeForm';
import { useForm } from '../../hooks/useForm';
import { Grid } from '@material-ui/core';
import CommandeNourriture from './CommandeNourriture';
import SearchNourriture from './SearchNourriture';


const generateCommandeNumber = () => Math.floor(100000 + Math.random()*900000).toString();    
const getModelDataObject =()=>({
    commandeMid :0,
    commandeNumber : generateCommandeNumber(),
    clientId: 0,
    paimentM :'none',
    fTotal:0,
    deletedOrderItemsIds:'',
    commandeDetails:[]

})    
export default function Commande () {

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetFormControls
    }=useForm(getModelDataObject)

   
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <CommandeForm
                    {...{
                        values,
                        setValues,
                        errors,
                        setErrors,
                        handleInputChange,
                        resetFormControls
                    }}
                />
            </Grid>

            <Grid item xs={6}>
                <SearchNourriture
                    {...{
                        values,
                        setValues
                    }}
                />
            </Grid>
            <Grid item xs={6}>
                <CommandeNourriture
                    {...{
                        values,
                        setValues
                    }}
                />
            </Grid>
        </Grid>
    )
}