import {Controller, Route} from "../decorators/routing";

@Controller()
export default class SystemController {
    @Route('get', 'systeminfo')
    async getSystemInfo() {
        let date = new Date();

        return {
            SystemInfo: {
                Branch: 'production',
                ChangeList: 620384,
                ClientVersion: '1614b',
                ClientVersionCheck: false,
                Deployed: '08/20/2013 11:24:40',
                EntitlementsToDownload: true,
                ForcePermanentSession: true,
                JidPrepender: 'nfsw',
                LauncherServiceUrl: {},
                NucleusNamespace: 'nfsw-live',
                NucleusNamespaceWeb: 'nfs_web',
                PersonaCacheTimeout: 900,
                PortalDomain: {},
                PortalSecureDomain: {},
                PortalStoreFailurePage: {},
                PortalTimeOut: 60000,
                ShardName: 'APEX',
                Time: date.toISOString(),
                Version: 2578,
            }
        };
    }

    @Route('get', 'getrebroadcasters')
    async getRebroadcasters() {
        return {
            ArrayOfUdpRelayInfo: {
                UdpRelayInfo: {
                    // Host: process.env.SERVER_IP,
                    // Port: process.env.FREEROAM_PORT
                }
            }
        };
    }

    @Route('get', 'getregioninfo')
    async getRegionInfo() {
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
    async getHeartbeat() {
        return {
            HeartBeat: {
                MetagameFlags: 2,
                enabledBitField: 0
            }
        };
    }
}