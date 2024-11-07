import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboar.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const [tasks, settasktypes] = useState([]);
    const [annotators,setannotators] =useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const handleOnChange = () => setShowForm(!showForm);
    const handleOnTaskTypeChange = () => setTaskFormVisible(!taskFormVisible);
    const handleOnTeamForm = () => setTeamFormVisible(!teamFormVisible);
    const handleOnAnnotator = () => setannotator(!annotator)

    const handleProjectInputChange = (e) => setData({ ...pdata, [e.target.name]: e.target.value });
    const handleTaskInputChange = (e) => setTData({ ...tdata, [e.target.name]: e.target.value });
    const handleTeamInputChange = (e) => setTeam({ ...team, [e.target.name]: e.target.value });
    const handleannotchange = (e) => setannot({ ...annot, [e.target.name]: e.target.value })


    const user = JSON.parse(localStorage.getItem("user"));
    const [userRole, setUserRole] = useState('');
    useEffect(() => {
        if (user) {
          setUserRole(user.role);  // Set the user role when the component mounts or user changes
        }
      }, [user]);
 


    // useEffect(() => {
    //     const fetchProjects = async () => {
    //         try {
    //             const response = await axios.get('http://127.0.0.1:8000/data/projectlist/');
    //             setProjects(response.data);
    //         } catch (error) {
    //             console.error('Error fetching projects:', error);
    //         }
    //     };
    //     fetchProjects();
    // }, []);
    // useEffect(() => {
    //     const fetchProjects = async () => {
    //         try {
    //             const response = await axios.get('http://127.0.0.1:8000/data/projectlist/');

    //             // Add default values for `status` and `is_active`
    //             const updatedProjects = response.data.map(project => ({
    //                 ...project,
    //                 status: project.status || 'inactive', // Set default status to 'inactive' if not provided
    //                 is_active: project.is_active !== undefined ? project.is_active : false, // Default is_active to false
    //             }));

    //             setProjects(updatedProjects);
    //         } catch (error) {
    //             console.error('Error fetching projects:', error);
    //         }
    //     };

    //     fetchProjects();

    // }, []);

    // useEffect(() => {
    //     const fetchteam = async () => {
    //         try {
    //             const response = await axios.get('http://127.0.0.1:8000/data/teamlist/')
    //             setteams(response.data)
    //             console.log(response)

    //         } catch (error) {
    //             console.error('Error fetching teams')

    //         }
    //     }
    //     fetchteam()

    // }, [])
    useEffect(() => {
        const fetchProjectsAndTeams = async () => {
            try {
                const projectResponse = await axios.get('http://127.0.0.1:8000/data/projectlist/');
                const teamResponse = await axios.get('http://127.0.0.1:8000/data/teamlist/');
                const taskResponse = await axios.get('http://127.0.0.1:8000/data/task_typelist/')
                const teammemberResponse = await axios.get('http://127.0.0.1:8000/data/annotatorlist/')
                setProjects(projectResponse.data);
                setteams(teamResponse.data);
                settasktypes(taskResponse.data)
                setannotators(teammemberResponse.data)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Initial fetch
        fetchProjectsAndTeams();

        // Polling every 30 seconds
        // const interval = setInterval(fetchProjectsAndTeams, 30000); // 30 seconds
        // return () => clearInterval(interval); // Clear interval on component unmount
    }, []);
    // console.log(tasks)
    // console.log(projects)
    console.log(teams)

   
        const [editingRow, setEditingRow] = useState(null);
        const [editData, setEditData] = useState({});
    
        const handleEditClick = (project) => {
            setEditingRow(project.id);
            setEditData({
                project_name: project.project_name,
                task_type: tasks.filter(ea => ea?.project === project?.id).map(eac => eac?.task_type).join(", "),
                team: teams.map((team) => team.team_name).join(", "),
                team_user: annotators.map((team) => team.annotator_name).join(", "),
            });
        };
    
        const handleSaveClick = () => {
            console.log("Saved data:", editData); // Add logic to save data here
            setEditingRow(null); // Exit edit mode after saving
        };
    
        const handleChange = (field, value) => {
            setEditData({
                ...editData,
                [field]: value,
            });
        };

















    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(""); // Reset error message
        if (!pdata.project_name || !pdata.project_Id) {
            setErrorMessage('Project name and ID are required.');
            return;
        }

        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.post('http://127.0.0.1:8000/data/project_create/', pdata,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                        'Content-Type': 'application/json', 
                    }
                }
            );
            console.log('Project added:', response.data);
            toast.success('Project added successfully!');
            setData({ project_name: '', project_Id: '' });
            setProjects((prev) => [...prev, response.data]); // Add the new project
        } catch (error) {
            // setErrorMessage('Failed alread project is added');
            if (error.response) {
                toast.error(error.response.data.msg || 'Failed already project is added. Please try again.');
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
        console.log(projects)
        console.log(tdata)

        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.post('http://127.0.0.1:8000/data/type_create/', tdata,{
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                        'Content-Type': 'application/json', 
                    }
                }
            );
            console.log('Task added:', response.data);
            toast.success('Task added successfully!');
            setTData({ task_type: '', project: '' });
        } catch (error) {
            // console.error('Failed to add task:', error);
            // setErrorMessage('Failed to add task. Please try again.');
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
            // console.error('Failed to add team:', error);
            // setErrorMessage('Failed to add team. Please try again.');
            if (error.response) {
                toast.error(error.response.data.msg || 'Failed already team added. Please try again.');
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
                        <h1>Hello, {user.username}</h1>
                        <p>Have a nice day</p>
                    </div>
                    <div className="user-info">
                        <div className="bell-icon">{/* Bell icon placeholder */}</div>
                        <div className="info">
                            <div className="user-logo">{/* User logo placeholder */}</div>
                            <div className="user-role">
                                <span className="username">{user.username}</span>
                                <span className="role">{user.role}</span>
                            </div>
                        </div>
                    </div>
                </header>

                <section className="dashboard">
                    <h2>Qc Dashboard</h2>
                    <div className="search-add">
                        <input type="text" placeholder="Search" />

                        {userRole === 'manager' && (
                        <button onClick={handleOnChange} className="projectbutton">Add Project +</button>)}
                        {showForm && (
                            <div className='box'>
                                <form onSubmit={handleOnSubmit} className="projectadd">
                                    <div>
                                        <h2>Project</h2>

                                        <input
                                            type="text"
                                            name="project_name"
                                            value={pdata.project_name}
                                            onChange={handleProjectInputChange}
                                            placeholder='Project_name'
                                            required

                                        />
                                        <br />

                                        <input
                                            type="text"
                                            name="project_Id"
                                            value={pdata.project_Id}
                                            onChange={handleProjectInputChange}
                                            placeholder='Project_id'

                                        />
                                        <br />
                                        <button type="submit" disabled={!pdata.project_name || !pdata.project_Id}>
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {userRole === 'manager' && (
                        <button onClick={handleOnTaskTypeChange}>Add Task Type</button>)}
                        {taskFormVisible && (
                            <div className='box'>
                                <form onSubmit={handleTaskSubmit}>
                                    <div>
                                        <h2>Task Type</h2>
                                        <input
                                            type="text"
                                            name="task_type" // Corrected name
                                            value={tdata.task_type}
                                            onChange={handleTaskInputChange}
                                            placeholder='Task_type'

                                        />
                                        <br />
                                        <select
                                            name="project"
                                            value={tdata.project}
                                            onChange={handleTaskInputChange}


                                        >
                                            <option value="" disabled>Select Project</option>
                                            {projects.map((project) => (
                                                <option key={project?.project_name} value={project?.id}>
                                                    {project.project_name}
                                                </option>

                                            ))}
                                        </select>
                                        <br />
                                        <button type="submit" disabled={!tdata.task_type || !tdata.project}>Submit</button>
                                    </div>
                                </form>
                            </div>
                        )}
                        {errorMessage && <p className="error">{errorMessage}</p>}

                        {userRole === 'manager' && (
                        <button onClick={handleOnTeamForm}>ADD Team</button>)}
                        {teamFormVisible && (
                            <div className='box'>
                                <form onSubmit={handleonteam}>
                                    <div>
                                        <h2>Team</h2>

                                        <input
                                            name="team_name"
                                            value={team.team_name}
                                            onChange={handleTeamInputChange}
                                            placeholder='Team_name'
                                        />
                                        <br />

                                        <input
                                            name="lead_name"
                                            value={team.lead_name}
                                            onChange={handleTeamInputChange} // Added onChange
                                            placeholder='Lead_name'
                                        />
                                        <br />
                                        <button type='sumit' disabled={!team.team_name || !team.lead_name}>Submit </button>
                                    </div>
                                </form>
                            </div>
                        )}
                        {userRole === 'manager' && (
                        <button onClick={handleOnAnnotator}>Add Annotator</button>)}
                        {annotator && (
                            <div className='box'>
                                <form onSubmit={handleannotatorsubmit}>
                                    <h2>Team_user</h2>
                                    <select
                                        name="team_name"
                                        value={annot.team_name}
                                        onChange={handleannotchange}
                                        required
                                    >
                                        <option value="" disabled>Select a team</option>
                                        {teams.map((team) => (
                                            <option key={team?.id} value={team?.id}>
                                                {team.team_name}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        name="annotator_name"
                                        value={annot.annotator_name}
                                        onChange={handleannotchange}
                                        placeholder='Annotator_name'
                                    />
                                    <br />
                                    <button type="submit" disabled={!annot.team_name || !annot.annotator_name}>Submit</button>
                                </form>
                            </div>
                        )}
                        <select>
                            <option>Sort by</option>
                        </select>
                        <select>
                            <option>
                                Saved search
                            </option>
                        </select>
                    </div>
                    <div className='table-container'>
                        <table className='users-table'>
                            <thead>
                                <h2 className='list-users'>List components</h2>
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
                                    tasks.filter(ea => ea?.project === project?.id).map(eac => eac?.task_type).join(", ")
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

                </section>



            </main>
            <ToastContainer
                className="toast-container"
                position="top-center"
                autoClose={5000}
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
