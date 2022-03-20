import { Tab } from 'bootstrap';
import { useStoreState } from 'easy-peasy';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { Badge, Button, Col, Form, Image, Modal, ProgressBar, Row, Tabs } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router';
import BlockchainService from '../../services/blockchainService';
import ProjectService from '../../services/projectService';
import Spinner from '../common/Spinner/Spinner';
import classes from './ProjectDetails.module.scss';


const ProjectDetails = (props) => {
    const [project, setProject] = useState();
    const [percentage, setPercentage] = useState(0);
    const [modalShow, setModalShow] = useState(false);

    const { account } = useStoreState((state) => state.walletStore);

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

        const now = +(Date.now() / 1000).toFixed()
        const start = (new Date(data.createdOn).getTime() / 1000).toFixed()
        const end = (new Date(data.endDate).getTime() / 1000).toFixed()
        setPercentage((100 * (now - start) / (end - start)).toFixed())

        const info = await BlockchainService.getProjectData(data.contractId, account.address)
        data.totalInvestment = ethers.utils.formatEther(ethers.BigNumber.from(info.totalInvestment))
        setProject(data)
    }

    const investHandler = async (e) => {
        e.preventDefault()
        setModalShow(false)

        const amount = +e.target.elements.amount.value
        await BlockchainService.invest(project.contractId, amount, account.address)
        setProject({ ...project, totalInvestment: project.totalInvestment + amount })
    }

    if (!project) {
        return <Spinner />
    }

    // TODO fix styling, arrange elements
    return (<>
        <div className={classes.TitlesContainer}>
            <h1 className={classes.Heading}>{project.name}</h1><br />
            <p className={classes.Description}>{project.description}</p><br />
            <div className={classes.Badges}>
                {project.tags.map((tag, i) => {
                    return <Badge className={classes.Badge} pill bg="warning" key={i}>
                        {tag}
                    </Badge>
                })}
            </div>
        </div>

        <Row>
            <Col md={8}>
                <Image thumbnail alt='project idea' src={project.imageUrl} />
            </Col>
            <Col>
                <p className={classes.Period}>{new Date(project.createdOn).toLocaleString()} - {new Date(project.endDate).toLocaleString()}</p>
                <ProgressBar now={percentage} label={`${percentage}%`} />
                <p><a className={classes.Link} href={project.url}>Link to project</a></p>
                <p>Total investment: {project.totalInvestment} MTK</p>
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
                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label>Value</Form.Label>
                        <Form.Control type="number" placeholder="Value" />
                    </Form.Group>
                    <Button type='submit'>Invest</Button>
                </Form>
            </Modal.Body>
        </Modal>
    </>)
}

export default ProjectDetails;