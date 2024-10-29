import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboar.css';
import { toast, ToastContainer } from 'react-toastify';

const Dashboard = () => {
    const [showForm, setShowForm] = useState(false);
    const [taskFormVisible, setTaskFormVisible] = useState(false);
    const [teamFormVisible, setTeamFormVisible] = useState(false);
    const [annotator, setannotator] = useState(false);
    const [pdata, setData] = useState({ project_name: '', project_Id: '' });
    const [tdata, setTData] = useState({ task_type: '', project: '' });
    const [team, setTeam] = useState({ team_name: '', lead_name: '' });
    const [annot, setannot] = useState({ team_name: '', annotator_name: '' });

    const [projects, setProjects] = useState([]);
    const [teams, setteams] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const handleOnChange = () => setShowForm(!showForm);
    const handleOnTaskTypeChange = () => setTaskFormVisible(!taskFormVisible);
    const handleOnTeamForm = () => setTeamFormVisible(!teamFormVisible);
    const handleOnAnnotator = () => setannotator(!annotator)

    const handleProjectInputChange = (e) => setData({ ...pdata, [e.target.name]: e.target.value });
    const handleTaskInputChange = (e) => setTData({ ...tdata, [e.target.name]: e.target.value });
    const handleTeamInputChange = (e) => setTeam({ ...team, [e.target.name]: e.target.value });
    const handleannotchange = (e) => setannot({ ...annot, [e.target.name]: e.target.value })

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/data/projectlist/');
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, []);

    useEffect(() => {
        const fetchteam = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/data/teamlist/')
                setteams(response.data)
                console.log(response)

            } catch (error) {
                console.error('Error fetching teams')

            }
        }
        fetchteam()

    }, [])

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(""); // Reset error message
        if (!pdata.project_name || !pdata.project_Id) {
            setErrorMessage('Project name and ID are required.');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/data/project_create/', pdata);
            console.log('Project added:', response.data);
            toast.success('Project added successfully!');
            setData({ project_name: '', project_Id: '' });
            setProjects((prev) => [...prev, response.data]); // Add the new project
        } catch (error) {
            console.error('Failed to add project:', error);
            setErrorMessage('Failed to add project. Please try again.');
            if (error.response) {
                toast.error(error.response.data.msg || 'Failed to add project. Please try again.');
            }
        }
    };


    const handleTaskSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(""); // Reset error message

        if (!tdata.task_type || !tdata.project) {
            setErrorMessage('Task name and project selection are required.');
            return;
        }
console.log(tdata)

        try {
            const response = await axios.post('http://127.0.0.1:8000/data/task_create/', tdata);
            console.log('Task added:', response.data);
            toast.success('Task added successfully!');
            setTData({ task_type: '', project: '' });
        } catch (error) {
            console.error('Failed to add task:', error);
            setErrorMessage('Failed to add task. Please try again.');
            if (error.response) {
                toast.error(error.response.data.msg || 'Failed to add task. Please try again.');
            }
        }
    };

    const handleonteam = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        if (!team.team_name || !team.lead_name) {
            setErrorMessage('team name and lead name please fill required')
            return
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/data/team_create/', team);
            console.log('team', response.data)
            toast.success('Team add sucessfully!')
            setTeam({ team_name: '', lead_name: '' })
        }
        catch (error) {
            console.error('Failed to add team:', error);
            setErrorMessage('Failed to add team. Please try again.');
            if (error.response) {
                toast.error(error.response.data.msg || 'Failed to add task. Please try again.');
            }
        }
    }

    const handleannotatorsubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        if (!annot.team_name || !annot.annotator_name) {
            setErrorMessage('Please fill in the required fields for team and annotator name');
            return;
        }
