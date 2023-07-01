import PropTypes from 'prop-types';
import {
	Box,
	Card,
	Checkbox,
	Table as MuiTable,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';

export const Table = (props) => {
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
		selected = [],
		tableHeaders = [],
		keys = [],
	} = props;

	const selectedSome = (selected.length > 0) && (selected.length < items.length);
	const selectedAll = (items.length > 0) && (selected.length === items.length);

	return (
		<Card>
			<Scrollbar>
				<Box sx={{ minWidth: 800 }}>
					<MuiTable>
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
								{tableHeaders.map((header) => (
									<TableCell
										key={header}
									>
										{header}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{items.map((item) => {
								const isSelected = selected.includes(item.id);

								return (
									<TableRow
										hover
										key={item.id}
										selected={isSelected}
									>
										<TableCell padding="checkbox">
											<Checkbox
												checked={isSelected}
												onChange={(event) => {
													if (event.target.checked) {
														onSelectOne?.(item.id);
													} else {
														onDeselectOne?.(item.id);
													}
												}}
											/>
										</TableCell>
										{keys.map(key => (
											<TableCell
												key={key}
											>
												{item[key]}
											</TableCell>
										))}
									</TableRow>
								);
							})}
						</TableBody>
					</MuiTable>
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

Table.propTypes = {
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
	selected: PropTypes.array,
	tableHeaders: PropTypes.array,
	keys: PropTypes.array
};
