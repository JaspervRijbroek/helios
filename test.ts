import { readFileSync } from "fs";
import { join } from "path";
import { createServer } from "tls";

let server = createServer({
    key: readFileSync(join(process.cwd(), 'public', 'resources', 'selfsigned.key')),
    cert: readFileSync(join(process.cwd(), 'public', 'resources', 'selfsigned.cer')),
    // passphrase: '123456',
    rejectUnauthorized: false
});
server.listen(9999, () => {
    console.log('Server listening')
});