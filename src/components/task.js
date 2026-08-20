import '../App.css';
import React from 'react';
// ___ MUI Components
import Button from '@mui/material/Button';
import  Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';  
import FormGroup from '@mui/material/FormGroup'

import Stack from '@mui/material/Stack';
// _____ Icon
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Typography } from '@mui/material';


export default function Tasks(){
    return(
        <>
            <Box >         
                <CheckboxList/>
            </Box>
        </>
    )
    
}

export  function CheckboxList() {
  const [checked, setChecked] = React.useState([0]);
  let isChecked;
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    // List element checked
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      isChecked = true; 
    } else {
      newChecked.splice(currentIndex, 1);
      isChecked =false;
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{bgcolor:'#ffffff05', borderRadius:"10px" , marginTop:"10px"} }>
      {[0, 1, 2, 3,4].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}
            secondaryAction={
              <Stack edge="end" aria-label="Icons" direction="row" sx={{gap:"8px"}}>
                    <IconButton aria-label="deleteForeverIcon" id='icon-button'  color="primary.dark" >
                      <InfoOutlinedIcon/>
                    </IconButton>
                    <IconButton aria-label="deleteForeverIcon"    color="primary.dark" >
                      <EditNoteOutlinedIcon/>
                    </IconButton>
                    <IconButton aria-label="deleteForeverIcon"  color="primary.dark" >
                      <DeleteForeverOutlinedIcon />
                    </IconButton>
                       
              </Stack>
            }
            disablePadding
            
          >
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense sx={{padding:'Opx ', bgcolor:" #ffffff84" ,mb:"5px"}}>
              <ListItemIcon>
                <FormGroup>
                <FormControlLabel 
                control={<Checkbox
                  tabIndex={-1}
                  checked={checked.includes(value)}
                  icon={<CheckCircleOutlinedIcon />}
                  checkedIcon={<CheckCircleIcon />}
                />}
                
                label={<ListItemText dir="auto" primary={<Typography  component="h4" color="textPrimary" sx={{fontSize:'1.1rem',textDecoration: checked.includes(value) ? 'line-through' : 'none',}} >go to home</Typography>} secondary={<Typography dir="auto" component="span" color="textSecondary" sx={{fontSize:'15 px'}}>
                   description
                    </Typography>}/>}
                />
                </FormGroup>
                
              </ListItemIcon>
              <ListItemText />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
