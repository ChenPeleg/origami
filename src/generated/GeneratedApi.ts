/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface TokenObtainPairDto {
  username: string;
  password: string;
  readonly access: string;
  readonly refresh: string;
}

export interface TokenRefreshDto {
  readonly access: string;
  refresh: string;
}

export interface UserDto {
  readonly id: number;
  /**
   * שם משתמש
   * שדה חובה. 150 תווים או פחות. אותיות, ספרות ו-@/./+/-/_ בלבד.
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * כתובת דוא"ל
   * @format email
   * @minLength 1
   * @maxLength 254
   */
  email: string;
  /**
   * שם פרטי
   * @maxLength 150
   */
  first_name?: string;
  /**
   * שם משפחה
   * @maxLength 150
   */
  last_name?: string;
}

export enum ApiSchemaRetrieveParamsFormatEnumDto {
  JsonDto = "json",
  YamlDto = "yaml",
}

export enum ApiSchemaRetrieveParamsLangEnumDto {
  AfDto = "af",
  ArDto = "ar",
  ArDzDto = "ar-dz",
  AstDto = "ast",
  AzDto = "az",
  BeDto = "be",
  BgDto = "bg",
  BnDto = "bn",
  BrDto = "br",
  BsDto = "bs",
  CaDto = "ca",
  CkbDto = "ckb",
  CsDto = "cs",
  CyDto = "cy",
  DaDto = "da",
  DeDto = "de",
  DsbDto = "dsb",
  ElDto = "el",
  EnDto = "en",
  EnAuDto = "en-au",
  EnGbDto = "en-gb",
  EoDto = "eo",
  EsDto = "es",
  EsArDto = "es-ar",
  EsCoDto = "es-co",
  EsMxDto = "es-mx",
  EsNiDto = "es-ni",
  EsVeDto = "es-ve",
  EtDto = "et",
  EuDto = "eu",
  FaDto = "fa",
  FiDto = "fi",
  FrDto = "fr",
  FyDto = "fy",
  GaDto = "ga",
  GdDto = "gd",
  GlDto = "gl",
  HeDto = "he",
  HiDto = "hi",
  HrDto = "hr",
  HsbDto = "hsb",
  HtDto = "ht",
  HuDto = "hu",
  HyDto = "hy",
  IaDto = "ia",
  IdDto = "id",
  IgDto = "ig",
  IoDto = "io",
  IsDto = "is",
  ItDto = "it",
  JaDto = "ja",
  KaDto = "ka",
  KabDto = "kab",
  KkDto = "kk",
  KmDto = "km",
  KnDto = "kn",
  KoDto = "ko",
  KyDto = "ky",
  LbDto = "lb",
  LtDto = "lt",
  LvDto = "lv",
  MkDto = "mk",
  MlDto = "ml",
  MnDto = "mn",
  MrDto = "mr",
  MsDto = "ms",
  MyDto = "my",
  NbDto = "nb",
  NeDto = "ne",
  NlDto = "nl",
  NnDto = "nn",
  OsDto = "os",
  PaDto = "pa",
  PlDto = "pl",
  PtDto = "pt",
  PtBrDto = "pt-br",
  RoDto = "ro",
  RuDto = "ru",
  SkDto = "sk",
  SlDto = "sl",
  SqDto = "sq",
  SrDto = "sr",
  SrLatnDto = "sr-latn",
  SvDto = "sv",
  SwDto = "sw",
  TaDto = "ta",
  TeDto = "te",
  TgDto = "tg",
  ThDto = "th",
  TkDto = "tk",
  TrDto = "tr",
  TtDto = "tt",
  UdmDto = "udm",
  UgDto = "ug",
  UkDto = "uk",
  UrDto = "ur",
  UzDto = "uz",
  ViDto = "vi",
  ZhHansDto = "zh-hans",
  ZhHantDto = "zh-hant",
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title No title
 * @version 0.0.0
 */
export class GeneratedApi<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  apiTokenAuth = {
    /**
     * @description Takes a set of user credentials and returns an access and refresh JSON web token pair to prove the authentication of those credentials.
     *
     * @tags api-token-auth
     * @name ApiTokenAuthCreate
     * @request POST:/api-token-auth/
     */
    apiTokenAuthCreate: (
      data: TokenObtainPairDto,
      params: RequestParams = {},
    ) =>
      this.http.request<TokenObtainPairDto, any>({
        path: `/api-token-auth/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  apiTokenRefresh = {
    /**
     * @description Takes a refresh type JSON web token and returns an access type JSON web token if the refresh token is valid.
     *
     * @tags api-token-refresh
     * @name ApiTokenRefreshCreate
     * @request POST:/api-token-refresh/
     */
    apiTokenRefreshCreate: (
      data: TokenRefreshDto,
      params: RequestParams = {},
    ) =>
      this.http.request<TokenRefreshDto, any>({
        path: `/api-token-refresh/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  api = {
    /**
     * @description OpenApi3 schema for this API. Format can be selected via content negotiation. - YAML: application/vnd.oai.openapi - JSON: application/vnd.oai.openapi+json
     *
     * @tags api
     * @name ApiSchemaRetrieve
     * @request GET:/api/schema/
     * @secure
     */
    apiSchemaRetrieve: (
      query?: {
        format?: ApiSchemaRetrieveParamsFormatEnumDto;
        lang?: ApiSchemaRetrieveParamsLangEnumDto;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<Record<string, any>, any>({
        path: `/api/schema/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  authentication = {
    /**
     * No description
     *
     * @tags authentication
     * @name AuthenticationUsersMeRetrieve
     * @request GET:/authentication/users/me/
     * @secure
     */
    authenticationUsersMeRetrieve: (params: RequestParams = {}) =>
      this.http.request<UserDto, any>({
        path: `/authentication/users/me/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
