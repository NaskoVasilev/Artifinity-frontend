import { Tab } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import { Badge, Col, ProgressBar, Row, Tabs } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router';
import ProjectService from '../../services/projectService';

const ProjectDetails = (props) => {
    const [project, setProject] = useState();
    const [percentage, setPercentage] = useState(0);

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        loadData()
    }, []);

    const loadData = async () => {
        if (!location.state) {
            navigate('/')
        }
        const data = await ProjectService.details(location.state.id)
        console.log('data', data);
        setProject(data)

        const now = +(Date.now() / 1000).toFixed()
        setPercentage((100 * (now - project.startDate) / (project.endDate - project.startDate)).toFixed())
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
                <img alt='project idea' src={project.imageUrl} />
            </Col>
            <Col>
                <p>{new Date(project.startDate).toLocaleString()} - {new Date(project.endDate).toLocaleString()}</p>
                <ProgressBar now={percentage} label={`${percentage}%`} />
                {/* TODO add value & price */}
                {/* TODO add invest button */}
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
            </Tab>
        </Tabs>
    </>)
}

export default ProjectDetails;