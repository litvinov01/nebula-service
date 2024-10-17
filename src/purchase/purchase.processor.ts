import { HttpService } from '@nestjs/axios';
import { Process, Processor } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bull';
import { firstValueFrom } from 'rxjs';

@Processor('predict-queue')
export class PurchaseProcessor {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  @Process('send.prediction')
  async handleHttpRequest(job: Job) {
    const predictData = job.data;
    const predictURL = this.configService.get('PREDICTION_URL');
    this.httpService.put(`${predictURL}/api/v1/predict`, predictData);
  }
}
