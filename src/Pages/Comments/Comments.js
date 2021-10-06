/** @format */
import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { commentsServices } from '../../Services/commentsServices';
import CreateComment from './Create';
import UpdateComment from './Update';
import DeleteModal from './Delete';
import { moviesServices } from '../../Services/moviesServices';

const Comments = () => {
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

	console.log(data);
	useEffect(() => {
		setIsLoading(true);
		commentsServices
			.getAll()
			.then(res => {
				setData(res.data.data);
				setIsLoading(false);
			})
			.catch(err => console.log(err));
	}, [update]);

	const ShowData = () => {
		return data.length > 0 ? (
			data.map(x => (
				<tr onClick={() => setRowData(x)}>
					<td>{x.name}</td>
					<td>{x.text}</td>
					<td>{x.review}</td>
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
				<h1>Komentari</h1>
				<Button variant='dark' onClick={() => setShowCreateModal(true)}>
					Dodaj novi +
				</Button>
			</div>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Film</th>
						<th>Tekst komentara</th>
						<th>Ocjena</th>
						<th>Akcije</th>
					</tr>
				</thead>
				<tbody>{isLoading ? <tr> Učitava se</tr> : <ShowData />}</tbody>
			</Table>
			<CreateComment
				show={showCreateModal}
				setShow={setShowCreateModal}
				setUpdate={setUpdate}
				movieOptions={movieOptions}
			/>
			{showUpdateModal && (
				<UpdateComment
					updateData={rowData}
					show={showUpdateModal}
					setShow={setShowUpdateModal}
					setUpdate={setUpdate}
					movieOptions={movieOptions}
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

export default Comments;
