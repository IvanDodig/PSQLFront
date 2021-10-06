/** @format */

import { Modal, Button } from 'react-bootstrap';
import { usersServices } from '../../Services/usersServices';
const DeleteModal = ({ show, setShow, deleteId, setUpdate }) => {
	const handleClose = () => setShow(false);

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Jeste li sigurni?</Modal.Title>
			</Modal.Header>
			<Modal.Body>Izbrišite korisnika</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={handleClose}>
					Close
				</Button>
				<Button
					variant='danger'
					onClick={() => {
						usersServices
							.remove(deleteId)
							.then(res => {
								setUpdate(new Date());
								setShow(false);
							})
							.catch(err => console.log(err));
					}}>
					Potvrdi
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default DeleteModal;
