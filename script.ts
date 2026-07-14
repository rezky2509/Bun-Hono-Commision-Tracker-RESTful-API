// Run all the necessary script
import {$} from 'bun'


await Promise.all([
    // $`bun run db:start`,
    $`bun run db:studio`,
    $`bun run dev`
]);

