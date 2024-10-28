import * as React from 'react';
import Box from '@mui/material/Box';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';
import Alert from '@mui/material/Alert';


export default function Signup() {
    const paperStyle = {padding: '10px 20px', width: 600, margin: '20px auto'}
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [added, setAdded] = useState(false)

    const handleClick = (e)=> {
        e.preventDefault()
        const student = {name, email, password}
        console.log(student)
        fetch("http://localhost:8080/user/save",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify(student)

            }).then(()=>{
                console.log("New student added")
                setAdded(true)
            })
    }

  return (
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h2 style={{ textAlign: 'center', paddingTop: '0px'}}>Sign up</h2>
            <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1 } }}
            noValidate
            autoComplete="off"
            >
            <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth 
            value={name}
            onChange={(e) => setName(e.target.value)}/>
            <TextField id="outlined-basic" label="Email Address" variant="outlined" fullWidth 
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
            <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth
            value={password}
            onChange={(e) => setPass(e.target.value)} />

            <Button 
            variant="contained" 
            onClick={handleClick}
            
            >Sign Up</Button>

            {added && (<Alert severity="success">New student added successfully!</Alert>)}
            </Box>
        </Paper>
    </Container>
  );
}
