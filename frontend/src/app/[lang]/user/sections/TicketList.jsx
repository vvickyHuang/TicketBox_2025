import { Grid } from '@mui/material';
import TicketCard from './TicketCard';

export default function TicketList({ tickets }) {
  return (
    <Grid container spacing={3}>
      {tickets.map((t) => (
        <Grid key={t.id}>
          <TicketCard ticket={t} />
        </Grid>
      ))}
    </Grid>
  );
}
