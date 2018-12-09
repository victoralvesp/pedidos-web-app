export class AppSettings {
  public url_base;
constructor(private environment: string) {
  if (this.environment === 'local') {
      this.url_base = 'http://localhost:5000';
  }

  }
}
