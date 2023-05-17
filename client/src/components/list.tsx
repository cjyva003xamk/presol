import React, { useRef, useState } from 'react';
import { Slider, Alert, Card, CardMedia, Button, Container, FormControl, FormLabel, FormControlLabel, RadioGroup, Grid, Radio, Typography, Paper, Stack, TextField } from '@mui/material';
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

interface Postimerkki {
  id: number
  asiasanat?: string
  ilmestymispaiva?: string
  kaytonPaattyminen?: string
  nimellisarvo?: number
  merkinNimi?: string
  merkinVari?: string
  painopaikka?: string
  painosmaara: number
  taiteilija?: string
  valuutta?: string
  kuvanUrl?: string
}

const Listing: React.FC = (): React.ReactElement => {

  const lomakeRef = useRef<any>();
  const [merkit, setmerkit] = useState<any[]>([]);
  const [virhe, setVirhe] = useState<string>("");
  const [sliderhaku, setSliderhaku] = useState<boolean>(false);
  const [expand, setExpand] = useState(false);
  const [value, setValue] = React.useState<number[]>([1855, 2021]);


  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const sliderhakupaalle = () => {
    setExpand((prevExpand) => !prevExpand);
    setSliderhaku((prevSliderhaku) => !prevSliderhaku);
    
  }
  

  const kaynnistaHaku = async (e: React.FormEvent): Promise<void> => {

    e.preventDefault();

    if (lomakeRef.current.hakusana.value.length > 1) {

      try {

        let url: string = `/api/merkit?hakusana=${lomakeRef.current.hakusana.value}&haettava=${lomakeRef.current.haettava.value}`;

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
    } else {
      setVirhe("Hakusanan tulee olla vähintään kaksi merkkiä pitkä.");
    }
  }

  const kaynnistaSliderHaku = async (e: React.FormEvent): Promise<void> => {

    e.preventDefault();

    if (lomakeRef.current.hakusana.value.length > 1) {

      try {

        let url: string = `/api/merkit/slider?hakusana=${lomakeRef.current.hakusana.value}&haettava=${lomakeRef.current.haettava.value}&alaraja=${value[0]}&ylaraja=${value[1]}`;

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
    } else {
      setVirhe("Hakusanan tulee olla vähintään kaksi merkkiä pitkä.");
    }
  }


  return (
    <Container>
      <Container>


        <Typography variant="h6" sx={{ marginBottom: 2 }}>Listaus tietokannasta löytyvistä tietueista</Typography>

        <Paper
          component="form"
          onSubmit={sliderhaku? kaynnistaSliderHaku : kaynnistaHaku}
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
                defaultValue={"asiasanat"}
              >
                <FormControlLabel value="asiasanat" control={<Radio />} label="Asiasanat" />
                <FormControlLabel value="merkinNimi" control={<Radio />} label="Merkin nimi" />
                <FormControlLabel value="taiteilija" control={<Radio />} label="Taiteilija" />
              </RadioGroup>
            </FormControl>

          </Stack>

        </Paper>

        <Paper>
          <Button onClick={sliderhakupaalle} sx={{ width: '100%' }} variant={'contained'}>{expand ? "Ota vuosirajaus pois käytöstä" : "Ota vuosirajaus käyttöön"}<span>{expand ? <ArrowDropUp /> : <ArrowDropDown />}</span></Button>
          {expand &&
            <Stack>
              <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={1855}
                max={2021}
              />
            </Stack>}

        </Paper>
      </Container>
      {(Boolean(virhe))
        ? <Alert severity="error">{virhe}</Alert>
        : merkit.length ? <Grid container sx={{marginTop:5}} spacing={2}>{merkit.map((merkki: Postimerkki, idx: number) => {
          idx++; if (idx < 41) {
            return <Grid item lg={3} sx={{ boxShadow: 1, padding: 1 }}>
              Merkin nimi on "{merkki.merkinNimi}" {merkki.taiteilija ? "taiteillut: " + merkki.taiteilija : null}, painettu yhteensä {merkki.painosmaara} kListingaletta,
              nimellisarvoltaan {merkki.nimellisarvo} {merkki.valuutta}a, julkaistu {merkki.ilmestymispaiva}
              <Card sx={{ maxWidth: 50 }}>
                <CardMedia component={"img"}
                  image={merkki.kuvanUrl}
                  alt='merkki.merkinNimi'
                  height={50}
                >

                </CardMedia>
              </Card>
            </Grid>
          } else { return <Typography variant='h6'>Haulla löytyi yli 40 postimerkkiä, näytetään vain ensimmäiset 40. Ole hyvä ja tarkenna hakua</Typography> }
        })}</Grid> :
          <Alert severity='info'>Hakusanalla {lomakeRef.current?.hakusana.value} ei löytynyt yhtään postimerkkiä</Alert>
      }

    </Container>
  );
}

export default Listing;
