import React, { useEffect, useState } from 'react';
import { Badge, Card, Col, Row, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router';

import ProjectService from '../../services/projectService';
import classes from './Dashboard.module.scss';

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
                <Col xs={6} md={4} className={classes.Column} key={project.id}>
                    <Card className={[classes.Card, classes.Zoom].join(' ')} onClick={() => clickHandler(project.id)}>
                        <Image fluid className={classes.CardImage} variant="top" src={project.imageUrl} />
                        <Card.Body className={classes.CardBody}>
                            <Card.Title className={classes.CardTitle}>{project.name}</Card.Title>
                            <Card.Text className={classes.CardText}>
                                {project.description}
                            </Card.Text>
                            <div className="badges">
                                {project.tags.map((tag, i) => {
                                    return <Badge pill bg="warning" key={i} className={classes.Badge}>
                                        {tag}
                                    </Badge>
                                })}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    </>)
}

export default Dashboard;