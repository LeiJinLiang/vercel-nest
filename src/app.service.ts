import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'; // <-- 注意这里
import { map } from 'rxjs/operators';

const APP_ID = 'wxbd388ef7943946f2';
const APP_SECRET = '21e0ecf2a87dc1c34dfcf353389ca55d';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {} // <-- 注意这里

  getHello(): string {
    return 'Hello World!';
  }
  // https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/user-login/code2Session.html
  login(code: string) {
    return this.getDataFromApi(
      `https://api.weixin.qq.com/sns/jscode2session?appid=${APP_ID}&secret=${APP_SECRET}&js_code=${code}&grant_type=authorization_code`,
    );
  }

  // https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/mp-access-token/getAccessToken.html
  getAccessToken() {
    return this.getDataFromApi(
      `https://api.weixin.qq.com/cgi-bin/token?appid=${APP_ID}&secret=${APP_SECRET}&grant_type=client_credential`,
    );
  }

  // https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/user-info/phone-number/getPhoneNumber.html
  getPhoneNumber(code: string, access_token: string) {
    return this.postDataToApi(
      `https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${access_token}`,
      { code: code },
    );
  }

  // https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/qrcode-link/url-link/generateUrlLink.html
  getURLLink = (access_token: string) => {
    return this.postDataToApi(
      `https://api.weixin.qq.com/wxa/generate_urllink?access_token=${access_token}`,
      {},
    );
  };

  getDataFromApi(endpoint: string) {
    return this.httpService
      .get(endpoint)
      .pipe(map((response) => response.data));
  }

  postDataToApi(endpoint: string, data: any) {
    return this.httpService
      .post(endpoint, data)
      .pipe(map((response) => response.data));
  }
}
