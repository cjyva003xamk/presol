import React, { useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

interface Journey {
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

const AddFile: React.FC = (): React.ReactElement => {

    const lomakeRef = useRef<any>();
    const [merkit, setmerkit] = useState<any[]>([]);
    const [virhe, setVirhe] = useState<string>("");

  

    const handleUpload = async (e: React.FormEvent): Promise<void> => {

        e.preventDefault();
        /* 
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
            } */
        console.log("Tiedosto lisätty")
    }

    const upload = async (e: React.FormEvent): Promise<void> => {

        const formData = new FormData();
        formData.append('uploaded_file1', lomakeRef.current.files[0]);

        /* 
            ${ lomakeRef.current.hakusana.value }& haettava=${ lomakeRef.current.haettava.value } */
        setVirhe("");
        e.preventDefault();
        if ( lomakeRef.current.files[0] ) {

            try {

                let url: string = '/api/newfile';

                let options: any = {
                    method: 'POST',
                    /* headers: {
                        "Content-Type": "multipart/form-data"
                    } , */
                    body: formData
                };

                const yhteys = await fetch(url, options);

                if (yhteys.status === 200) {
                    setVirhe("Tiedosto lisätty");
                } else {
                    setVirhe("Tiedoston lisääminen epäonnistui");
                }

            } catch (e: any) {
                setVirhe("Palvelimelle ei saada yhteyttä.")
            }
        } else {
            setVirhe("Hakusanan tulee olla vähintään kaksi merkkiä pitkä.");
        }
    }

    return (
        <Box>
            <Typography><h4>Täällä lisätään tiedostoja tietokantaan</h4></Typography>
            <Box component={'form'} onSubmit={upload} >
                <input type='file' accept='.csv' ref={lomakeRef} name='uploaded_file1' >
                </input>
                <Button type='submit'>
                    Lähetä tiedosto
                </Button>
            </Box>
            {virhe ? <Typography>{virhe}</Typography> : <Typography>Lähetä tiedostot!</Typography>}
        </Box>
    );
}

export default AddFile;