console.log(annot)
        try {
            const token = localStorage.getItem('access_token');
            console.log('Token:', token);
            const response = await axios.post('http://127.0.0.1:8000/data/annotator_create/', annot, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Adjust as needed for your auth scheme
                    'Content-Type': 'application/json', // Ensure content type is set correctly
                }
            });
            console.log('Annotator added:', response.data);
            toast.success('Annotator added successfully!');
            setannot({ team_name: '', annotator_name: '' }); // Reset state after success
        } catch (error) {
            console.error('Failed to add annotator:', error);
            setErrorMessage('Failed to add annotator. Please try again.');
            if (error.response) {
                toast.error(error.response.data.msg || 'Failed to add annotator. Please try again.');
            }
        }
    };


    return (
        <div className="container">
            <aside className="sidebar">
                <div className="logo">{/* Logo placeholder */}</div>
                <hr />
                <nav className="nav-menu">
                    <div className="view-status flex margin-bot">
                        <a href="/" className="a-href font">Dashboard</a>
                    </div>
                </nav>
            </aside>

            <main className="main-content">
                <header className="header">
                    <div>
                        <h1>Hello, User_1</h1>
                        <p>Have a nice day</p>
                    </div>
                    <div className="user-info">
                        <div className="bell-icon">{/* Bell icon placeholder */}</div>
                        <div className="info">
                            <div className="user-logo">{/* User logo placeholder */}</div>
                            <div className="user-role">
                                <span className="username">User_1</span>
                                <span className="role">Admin</span>
                            </div>
                        </div>
                    </div>
                </header>

                <section className="dashboard">
                    <h2>Qc Dashboard</h2>
                    <div className="search-add">
                        <input type="text" placeholder="Search" />
                    </div>

                    <button onClick={handleOnChange} className="projectbutton">Add Project +</button>

                    {showForm && (
                        <div className='project-box'>
                            <form onSubmit={handleOnSubmit} className="projectadd">
                                <div>
                                    <h2>Project</h2>
                                    <label>Project Name</label>
                                    <input
                                        type="text"
                                        name="project_name"
                                        value={pdata.project_name}
                                        onChange={handleProjectInputChange}
                                        required
                                    />
                                    <br />
                                    <label>Project ID</label>
                                    <input
                                        type="text"
                                        name="project_Id"
                                        value={pdata.project_Id}
                                        onChange={handleProjectInputChange}
                                        required
                                    />
                                    <button type="submit" disabled={!pdata.project_name || !pdata.project_Id}>
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    <button onClick={handleOnTaskTypeChange}>Add Task Type</button>
                    {taskFormVisible && (
                        <div className='team-box'>
                            <form onSubmit={handleTaskSubmit}>
                                <div>
                                    <h2>Task Type</h2>
                                    <label>Task Type</label>
                                    <input
                                        type="text"
                                        name="task_type" // Corrected name
                                        value={tdata.task_type}
                                        onChange={handleTaskInputChange}
                                        required
                                    />
                                    <br />
                                    <label>Project Name</label>
                                    <select
                                        name="project"
                                        value={tdata.project}
                                        onChange={handleTaskInputChange}
                                        required
                                    >
                                        <option value="" disabled>Select Project</option>
                                        {projects.map((project) => (
                                            <option key={project?.project_ID} value={project?.id}>
                                                {project.project_name}
                                            </option>
                                         
                                        ))}
                                    </select>
                                    <button type="submit" disabled={!tdata.task_type || !tdata.project}>Submit</button>
                                </div>
                            </form>
                        </div>
                    )}
                    {errorMessage && <p className="error">{errorMessage}</p>}
                </section>

                <button onClick={handleOnTeamForm}>ADD Team</button>
                {teamFormVisible && (
                    <div className='teambox'>
                        <form onSubmit={handleonteam}>
                            <div>
                                <h2>Team</h2>
                                <label>Team Name</label>
                                <input
                                    name="team_name"
                                    value={team.team_name}
                                    onChange={handleTeamInputChange}
                                    required
                                />
                                <br />
                                <label>Lead Name</label>
                                <input
                                    name="lead_name"
                                    value={team.lead_name}
                                    onChange={handleTeamInputChange} // Added onChange
                                    required
                                />
                                <br />
                                <button type='sumit' disabled={!team.team_name || !team.lead_name}>Submit </button>
                            </div>
                        </form>
                    </div>
                )}
                <button onClick={handleOnAnnotator}>Add Annotator</button>
                {annotator && (
                    <div>
                        <form onSubmit={handleannotatorsubmit}>
                            <select
                                name="team_name" // Changed from "project" to "team_name"
                                value={annot.team_name}
                                onChange={handleannotchange}
                                required
                            >
                                <option value="" disabled>Select a team</option>
                                {teams.map((team) => (
                                    <option key={team?.team_id} value={team?.id}>
                                        {team.team_name}
                                    </option>
                                ))}
                            </select>

                            <br />
                            <label>Annotator Name</label>
                            <input
                                name="annotator_name"
                                value={annot.annotator_name}
                                onChange={handleannotchange}
                                required
                            />
                            <button
                                type="submit"
                                disabled={!annot.team_name || !annot.annotator_name} // Updated validation
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                )}
            </main>
            <ToastContainer
                className="toast-container"
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="light"
            />
        </div>
    );
};

export default Dashboard;
