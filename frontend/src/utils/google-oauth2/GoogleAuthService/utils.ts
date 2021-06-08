export function sessionFromCurrentUser(currentUser: gapi.auth2.GoogleUser) {
  const session = sessionFromAuthResponse(currentUser.getAuthResponse(true));
  const profile = currentUser.getBasicProfile();

  let temp: {
    id: string
    fullName: string
    firstName: string
    lastName: string
    email: string
    imageUrl: string
  } | {} = {};

  if (profile) {
    temp = {
      id: profile.getId(),
      fullName: profile.getName(),
      firstName: profile.getGivenName(),
      lastName: profile.getFamilyName(),
      email: profile.getEmail(),
      imageUrl: profile.getImageUrl(),
    };
  }

  return {
    ...session,
    ...temp,
  };
}

export function sessionFromAuthResponse(authResponse: gapi.auth2.AuthResponse) {
  return {
    accessToken: authResponse.access_token,
    idToken: authResponse.id_token,
    expiresAt: authResponse.expires_at,
  };
}
