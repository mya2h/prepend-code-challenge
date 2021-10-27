import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import { getAllPokemons } from '../../api/Actions/pokemon'
import PokemonData from '../../api/Model/pokemon'
import {
    List,
    TextField,
    ListItemText,
    ListItemAvatar,
    ListItemButton,
    Pagination,
    Typography
} from '@mui/material';
import styles from '../../styles/Pokemon.module.css'
import pImage from '../../images/pokemon.jpeg'

const Pockmon = () => {
    const router = useRouter()
    const [pokemons, setPokemons] = useState<Array<PokemonData>>([])
    const [searched, setSearched] = useState<boolean>(false);
    const [searchedResult, setSearchedResult] = useState<Array<PokemonData>>([])
    const [rows, setRows] = useState<Array<PokemonData>>([])
    const [page, setPage] = useState(1)
    const [pageSize] = useState(16)
    const [count, setCount] = useState(0)

    useEffect(() => {
        retrievePokemons()
    }, [])
    const retrievePokemons = async () => {
        const result = await getAllPokemons()
        setPokemons(result.results)
        setCount(result.count)
        setRows(result.results.slice(0, pageSize))
    }
    const handlePagination = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        val: number
    ) => {
        const start = (pageSize * val) - pageSize
        const end = start + pageSize
        searched ? setRows(searchedResult.slice(start, end)) : setRows(pokemons.slice(start, end))
        setPage(val)
    }
    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
        pokemon: PokemonData
    ) => {
        var param = pokemon.url.slice(pokemon.url.indexOf("pokemon/") + "pokemon/".length);
        router.push('/pokemon/' + param)
    };
    const requestSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchedVal = event.target.value
        if (searchedVal.length >= 3) {
            const filteredRows = pokemons.filter((row) => {
                return row.name.toLowerCase().includes(searchedVal.toLowerCase());
            });
            setSearchedResult(filteredRows)
            setCount(filteredRows.length)
            setRows(filteredRows.slice(0, pageSize));
            setSearched(true)
        }
        else {
            setCount(pokemons.length)
            setRows(pokemons.slice(0, pageSize))
            setPage(1)
            setSearched(false)
        }
    };

    return (
        <div className={styles.pokemons}>
            <Typography variant="h2" gutterBottom component="div" color="primary">
                Pokemons
            </Typography>
            <TextField onChange={requestSearch} label="Search" id="fullWidth" fullWidth />
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {rows && (
                    rows.map((pokemon, index) => (
                        <ListItemButton alignItems="flex-start" onClick={(event) => handleListItemClick(event, index, pokemon)} key={index}>
                            <ListItemAvatar>
                                <Image
                                    src={pImage}
                                    alt="Picture of the author"
                                    width={50}
                                    height={50}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={pokemon.name}
                            />
                        </ListItemButton>
                    ))
                )}
            </List>
            <Pagination count={count % 10 === 0 ? count / 10 : Math.floor(count / 10) + 1} page={page} onChange={(event, val) => handlePagination(event, val)} color="primary" />
        </div >
    )
}
export default Pockmon