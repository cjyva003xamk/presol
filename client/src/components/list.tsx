import React, { useRef, useState } from 'react';
import { Slider, Alert, Button, Container, FormControl, FormLabel, FormControlLabel, RadioGroup, Grid, Radio, Typography, Paper, Stack, TextField } from '@mui/material';
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

const Listing: React.FC = (): React.ReactElement => {

  const lomakeRef = useRef<any>();
  const [merkit, setmerkit] = useState<any[]>([]);
  const [virhe, setVirhe] = useState<string>("");
  const [sliderhaku, setSliderhaku] = useState<boolean>(false);
  const [expand, setExpand] = useState(false);
  const [value, setValue] = React.useState<number[]>([0, 10000]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const sliderhakupaalle = () => {
    setExpand((prevExpand) => !prevExpand);
    setSliderhaku((prevSliderhaku) => !prevSliderhaku);
  }

  const kaynnistaHaku = async (e: React.FormEvent): Promise<void> => {

    e.preventDefault();

    try {

      let url: string = `/api/journeys?hakusana=${lomakeRef.current.hakusana.value}&haettava=${lomakeRef.current.haettava.value}`;

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

  const kaynnistaSliderHaku = async (e: React.FormEvent): Promise<void> => {

    e.preventDefault();

    try {
      
      let url: string = `/api/journeys/slider?hakusana=${lomakeRef.current.hakusana.value}&haettava=${lomakeRef.current.haettava.value}&alaraja=${value[0]}&ylaraja=${value[1]}`;

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

        <Typography variant="h6" sx={{ marginBottom: 2 }}>Listaus kaikista tietokannasta löytyvistä journeystä</Typography>

        <Paper
          component="form"
          onSubmit={sliderhaku ? kaynnistaSliderHaku : kaynnistaHaku}
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

            <FormControl>
              <FormLabel>haettava</FormLabel>
              <RadioGroup
                row
                name="haettava"
                defaultValue={"departureStation"}
              >
                <FormControlLabel value="departureStation" control={<Radio />} label="departure station" />
                <FormControlLabel value="returnStation" control={<Radio />} label="Return station" />
              </RadioGroup>
            </FormControl>

          </Stack>

        </Paper>

        <Paper>
          <Button onClick={sliderhakupaalle} sx={{ width: '100%' }} variant={'contained'}>{expand ? "Ota matkarajaus pois käytöstä" : "Ota matkarajaus käyttöön"}<span>{expand ? <ArrowDropUp /> : <ArrowDropDown />}</span></Button>
          {expand &&
            <Stack>
              <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={0}
                max={10000}
              />
            </Stack>}

        </Paper>
      </Container>
      {(Boolean(virhe))
        ? <Alert severity="error">{virhe}</Alert>
        : merkit.length ? <Grid container sx={{ marginTop: 5 }} spacing={2}>{merkit.map((journey: Journey, idx: number) => {
          idx++; if (idx < 41) {
            return <Grid item xs={12} lg={3} sx={{ boxShadow: 1, padding: 1, marginBottom: 2, bgcolor: 'lightgray', }}>
              Matka lähti asemalta {journey.departureStationName}, matka kesti {(journey.duration / 60).toFixed(2)} minuuttia, ja oli pituudeltaan {journey.coveredDistance / 1000} kilometriä,
              päätepysäkki oli {journey.returnStationName}

            </Grid>
          } else { return <Typography variant='h6'>Haulla löytyi yli 40 Journeytä, näytetään vain ensimmäiset 40. Ole hyvä ja tarkenna hakua</Typography> }
        })}</Grid> :
          <Alert severity='info'>Suorita uusi haku</Alert>
      }

    </Container>
  );
}

export default Listing;
