import * as React from 'react';
import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { Box, MenuItem, Select } from '@mui/material';
import Slide from '@mui/material/Slide';
import { LuPlus } from 'react-icons/lu';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ hasTicketList }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedDate, setSelectedDate] = useState('');
  const handleChange = (event) => {
    setSelectedDate(event.target.value);
  };
  return (
    <React.Fragment>
      <Button
        display="flex"
        variant="contained"
        color="primary"
        sx={{
          width: '250px',
          mt: 2,
          alignItems: 'center',
          justifyContent: 'center',
          py: 1.3,
        }}
        onClick={handleClickOpen}>
        <LuPlus size={24} /> 販售我的票券
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        slots={{
          transition: Transition,
        }}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound\\
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Box p={3}>
          <Select
            fullWidth
            size="small"
            defaultValue=""
            displayEmpty
            sx={{ mb: 3 }}
            onChange={handleChange}>
            {selectedDate && <MenuItem value="">選擇票券</MenuItem>}

            {hasTicketList.map(({ ticketId, title, date, time }) => (
              <MenuItem key={ticketId} value={ticketId}>
                {title}
                {/* {formatDateToChinese({ date, time })} */}
              </MenuItem>
            ))}
          </Select>
          {hasTicketList?.map(
            (t, i) =>
              (selectedDate === '' || selectedDate === t.ticketId) && (
                <Box
                  key={i}
                  sx={{
                    mb: 3,
                    border: '1px solid #F5EBFF',
                    p: 2,
                    borderRadius: 1,
                    boxShadow: 1,
                    gap: 1,
                  }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography fontWeight="bold">{t.date}</Typography>
                  </Box>
                  <Typography color="text.secondary">{t.location}</Typography>
                </Box>
              ),
          )}
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
