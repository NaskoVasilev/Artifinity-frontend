import React, { useEffect, useState } from 'react';
import { Badge, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';

import ProjectService from '../../services/projectService';
import classes from './Dashboard.module.scss';


// TODO style cards (colors and curves) using {classes}
const Dashboard = () => {
    const [projects, setProjects] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        loadData()
    }, []);

    const loadData = async () => {
        const res = await ProjectService.allActive()
        setProjects(res)
    }

    const clickHandler = (id) => {
        navigate('/project/details', { state: { id } })
    }

    return (<>
        <Row xs={1} md={2} className="g-4">
            {projects.map((project) => (
                <Col key={project.id}>
                    <Card onClick={() => clickHandler(project.id)}>
                        <Card.Img variant="top" src={project.imageUrl} />
                        <Card.Body>
                            <Card.Title>{project.name}</Card.Title>
                            <Card.Text>
                                {project.description}
                            </Card.Text>
                            {project.tags.map((tag, i) => {
                                return <Badge pill bg="primary" key={i}>
                                    {tag}
                                </Badge>
                            })}
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    </>)
}

export default Dashboard;