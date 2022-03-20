import { Tab } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import { Badge, Button, Col, Form, Image, Modal, ProgressBar, Row, Tabs } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router';
import ProjectService from '../../services/projectService';
import Spinner from '../common/Spinner/Spinner';

const ProjectDetails = (props) => {
    const [project, setProject] = useState();
    const [percentage, setPercentage] = useState(0);
    const [modalShow, setModalShow] = useState(false);

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        loadData()
    }, []);

    const loadData = async () => {
        if (!location.state.id) {
            navigate('/')
        }

        const data = await ProjectService.details(location.state.id)
        setProject(data)

        const now = +(Date.now() / 1000).toFixed()
        const start = (new Date(data.createdOn).getTime() / 1000).toFixed()
        const end = (new Date(data.endDate).getTime() / 1000).toFixed()
        setPercentage((100 * (now - start) / (end - start)).toFixed())
    }

    const investHandler = async (e) => {
        e.preventDefault()
    }

    if (!project) {
        return <Spinner />
    }

    // TODO fix styling, arrange elements
    return (<>
        <h1>{project.name}</h1>
        <p>{project.description}</p>
        <div>
            {project.tags.map((tag, i) => {
                return <Badge pill bg="primary" key={i}>
                    {tag}
                </Badge>
            })}
        </div>

        <Row>
            <Col md={8}>
                <Image thumbnail alt='project idea' src={project.imageUrl} />
            </Col>
            <Col>
                <p>{new Date(project.createdOn).toLocaleString()} - {new Date(project.endDate).toLocaleString()}</p>
                <ProgressBar now={percentage} label={`${percentage}%`} />
                <p>Link to project: {project.url}</p>
                {/* TODO add value & price */}
                {/* TODO add invest button */}
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Invest
                </Button>
            </Col>
        </Row>
        <Tabs defaultActiveKey="investments" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="investments" title="Investments">
                {/* TODO add investments fetched from blockchain */}
            </Tab>
            <Tab eventKey="artist" title="Artist">
                {/* TODO style tab */}
                {project.owner.firstName}
                {project.owner.lastName}
                {project.owner.bio}
                {project.owner.portfolioUrl}
            </Tab>
        </Tabs>

        <Modal
            show={modalShow}
            size="sm"
            onHide={() => setModalShow(false)}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Investment size
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={investHandler}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Value</Form.Label>
                        <Form.Control type="number" placeholder="Value" />
                    </Form.Group>
                    <Button type='submit'>Invest</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setModalShow(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    </>)
}

export default ProjectDetails;