import '../App.css';
import { useState } from 'react';
import { HomeInterface } from './homeComponent';
import {createTheme,ThemeProvider} from '@mui/material/styles';
// Motion Fremwork
import {motion} from "motion/react";
// componenets
import Box from "@mui/material/Box"
import  Typography  from "@mui/material/Typography";
import  Stack  from "@mui/material/Stack";
import { ButtonGroup,Button } from "@mui/material";
import {ToggleButtonGroup,ToggleButton} from '@mui/material';
import { Route,Routes,BrowserRouter,Link,Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';



 const theme = createTheme({
  palette: {
    primary: {
      light: '#5172e6',
      main: '#2952e0',
      dark: '#122a7d',
      contrastText: '#fff',
    },
    secondary: {
      light: '#51bce6',
      main: '#29ade0',
      dark: '#125f7d',
      contrastText: '#f8efce',
    },
  },

  components: {
    // تخصيص جميع أزرار ToggleButton تلقائياً
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: '#fff',
          backgroundColor: '#2952e0',
          '&.Mui-selected': {
            backgroundColor: '#122a7d',
            color: '#fff',
          },
          '&.Mui-selected:hover': {
            backgroundColor: '#122a7d'  ,
            color: '#fff',
          },
          '&:hover': {
            backgroundColor: '#122a7d', 
            color: '#fff',            
          },
        },
      },
    },
  },
});
export default function Layout(){
   
    return(
        <>
        <ThemeProvider theme={theme}>

            <Container id="container" maxWidth="sm">
            
                <Box className="contentBox glass-card">
                    <Stack spacing={5}  >
                      <Stack spacing={3} sx={{justifyContent:'center',alignItems:'center'}}>
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
                          alt="Check"
                          width="60"
                        />
                        <Typography variant="h3" component="h3" sx={{fontSize:"", textAlign:"center"} } >My-TO DO</Typography>
                      </Stack>
                      <Outlet/>
                        
                    </Stack>

                </Box>
            </Container>
        </ThemeProvider>
        
        </>

    )
    
}
