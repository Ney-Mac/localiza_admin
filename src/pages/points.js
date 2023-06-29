import Head from "next/head";
import axios from "axios";
import { Box, Container, Unstable_Grid as Grid } from "@mui/system";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { BASE_URL } from "src/config";
import { useAuth } from "src/hooks/use-auth";
import { useEffect, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const Page = () => {
    const { user } = useAuth();
    const initialized = useRef(false);

    const fetchPoints = async () => {
        if (initialized.current) {
            return;
        }

        initialized.current = true;

        try {
            const res = await axios({
                url: `${BASE_URL}listar-pontos`,
                method: 'get',
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
                params: {
                    status: '1',
                    type: '',
                    enabled: '1',
                }
            });

            console.log(res.data.data);

        } catch (err) {
            console.log(`fetchPoints error ${err} -> ${err.response?.data.message}`);
        }
    }

    useEffect(
        () => {
            fetchPoints();
        },
        []
    )

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
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />
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