import React, { useRef, useState } from 'react';
import { Slider, Alert, Card, CardMedia, Button, Container, FormControl, FormLabel, FormControlLabel, RadioGroup, Grid, Radio, Typography, Paper, Stack, TextField } from '@mui/material';
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

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

const SingleStation: React.FC = (): React.ReactElement => {

  const lomakeRef = useRef<any>();
  const [merkit, setmerkit] = useState<any[]>([]);
  const [virhe, setVirhe] = useState<string>("");


  
  

  const kaynnistaHaku = async (e: React.FormEvent): Promise<void> => {

    e.preventDefault();


      try {

        let url: string = `/api/journeys`;

        const yhteys = await fetch(url);

        if (yhteys.ok) {
          setmerkit(await yhteys.json());
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


        <Typography variant="h6" sx={{ marginBottom: 2 }}>Aseman tiedot</Typography>

    
      </Container>
      {(Boolean(virhe))
        ? <Alert severity="error">{virhe}</Alert>
        : merkit.length ? <Grid container sx={{marginTop:5}} spacing={2}>{merkit.map((journey: Journey, idx: number) => {
          idx++; if (idx < 41) {
            return <Grid item xs={12} lg={3} sx={{ boxShadow: 1, padding: 1, marginBottom:2, bgcolor:'lightgray', }}>
              Matka lähti asemalta {journey.departureStationName}, matka kesti {journey.duration/60} minuuttia, ja oli pituudeltaan {journey.coveredDistance/1000} kilometriä,
              päätepysäkki oli {journey.returnStationName}
              
            </Grid>
          } else { return <Typography variant='h6'>Haulla löytyi yli 40 Journeyä, näytetään vain ensimmäiset 40. Ole hyvä ja tarkenna hakua</Typography> }
        })}</Grid> :
          <Alert severity='info'>Jotain meni vikaan</Alert>
      }

    </Container>
  );
}

export default SingleStation;
