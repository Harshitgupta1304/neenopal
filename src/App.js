import {React, useEffect, useState} from 'react';
import './app.css'
import data from "./data.json";
import { CiHeart, CiEdit, CiMail} from "react-icons/ci";
import { MdDelete, MdOutlinePhoneInTalk, MdClose } from "react-icons/md";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";

function App() {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const openDialog = (user) => {
    setIsOpen(true);
    setSelectedUser(user)
    console.log(isOpen)
  };

  const closeDialog = () => {
    console.log(isOpen)

    setIsOpen(false);
  };
  const handleChange = (e) => {
    
      const { name, value } = e.target;
      setSelectedUser({
        ...selectedUser,
        [name]: value
      });
    };

  const handleHeartClick = (id) => {
    const updatedUsers = users.map(user => {
      if (user.id === id) {
        return {
          ...user,
          isHeartFilled: !user.isHeartFilled
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    console.log(users)
  };

  const handleOverlay = (e) => {
    if (e.target.classList.contains('dialog-overlay')) {
      closeDialog();
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUsers = users.map(user => {
      if (user.id === selectedUser.id) {
        return {
          ...user,
          name: selectedUser.name,
          email: selectedUser.email,
          phone: selectedUser.phone,
          website: selectedUser.website
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    closeDialog();
  };
  const handleDelete = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };

  useEffect(() => {
    setUsers(data);
  }, []);
  return (
    <div className='container'>
      
    {users.map( user =>(
      <>
      <div className='cardWrapper'>
      <div  className="card" key={user.id}>
        <div className="imageBackground">
          <img alt="profile" className='image' src='https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'/>
        </div>
        <div className='cardDetails' >
          <h3>{user.name}</h3>
          <div style={{display:'flex', flexDirection:'row'}}>
            <CiMail style={{marginTop:'15px'}} />
          <p style={{marginLeft:'10px'}}>{user.email}</p>
          </div>
          <div style={{display:'flex', flexDirection:'row'}}>
            <MdOutlinePhoneInTalk style={{marginTop:'15px'}} />
          <p style={{marginLeft:'10px'}}>{user.phone}</p> 
            </div> 
          <div style={{display:'flex', flexDirection:'row'}}>
            <AiOutlineGlobal style={{marginTop:'15px'}} />
          <p style={{marginLeft:'10px'}}>{user.website}</p>
            </div>     
        </div>
        <div>
          <ul className='cardActions'>
            <li style={{width: "33.3333%"}}>
              <span>
            <button onClick={()=>handleHeartClick(user.id)} style={{background: "none", border: "none", cursor: "pointer", outline: "none"}}>
              {user.isHeartFilled ? <FaHeart style={{color:'red'}}/> : <CiHeart style={{color:'red'}} />}
              </button>
                    </span>
            </li>
            <li style={{width: "33.3333%"}}>
              <span>
          <button onClick={() =>openDialog(user)} style={{background: "none", border: "none", cursor: "pointer", outline: "none"}}><CiEdit className="footer-btn"/></button>
          </span>
            </li>
            <li style={{width: "33.3333%"}}>
              <span>
          <button onClick={() => handleDelete(user.id)} style={{background: "none", border: "none", cursor: "pointer", outline: "none"}}><MdDelete className="footer-btn"/></button> 
          </span>
            </li>
          </ul>
        </div>
      </div>
      </div>
      </>
      ))}
  
    {isOpen ? (
    <div >  
      <div className="dialog-overlay" onClick={handleOverlay}>
      <div className="dialog">
        <div className="dialog-header">
          <h2>Basic Modal</h2>
          <button  style={{background: "none", border: "none", cursor: "pointer", outline: "none"}} onClick={closeDialog}><MdClose /></button>
        </div>
        <div className="dialog-content">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name"><span style={{ color: "red" }}>*</span>Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={selectedUser.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email"><span style={{ color: "red" }}>*</span>Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={selectedUser.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone"><span style={{ color: "red" }}>*</span>Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={selectedUser.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="website"><span style={{ color: "red" }}>*</span>Website:</label>
              <input
                type="text"
                id="website"
                name="website"
                value={selectedUser.website}
                onChange={handleChange}
              />
            </div>
            <div className="form-group dialog-footer">
              
              <button className='dialog-btn' onClick={closeDialog}>cancel</button>
              <button  className='dialog-btn dialog-btnok' type="submit">Ok</button>
             
            </div>
          </form>
        
        </div>

      </div>
    </div></div>
    )
 : null}
 
    
    
      </div>
  );
}

export default App;
