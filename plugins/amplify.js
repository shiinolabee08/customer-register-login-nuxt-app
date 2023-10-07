import { Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports';

export default (context, inject) => {
  Amplify.configure(awsconfig);
}