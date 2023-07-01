import { useEffect, useRef, useState, useCallback } from "react";
import Head from "next/head";
import axios from "axios";
import { Box, Button, Container, Stack, Typography, SvgIcon } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { useSelection } from "src/hooks/use-selection";
import { Table } from "src/sections/table/table";
import { applyPagination } from "src/utils/apply-pagination";
import { BASE_URL } from "src/config";
import { useAuth } from "src/hooks/use-auth";

const Page = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [data, setData] = useState(null);
    const [pointsPerPage, setPointsPerPage] = useState(null);
    const [pointsIds, setPointsIds] = useState(null);
    const { user } = useAuth();
    const initialized = useRef(false);
    const pointsSelection = useSelection(pointsIds);

    useEffect(
        () => {
            if (data) {
                const pagination = applyPagination(data, page, rowsPerPage);
                setPointsPerPage(pagination);

                const result = pagination.map((point) => point.id);
                setPointsIds(result);
            }
        },
        [data, page, rowsPerPage]
    )

    const fetchPoints = async (status = '', type = '', enabled = '') => {
        if (initialized.current) {
            return;
        }

        initialized.current = true;

        try {
            const res = await axios({
                url: `${BASE_URL}interno/listar-pontos`,
                method: 'get',
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
                params: {
                    status,
                    type,
                    enabled,
                }
            });

            console.log(res.data.data);
            setData(res.data.data);
        } catch (err) {
            console.log(`fetchPoints error ${err} -> ${err.response?.data.message}`);
        }
    }

    useEffect(
        () => {
            fetchPoints();
        },
        []
    );

    const handlePageChange = useCallback(
        (event, value) => {
            setPage(value);
        },
        []
    );

    const handleRowsPerPageChange = useCallback(
        (event) => {
            setRowsPerPage(event.target.value);
            setPage(0);
        },
        []
    );

    return (
        <>
            <Head>
                <title>
                    Pontos | Localiza
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">
                                    Pontos
                                </Typography>
                            </Stack>
                            <div>
                                <Button
                                    startIcon={(
                                        <SvgIcon fontSize="small">
                                            <PlusIcon />
                                        </SvgIcon>
                                    )}
                                    variant="contained"
                                >
                                    Adicionar Ponto
                                </Button>
                            </div>
                        </Stack>
                        {(data && pointsPerPage) && (
                            <Table
                                count={data.length}
                                items={pointsPerPage}
                                onDeselectAll={pointsSelection.handleDeselectAll}
                                onDeselectOne={pointsSelection.handleDeselectOne}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleRowsPerPageChange}
                                onSelectAll={pointsSelection.handleSelectAll}
                                onSelectOne={pointsSelection.handleSelectOne}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                selected={pointsSelection.selected}
                                tableHeaders={[
                                    'Id',
                                    'Localidade',
                                    'Latitude',
                                    'Longitude',
                                    'Tipo',
                                    'Estado',
                                    'Habilitado',
                                    'Data de Criação',
                                    'Data de Actualização',
                                    'Estado da Fila'
                                ]}
                                keys={[
                                    'id',
                                    'location',
                                    'latitude',
                                    'longitude',
                                    'type',
                                    'status',
                                    'enabled',
                                    'created_at',
                                    'updated_at',
                                    'fila'
                                ]}
                            />
                        )}
                    </Stack>
                </Container>
            </Box>
        </>
    );
}

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;