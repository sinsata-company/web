import axios from 'axios'

// const BASE_URL = 'http://localhost:8080/api/v1'
const BASE_URL = 'https://api.sinsata.co.kr/api/v1'

export let token: string = ''

export const setToken = (tk: string) => {
  token = tk
}

class LW_API {}

function getAccessToken() {
  return window.localStorage.getItem('sst-access-token')
}

export async function basicGet(route: string) {
  const url = `${BASE_URL}${route}`

  // TODO jwt 갱신하거나 로그아웃 하는 방안
  const accessToken = getAccessToken()
  const response = await axios.get(url, {
    headers: {
      'SST-ACCESS-TOKEN': `${accessToken}`,
    },
  })

  if (response.status == 200) {
    const data = response.data
    return data
  } else {
    throw '에러 발생'
  }
}

export async function basicPost(route: string, body: any) {
  const url = `${BASE_URL}${route}` // 데이터를 가져올 서버의 URL
  // TODO jwt 갱신하거나 로그아웃 하는 방안
  const accessToken = getAccessToken()
  const response = await axios.post(url, body, {
    headers: {
      'SST-ACCESS-TOKEN': `${accessToken}`,
    },
  })

  if (response.status == 200) {
    const data = response.data
    return data
  } else {
    throw '에러 발생'
  }
}

export async function basicPut(route: string, body: any) {
  const url = `${BASE_URL}${route}` // 데이터를 가져올 서버의 URL
  // TODO jwt 갱신하거나 로그아웃 하는 방안
  const accessToken = getAccessToken()
  const response = await axios.put(url, body, {
    headers: {
      'SST-ACCESS-TOKEN': `${accessToken}`,
    },
  })

  if (response.status == 200) {
    const data = response.data
    return data
  } else {
    throw '에러 발생'
  }
}

export async function basicDelete(route: string) {
  const url = `${BASE_URL}${route}`

  // TODO jwt 갱신하거나 로그아웃 하는 방안

  //   const accessToken = ''
  const accessToken = getAccessToken()
  const response = await axios.delete(url, {
    headers: {
      'SST-ACCESS-TOKEN': `${accessToken}`,
    },
  })

  if (response.status == 200) {
    const data = response.data
    return data
  } else {
    throw '에러 발생'
  }
}
class MYCApi {
  //   static Future<dynamic> basicDelete(String route) async {
  //     final url = '$BASE_URL$route'; // 데이터를 가져올 서버의 URL
  //     // TODO jwt 갱신하거나 로그아웃 하는 방안
  //     String accessToken = jwt.accessToken!;
  //     final response =
  //         await http.delete(Uri.parse(url), headers: <String, String>{
  //       'Authorization': 'Bearer $accessToken', // Bearer 토큰 추가
  //     });
  //     if (response.statusCode == 200) {
  //       final data = json.decode(response.body);
  //       return data;
  //     } else {
  //       throw Exception('Failed to fetch');
  //     }
  //   }
  //   static Future<dynamic> putWithHeader(String route, dynamic body) async {
  //     final url = '$BASE_URL$route'; // 데이터를 가져올 서버의 URL
  //     // TODO jwt 갱신하거나 로그아웃 하는 방안
  //     String accessToken = jwt.accessToken!;
  //     final response = await http.put(Uri.parse(url),
  //         headers: <String, String>{
  //           'Authorization': 'Bearer $accessToken', // Bearer 토큰 추가
  //           'Content-Type': 'application/json', // 이 줄을 추가
  //         },
  //         body: body);
  //     print("basicPut 응답: ${response.body}");
  //     if (response.statusCode == 200) {
  //       final data = json.decode(response.body);
  //       return data;
  //     } else {
  //       throw Exception('Failed to fetch');
  //     }
  //   }
  //   static Future<dynamic> basicPut(String route, dynamic body) async {
  //     final url = '$BASE_URL$route'; // 데이터를 가져올 서버의 URL
  //     // TODO jwt 갱신하거나 로그아웃 하는 방안
  //     String accessToken = jwt.accessToken!;
  //     print("accessToken : $accessToken");
  //     final response = await http.put(Uri.parse(url),
  //         headers: <String, String>{
  //           'Authorization': 'Bearer $accessToken', // Bearer 토큰 추가
  //         },
  //         body: body);
  //     if (response.statusCode == 200) {
  //       final data = json.decode(response.body);
  //       return data;
  //     } else {
  //       throw Exception('Failed to fetch');
  //     }
  //   }
}
