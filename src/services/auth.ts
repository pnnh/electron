import 'server-only'
import {serverConfig} from './server/config'
import {SessionModel} from "@/models/session";
import {trySigninDomain} from "@/services/server/domain/domain";
import {AccountModel} from "@/models/account";

// 获取身份认证信息
export async function getIdentity(): Promise<SessionModel> {
    // const cookieStore = cookies()
    // const authHeader = cookieStore.toString()//.get('Polaris-Authorization')?.value
    //
    // const url = `${serverConfig.NEXT_PUBLIC_SELF_URL}/account/session`
    // const response = await axios.get<SessionModel>(url, {
    //     headers: {
    //         Cookie: authHeader,
    //     },
    // })
    // return response.data
    return {} as SessionModel
}

export async function loadSessions2() {
    const sessionList: SessionModel[] = []

    const initialDomains = serverConfig.INITIAL_DOMAINS
    const accountModel = await trySigninDomain(initialDomains)?.makeGet<AccountModel>('/account/information')
    if (accountModel) {
        sessionList.push({
            account: accountModel,
            name: accountModel.urn,
            token: '',
            domain: '',
        })
    }
    return sessionList
}

// 根据viewer标识获取身份认证信息
// export async function getIdentity2(viewerToken: string): Promise<SessionModel> {
//     const domain = signinDomain(viewerToken)
//     return await domain.makeGet<SessionModel>('/account/session')
// }
