import Express from 'express';
import { Config } from '../../lib/config';
import AdminBroExpress from '@admin-bro/express'
import AdminBro from 'admin-bro';
import { Database } from '../../lib/database';
import User from '../../database/models/user';
import { compare } from 'bcrypt';
import Category from '../../database/models/ecommerce/category';
import Persona from '../../database/models/persona';

export default class AdminServer {
    server: any;

    constructor() {
        this.server = Express();
    }

    async start() {
        AdminBro.registerAdapter(require('./lib/adapter').default);

        let port = Config.get('servers.admin.port'),
            bro = new AdminBro({
                branding: {
                    companyName: 'Helios',
                    softwareBrothers: false
                },
                databases: [Database.getInstance().getKnex()],
                rootPath: '/',
                resources: [{
                    resource: User,
                    options: {
                        username: {isTitle: true}
                    }
                }, {
                    resource: Category
                }]
            }),
            router = !debug.enabled ? AdminBroExpress.buildAuthenticatedRouter(bro, {
                authenticate: async (email, password) => {
                    const user = await User.query().findOne({ username: email, is_admin: true })
                    
                    return user && await compare(password, user.password) ? user : false;
                },
                cookiePassword: 'some-secret-password-used-to-secure-cookie'
            }) : AdminBroExpress.buildRouter(bro);

        this.server.use(bro.options.rootPath, router);
        this.server.listen(port, () => debug(`Server listening on port: ${port}`));
    }
}