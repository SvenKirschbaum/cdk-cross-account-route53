const {
  awscdk,
  JsonPatch,
} = require('projen');
const { ReleaseTrigger } = require('projen/lib/release');

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Sven Kirschbaum',
  authorAddress: 'sven@kirschbaum.me',
  defaultReleaseBranch: 'main',
  name: '@fallobst22/cdk-cross-account-route53',
  description: 'CDK Construct to allow creation of Route 53 records in a different account',
  repositoryUrl: 'https://github.com/SvenKirschbaum/cdk-cross-account-route53',
  cdkVersion: 'v2.82.0',
  jsiiVersion: '~5.9.0',
  keywords: [
    'aws',
    'aws-cdk',
    'awscdk',
    'cdk',
    'route53',
    'cross-account',
    'role',
    'records',
  ],
  devDeps: [
    '@aws-sdk/client-route-53',
    '@aws-sdk/client-sts',
    '@aws-sdk/credential-providers',
    '@types/aws-lambda',
  ],
  renovatebot: true,
  renovatebotOptions: {
    overrideConfig: {
      'extends': [
        'github>SvenKirschbaum/renovate-config',
      ],
      'github-actions': {
        enabled: false,
      },
    },
  },
  depsUpgrade: false,
  githubOptions: {
    mergify: false,
  },
  releaseTrigger: ReleaseTrigger.scheduled({
    schedule: '15 20 * * 6',
  }),
  workflowNodeVersion: '24.x',
});

// Remove default options defined via parent template
project.tryFindObjectFile('renovate.json5').patch(
  JsonPatch.remove('/packageRules'),
  JsonPatch.remove('/schedule'),
);
// project.tryFindObjectFile('.mergify.yml').patch();
project.synth();
