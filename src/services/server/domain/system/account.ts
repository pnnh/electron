import {stringToBase58, stringToMd5} from "@/utils/basex";
import {AccountModel} from "@/models/account";
import {NextRequest} from "next/server";

export class SystemAccountService {
    async accountInformation(request: NextRequest) {
        const userSession: AccountModel = {
            uid: stringToMd5('anonymous'),
            urn: stringToBase58('anonymous'),
            create_time: '',
            update_time: '',
            username: '',
            image: '/photos/8.png',
            description: '',
            mail: '',
            nickname: 'anonymous',
            photo: '',
            role: 'anonymous',
        }
        return userSession
    }
}
