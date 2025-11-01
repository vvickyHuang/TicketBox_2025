import {
  Box,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Button,
  Divider,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import PopularConcerts from './PopularConcerts';

export default function FilterSidebar() {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: 3,
        p: 3,
        boxShadow: 1,
      }}
    >
      <Typography variant='h6' gutterBottom>
        篩選條件
      </Typography>

      <Typography variant='body2' color='text.secondary'>
        票券類型
      </Typography>
      <RadioGroup defaultValue='all'>
        <FormControlLabel value='all' control={<Radio />} label='全部' />
        <FormControlLabel value='sell' control={<Radio />} label='售票' />
        <FormControlLabel value='buy' control={<Radio />} label='徵票' />
      </RadioGroup>

      <Typography variant='body2' color='text.secondary' sx={{ mt: 2 }}>
        價格範圍
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField size='small' placeholder='最低' fullWidth />
        <TextField size='small' placeholder='最高' fullWidth />
      </Box>

      <Typography variant='body2' color='text.secondary' sx={{ mt: 2 }}>
        演出日期
      </Typography>
      <TextField size='small' type='date' fullWidth />

      <Typography variant='body2' color='text.secondary' sx={{ mt: 2 }}>
        演出地點
      </Typography>
      <FormControl fullWidth size='small'>
        <InputLabel>全部地點</InputLabel>
        <Select defaultValue=''>
          <MenuItem value=''>全部地點</MenuItem>
          <MenuItem value='taipei'>台北</MenuItem>
          <MenuItem value='kaohsiung'>高雄</MenuItem>
        </Select>
      </FormControl>

      <Button variant='contained' fullWidth sx={{ mt: 3, py: 1.2, backgroundColor: '#7C3AED' }}>
        套用篩選
      </Button>

      <Divider sx={{ my: 3 }} />

      <PopularConcerts />
    </Box>
  );
}
