import { DisplayProfile } from 'src/app/store/auth/auth.reducer';

export interface LoginResponse {
  profile: DisplayProfile;
  authToken: AuthToken;
}

export interface AuthToken {
  token: string;
  refresh_token?: string;
  redirect_url: string;
}
