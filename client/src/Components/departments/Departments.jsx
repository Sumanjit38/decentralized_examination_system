import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useState } from 'react';

const columns = [
	{ field: 'id', headerName: 'ID', width: 90, flex: 1 },
	
	{
		field: 'department',
		headerName: 'Department',
		width: 110,
		editable: true,
		flex: 1
	},
	
];

const Departments = () => {
	const [teachers, setTeachers] = useState([
		{ id: 1, lastName: 'Snow', firstName: 'Jon', department: "CSE" },
		
	]);

	return (
		<div >
		<Box sx={{ height: 400, width: '100%' }}>
			<DataGrid
				rows={teachers}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 5,
						},
					},
				}}
				slots={{ toolbar: GridToolbar}}
				pageSizeOptions={[5]}
				checkboxSelection
				disableRowSelectionOnClick
			/>
		</Box>
		<Button 
			color="primary" 
			variant='contained' 
			onClick={() =>{
				console.log("Button Clicked");
			}}
		>
			Add Department
		</Button>
		</div>
	)
};

export default Departments;