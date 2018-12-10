export class AppSettings {
  public url_base;
constructor(private environment: string) {
    if (this.environment === 'local') {
        this.url_base = 'http://localhost:55416/';
    }
    if (this.environment === 'aws') {
      this.url_base = 'http://ec2-18-231-93-130.sa-east-1.compute.amazonaws.com:100/';
    }
  }
}
