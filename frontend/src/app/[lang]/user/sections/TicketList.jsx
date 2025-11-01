import { Grid } from '@mui/material';
import TicketCard from './TicketCard';

export default function TicketList({ tickets }) {
  return (
    <Grid container spacing={3}>
      {tickets.map((t) => (
        <Grid key={t.id} item xs={12} md={6} lg={4}>
          <TicketCard ticket={t} />
        </Grid>
      ))}
    </Grid>
  );
}
