import  Appbar  from '../components/Appbar'
import { Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function Homepage(){

    return (
        <>
            <Appbar/>
            <div style={{ height: "100vh", width: "100vw", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                flexDirection: "column",
                gap: "20px"
                }}>
                <Box sx = {{
                    width: '500px',
                    height: '350px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                    borderRadius: "20px",
                    flexDirection: 'column',
                    gap: '10px',
                    
                }}>
                    <h2>Welcome to Campus Experience</h2>
                    
                    <Link to='/signup'><Button variant="contained" sx={{ width: '150px', height:'50px' }}>Sign up</Button></Link>
                    <Link to='/login'><Button variant="contained" sx={{ width: '150px', height:'50px' }}>Login</Button></Link>
                </Box>
                    
                
                
                
            </div>
        </>
    )
}