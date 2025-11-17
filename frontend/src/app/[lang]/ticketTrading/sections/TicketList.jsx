import { Box, Typography, Select, MenuItem } from '@mui/material';
import TicketCard from './TicketCard';

export default function TicketList({ tickets }) {
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

      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </Box>
  );
}
