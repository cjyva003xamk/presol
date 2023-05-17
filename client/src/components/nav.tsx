import React, { useRef, useState } from 'react';
import { Box, Tabs, Tab, Slider, Alert, Card, CardMedia, Button, Container, FormControl, List, ListItem, ListItemText, FormLabel, FormControlLabel, RadioGroup, Grid, Radio, Typography, Paper, Stack, TextField } from '@mui/material';
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Navi: React.FC = (): React.ReactElement => {

    return (
        <Box
            sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                width: '100%',
                paddingTop: '0.8rem',
                paddingBottom: '0.8rem',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                boxShadow: '0px 0px 10px white',
            }}
        >

            <Tabs allowScrollButtonsMobile aria-label="sivunavigaatio" variant="scrollable" value={1}
                TabIndicatorProps={{ style: { height: '0px', } }}
                sx={{
/*                backgroundColor: 'rgba(255, 255, 0, 0.1)', 
*/            padding: 0.5,
                }}>

                <Button
                variant="contained"
                size="medium"
                    component={Link}
                    sx={{ opacity: '0.8', borderRadius: 100, margin: 0.5, minWidth: '100px', }}
                    to="/"
                >
                    <h4>Etusivulle</h4>
                </Button>
                
                <Button
                    variant="contained"
                    size="medium"
                    sx={{ opacity: '0.8', borderRadius: 100, margin: 0.5, minWidth: '116px' }}
                    component={Link}
                    to="/list"
                >
                    < h4 style={{ wordBreak: 'break-word', hyphens: 'auto' }}>Lista</h4>
                </Button>

                <Button
                    variant="contained"
                    size="medium"
                    sx={{ opacity: '0.8', borderRadius: 100, margin: 0.5, minWidth: '100px', }}
                    component={Link}
                    to="/new"
                >
                    <h4>Lisää uusi</h4>
                </Button> 
            </Tabs>
        </Box>
    );
}

export default Navi;
