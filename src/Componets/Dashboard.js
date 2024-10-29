import React, { useState,useEffect } from 'react';
import './FlexboxGrid.css';
import axios from 'axios';

const Dashboard = () => {
    const [showform, setform] = useState(false);
    const [task_t, settask_t] = useState(false);

   
    const [pdata, setdata] = useState({
        projectname: '',
        project_id: ''
    });
    const [tdata,settdata]=useState({
        task_name:'',
        project:''
    })

    
    const handleOnChange = () => {
        setform(!showform);
    };

    const handleontask = () => {
        settask_t(!task_t);
    };


    const handleonproject = (e) => {
        setdata({ ...pdata, [e.target.name]: e.target.value });
    };
    const handleontasktype =(e)=>{
        settdata({...tdata,[e.target.name]:e.target.value})

    }
    
    const { projectname, project_id } = pdata;
    const {task_name,project}=tdata

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
          try {
            const response = await axios.get('/api/projects/'); // Update with correct backend endpoint
            setProjects(response.data);
          } catch (error) {
            console.error('Error fetching projects', error);
          }
        };
    
        fetchProjects();
      }, []);
    

  
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('YOUR_API_ENDPOINT', pdata);
            console.log('Project added:', response.data);
            setdata({ projectname: '', project_id: '' }); // Reset form fields
        } catch (error) {
            console.error('Failed to add project:', error);
        }
    };

    return (
      <div className='container'>
        <aside className='sidebar'>
          <div className='logo'>
            {/* Logo placeholder */}
          </div>
          <hr />
          <nav className='nav-menu'>
            <div className='view-status flex margin-bot'>
              <a href='/' className='a-href font'>Dashboard</a>
            </div>
          </nav>
        </aside>

        <main className='main-content'>
          <header className='header'>
            <div>
              <h1>Hello, User_1</h1>
              <p>Have a nice day</p>
            </div>
            <div className='user-info'>
              <div className='bell-icon'>
                {/* Bell icon placeholder */}
              </div>
              <div className='info'>
                <div className='user-logo'>
                  {/* User logo placeholder */}
                </div>
                <div className='user-role'>
                  <span className='username'>User_1</span>
                  <span className='role'>Admin</span>
                </div>
              </div>
            </div>
          </header>

          <section className='dashboard'>
            <h2>Qc Dashboard</h2>
            <div className='search-add'>
              <input type='text' placeholder='Search' />
            </div>

            <button onClick={handleOnChange}>Add project +</button>
            {showform && (
              <form onSubmit={handleOnSubmit} className='projectadd'>
                <div>
                  <h2>Project</h2>
                  <label>Project Name</label>
                  <input
                    type='text'
                    name='projectname'
                    value={projectname}
                    onChange={handleonproject}
                    required
                  />
                  <br />
                  <label>Project ID</label>
                  <input
                    type='text'
                    name='project_id'
                    value={project_id}
                    onChange={handleonproject}
                    required
                  />
                  <button type='submit' disabled={!projectname || !project_id}>
                    Submit
                  </button>
                </div>
              </form>
            )}

            <button onClick={handleontask}>Add Task Type</button>
            {task_t && (
              <form onSubmit={(e) => e.preventDefault()}>
                <div>
                  <h2>Task Type</h2>
                  <lable>task_type</lable>
                  <input
                  type='text'
                  name='task_type'
                  value={task_name}
                  onChange={handleontasktype}
                  />
                  <br/>
                  <label>Project Name</label>
                 <select
                 name='project'
                 value={project}
                 onChange={handleontasktype}>
                    {projects.map((project) => (
                    <option key={project.project_Id} value={project.project_Id}>
                    {project.project_name}
                     </option>
            ))}

                 </select>


                
                </div>
              </form>
            )}
          </section>
        </main>
      </div>
    );
  };
  
export default Dashboard;
