import React, { useRef, useState } from 'react';
import { Slider, Alert, Card, CardMedia, Button, Container, FormControl, FormLabel, FormControlLabel, RadioGroup, Grid, Radio, Typography, Paper, Stack, TextField } from '@mui/material';
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Link } from 'react-router-dom';

interface Journey {
    id: number
    departure: string
    return: string
    departureStationId: number
    departureStationName: string
    returnStationId: number
    returnStationName: string
    coveredDistance: number
    duration: number
}

const Stations: React.FC = (): React.ReactElement => {

    const lomakeRef = useRef<any>();
    const [stations, setstations] = useState<any[]>([]);
    const [virhe, setVirhe] = useState<string>("");

    const kaynnistaHaku = async (e: React.FormEvent): Promise<void> => {

        e.preventDefault();

        try {

            let url: string = `/api/journeys/stations?hakusana=${lomakeRef.current.hakusana.value}`;

            const yhteys = await fetch(url);

            if (yhteys.ok) {
                setstations(await yhteys.json());
                setVirhe("");
            } else {
                switch (yhteys.status) {
                    case 400: setVirhe("Virheellinen hakusana"); break;
                    default: setVirhe("Palvelimella tapahtui odottamaton virhe"); break;
                }
            }
        } catch (e: any) {
            setVirhe("Palvelimelle ei saada yhteyttä.")
        }
    }

    return (
        <Container>
            <Container>

                <Typography variant="h6" sx={{ marginBottom: 2 }}>Asemalistaus</Typography>

                <Paper
                    component="form"
                    onSubmit={kaynnistaHaku}
                    ref={lomakeRef}
                    elevation={2}
                    sx={{ padding: 2, marginBottom: 2 }}
                >
                    <Stack spacing={2}>

                        <Grid container spacing={1}>

                            <Grid item xs={10}>

                                <TextField
                                    name="hakusana"
                                    variant="outlined"
                                    size="small"
                                    fullWidth={true}
                                    placeholder="Hakusana..."
                                />

                            </Grid>
                            <Grid item xs={2}>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth={true}
                                >Hae</Button>

                            </Grid>
                        </Grid>
                    </Stack>
                </Paper>
               
            </Container>
            {(Boolean(virhe))
                ? <Alert severity="error">{virhe}</Alert>
                : stations.length ? <Grid container sx={{ marginTop: 5 }} spacing={2}>{stations.map((journey: Journey, idx: number) => {

                    return <Grid item container xs={12} lg={3} sx={{
                        justifyContent: 'space-between', boxShadow: 1, padding: 1, marginBottom: 2,
                        bgcolor: 'lightgray',
                    }}>
                        <Typography sx={{ maxWidth: '50%' }}>Asema nimeltä {journey.departureStationName}</Typography>
                        <Button
                            variant="contained"
                            size="small"
                            sx={{ opacity: '0.8', margin: 0.5, height: '100%' }}
                            component={Link}
                            to="/station"
                        >
                            <h4>Lisätietoa</h4>
                        </Button>
                    </Grid>
                })}</Grid> :
                    <Alert severity='info'>Suorita uusi haku</Alert>
            }

        </Container>
    );
}

export default Stations;
