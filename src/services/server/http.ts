import 'server-only'

// export async function serverMakeHttpGet<T>(url: string): Promise<T> {
//     if (url.startsWith('/')) {
//         url = serverConfig.INTERNAL_SERVER + url
//     }
//     const cookieStore = cookies()
//     const authHeader = cookieStore.toString()
//
//     const response = await axios.get<T>(url, {
//         headers: {
//             Cookie: authHeader,
//         },
//     })
//     return response.data
// }
