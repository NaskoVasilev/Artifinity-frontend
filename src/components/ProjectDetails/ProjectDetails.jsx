import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import ProjectService from '../../services/projectService';

const ProjectDetails = (props) => {
    const [project, setProject] = useState();

    const location = useLocation()

    useEffect(() => {
        loadData()
    }, []);

    const loadData = async () => {
        const data = await ProjectService.details(location.state.id)
        console.log('data', data);
        setProject(data)
    }

    return (<>
        details for {location.state.id}</>)
}

export default ProjectDetails;