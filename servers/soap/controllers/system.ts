import {Request, Response} from "express";
import {Controller, Route} from "../decorators/routing";
import BaseController from "../../../lib/controller";

@Controller()
export default class SystemController extends BaseController {
    @Route('get', 'systeminfo')
    getSystemInfo(req: Request) {
        let date = new Date();

        return {
            SystemInfo: {
                Branch: 'production',
                ChangeList: 620384,
                ClientVersion: 637,
                ClientVersionCheck: true,
                Deployed: '08/20/2013 11:24:40',
                EntitlementsToDownload: true,
                ForcePermanentSession: true,
                JidPrepender: 'nfsw',
                LauncherServiceUrl: 'http://10.100.15.202/LauncherService/onlineconfig.aspx',
                NucleusNamespace: 'nfsw-live',
                NucleusNamespaceWeb: 'nfs_web',
                PersonaCacheTimeout: 900,
                PortalDomain: 'world.needforspeed.com',
                PortalSecureDomain: 'world.needforspeed.com',
                PortalStoreFailurePage: 'world.needforspeed.com/webkit/pageLoadError',
                PortalTimeOut: 60000,
                ShardName: 'APEX',
                Time: date.toISOString(),
                Version: 2578,
            }
        };
    }

    @Route('get', 'getrebroadcasters')
    getRebroadcasters(req: Request) {
        return {
            ArrayOfUdpRelayInfo: {
                UdpRelayInfo: {
                    // Host: '127.0.0.1',
                    // Port: process.env.FREEROAM_PORT
                }
            }
        };
    }

    @Route('get', 'getregioninfo')
    getRegionInfo(req: Request) {
        return {
            RegionInfo: {
                CountdownProposalInMilliseconds: 3000,
                DirectConnectTimeoutInMilliseconds: 1000,
                DropOutTimeInMilliseconds: 15000,
                EventLoadTimeoutInMilliseconds: 30000,
                HeartbeatIntervalInMilliseconds: 1000,
                UdpRelayBandwidthInBps: 9600,
                UdpRelayTimeoutInMilliseconds: 60000
            }
        };
    }

    @Route('post', 'heartbeat')
    getHeartbeat(req: Request) {
        return {
            HeartBeat: {
                MetagameFlags: 2,
                enabledBitField: 0
            }
        };
    }
}