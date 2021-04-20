import React, { useState, useEffect } from 'react'
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import Table from "../../layouts/Table";
import { TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import DeleteOutlineTwoToneIcon from '@material-ui/icons/DeleteOutlineTwoTone';

export default function CommandeList(props) {

    const { setCommandeId, setCommandeListVisibility, resetFormControls, setNotify } = props;
    const [commandeList, setCommandeList] = useState([]);

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.COMMANDE).fetchAll()
            .then(res => {
                setCommandeList(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const showForUpdate = id => {
        setCommandeId(id);
        setCommandeListVisibility(false);
    }

    const deleteCommande = id => {
        if (window.confirm('Voulez vous supprimer cette commande ?')) {
            createAPIEndpoint(ENDPOINTS.COMMANDE).delete(id)
                .then(res => {
                    setCommandeListVisibility(false);
                    setCommandeId(0);
                    resetFormControls();
                    setNotify({ isOpen: true, message: 'Supprimé avec succès' });
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Commande No.</TableCell>
                        <TableCell>Client</TableCell>
                        <TableCell>Payé avec</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        commandeList.map(item => (
                            <TableRow key={item.commandeMId}>
                                <TableCell
                                    onClick={e => showForUpdate(item.commandeMId)}>
                                    {item.commandeNumber}
                                </TableCell>
                                <TableCell
                                    onClick={e => showForUpdate(item.commandeMId)}>
                                    {item.client.clientNom}
                                </TableCell>
                                <TableCell
                                    onClick={e => showForUpdate(item.commandeMId)}>
                                    {item.paimentM}
                                </TableCell>
                                <TableCell
                                    onClick={e => showForUpdate(item.commandeMId)}>
                                    {item.fTotal}
                                </TableCell>
                                <TableCell>
                                    <DeleteOutlineTwoToneIcon
                                        color="secondary"
                                        onClick={e => deleteCommande(item.commandeMId)} />
                                </TableCell>

                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}
