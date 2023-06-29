import PropTypes from 'prop-types';
import {
	Box,
	Card,
	Checkbox,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';

export const UsersTable = (props) => {
	const {
		count = 0,
		items = [],
		onDeselectAll,
		onDeselectOne,
		onPageChange = () => { },
		onRowsPerPageChange,
		onSelectAll,
		onSelectOne,
		page = 0,
		rowsPerPage = 0,
		selected = []
	} = props;

	const selectedSome = (selected.length > 0) && (selected.length < items.length);
	const selectedAll = (items.length > 0) && (selected.length === items.length);

	return (
		<Card>
			<Scrollbar>
				<Box sx={{ minWidth: 800 }}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell padding="checkbox">
									<Checkbox
										checked={selectedAll}
										indeterminate={selectedSome}
										onChange={(event) => {
											if (event.target.checked) {
												onSelectAll?.();
											} else {
												onDeselectAll?.();
											}
										}}
									/>
								</TableCell>
								<TableCell>
									Id
								</TableCell>
								<TableCell>
									Nome
								</TableCell>
								<TableCell>
									Email
								</TableCell>
								<TableCell>
									Telefone
								</TableCell>
								<TableCell>
									Email Verificado Em
								</TableCell>
								<TableCell>
									Endereço
								</TableCell>
								<TableCell>
									Estado
								</TableCell>
								<TableCell>
									Criado Em
								</TableCell>
								<TableCell>
									Actualizado Em
								</TableCell>
								<TableCell>
									Fim de Periodo de Utilização
								</TableCell>
								<TableCell>
									Tipo de Operação de Pagamento
								</TableCell>
								<TableCell>
									Pagamento Verificado
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{items.map((user) => {
								const isSelected = selected.includes(user.id);

								return (
									<TableRow
										hover
										key={user.id}
										selected={isSelected}
									>
										<TableCell padding="checkbox">
											<Checkbox
												checked={isSelected}
												onChange={(event) => {
													if (event.target.checked) {
														onSelectOne?.(user.id);
													} else {
														onDeselectOne?.(user.id);
													}
												}}
											/>
										</TableCell>
										<TableCell>
											{user.id}
										</TableCell>
										<TableCell>
											{user.name}
										</TableCell>
										<TableCell>
											{user.email}
										</TableCell>
										<TableCell>
											{user.telefone}
										</TableCell>
										<TableCell>
											{user.email_verificated_at}
										</TableCell>
										<TableCell>
											{user.endereco}
										</TableCell>
										<TableCell>
											{user.created_at}
										</TableCell>
										<TableCell>
											{user.updated_at}
										</TableCell>
										<TableCell>
											{user.fim_periodo_utilizacao}
										</TableCell>
										<TableCell>
											{user.tipo_operacao_pagamento}
										</TableCell>
										<TableCell>
											{user.pagamento_verificado}
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</Box>
			</Scrollbar>
			<TablePagination
				component="div"
				count={count}
				onPageChange={onPageChange}
				onRowsPerPageChange={onRowsPerPageChange}
				page={page}
				rowsPerPage={rowsPerPage}
				rowsPerPageOptions={[5, 10, 25]}
			/>
		</Card>
	);
};

UsersTable.propTypes = {
	count: PropTypes.number,
	items: PropTypes.array,
	onDeselectAll: PropTypes.func,
	onDeselectOne: PropTypes.func,
	onPageChange: PropTypes.func,
	onRowsPerPageChange: PropTypes.func,
	onSelectAll: PropTypes.func,
	onSelectOne: PropTypes.func,
	page: PropTypes.number,
	rowsPerPage: PropTypes.number,
	selected: PropTypes.array
};
