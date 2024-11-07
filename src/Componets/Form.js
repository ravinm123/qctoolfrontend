import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProjectsTable() {
    const [projects, setProjects] = useState([]);
    const [teams, setTeams] = useState([]);
    const [taskTypes, setTaskTypes] = useState([]);
    const [annotators, setAnnotators] = useState([]);
    const [editingRow, setEditingRow] = useState(null);
    const [editData, setEditData] = useState({});

    // Fetch data on component mount
    useEffect(() => {
        const fetchProjectsAndTeams = async () => {
            try {
                const projectResponse = await axios.get('http://127.0.0.1:8000/data/projectlist/');
                const teamResponse = await axios.get('http://127.0.0.1:8000/data/teamlist/');
                const taskResponse = await axios.get('http://127.0.0.1:8000/data/task_typelist/');
                const teamMemberResponse = await axios.get('http://127.0.0.1:8000/data/annotatorlist/');
                
                setProjects(projectResponse.data);
                setTeams(teamResponse.data);
                setTaskTypes(taskResponse.data);
                setAnnotators(teamMemberResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchProjectsAndTeams();
    }, []);

    // Enter edit mode
    const handleEditClick = (project) => {
        setEditingRow(project.id);
        setEditData({
            project_name: project.project_name,
            task_type: taskTypes.filter(ea => ea?.project === project?.id).map(eac => eac?.task_type).join(", "),
            team: teams.map((team) => team.team_name).join(", "),
            team_user: annotators.map((team) => team.annotator_name).join(", "),
        });
    };

    // Save changes to backend
    const handleSaveClick = async () => {
        try {
            await axios.patch(`http://127.0.0.1:8000/data/projectedit/${editingRow}/`, editData);

            // Update the projects list to reflect changes
            setProjects((prevProjects) =>
                prevProjects.map((project) =>
                    project.id === editingRow ? { ...project, ...editData } : project
                )
            );

            setEditingRow(null); // Exit edit mode
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };
    console.log(setProjects)

    

   

    // Update input changes in editData state
    const handleChange = (field, value) => {
        setEditData({
            ...editData,
            [field]: value,
        });
    };

    return (
        <div className='table-container'>
            <h2 className='list-users'>List components</h2>
            <table className='users-table'>
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Task_type</th>
                        <th>Team</th>
                        <th>Team_user</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project.id}>
                            <td>
                                {editingRow === project.id ? (
                                    <input
                                        type="text"
                                        value={editData.project_name}
                                        onChange={(e) => handleChange("project_name", e.target.value)}
                                    />
                                ) : (
                                    project.project_name
                                )}
                            </td>
                            <td>
                                {editingRow === project.id ? (
                                    <input
                                        type="text"
                                        value={editData.task_type}
                                        onChange={(e) => handleChange("task_type", e.target.value)}
                                    />
                                ) : (
                                    taskTypes.filter(ea => ea?.project === project?.id).map(eac => eac?.task_type).join(", ")
                                )}
                            </td>
                            <td>
                                {editingRow === project.id ? (
                                    <input
                                        type="text"
                                        value={editData.team}
                                        onChange={(e) => handleChange("team", e.target.value)}
                                    />
                                ) : (
                                    teams.map((team) => team.team_name).join(", ")
                                )}
                            </td>
                            <td>
                                {editingRow === project.id ? (
                                    <input
                                        type="text"
                                        value={editData.team_user}
                                        onChange={(e) => handleChange("team_user", e.target.value)}
                                    />
                                ) : (
                                    annotators.map((team) => team.annotator_name).join(", ")
                                )}
                            </td>
                            <td>
                                {editingRow === project.id ? (
                                    <button onClick={handleSaveClick}>Save</button>
                                ) : (
                                    <button onClick={() => handleEditClick(project)}>✏️</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProjectsTable;
