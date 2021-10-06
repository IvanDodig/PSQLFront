/** @format */

import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { photosServices } from '../../Services/photosServices';
import CreatePhoto from './Create';
import UpdatePhoto from './Update';
import DeleteModal from './Delete';
import { moviesServices } from '../../Services/moviesServices';

const Photos = () => {
	const [data, setData] = useState([]);
	const [rowData, setRowData] = useState({});
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [movieOptions, setMovieOptions] = useState(null);

	const [isLoading, setIsLoading] = useState(false);
	const [update, setUpdate] = useState(new Date());

	useEffect(() => {
		moviesServices
			.getAll()
			.then(res => {
				console.log(res);
				setMovieOptions(
					res.data.data.map(x => {
						return {
							value: x.id,
							label: x.name,
						};
					}),
				);
			})
			.catch(err => console.log(err));
	}, []);

	useEffect(() => {
		setIsLoading(true);
		photosServices
			.getAll()
			.then(res => {
				setData(res.data);
				setIsLoading(false);
			})
			.catch(err => console.log(err));
	}, [update]);

	const ShowData = () => {
		return data.length > 0 ? (
			data.map(x => (
				<tr onClick={() => setRowData(x)}>
					<td>{x.url}</td>
					<td>{x.name}</td>
					<td className='actions'>
						<Button
							variant='success'
							onClick={() => {
								setRowData(x);
								setShowUpdateModal(true);
							}}>
							Uredi
						</Button>
						<Button
							variant='danger'
							onClick={() => {
								setRowData(x);
								setShowDeleteModal(true);
							}}>
							Izbriši
						</Button>
					</td>
				</tr>
			))
		) : (
			<tr>Nema podataka</tr>
		);
	};

	return (
		<div>
			<div className='d-flex justify-content-between align-items-start'>
				<h1>Slike</h1>
				<Button variant='dark' onClick={() => setShowCreateModal(true)}>
					Dodaj novu +
				</Button>
			</div>

			<Table striped bordered hover>
				<thead>
					<tr>
						<th>URL</th>
						<th>Film</th>
						<th>Akcije</th>
					</tr>
				</thead>
				<tbody>{isLoading ? <tr> Učitava se</tr> : <ShowData />}</tbody>
			</Table>
			<CreatePhoto
				show={showCreateModal}
				setShow={setShowCreateModal}
				setUpdate={setUpdate}
				movieOptions={movieOptions}
			/>
			{showUpdateModal && (
				<UpdatePhoto
					updateData={rowData}
					show={showUpdateModal}
					setShow={setShowUpdateModal}
					movieOptions={movieOptions}
					setUpdate={setUpdate}
				/>
			)}
			<DeleteModal
				show={showDeleteModal}
				deleteId={rowData.id}
				setShow={setShowDeleteModal}
				setUpdate={setUpdate}
			/>
		</div>
	);
};

export default Photos;
