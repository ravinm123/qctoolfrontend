import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000'; // Adjust this URL as needed

const Sampleqc = () => {
    const [projects, setProjects] = useState([]);
    const [taskTypes, setTaskTypes] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');

    // Fetch all projects on mount
    useEffect(() => {
        axios.get(`${BASE_URL}/data/projectlist/`)
            .then(response => setProjects(response.data))
            .catch(error => console.error("Error fetching projects:", error));
    }, []);

    // Fetch task types whenever the selected project changes
    useEffect(() => {
        if (selectedProject) {
            axios.get(`${BASE_URL}/data/teamlist1/${selectedProject}/`)
                .then(response => setTaskTypes(response.data))
                .catch(error => console.error("Error fetching task types:", error));
        }
    }, [selectedProject]);
    console.log(taskTypes)

    return (
        <form>
            <label>
                Project:
                <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                >
                      <option value="" disabled>Select Project</option>
                        {projects.map((project) => (
                        <option key={project?.project_name} value={project?.id}>
                        {project.project_name}
                        </option>
                                            

                ))}
                </select>
            </label>

            <label>
                Task Type:
                <select>
                    <option value="">Select a task type</option>
                    {taskTypes.map((taskType) => (
                        <option key={taskType?.id} value={taskType?.id}>
                            {taskType?.task_type}
                        </option>
                    ))}
                </select>
            </label>
        </form>
    );
};

export default Sampleqc;
