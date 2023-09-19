export interface IApiCountry {
  countryId: number;
  name: string;
  languages: IApiLanguage[];
}

export interface IApiLanguage {
  languageId: number;
  name: string;
}

export class CountryClient {
  constructor(private baseUrl: string) {}

  async get(): Promise<IApiCountry> {
    const result = await fetch(this.baseUrl + '/api/country', {
      method: 'GET',
    });
    return await result.json();
  }

  async create(data: IApiCountry): Promise<void> {
    await fetch(this.baseUrl + '/api/country', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}
