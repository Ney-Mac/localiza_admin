import { useCallback, useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { BASE_URL } from 'src/config';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Table } from 'src/sections/table/table';
import { CustomersSearch } from 'src/sections/table/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { useAuth } from 'src/hooks/use-auth';

const Page = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [data, setData] = useState(null);
	const [usersPerPage, setUsersPerPage] = useState(null);
	const [usersIds, setUsersIds] = useState(null);
	const { user } = useAuth();
	const initialized = useRef(false);
	const usersSelection = useSelection(usersIds);

	useEffect(
		() => {
			if (data) {
				const pagination = applyPagination(data, page, rowsPerPage);
				setUsersPerPage(pagination);
				
				const result = pagination.map((user) => user.id);
				setUsersIds(result);
			}
		},
		[data, page, rowsPerPage]
	)

	const fetchUsers = async () => {
		if (initialized.current) {
			return;
		}

		initialized.current = true;

		try {
			const res = await axios({
				method: 'get',
				url: `${BASE_URL}user/listar`,
				headers: {
					Authorization: `Bearer ${user.accessToken}`
				},
			});

			console.log(res.data.data);
			setData(res.data.data);
		} catch (err) {
			console.log(`fetchUsers error: ${err} -> ${err.response?.data.message}`)
		}
	}

	useEffect(
		() => {
			fetchUsers();
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
					Usuários | Localiza
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
									Usuários
								</Typography>
								<Stack
									alignItems="center"
									direction="row"
									spacing={1}
								>
									<Button
										color="inherit"
										startIcon={(
											<SvgIcon fontSize="small">
												<ArrowUpOnSquareIcon />
											</SvgIcon>
										)}
									>
										Importar
									</Button>
									<Button
										color="inherit"
										startIcon={(
											<SvgIcon fontSize="small">
												<ArrowDownOnSquareIcon />
											</SvgIcon>
										)}
									>
										Exportar
									</Button>
								</Stack>
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
									Adicionar Usuário
								</Button>
							</div>
						</Stack>
						<CustomersSearch />
						{(data && usersPerPage) && (
							<Table
								count={data.length}
								items={usersPerPage}
								onDeselectAll={usersSelection.handleDeselectAll}
								onDeselectOne={usersSelection.handleDeselectOne}
								onPageChange={handlePageChange}
								onRowsPerPageChange={handleRowsPerPageChange}
								onSelectAll={usersSelection.handleSelectAll}
								onSelectOne={usersSelection.handleSelectOne}
								page={page}
								rowsPerPage={rowsPerPage}
								selected={usersSelection.selected}
								tableHeaders={[
									'Id',
									'Nome',
									'Email',
									'Telefone',
									'Email Verificado Em',
									'Endereço',
									'Estado',
									'Criado Em',
									'Actualizado Em',
									'Fim de Periodo de Utilização',
									'Tipo de Operação de Pagamento',
									'Pagamento Verificado'
								]}
								keys={[
									'id',
									'name',
									'email',
									'telefone',
									'email_verificated_at',
									'endereco',
									'status',
									'created_at',
									'updated_at',
									'fim_periodo_utilizacao',
									'tipo_operacao_pagamento',
									'pagamento_verificado'
								]}
							/>
						)}
					</Stack>
				</Container>
			</Box>
		</>
	);
};

Page.getLayout = (page) => (
	<DashboardLayout>
		{page}
	</DashboardLayout>
);

export default Page;
