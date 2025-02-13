import { useState } from 'react';
import { sculptureList } from './data.tsx';
import './style.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Typography, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex((prevIndex) => (prevIndex + 1) % sculptureList.length);
  }

  function handleBackClick() {
    setIndex((prevIndex) => (prevIndex - 1 + sculptureList.length) % sculptureList.length);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  function handleRadioChange(event) {
    const selectedIndex = sculptureList.findIndex(sculpture => sculpture.artist === event.target.value);
    if (selectedIndex !== -1) {
      setIndex(selectedIndex);
    }
  }

      // Radio Button Component
    function RadioButtonsGroup({ index, onChange }) {
      return (
        <FormControl>
          <FormLabel>Select an artist</FormLabel>
          <RadioGroup value={sculptureList[index].artist} onChange={onChange}>
            {sculptureList.map((sculpture, i) => (
              <FormControlLabel
                key={i}
                value={sculpture.artist}
                control={<Radio />}
                label={sculpture.artist}
              />
            ))}
          </RadioGroup>
        </FormControl>
      );
    }

  
    

    interface ExpandMoreProps extends IconButtonProps {
      expand: boolean;
    }

      const ExpandMore = styled(IconButton, {
        shouldForwardProp: (prop) => prop !== 'expand', // 
      })(({ theme, expand }: { theme: any; expand: boolean }) => ({
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
        transform: expand ? 'rotate(180deg)' : 'rotate(0deg)', 
      }));



  const sculpture = sculptureList[index];
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Container maxWidth="sm">
      <Box component="section" sx={{ p: 2, border: '2px solid grey' }}>
        <Typography variant="h2" component="h2">
          Sean Glenn Magcalas
        </Typography>

        <div className="container-button">
          <Stack direction="row" spacing={2}>
            <Button
              onClick={handleBackClick}
              variant="outlined"
              color="primary"
              startIcon={<ArrowBackIosNewIcon />}
              disabled={index === 0}
            >
              <Typography variant="h6" component="h6">
                BACK
              </Typography>
            </Button>

            <Button
              onClick={handleNextClick}
              variant="outlined"
              color="primary"
              startIcon={<ArrowForwardIosIcon />}
              disabled={index === sculptureList.length - 1}
            >
              <Typography variant="h6" component="h6">
                NEXT
              </Typography>
            </Button>
          </Stack>
        </div>

        <Typography variant="h4" component="h2">
          {sculpture.artist}
        </Typography>

        <Typography variant="h6" component="h6">
          ({index + 1} of {sculptureList.length})
        </Typography>

        <Button
          onClick={handleMoreClick}
          sx={{
            margin: '10px',
            backgroundColor: 'green',
            color: 'white',
            '&:hover': {
              backgroundColor: 'darkgreen',
            },
          }}
        >
          {showMore ? 'Hide' : 'Show'} details
        </Button>
        
        <Card variant="outlined">
          <CardContent>
            {showMore && <Typography variant="body1">{sculpture.description}</Typography>}
            <div className="container">
              <img src={sculpture.url} alt={sculpture.alt} style={{ width: '100%', height: 'auto' }} />
            </div>

            {/* Radio Buttons for Selecting an Artist */}
            <RadioButtonsGroup index={index} onChange={handleRadioChange} />
          </CardContent>
        </Card>
        <ExpandMore expand={expanded} onClick={handleExpandClick}>
          <ExpandMoreIcon />
        </ExpandMore>

      
      {expanded && <Typography variant="body1">{sculpture.description}</Typography>}

      </Box>
    </Container>
  );
}

