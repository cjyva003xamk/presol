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
    const [virhe, setVirhe] = useState<string>("");

    const upload = async (e: React.FormEvent): Promise<void> => {

        const formData = new FormData();
        formData.append('uploaded_file1', lomakeRef.current.files[0]);

        setVirhe("");
        e.preventDefault();
        if ( lomakeRef.current.files[0] ) {

            try {

                let url: string = '/api/newfile';

                let options: any = {
                    method: 'POST',
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
