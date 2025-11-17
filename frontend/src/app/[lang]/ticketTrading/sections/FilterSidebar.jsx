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
import DateRangePicker from '@/components/DateRangePicker';

export default function FilterSidebar() {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: 3,
        p: 3,
        boxShadow: 1,
      }}>
      <Typography variant="h6" gutterBottom>
        篩選條件
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        搜尋關鍵字
      </Typography>
      <TextField size="small" placeholder="搜尋演唱會名稱或歌手" fullWidth />

      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        票券類型
      </Typography>

      <RadioGroup defaultValue="all">
        <FormControlLabel value="all" control={<Radio />} label="全部" />
        <FormControlLabel value="sell" control={<Radio />} label="售票" />
        <FormControlLabel value="buy" control={<Radio />} label="徵票" />
      </RadioGroup>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        價格範圍
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField size="small" placeholder="最低" fullWidth />
        <TextField size="small" placeholder="最高" fullWidth />
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        演出日期
      </Typography>
      <DateRangePicker />

      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        演出地點
      </Typography>
      <FormControl fullWidth size="small">
        <Select defaultValue="">
          <MenuItem value="all">全部地點</MenuItem>
          <MenuItem value="taipei">台北</MenuItem>
          <MenuItem value="kaohsiung">高雄</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" fullWidth sx={{ mt: 3, py: 1.2 }}>
          套用篩選
        </Button>
        <Button variant="contained" fullWidth sx={{ mt: 3, py: 1.2 }}>
          清除條件
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      <PopularConcerts />
    </Box>
  );
}
