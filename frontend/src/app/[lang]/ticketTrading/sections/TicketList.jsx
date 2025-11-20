import { useTheme, Box, Typography, Select, MenuItem } from '@mui/material';
import TicketCard from './TicketCard';
import { MdOutlineEventSeat } from 'react-icons/md'; // icon，可換你喜歡的

export default function TicketList({ tickets }) {
  const theme = useTheme();
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}>
        <Typography variant="h6">票券市場</Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body2" color="text.secondary">
            共 {tickets.length} 筆結果
          </Typography>
          <Select size="small" defaultValue="latest">
            <MenuItem value="latest">最新發布</MenuItem>
            <MenuItem value="priceLow">價格低到高</MenuItem>
            <MenuItem value="priceHigh">價格高到低</MenuItem>
          </Select>
        </Box>
      </Box>

      {tickets.length === 0 && (
        <>
          <Typography sx={{ textAlign: 'center', py: 4, color: theme.palette.secondary.main }}>
            目前票券市場沒有任何票券
          </Typography>
        </>
      )}
      {tickets.length > 0 &&
        tickets?.map((ticket, tindex) => <TicketCard key={tindex} ticket={ticket} />)}
    </Box>
  );
}
