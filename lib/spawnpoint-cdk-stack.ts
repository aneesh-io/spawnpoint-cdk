import * as cdk from '@aws-cdk/core';
import { Construct } from '@aws-cdk/core';
import * as amplify from '@aws-cdk/aws-amplify';
import * as dotenv from 'dotenv';

dotenv.config();

export class SpawnpointCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const app = new amplify.App(this, 'spawnpoint-aneesh-io', {
      appName: 'spawnpoint',
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: 'aneesh.io',
        repository: 'spawnpoint',
        oauthToken: cdk.SecretValue.secretsManager('spawnpoint-aneesh-io-github-token'),
      }),
      basicAuth: amplify.BasicAuth.fromCredentials('spawnpoint-aneesh-io', cdk.SecretValue.secretsManager('spawnpoint-aneesh-io-amplify-password')),
      customRules: [],
      environmentVariables: {
        ENV: 'production',
      },
    })

    const mainBranch = app.addBranch('main');
  }
}
