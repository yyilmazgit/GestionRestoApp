import React from 'react'
import { List, ListItemText, Paper, ListItem, ListItemSecondaryAction, IconButton, ButtonGroup, Button, makeStyles } from '@material-ui/core';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import { roundTo2DecimalPoint } from "../../utils";

const useStyles = makeStyles(theme => ({
    paperRoot: {
        margin: '15px 0px',
        '&:hover': {
            cursor: 'pointer'
        },
        '&:hover $deleteButton': {
            display: 'block'
        }
    },
    buttonGroup: {
        backgroundColor: '#E3E3E3',
        borderRadius: 8,
        '& .MuiButtonBase-root ': {
            border: 'none',
            minWidth: '25px',
            padding: '1px'
        },
        '& button:nth-child(2)': {
            fontSize: '1.2em',
            color: '#000'
        }
    },
    deleteButton: {
        display: 'none',
        '& .MuiButtonBase-root': {
            color: '#E81719'
        },
    },
    totalPerItem: {
        fontWeight: 'bolder',
        fontSize: '1.2em',
        margin: '0px 10px'
    }
}))



export default function CommandeNourriture(props) {
    const {values, setValues}  = props;
    const classes = useStyles();
    let commandeNourriture = values.commandeDetails;
    const removeNourriture=(index, id)=>{
        debugger;
        let x ={...values};
        x.commandeDetails = x.commandeDetails.filter((_,i)=> i !== index);
        if (id != 0)
            x.deletedOrderitemsIds += id +',';
        setValues({ ...x});
    }

    const updateQuantite = (idx, value) =>{
        let x = {...values};
        let nourriture = x.commandeDetails[idx];
        if(nourriture.quantite + value > 0 ){
            nourriture.quantite += value;
            setValues ({ ...x});
        }
    }


    return (
        <List>
            {commandeNourriture.length === 0 ? 
                <ListItem>
                    <ListItemText
                        primary="Veuillez ajouter un plat"
                        primaryTypographyProps={{
                            style:{
                                textAlign: 'center',
                                fontStyle: 'italic'
                            }
                        }}
                    />  
                    
                </ListItem>

                : commandeNourriture.map((item,idx)=>(
                <Paper key={idx} className = {classes.paperRoot}>
                    <ListItem>
                        <ListItemText
                            primary={item.nourritureNom}
                            primaryTypographyProps={{
                                component: 'h1',
                                style:{
                                    fontWeight: '500',
                                    fontSize:'1.2em'
                                }
                            }}
                            secondary={
                                <>
                                    <ButtonGroup
                                        className={classes.buttonGroup}
                                        size="small">
                                        <Button onClick ={e=> updateQuantite(idx, -1)}>-</Button>    
                                        <Button disabled >{item.quantity}</Button>    
                                        <Button onClick ={e=> updateQuantite(idx, +1)}>+</Button>            
                                    </ButtonGroup>
                                    <span className={classes.totalPeritem}>
                                    {'€' + roundTo2DecimalPoint(item.quantite)* item.nourriturePrix}
                                    </span>
                                </>
                            }
                            secondTypographyProps={{component:'div'}}
                        />
                        <ListItemSecondaryAction
                            className={classes.deleteButton}>
                            <IconButton disableRipple onClick={e=>removeNourriture(idx, item.commandeDetailId)}>
                            <DeleteTwoToneIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </Paper>
            ))}
        </List>
    )
}