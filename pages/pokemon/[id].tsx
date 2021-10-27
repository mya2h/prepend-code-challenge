import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import { getPokemonDetail } from '../../api/Actions/pokemon';
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import styles from '../../styles/Pokemon.module.css'
import pImage from '../../images/pokemon.jpeg'

const PokemonDetail = () => {
    const router = useRouter()
    const { id } = router.query
    const [pokemon, setPokemon] = useState<any>()
    useEffect(() => {
        retrivePokemon()
    }, [id])

    const retrivePokemon = async () => {
        const result = await getPokemonDetail(id)
        setPokemon(result)
    }
    return (
        <div>
            {pokemon && <div>
                <Image
                    src={pImage}
                    alt="Picture of the author"
                    width={150}
                    height={150}
                />
                <Typography variant="h2" gutterBottom component="div">
                    {pokemon.name}
                </Typography>
                <div className={styles.description}>
                    <div className="species">
                        <Typography variant="h5" gutterBottom component="div">
                            <span>Species: </span>{pokemon.species.name}
                        </Typography>
                    </div>
                    <div className="weight">
                        <Typography variant="h5" gutterBottom component="div">
                            <span>Weight: </span> {pokemon.weight}
                        </Typography>
                    </div>
                </div>
                <div className={styles.pokemanDetail}>
                    <div className={styles.move}>
                        <Typography variant="h5" gutterBottom component="div" color="primary">
                            Moves
                        </Typography>
                        <TableContainer component={Paper} sx={{ width: 400, maxHeight: 440 }} >
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Move Name</TableCell>
                                        <TableCell>Version Groups&nbsp;(g)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {pokemon.moves && pokemon.moves.map((row: any) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell>
                                                {row.move.name}
                                            </TableCell>
                                            <TableCell >{row.version_group_details.length}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className={styles.stat}>
                        <Typography variant="h5" gutterBottom component="div" color="primary">
                            Stats
                        </Typography>
                        <TableContainer component={Paper} sx={{ width: 400 }} >
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Stat Name</TableCell>
                                        <TableCell>Base Stat</TableCell>
                                        <TableCell>Effort&nbsp;(g)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {pokemon.stats && pokemon.stats.map((row: any) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell>
                                                {row.stat.name}
                                            </TableCell>
                                            <TableCell>{row.base_stat}</TableCell>
                                            <TableCell>{row.effort}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className={styles.type}>
                        <Typography variant="h5" gutterBottom component="div" color="primary">
                            Types
                        </Typography>
                        <TableContainer component={Paper} sx={{ width: 400 }} >
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Slot</TableCell>
                                        <TableCell>Type Name</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {pokemon.types && pokemon.types.map((row: any) => (
                                        <TableRow
                                            key={row.slot}
                                        >
                                            <TableCell>
                                                {row.slot}
                                            </TableCell>
                                            <TableCell>{row.type.name}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
            }
        </div>
    );
}
export default PokemonDetail
